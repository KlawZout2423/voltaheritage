import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heritageCategories } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return heritageCategories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = heritageCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Heritage Not Found" };
  return {
    title: cat.name,
    description: cat.description,
  };
}

const colorStyles = {
  gold: {
    badge: "badge-gold",
    card: "card-gold",
    bullet: "border-[var(--color-heritage-gold)]",
    heading: "text-[var(--color-heritage-gold)]",
    dot: "bg-[var(--color-heritage-gold-light)] text-[var(--color-heritage-gold-dark)]",
  },
  red: {
    badge: "badge-red",
    card: "card-red",
    bullet: "border-[var(--color-heritage-red)]",
    heading: "text-[var(--color-heritage-red)]",
    dot: "bg-[var(--color-heritage-red-light)] text-[var(--color-heritage-red)]",
  },
  green: {
    badge: "badge-green",
    card: "card-green",
    bullet: "border-[var(--color-heritage-green)]",
    heading: "text-[var(--color-heritage-green)]",
    dot: "bg-[var(--color-heritage-green-light)] text-[var(--color-heritage-green)]",
  },
};

import HeritageCategoryContent from "./HeritageCategoryContent";

export default async function HeritageCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <HeritageCategoryContent slug={slug} />;
}
