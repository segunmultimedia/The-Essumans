// ============================================================
// THE ESSUMAN'S — Centralized Placeholder Content
// ============================================================
// All placeholder data lives here. Replace with real content.
// Search [REPLACE] to find every placeholder value.
// ============================================================

export const coupleInfo = {
  groom:         "Kwabena",
  bride:         "Kristine",
  familyName:    "The Essumans",
  brandName:     "THE ESSUMAN'S",
  // [REPLACE] — Confirmed wedding date
  weddingDate:   "22 August 2026",
  weddingDateFmt:"22 · 08 · 2026",
  tagline:       "Our Story. Our Memories. Our Forever.",
  closingLine:   "Made with love, for a love worth celebrating.",
};

export const heroContent = {
  headline:    "THE ESSUMAN'S",
  coupleNames: "Kwabena & Kristine",
  date:        "22 August 2026",
  tagline:     "Our Story. Our Memories. Our Forever.",
  primaryCTA:  "Explore Our Story",
  secondaryCTA:"Leave a Wish",
  // [REPLACE] — Real hero photograph of the couple
  heroImage:   "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90&auto=format&fit=crop",
  heroImageAlt:"Kwabena and Kristine — their wedding day",
};

export const coupleIntroduction = {
  heading:    "The Beginning of Forever",
  subheading: "Kwabena & Kristine",
  // [REPLACE] — Replace with real introduction
  body: "Two people. One beautiful beginning. Their story is one of love, patience, and perfect timing — the kind of love that quietly changes everything. Together, they begin a new chapter as the Essuman family.",
  // [REPLACE] — Real couple portrait
  image:    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=85&auto=format&fit=crop",
  imageAlt: "Kwabena and Kristine together",
};

// [REPLACE] — Story milestones
export const storyMilestones = [
  {
    id:          "how-we-met",
    heading:     "How We Met",
    year:        "2020",           // [REPLACE]
    description: "Every great love story begins with a moment — a conversation, a glance, a shared laugh that stays with you longer than expected. This was theirs.",
    image:       "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=900&q=80&auto=format&fit=crop",
    imageAlt:    "The beginning of their story",
  },
  {
    id:          "the-journey",
    heading:     "The Journey",
    year:        "2020 – 2024",    // [REPLACE]
    description: "Through seasons of growth and change, their bond deepened. They built something worth holding on to — not just love, but understanding, trust, and a future worth believing in.",
    image:       "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80&auto=format&fit=crop",
    imageAlt:    "Their journey together",
  },
  {
    id:          "the-proposal",
    heading:     "The Proposal",
    year:        "2025",           // [REPLACE]
    description: "He asked. She said yes. And in that one moment, everything that had been quietly building finally had a name: forever.",
    image:       "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=900&q=80&auto=format&fit=crop",
    imageAlt:    "The proposal",
  },
  {
    id:          "the-wedding",
    heading:     "The Wedding",
    year:        "22 August 2026",
    description: "Surrounded by the people who love them most, Kwabena and Kristine made their promises — not just to each other, but to a lifetime of shared moments, laughter, and love.",
    image:       "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=900&q=80&auto=format&fit=crop",
    imageAlt:    "Their wedding ceremony",
  },
  {
    id:          "the-essumans",
    heading:     "The Essumans",
    year:        "Forever",
    description: "And so, a family begins. Kwabena and Kristine Essuman — bound not just by vows, but by a love that will grow, endure, and be remembered.",
    image:       null,
    imageAlt:    "",
  },
];

// [REPLACE] — Gallery photographs
export type GalleryCategory = "All" | "Couple" | "Engagement" | "Wedding" | "Family & Friends" | "Reception";

export interface GalleryImage {
  id:       string;
  src:      string;
  alt:      string;
  category: Exclude<GalleryCategory, "All">;
  width:    number;
  height:   number;
}

export const galleryCategories: GalleryCategory[] = [
  "All", "Couple", "Engagement", "Wedding", "Family & Friends", "Reception",
];

