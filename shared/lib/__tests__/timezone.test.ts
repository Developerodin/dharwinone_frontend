import { describe, expect, it } from 'vitest';
import {
  normalizeTimezone,
  utcInstantToWallClock,
  wallClockToUtc,
  getZoneOffsetLabel,
  formatZoneLabel,
  getZoneAbbreviation,
  formatInZone,
  formatDualZone,
  localDateKey,
  wallClockDateKey,
  formatDateInZone,
  getViewerTimezone,
} from '../timezone';

describe('timezone helpers', () => {
  it('normalizes legacy Asia/Calcutta to Asia/Kolkata', () => {
    expect(normalizeTimezone('Asia/Calcutta')).toBe('Asia/Kolkata');
  });

  it('round-trips wall clock through UTC for Asia/Kolkata', () => {
    const utc = wallClockToUtc('2026-05-20', '14:30', 'Asia/Kolkata');
    const wall = utcInstantToWallClock(utc, 'Asia/Kolkata');
    expect(wall).toEqual({ date: '2026-05-20', time: '14:30' });
  });

  it('renders UTC instant in the meeting zone', () => {
    const wall = utcInstantToWallClock('2026-05-20T09:00:00.000Z', 'America/New_York');
    expect(wall.date).toBe('2026-05-20');
    expect(wall.time).toMatch(/^\d{2}:\d{2}$/);
  });

  // Regression: instant-meeting bug where an IST 8:00 PM wall-clock was stored as
  // 20:00 UTC (via `${date}T${time}:00.000Z`) instead of 14:30 UTC, shifting the
  // invitation email by +05:30 to "1:30 AM next day". Must convert with the zone.
  it('stores an IST 20:00 wall-clock as 14:30 UTC, not 20:00 UTC', () => {
    const utc = wallClockToUtc('2026-06-01', '20:00', 'Asia/Kolkata').toISOString();
    expect(utc).toBe('2026-06-01T14:30:00.000Z');
    // The old append-Z behavior would have produced this wrong instant:
    expect(utc).not.toBe('2026-06-01T20:00:00.000Z');
  });
});

describe('formatInZone / formatDualZone invalid-instant guard', () => {
  // Regression: a meeting row with a missing/malformed scheduledAt reached the
  // table after the 100-row cap was lifted. Intl.DateTimeFormat.format(Invalid Date)
  // throws RangeError "Invalid time value", crashing the whole interviews table.
  it('returns a dash for an empty instant instead of throwing', () => {
    expect(formatInZone('', 'Asia/Kolkata')).toBe('—');
  });

  it('returns a dash for a malformed instant instead of throwing', () => {
    expect(formatInZone('not-a-date', 'UTC')).toBe('—');
    expect(formatDualZone('not-a-date', 'UTC', 'Asia/Kolkata')).toBe('—');
  });

  it('still formats a valid instant', () => {
    expect(formatInZone('2026-05-20T16:30:00.000Z', 'UTC')).toMatch(/2026/);
  });
});

