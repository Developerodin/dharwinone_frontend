import type { Metadata } from "next";
import MeetingFeaturesPreview from "./MeetingFeaturesPreview";

export const metadata: Metadata = {
  title: "Meeting Features Preview | Dharwin",
  description: "Isolated preview for raise hand and chat emoji in the meeting room UI.",
  robots: { index: false, follow: false },
};

export default function MeetingFeaturesPreviewPage() {
  return <MeetingFeaturesPreview />;
}
