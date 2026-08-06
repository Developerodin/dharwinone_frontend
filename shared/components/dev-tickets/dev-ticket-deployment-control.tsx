"use client";

import React, { useState } from "react";
import styles from "@/shared/components/dev-tickets/dev-ticket-deployment-control.module.css";
import { DEPLOYMENT_CONFIG, canControlDeployment } from "@/shared/components/dev-tickets/dev-ticket-config";
import {
  DEV_TICKET_DEPLOYED_TO,
  updateDevTicket,
  type DevTicket,
  type DevTicketDeployedTo,
} from "@/shared/lib/api/devTickets";

type DevTicketDeploymentControlProps = {
  ticket: DevTicket;
  userId?: string;
  onUpdated: (updated: DevTicket) => void;
  onError?: (message: string) => void;
};

export default function DevTicketDeploymentControl({
  ticket,
  userId,
  onUpdated,
  onError,
}: DevTicketDeploymentControlProps) {
  const stage = ticket.deployedTo ?? "Not Deployed";
  const cfg = DEPLOYMENT_CONFIG[stage];
  const canToggle = canControlDeployment(ticket, userId);
  const [saving, setSaving] = useState(false);
  const activeIndex = DEV_TICKET_DEPLOYED_TO.indexOf(stage);

  const stopCardActivate = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  const setDeployment = async (next: DevTicketDeployedTo) => {
    if (next === stage || saving) return;

    const ticketId = String(ticket.id ?? ticket._id ?? "");
    if (!ticketId) return;

    setSaving(true);
    try {
      const updated = await updateDevTicket(ticketId, { deployedTo: next });
      onUpdated(updated);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ??
        (err as { message?: string })?.message ??
        "Failed to update deployment";
      onError?.(message);
    } finally {
      setSaving(false);
    }
  };

  if (!canToggle) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wide ${cfg.badge}`}
        title="Where the fix has been deployed"
      >
        <i className={`${cfg.icon} text-[0.6875rem]`} aria-hidden />
        {cfg.label}
      </span>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Fix deployed to"
      title="Set where the fix has been deployed"
      className={`${styles.toggle} ${saving ? styles.toggleSaving : ""}`}
      onClick={stopCardActivate}
      onKeyDown={stopCardActivate}
      onMouseDown={stopCardActivate}
    >
      <span
        aria-hidden
        className={`${styles.indicator} ${DEPLOYMENT_CONFIG[stage].indicator}`}
        style={{ transform: `translateX(${Math.max(activeIndex, 0) * 100}%)` }}
      />
      {DEV_TICKET_DEPLOYED_TO.map((value) => {
        const option = DEPLOYMENT_CONFIG[value];
        const selected = value === stage;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={saving}
            title={option.label}
            className={`${styles.segment} ${selected ? `${styles.segmentActive} ${option.toggleActiveText}` : ""}`}
            onClick={(e) => {
              stopCardActivate(e);
              void setDeployment(value);
            }}
          >
            <i className={`${option.icon} text-[0.6875rem]`} aria-hidden />
            <span>{option.toggleLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