// Regression: ATS Interviews Week View filed every interview one day late for
// positive-offset viewers. Column keys came from `d.toISOString().slice(0,10)`
// (UTC) while column labels came from the same Date read as local, so in IST
// "Wed, Aug 19" carried the key 2026-08-18 and Aug 19 interviews rendered under
// "Thu, Aug 20". Row keys were UTC too, misfiling boundary interviews even once
// the columns were fixed.
//
// These cases are timezone-agnostic on purpose: `new Date(y, m, d)` is local
// midnight in whatever zone the runner uses, and row keys pass an explicit zone.
// They model a viewer in Asia/Kolkata and pass under any TZ the suite runs in.
describe('week-view calendar keys (ATS Interviews regression)', () => {
  const VIEWER_TZ = 'Asia/Kolkata';

  /** Week View columns: 7 local days from Mon 17 Aug 2026 — mirrors InterviewsClient weekDays. */
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 7, 17);
    d.setDate(d.getDate() + i);
    return {
      key: localDateKey(d),
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    };
  });

  /** Row grouping key — mirrors InterviewsClient interviewDateKey(). */
  const rowKey = (instant: string) => utcInstantToWallClock(instant, VIEWER_TZ).date;
  const columnFor = (instant: string) => weekDays.find((w) => w.key === rowKey(instant))?.label;

  it('builds local column keys that match their own labels', () => {
    expect(weekDays.map((w) => w.key)).toEqual([
      '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20',
      '2026-08-21', '2026-08-22', '2026-08-23',
    ]);
    expect(weekDays.map((w) => w.label)).toEqual([
      'Mon, Aug 17', 'Tue, Aug 18', 'Wed, Aug 19', 'Thu, Aug 20',
      'Fri, Aug 21', 'Sat, Aug 22', 'Sun, Aug 23',
    ]);
  });

  it('localDateKey does not UTC-shift the way toISOString() did', () => {
    const d = new Date(2026, 7, 17);
    expect(localDateKey(d)).toBe('2026-08-17');
    // In any positive-offset zone (e.g. IST) the old key was a day behind.
    if (d.getTimezoneOffset() < 0) {
      expect(d.toISOString().slice(0, 10)).not.toBe(localDateKey(d));
    }
  });

  // Instants below are the four cards in the production screenshot, plus both
  // midnight boundaries. Suffix notes the wall clock an Asia/Kolkata viewer sees.
  it.each([
    ['17 Aug 2026 05:00 pm IST', '2026-08-17T11:30:00.000Z', 'Mon, Aug 17'],
    ['18 Aug 2026 03:00 pm IST', '2026-08-18T09:30:00.000Z', 'Tue, Aug 18'],
    ['19 Aug 2026 09:15 am UTC', '2026-08-19T09:15:00.000Z', 'Wed, Aug 19'],
    ['19 Aug 2026 01:30 pm IST', '2026-08-19T08:00:00.000Z', 'Wed, Aug 19'],
    ['19 Aug 2026 11:59 pm IST', '2026-08-19T18:29:00.000Z', 'Wed, Aug 19'],
    ['20 Aug 2026 12:00 am IST', '2026-08-19T18:30:00.000Z', 'Thu, Aug 20'],
  ])('places %s under $2', (_label, instant, expectedColumn) => {
    expect(columnFor(instant)).toBe(expectedColumn);
  });

  it('gives every case a row key that is exactly one of the column keys', () => {
    const instants = [
      '2026-08-17T11:30:00.000Z', '2026-08-18T09:30:00.000Z', '2026-08-19T09:15:00.000Z',
      '2026-08-19T08:00:00.000Z', '2026-08-19T18:29:00.000Z', '2026-08-19T18:30:00.000Z',
    ];
    for (const instant of instants) {
      const matches = weekDays.filter((w) => w.key === rowKey(instant));
      expect(matches).toHaveLength(1);
    }
  });

  it('labels the date from the instant, not by re-parsing the YYYY-MM-DD key', () => {
    // 20 Aug 12:00 am IST. `new Date('2026-08-19')` (the UTC date key) reads as
    // UTC midnight and would label this "Aug 19" — the bug this replaced.
    const instant = '2026-08-19T18:30:00.000Z';
    expect(formatDateInZone(instant, VIEWER_TZ)).toBe('Aug 20, 2026');
    expect(formatDateInZone(instant, VIEWER_TZ, false)).toBe('Aug 20');
    expect(formatDateInZone(instant, VIEWER_TZ)).not.toBe(
      new Date(new Date(instant).toISOString().slice(0, 10)).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    );
  });

  it('keeps the label consistent with the grouping key', () => {
    for (const instant of ['2026-08-19T08:00:00.000Z', '2026-08-19T18:30:00.000Z']) {
      const [y, m, d] = rowKey(instant).split('-').map(Number);
      const fromKey = new Date(y, m - 1, d).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
      expect(formatDateInZone(instant, VIEWER_TZ)).toBe(fromKey);
    }
  });

  it('returns a dash for a malformed instant instead of throwing', () => {
    expect(formatDateInZone('not-a-date', VIEWER_TZ)).toBe('—');
  });
});

