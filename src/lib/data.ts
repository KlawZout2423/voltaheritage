import type { Event, Article, HeritageCategory, GalleryItem, Service, TeamMember } from "./types";

// ─────────────────────────────────────────────────────────────
// INSTITUTION
// ─────────────────────────────────────────────────────────────
export const institution = {
  name: "Volta Heritage Dance Ensemble",
  shortName: "VHDE",
  tagline: "We Perform, to Educate",
  founded: "2012",
  foundedFull: "31st July 2012",
  location: "Ho-Dome, Volta Region, Ghana",
  email: "nanevitheophilusbhervdey@gmail.com",
  phone: "+233 24 952 7440",
  address: "Ho-Dome, Ho, Volta Region, Ghana",
  facebook: "https://www.facebook.com/share/1JhCZ5eWAj/",
  tiktok: "",
  instagram: "",
  youtube: "",
};

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────
export const events: Event[] = [
  {
    id: "evt-1",
    title: "Hogbetsotso Cultural Showcase",
    description:
      "Join us for a spectacular evening of traditional Ewe dance and drumming commemorating the historic exodus from Notsie. Featuring the Atsiagbekor war dance, ancestral drum dialogues, and Agbadza performances by our full ensemble.",
    date: "2026-11-07",
    venue: "Ho Cultural Centre, Volta Region",
    category: "festival",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg",
    isFeatured: true,
  },
  {
    id: "evt-2",
    title: "Traditional Drumming Workshop",
    description:
      "An intensive two-day workshop on the tonal language of Ewe drums. Participants will learn the Sogo, Kidi, and Atsimevu drum patterns under the guidance of our master drummers. Open to all skill levels.",
    date: "2026-08-20",
    endDate: "2026-08-21",
    venue: "Volta Heritage Rehearsal Hall, Ho",
    category: "workshop",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg",
  },
  {
    id: "evt-3",
    title: "Asogli Yam Festival Performance (Te Za)",
    description:
      "The Volta Heritage Dance Ensemble will perform at the grand durbar of the Asogli Yam Festival. Experience Borborbor, Kinka, and Husago dances in their most authentic ceremonial context.",
    date: "2026-09-06",
    venue: "Ho Sports Stadium, Volta Region",
    category: "performance",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg",
    isFeatured: true,
  },
  {
    id: "evt-4",
    title: "Ewe Kente & Cultural Symbols Exhibition",
    description:
      "A curated exhibition of authentic Ewe Kente cloth from Agotime Kpetoe, alongside cultural symbols, proverb-woven fabrics, and oral history installations. Educational tours available for schools.",
    date: "2026-10-15",
    endDate: "2026-10-22",
    venue: "Volta Regional Museum, Ho",
    category: "exhibition",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.14.jpeg",
  },
];