// [REPLACE] — All 12 images are distinct, no repeats
export const galleryImages: GalleryImage[] = [
  { id: "g1",  src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop",  alt: "Kwabena and Kristine — couple portrait",    category: "Couple",          width: 800, height: 1067 },
  { id: "g2",  src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80&auto=format&fit=crop",  alt: "Wedding ceremony",                          category: "Wedding",         width: 800, height: 600  },
  { id: "g3",  src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80&auto=format&fit=crop",  alt: "Ceremony vows",                             category: "Wedding",         width: 800, height: 1000 },
  { id: "g4",  src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80&auto=format&fit=crop",  alt: "A romantic moment",                         category: "Engagement",      width: 800, height: 533  },
  { id: "g5",  src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&q=80&auto=format&fit=crop",  alt: "Couple together outdoors",                  category: "Couple",          width: 800, height: 600  },
  { id: "g6",  src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80&auto=format&fit=crop",  alt: "Family and friends gathering",              category: "Family & Friends", width: 800, height: 533 },
  { id: "g7",  src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80&auto=format&fit=crop",  alt: "Wedding portrait",                          category: "Couple",          width: 800, height: 1000 },
  { id: "g8",  src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80&auto=format&fit=crop",  alt: "Wedding celebration",                       category: "Reception",       width: 800, height: 533  },
  { id: "g9",  src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80&auto=format&fit=crop",  alt: "Wedding day portrait",                      category: "Wedding",         width: 800, height: 1067 },
  { id: "g10", src: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&q=80&auto=format&fit=crop",  alt: "Reception table setting",                   category: "Reception",       width: 800, height: 600  },
  { id: "g11", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80&auto=format&fit=crop",  alt: "Engagement session",                        category: "Engagement",      width: 800, height: 600  },
  { id: "g12", src: "https://images.unsplash.com/photo-1525518392674-39ba1fca2ec2?w=800&q=80&auto=format&fit=crop",  alt: "First dance at the reception",              category: "Reception",       width: 800, height: 533  },
];

// [REPLACE] — Sample wishes from guests
export const sampleWishes = [
  {
    id: "w1",
    guestName:    "Auntie Grace",
    message:      "May your journey together be filled with love, laughter and unforgettable memories. You two are a beautiful reminder that true love still exists. Wishing you a lifetime of happiness.",
    avatar:       null,
    relationship: "Family",
  },
  {
    id: "w2",
    guestName:    "Samuel & Abena Mensah",
    message:      "Kwabena, we have watched you grow into an incredible man. Kristine, welcome to the family with open arms. Together, may you build something that lasts — a home full of warmth, faith and joy.",
    avatar:       null,
    relationship: "Family Friends",
  },
  {
    id: "w3",
    guestName:    "The Asante Brothers",
    message:      "Brother, we always knew this day would come — and we are proud to witness it. Congratulations to you both. May your love be as strong as it is beautiful.",
    avatar:       null,
    relationship: "Close Friends",
  },
];

// [REPLACE] — Kwabena quotes (sample/placeholder only — not real statements)
export const kwabenaQuotes = [
  {
    id:           "q1",
    quote:        "If we're doing it, we're doing it properly.",
    attributedBy: "George",
    context:      "On how he approaches everything in life",
  },
  {
    id:           "q2",
    quote:        "Good things take time. Great things take patience and purpose.",
    attributedBy: "Michael",
    context:      "On building anything worthwhile",
  },
  {
    id:           "q3",
    quote:        "Show up. Every time. That is the whole secret.",
    attributedBy: "Ama",
    context:      "On commitment — to people, to work, to love",
  },
  {
    id:           "q4",
    quote:        "The best decision I ever made was choosing her.",
    attributedBy: "Kwabena himself",
    context:      "On Kristine",
  },
];

// [REPLACE] — Sample memories
export const memories = [
  {
    id:               "m1",
    contributorName:  "Nana Yaw",
    relationship:     "Best Friend",
    memory:           "I have known Kwabena for over fifteen years. In all that time, I have never once seen him do anything halfway. Whether it was his work, his friendships or his love for Kristine — he gives everything fully. That is just who he is. And that is exactly the kind of man she deserves.",
    photo:            null,
  },
  {
    id:               "m2",
    contributorName:  "Efua Darko",
    relationship:     "Colleague",
    memory:           "Working alongside Kwabena has been one of the privileges of my career. He has this quiet confidence — the kind that makes everyone around him believe things will work out. And they always do. I am so happy to see him walk into this next chapter.",
    photo:            null,
  },
  {
    id:               "m3",
    contributorName:  "Pastor Kofi Boateng",
    relationship:     "Family Friend",
    memory:           "I have watched Kwabena grow from a young man into someone of great character and integrity. Seeing him find love in Kristine has been a blessing. May God continue to guide and protect their home.",
    photo:            null,
  },
];