// Regression: Communication -> Meetings week view keyed each row off the MEETING's stored
// timezone (`wallClockDateKey(scheduledAt, m.timezone)`) while its columns were viewer-local
// (`localDateKey`). A meeting stored as UTC 2026-08-19T20:30Z — 2:00 AM on Aug 20 for an IST
// viewer — filed under "Wed, Aug 19" while its row rendered a browser-local "2:00 AM".
// Both sides now read the viewer's zone. Timezone-agnostic: assertions compare the two
// helpers against each other rather than against a hard-coded zone.
describe('meeting week-view keys use the viewer zone, not the stored meeting zone', () => {
  const INSTANTS = [
    '2026-08-17T11:30:00.000Z',
    '2026-08-19T08:00:00.000Z',
    '2026-08-19T18:29:00.000Z',
    '2026-08-19T18:30:00.000Z',
    '2026-08-19T20:30:00.000Z', // 20 Aug 02:00 IST, stored tz UTC — the reported case
    '2026-08-23T23:45:00.000Z',
  ];

  it('row key equals the viewer-local calendar date the column grid is built from', () => {
    for (const instant of INSTANTS) {
      expect(wallClockDateKey(instant)).toBe(localDateKey(new Date(instant)));
    }
  });

  it('a UTC-stored meeting past the viewer\'s midnight keys to the VIEWER\'s day', () => {
    const instant = '2026-08-19T20:30:00.000Z';
    // What the old code did — the meeting's stored zone:
    expect(wallClockDateKey(instant, 'UTC')).toBe('2026-08-19');
    // What it does now — the viewer's zone, matching the column:
    expect(wallClockDateKey(instant)).toBe(localDateKey(new Date(instant)));
    if (new Date(instant).getTimezoneOffset() < -90) {
      // e.g. IST (+05:30): the two readings genuinely disagree, which was the bug.
      expect(wallClockDateKey(instant)).not.toBe(wallClockDateKey(instant, 'UTC'));
    }
  });

  it('the table date label agrees with the grouping key', () => {
    for (const instant of INSTANTS) {
      const [y, m, d] = wallClockDateKey(instant).split('-').map(Number);
      const fromKey = new Date(y, m - 1, d).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
      expect(formatDateInZone(instant, getViewerTimezone())).toBe(fromKey);
    }
  });

  it('an explicit zone still wins when one is passed (edit form reads the stored zone)', () => {
    expect(wallClockDateKey('2026-08-19T20:30:00.000Z', 'Asia/Kolkata')).toBe('2026-08-20');
    expect(wallClockDateKey('2026-08-19T20:30:00.000Z', 'America/New_York')).toBe('2026-08-19');
  });

  it('returns an empty key for a malformed instant instead of throwing', () => {
    expect(wallClockDateKey('not-a-date')).toBe('');
  });
});

describe('zone offset helpers', () => {
  it('getZoneOffsetLabel returns a padded UTC offset for Asia/Kolkata', () => {
    expect(getZoneOffsetLabel('Asia/Kolkata')).toBe('UTC +05:30');
  });

  it('getZoneOffsetLabel returns UTC +00:00 for UTC', () => {
    expect(getZoneOffsetLabel('UTC')).toBe('UTC +00:00');
  });

  it('getZoneOffsetLabel normalizes the legacy Asia/Calcutta alias', () => {
    expect(getZoneOffsetLabel('Asia/Calcutta')).toBe('UTC +05:30');
  });

  it('getZoneOffsetLabel falls back to UTC +00:00 for an invalid zone', () => {
    expect(getZoneOffsetLabel('Not/AZone')).toBe('UTC +00:00');
  });

  it('formatZoneLabel combines zone name and offset', () => {
    expect(formatZoneLabel('Asia/Kolkata')).toBe('Asia/Kolkata · UTC +05:30');
  });

  it('getZoneAbbreviation returns a short label for Asia/Kolkata', () => {
    const abbr = getZoneAbbreviation('Asia/Kolkata', new Date('2026-09-01T02:00:00.000Z'));
    expect(abbr).toMatch(/IST|GMT\+5:30|UTC\+5:30/i);
  });

  it('IST 7:30 AM wall clock stores as 02:00 UTC and round-trips for display', () => {
    const utc = wallClockToUtc('2026-09-01', '07:30', 'Asia/Kolkata');
    expect(utc.toISOString()).toBe('2026-09-01T02:00:00.000Z');
    const wall = utcInstantToWallClock(utc, 'Asia/Kolkata');
    expect(wall).toEqual({ date: '2026-09-01', time: '07:30' });
  });

  it('IST 8:00 AM wall clock stores as 02:30 UTC', () => {
    const utc = wallClockToUtc('2026-09-01', '08:00', 'Asia/Kolkata');
    expect(utc.toISOString()).toBe('2026-09-01T02:30:00.000Z');
  });
});
