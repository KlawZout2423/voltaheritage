import type { Metadata } from "next";
import { heritageCategories } from "@/lib/data";
import HeritageCategoryContent from "./HeritageCategoryContent";

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

export default async function HeritageCategoryPage({ params }: Props) {
  const { slug } = await params;
  return <HeritageCategoryContent slug={slug} />;
}
