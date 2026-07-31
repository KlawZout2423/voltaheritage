"use client";

import React, { Fragment } from "react";
import { articles, heritageCategories, institution } from "@/lib/data";
import { useCms } from "@/context/CmsContext";

import HeroSection    from "@/app/sections/HeroSection";
import EventsSection  from "@/app/sections/EventsSection";
import HeritageSection from "@/app/sections/HeritageSection";
import AboutSection   from "@/app/sections/AboutSection";
import ServicesSection from "@/app/sections/ServicesSection";
import NewsSection    from "@/app/sections/NewsSection";
import ConnectSection from "@/app/sections/ConnectSection";

export default function HomePage() {
  const { state } = useCms();
  const {
    heroContent,
    sectionsOrder,
    sectionVisibility,
    events: cmsEvents,
    services: cmsServices,
  } = state;

  // ── Articles: prefer CMS blog posts, fall back to static data ──
  const dbPosts = (state.blogPosts || []).filter((p) => p.isPublished);
  const latestArticles = (dbPosts.length > 0
    ? dbPosts
    : articles.map((a) => ({
        id:          a.id,
        title:       a.title,
        content:     a.excerpt,
        mediaType:   "image" as const,
        mediaUrl:    a.thumbnailUrl,
        isPublished: true,
        createdAt:   a.publishedAt,
      }))
  )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  // ── Heritage: prefer CMS state, fall back to static data ──
  const heritageData =
    state.heritageCategories && state.heritageCategories.length > 0
      ? state.heritageCategories
      : heritageCategories;

  const sectionMap: Record<string, React.ReactNode> = {
    hero:      <HeroSection    heroContent={heroContent} />,
    events:    <EventsSection  events={cmsEvents} />,
    heritage:  <HeritageSection categories={heritageData} />,
    about:     <AboutSection   founded={institution.founded} />,
    services:  <ServicesSection services={cmsServices} />,
    news:      <NewsSection    articles={latestArticles} />,
    connect:   <ConnectSection />,
    "cta-banner": <ConnectSection />,
  };

  return (
    <div className="bg-[var(--color-bg-secondary)] overflow-x-hidden">
      {sectionsOrder.map((id) => {
        if (sectionVisibility[id] === false) return null;
        const Section = sectionMap[id];
        if (!Section) return null;
        return <Fragment key={id}>{Section}</Fragment>;
      })}
    </div>
  );
}
