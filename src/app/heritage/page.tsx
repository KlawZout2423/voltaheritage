import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { heritageCategories } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Living Archive",
  description:
    "Explore the six pillars of Ewe cultural heritage preserved by the Volta Heritage Dance Ensemble — traditional dance, drumming, Kente weaving, festivals, chieftaincy, and food.",
};

import HeritageContent from "./HeritageContent";

export default function HeritagePage() {
  return <HeritageContent />;
}
