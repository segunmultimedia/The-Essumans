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
  heroImage:   "/header.jpg",
  heroImageAlt:"Kwabena and Kristine — their wedding day",
};

export const coupleIntroduction = {
  heading:    "The Beginning of Forever",
  subheading: "Kwabena & Kristine",
  // [REPLACE] — Replace with real introduction
  body: "Two people. One beautiful beginning. Their story is one of love, patience, and perfect timing. The kind of love that quietly changes everything. Together, they begin a new chapter as the Essuman family.",
  // [REPLACE] — Real couple portrait
  image:    "/essumans.jpg",
  imageAlt: "Kwabena and Kristine together",
};

// [REPLACE] — Story milestones
export const storyMilestones = [
  {
    id:          "how-we-met",
    heading:     "How We Met",
    year:        "",           // [REPLACE]
    description: "Every great love story begins with a moment, a conversation, a glance, a shared laugh that stays with you longer than expected. This was theirs.",
    image:       "/gallery/c1.jpg",
    imageAlt:    "The beginning of their story",
  },
  {
    id:          "the-journey",
    heading:     "The Journey",
    year:        "",    // [REPLACE]
    description: "Through seasons of growth and change, their bond deepened. They built something worth holding on to, not just love, but understanding, trust, and a future worth believing in.",
    image:       "/the-two.jpg",
    imageAlt:    "Their journey together",
  },
  {
    id:          "the-proposal",
    heading:     "The Proposal",
    year:        "2025",           // [REPLACE]
    description: "He asked. She said yes. And in that one moment, everything that had been quietly building finally had a name: forever.",
    image:       "/love.png",
    imageAlt:    "The proposal",
  },
  {
    id:          "the-wedding",
    heading:     "The Wedding",
    year:        "22 August 2026",
    description: "Surrounded by the people who love them most, Kwabena and Kristine made their promises not just to each other but to a lifetime of shared moments, laughter, and love.",
    image:       "/w2.jpg",
    imageAlt:    "Their wedding ceremony",
  },
  {
    id:          "the-essumans",
    heading:     "The Essumans",
    year:        "Forever",
    description: "And so, a family begins. Kwabena and Kristine Essuman bound not just by vows, but by a love that will grow, endure, and be remembered.",
    image:       null,
    imageAlt:    "",
  },
];

// [REPLACE] — Gallery photographs
export type GalleryCategory = "All" | "Couple" | "Engagement" | "Wedding" | "Friends & Family" | "Reception";

export interface GalleryImage {
  id:       string;
  src:      string;
  alt:      string;
  category: Exclude<GalleryCategory, "All">;
  width:    number;
  height:   number;
}

export const galleryCategories: GalleryCategory[] = [
  "All", "Couple", "Engagement", "Wedding", "Friends & Family", "Reception",
];

// [REPLACE] — All 12 images are distinct, no repeats
export const galleryImages: GalleryImage[] = [
  // Real Couple Images
  { id: "ex",   src: "/gallery/ex.jpg",  alt: "Kwabena and Kristine",                       category: "Couple", width: 800,  height: 1200 },
  { id: "c2",   src: "/gallery/c2.jpg",  alt: "Kwabena and Kristine together",               category: "Couple", width: 752,  height: 1280 },
  { id: "c3",   src: "/gallery/c3.jpg",  alt: "Wedding portrait of Kwabena and Kristine",   category: "Couple", width: 938,  height: 1280 },
  { id: "c4",   src: "/gallery/c4.jpg",  alt: "Kwabena and Kristine celebration",            category: "Couple", width: 942,  height: 1280 },
  { id: "c_eg3", src: "/gallery/eg3.jpg", alt: "Kwabena and Kristine engagement",            category: "Couple", width: 800,  height: 1200 },
  // Real Friends & Family Images
  { id: "ff1", src: "/gallery/ff1.jpg", alt: "Friends and family moment 1", category: "Friends & Family", width: 1200, height: 800 },
  { id: "ff2", src: "/gallery/ff2.jpg", alt: "Friends and family moment 2", category: "Friends & Family", width: 1200, height: 800 },
  { id: "ff3", src: "/gallery/ff3.jpg", alt: "Friends and family moment 3", category: "Friends & Family", width: 1200, height: 800 },
  { id: "f1",  src: "/gallery/f1.jpg", alt: "Friends and family celebrating", category: "Friends & Family", width: 853, height: 1280 },
  { id: "f2",  src: "/gallery/f2.jpg", alt: "Friends and family celebration", category: "Friends & Family", width: 853, height: 1280 },
  { id: "f3",  src: "/gallery/f3.jpg", alt: "Friends and family gathering",   category: "Friends & Family", width: 853, height: 1280 },
  { id: "f4",  src: "/gallery/f4.jpg", alt: "Wedding guests smiling",         category: "Friends & Family", width: 853, height: 1280 },
  { id: "f5",  src: "/gallery/f5.jpg", alt: "Joyous moments with family",     category: "Friends & Family", width: 853, height: 1280 },
  { id: "f6",  src: "/gallery/f6.jpg", alt: "Guests having a wonderful time", category: "Friends & Family", width: 853, height: 1280 },
  
  // Real Engagement Images
  { id: "eg1", src: "/gallery/eg1.jpg", alt: "Engagement photo 1", category: "Engagement", width: 800, height: 1200 },
  { id: "eg2", src: "/gallery/eg2.jpg", alt: "Engagement photo 2", category: "Engagement", width: 800, height: 1200 },
  { id: "eg3", src: "/gallery/eg3.jpg", alt: "Engagement photo 3", category: "Engagement", width: 800, height: 1200 },
  { id: "eg4", src: "/gallery/eg4.jpg", alt: "Engagement photo 4", category: "Engagement", width: 1200, height: 800 },
  { id: "eg5", src: "/gallery/eg5.jpg", alt: "Engagement photo 5", category: "Engagement", width: 800, height: 1200 },
  { id: "eg6", src: "/gallery/eg6.jpg", alt: "Engagement photo 6", category: "Engagement", width: 800, height: 1200 },
  
  // Real Wedding Images
  { id: "w1", src: "/gallery/w1.jpg", alt: "Wedding photo 1", category: "Wedding", width: 800, height: 1200 },
  { id: "w2", src: "/gallery/w2.jpg", alt: "Wedding photo 2", category: "Wedding", width: 1200, height: 800 },
  { id: "w3", src: "/gallery/w3.jpg", alt: "Wedding photo 3", category: "Wedding", width: 1200, height: 800 },

  // Real Reception Images
  { id: "r1", src: "/gallery/r1.jpg", alt: "Reception photo 1", category: "Reception", width: 800, height: 1200 },
  { id: "r2", src: "/gallery/r2.jpg", alt: "Reception photo 2", category: "Reception", width: 1200, height: 800 },
  { id: "r3", src: "/gallery/r3.jpg", alt: "Reception photo 3", category: "Reception", width: 800, height: 1200 },
  { id: "r4", src: "/gallery/r4.jpg", alt: "Reception photo 4", category: "Reception", width: 1200, height: 800 },
  { id: "r5", src: "/gallery/r5.jpg", alt: "Reception photo 5", category: "Reception", width: 1200, height: 800 },
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

// Quotes have been migrated to the database.

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