// ─────────────────────────────────────────────────────────────
// NEWS & ARTICLES
// ─────────────────────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: "art-1",
    title: "Volta Heritage Dance Ensemble Performs at International Arts Festival",
    slug: "vhde-international-arts-festival-2026",
    excerpt:
      "The ensemble's 24-member troupe represented Ghana at the Pan-African Arts Festival, earning a standing ovation for their Agbadza and Husago performances.",
    content: `<p>The Volta Heritage Dance Ensemble (VHDE) represented Ghana with distinction at the 2026 Pan-African Arts Festival held in Accra. The ensemble's 24-member troupe delivered a breathtaking performance that drew a standing ovation from an audience of over 3,000 cultural enthusiasts from across the continent.</p>
<p>The performance opened with the solemn Husago dance — a ritual movement tracing the Ewe people's migration from Notsie — before transitioning into the high-energy Agbadza, the ancient war dance that simulates birds taking flight. The evening concluded with a rousing Borborbor sequence that invited audience members to join the circle.</p>
<p>"To see tears in the eyes of people from Senegal, Nigeria, and Kenya as they watched our Husago was humbling. Culture truly unites us," said the Ensemble Director after the performance.</p>`,
    thumbnailUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
    category: "news",
    publishedAt: "2026-05-28",
    author: "VHDE Communications",
  },
  {
    id: "art-2",
    title: "Understanding the Spiritual Language of Ewe Drums",
    slug: "spiritual-language-ewe-drums",
    excerpt:
      "To the Ewe people, drums are not instruments — they are living voices that speak to the community, the ancestors, and the divine. Explore the sacred tonal system.",
    content: `<p>The Ewe drum is one of the most sophisticated percussion systems in African music. Unlike other drum traditions that use rhythm purely for musical effect, Ewe drumming is built around tonal language — each drum can mimic the tones of spoken Ewe, effectively allowing the ensemble to \"talk\" to its audience.</p>
<p>The master drum, the <strong>Atsimevu</strong>, stands nearly two metres tall and is considered the voice of authority in any ensemble. It leads the conversation, with the <strong>Sogo</strong> (the response drum) and the <strong>Kidi</strong> (the supporting voice) forming a constant dialogue around it.</p>
<p>At VHDE, our master drummers carry knowledge passed down through generations — not from written notation, but through the living oral tradition of apprenticeship.</p>`,
    thumbnailUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.40 (1).jpeg",
    category: "cultural-story",
    publishedAt: "2026-05-15",
    author: "Cultural Education Unit, VHDE",
  },
  {
    id: "art-3",
    title: "VHDE Launches Free Cultural Education Programme for Schools",
    slug: "vhde-free-school-cultural-education-programme",
    excerpt:
      "Starting this September, the ensemble will visit 12 schools across the Volta Region with free drumming demonstrations, dance workshops, and cultural storytelling sessions.",
    content: `<p>The Volta Heritage Dance Ensemble is proud to announce the launch of its <strong>Cultural Education Outreach Programme</strong>, a free initiative that will bring authentic Ewe cultural education directly to 12 schools across the Volta Region starting September 2026.</p>
<p>Each school visit will include a 90-minute session covering traditional drumming demonstrations, age-appropriate dance participation, Ewe proverb storytelling, and an introduction to the symbolism embedded in Ewe Kente cloth.</p>
<p>The programme is funded in part by the Ghana Tourism Authority and the Volta Regional Coordinating Council, and is aligned with the National Cultural Policy's goal of strengthening cultural identity among Ghanaian youth.</p>`,
    thumbnailUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.43.jpeg",
    category: "announcement",
    publishedAt: "2026-05-02",
    author: "VHDE Communications",
  },
];

