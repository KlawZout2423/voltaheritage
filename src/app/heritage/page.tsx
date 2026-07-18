import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Living Archive",
  description:
    "Explore the six pillars of Ewe cultural heritage preserved by the Volta Heritage Dance Ensemble — traditional dance, drumming, Kente weaving, festivals, chieftaincy, and food.",
};

import HeritageContent from "./HeritageContent";

export default function HeritagePage() {
  return <HeritageContent />;
}