// ─────────────────────────────────────────────────────────────
// HERITAGE CATEGORIES
// ─────────────────────────────────────────────────────────────
export const heritageCategories: HeritageCategory[] = [
  {
    id: "hc-dance",
    slug: "dance",
    name: "Traditional Dance",
    tagline: "Movement as spiritual expression",
    description:
      "Ewe traditional dances are a living archive. Each dance form encodes history, social values, and spiritual communication through precise physical vocabulary developed over centuries.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",
    color: "red",
    items: [
      {
        id: "hc-dance-1",
        name: "Agbadza",
        description: "The ancient war dance of the Anlo-Ewe, originating from Atrikpui. Performed at funerals, festivals, and assemblies.",
        significance: "Simulates birds taking flight; celebrates survival and community solidarity. One of the oldest known Ewe dance forms.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.26.jpeg",
      },
      {
        id: "hc-dance-2",
        name: "Borborbor",
        description: "The defining recreational dance of the Ewe, featuring energetic hip and torso movements performed in a circle.",
        significance: "Promotes social cohesion and celebration. The circular formation represents community unity and equality.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.27.jpeg",
      },
      {
        id: "hc-dance-3",
        name: "Husago",
        description: "A solemn ritual dance originating from the migration epoch of the Ewe from Notsie.",
        significance: "Performed at memorial rites and ancestral ceremonies. Its slow steps evoke deep reflection and respect for ancestors.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg",
      },
      {
        id: "hc-dance-4",
        name: "Kinka",
        description: "A vibrant youth-centric social dance featuring playful, theatrical, and acrobatic movements.",
        significance: "Represents the adaptive creativity of Ewe youth culture. Features humorous call-and-response singing.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.29.jpeg",
      },
    ],
  },
  {
    id: "hc-music",
    slug: "music",
    name: "Music & Drumming",
    tagline: "The drum speaks what words cannot",
    description:
      "Ewe drumming is a sophisticated tonal language system. The master drum can replicate spoken Ewe, allowing an ensemble to communicate narratives, instructions, and emotions entirely through percussion.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg",
    color: "gold",
    items: [
      {
        id: "hc-music-1",
        name: "Atsimevu (Master Drum)",
        description: "The lead drum, standing nearly two metres tall. The unquestionable voice of authority in any Ewe ensemble.",
        significance: "Commands the entire ensemble. Only experienced master drummers are permitted to play it.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.40 (1).jpeg",
      },
      {
        id: "hc-music-2",
        name: "Sogo (Response Drum)",
        description: "The response drum that maintains constant dialogue with the Atsimevu.",
        significance: "Provides tonal counterpoint, creating the musical conversation that defines Ewe drumming.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.40 (2).jpeg",
      },
      {
        id: "hc-music-3",
        name: "Gankogui (Iron Bell)",
        description: "A double-ended iron bell that provides the rhythmic foundation for all Ewe ensemble music.",
        significance: "The temporal anchor of the ensemble. Its pattern never changes, giving dancers a fixed reference point.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.42.jpeg",
      },
    ],
  },
  {
    id: "hc-kente",
    slug: "kente",
    name: "Ewe Kente Weaving",
    tagline: "Every thread tells a story",
    description:
      "Ewe Kente, woven in the historic hub of Agotime Kpetoe, is unique among Ghanaian Kente traditions for its direct incorporation of figurative symbols — animals, household utensils, and historical markers — that weave entire ancestral proverbs into cloth.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.14.jpeg",
    color: "gold",
    items: [
      {
        id: "hc-kente-1",
        name: "Agotime Double-Weave",
        description: "The signature technique of Agotime weavers, creating reversible cloths with entirely different patterns on each side.",
        significance: "Represents the duality of existence — what is seen and what is hidden. A cloth fit for chiefs and royal ceremonies.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.14 (1).jpeg",
      },
      {
        id: "hc-kente-2",
        name: "Proverb Cloths",
        description: "Kente strips that incorporate Ewe proverbs through symbolic figurative representations woven directly into the fabric.",
        significance: "Each cloth is an educational document. Communities could read the cloth's proverbs as a community text.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (3).jpeg",
      },
    ],
  },
  {
    id: "hc-festivals",
    slug: "festivals",
    name: "Traditional Festivals",
    tagline: "When ancestors walk among us",
    description:
      "The festival calendar of the Volta Region is one of the richest in Ghana, encompassing harvest celebrations, ancestral commemorations, and arts showcases that draw thousands of participants from across the world.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg",
    color: "red",
    items: [
      {
        id: "hc-fest-1",
        name: "Hogbetsotso",
        description: "The grand annual commemoration of the Ewe exodus from Notsie. Held the first Saturday of November in Anloga.",
        significance: "The most solemn Ewe festival. Reaffirms identity, resilience, and the unbreakable bond of the Anlo-Ewe community.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg",
      },
      {
        id: "hc-fest-2",
        name: "Asogli Yam Festival (Te Za)",
        description: "The flagship harvest festival of the Asogli State in Ho. Celebrates the first yam of the season.",
        significance: "A thanksgiving to the land and ancestors. Features elaborate chief durbars and dance performances.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (1).jpeg",
      },
    ],
  },
  {
    id: "hc-chieftaincy",
    slug: "chieftaincy",
    name: "Chieftaincy & Customs",
    tagline: "Governance rooted in tradition",
    description:
      "The Ewe chieftaincy system is a sophisticated governance structure built on ancestral authority, communal consensus, and spiritual legitimacy. Chiefs are not merely political leaders but custodians of cultural memory.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg",
    color: "green",
    items: [
      {
        id: "hc-chief-1",
        name: "Durbar of Chiefs",
        description: "The ceremonial assembly of paramount chiefs and sub-chiefs, typically held at festivals in full regalia.",
        significance: "An expression of political authority and cultural pride. The Kente cloth worn signals rank, lineage, and achievement.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 16.38.10 (1).jpeg",
      },
    ],
  },
  {
    id: "hc-foods",
    slug: "foods",
    name: "Traditional Foods",
    tagline: "Culture tastes like home",
    description:
      "Volta Region cuisine reflects the geography and culture of the people — freshwater fish from the Volta Lake, yam from the fertile hills, and fermented foods that connect the Ewe to their agricultural heritage.",
    imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.35.jpeg",
    color: "green",
    items: [
      {
        id: "hc-food-1",
        name: "Akple & Fetri Detsi",
        description: "The iconic Ewe staple — a smooth corn dough (akple) served with a rich okra-based stew and smoked fish.",
        significance: "A meal of community. Akple is traditionally eaten communally from a shared bowl as an act of unity.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.35 (1).jpeg",
      },
      {
        id: "hc-food-2",
        name: "Volta Lake Fish (Tilapia)",
        description: "Freshwater tilapia from the Volta Lake, grilled over open fire and served with pepper sauce.",
        significance: "Represents the Ewe's intimate relationship with the Volta River system — their ancestral lifeblood.",
        imageUrl: "/images/WhatsApp Image 2026-06-02 at 10.54.35 (2).jpeg",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────────────────────
export const galleryItems: GalleryItem[] = [
  { id: "g-1",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.25.jpeg",      caption: "Agbadza performance — ensemble in green & white regalia",    category: "performance" },
  { id: "g-2",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.26.jpeg",      caption: "Traditional dance — footwork and rhythm in motion",           category: "performance" },
  { id: "g-3",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.27.jpeg",      caption: "Full ensemble during outdoor cultural showcase",              category: "performance" },
  { id: "g-4",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.28.jpeg",      caption: "Dancers performing at a community festival",                  category: "performance" },
  { id: "g-5",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.29.jpeg",      caption: "Energy and precision — Borborbor in full swing",              category: "performance" },
  { id: "g-6",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.30.jpeg",      caption: "Cultural performance at an outdoor event",                    category: "performance" },
  { id: "g-7",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.31.jpeg",      caption: "Ensemble member mid-performance",                             category: "performance" },
  { id: "g-8",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.32.jpeg",      caption: "Traditional dance with ceremonial props",                    category: "performance" },
  { id: "g-9",  type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.33.jpeg",      caption: "VHDE dancers in traditional green-check costume",             category: "performance" },
  { id: "g-10", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.34.jpeg",      caption: "Live cultural showcase — full troupe",                        category: "performance" },
  { id: "g-11", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.36.jpeg",      caption: "Drumming workshop — tourists learning Ewe rhythms",           category: "workshop" },
  { id: "g-12", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.38.jpeg",      caption: "Hands-on drumming session with visitors",                    category: "workshop" },
  { id: "g-13", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.39.jpeg",      caption: "Cultural immersion — visitor joins the drum circle",          category: "workshop" },
  { id: "g-14", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.40.jpeg",      caption: "Master drummer teaching traditional Ewe rhythms",             category: "workshop" },
  { id: "g-15", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.42.jpeg",      caption: "Interactive dance session during a Visit Volta event",        category: "workshop" },
  { id: "g-16", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.43.jpeg",      caption: "Dance demonstration — ensemble teaching a visitor",           category: "workshop" },
  { id: "g-17", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.44.jpeg",      caption: "Women dancers in vibrant Kente-inspired costumes",            category: "workshop" },
  { id: "g-18", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 10.54.45.jpeg",      caption: "Traditional dance instruction — tourist participation",       category: "workshop" },
  { id: "g-19", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.10.jpeg",      caption: "Asogli Yam Festival — ceremonial procession",                 category: "festival" },
  { id: "g-20", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.11.jpeg",      caption: "Festival participant in ritual white & blue attire",          category: "festival" },
  { id: "g-21", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.12.jpeg",      caption: "Ancestral ceremony — painted faces and sacred cloth",         category: "festival" },
  { id: "g-22", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.13.jpeg",      caption: "Grand festival procession through Ho",                        category: "festival" },
  { id: "g-23", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.14.jpeg",      caption: "Festival participant in blue Kente, carrying a bell",         category: "heritage" },
  { id: "g-24", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (1).jpeg",  caption: "Ritual procession at the Asogli Yam Festival",                category: "festival" },
  { id: "g-25", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.11 (2).jpeg",  caption: "Ceremony with smoking pot — ancestral invocation",            category: "festival" },
  { id: "g-26", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.12 (1).jpeg",  caption: "Festival dancer in traditional face paint and costume",       category: "festival" },
  { id: "g-27", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (1).jpeg",  caption: "Ewe Kente cloth on display at cultural festival",             category: "heritage" },
  { id: "g-28", type: "photo", url: "/images/WhatsApp Image 2026-06-02 at 16.38.13 (2).jpeg",  caption: "Cultural heritage display — traditional regalia",             category: "heritage" },
];

// ─────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    id: "svc-1",
    title: "Cultural Performances",
    description:
      "Book the full Volta Heritage Dance Ensemble for festivals, galas, state functions, corporate events, and international showcases. We bring authentic Ewe dance and drumming to any stage.",
    icon: "Music",
    color: "gold",
    features: [
      "Full 24-member ensemble available",
      "Custom programme curated for your event",
      "Traditional regalia and live drumming",
      "Available locally and internationally",
    ],
  },
  {
    id: "svc-2",
    title: "Cultural Education Workshops",
    description:
      "Intensive workshops on traditional Ewe drumming, dance, and weaving for schools, universities, cultural institutions, and community groups.",
    icon: "BookOpen",
    color: "green",
    features: [
      "Traditional drumming masterclasses",
      "Dance technique and cultural context",
      "Ewe Kente weaving demonstrations",
      "Certificates of participation",
    ],
  },
  {
    id: "svc-3",
    title: "School Outreach Programme",
    description:
      "Free or subsidised cultural education visits to primary and secondary schools across the Volta Region. We bring the culture to the classroom.",
    icon: "GraduationCap",
    color: "green",
    features: [
      "90-minute interactive sessions",
      "Age-appropriate content",
      "Drumming, dance, and storytelling",
      "Aligned with Ghana national curriculum",
    ],
  },
  {
    id: "svc-4",
    title: "Heritage Documentation",
    description:
      "We work with researchers, documentary filmmakers, and cultural institutions to document, record, and archive Ewe cultural expressions for posterity.",
    icon: "Archive",
    color: "gold",
    features: [
      "Oral history recordings",
      "Cultural research collaboration",
      "Ethnomusicology support",
      "Video documentation of dance forms",
    ],
  },
  {
    id: "svc-5",
    title: "Tourism Cultural Experiences",
    description:
      "Curated cultural immersion experiences for tourists visiting the Volta Region. Live performances, guided heritage tours, and hands-on participation.",
    icon: "MapPin",
    color: "red",
    features: [
      "Private ensemble performances",
      "Heritage village guided tours",
      "Hands-on drumming & dance sessions",
      "Cultural souvenir marketplace",
    ],
  },
  {
    id: "svc-6",
    title: "Event Cultural Consultancy",
    description:
      "Expert cultural advisory services for event organisers, government institutions, and international organisations planning Ghana-focused cultural programming.",
    icon: "Compass",
    color: "red",
    features: [
      "Programme design and cultural accuracy",
      "Traditional protocol advisory",
      "Performer sourcing and coordination",
      "Cultural sensitivity review",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// TEAM / LEADERSHIP
// ─────────────────────────────────────────────────────────────
export const team: TeamMember[] = [
  {
    id: "tm-1",
    name: "Theophilus K. Nanevi",
    title: "Founder & Chief Executive Officer",
    bio: "A dedicated traditional creative dance and drum lecturer, Theophilus founded the Volta Heritage Dance Ensemble as a living archive for the Volta Region's performing arts. Under his visionary leadership the ensemble preserves the ancestral stories, complex rhythms, and traditional dances of Ewe heritage — sharing them with audiences locally and internationally.",
    imageUrl: "/images/team-theophilus-nanevi.png",
  },
  {
    id: "tm-2",
    name: "Edem Godwin Amevor",
    title: "President",
    bio: "Elected President in 2025 after joining the ensemble in 2011, Edem has grown through the ranks as a dancer, singer, and drummer. A student at Regional Maritime University (RMU), he provides strategic direction and unity, having led school cultural groups from JHS through SHS before taking the helm of VHDE.",
    imageUrl: "/images/team-edem-amevor.jpg",
  },
  {
    id: "tm-3",
    name: "Johnson Marvin Danyo",
    title: "Artistic Director",
    bio: "A final-year Industrial Art student at Ho Technical University (HTU) and cultural advocate active in leadership since 2019. Johnson provides creative direction bridging tradition and contemporary expression — grooming pageant contestants, training students for inter-school competitions, and mentoring ensemble members with discipline and confidence.",
    imageUrl: "/images/team-johnson-danyo.jpg",
  },
  {
    id: "tm-4",
    name: "Bless Kove",
    title: "Drum Major & Lead Drummer",
    bio: "A graduate of Ho Technical University (HTU) currently on National Service, Bless joined the ensemble in 2023 and assumed office as Drum Major in 2024. With experience in both traditional and modern drumming styles, he leads drumming activities, mentors developing drummers, and is committed to preserving the rich rhythmic heritage of the Volta Region.",
    imageUrl: "/images/team-bless-kove.png",
  },
];
