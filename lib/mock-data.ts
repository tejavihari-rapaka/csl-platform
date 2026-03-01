// ============================================================
// CSL MOCK DATA — Drop this in /lib/mock-data.ts
// Replaces ALL database calls so app runs without Docker/Neon
// ============================================================

export const mockStats = {
  totalCourses: 12,
  totalMentors: 8,
  pastStudents: 320,
  enrolledStudents: 45,
};

export const mockLanguages = [
  { id: "1", name: "Tamil", code: "ta", description: "Learn to speak, read and write Tamil fluently.", imageUrl: "" },
  { id: "2", name: "Hindi", code: "hi", description: "Master Hindi from basics to advanced conversational level.", imageUrl: "" },
  { id: "3", name: "French", code: "fr", description: "Explore the language of art, culture and diplomacy.", imageUrl: "" },
  { id: "4", name: "Mandarin", code: "zh", description: "Unlock one of the world's most spoken languages.", imageUrl: "" },
  { id: "5", name: "English", code: "en", description: "Build confidence in spoken and written English.", imageUrl: "" },
];

export const mockCourses = [
  {
    id: "1", title: "Tamil for Beginners", level: "Beginner", duration: "8 Weeks",
    description: "Start your Tamil journey with basic conversation, script reading and everyday vocabulary.",
    thumbnailUrl: "", languageId: "1",
    language: { name: "Tamil", code: "ta" },
    mentor: { name: "Priya Sundaram" },
  },
  {
    id: "2", title: "Conversational Hindi", level: "Intermediate", duration: "10 Weeks",
    description: "Build confidence in day-to-day Hindi conversations with native-style practice.",
    thumbnailUrl: "", languageId: "2",
    language: { name: "Hindi", code: "hi" },
    mentor: { name: "Rahul Sharma" },
  },
  {
    id: "3", title: "French Essentials", level: "Beginner", duration: "12 Weeks",
    description: "Learn French from scratch — greetings, grammar, and cultural context.",
    thumbnailUrl: "", languageId: "3",
    language: { name: "French", code: "fr" },
    mentor: { name: "Anita Krishnan" },
  },
  {
    id: "4", title: "Mandarin Level 1", level: "Beginner", duration: "10 Weeks",
    description: "Introduction to Mandarin tones, Pinyin and essential daily phrases.",
    thumbnailUrl: "", languageId: "4",
    language: { name: "Mandarin", code: "zh" },
    mentor: { name: "Wei Chen" },
  },
  {
    id: "5", title: "Spoken English Confidence", level: "Intermediate", duration: "6 Weeks",
    description: "Overcome hesitation and speak English fluently in professional and social settings.",
    thumbnailUrl: "", languageId: "5",
    language: { name: "English", code: "en" },
    mentor: { name: "David Moses" },
  },
  {
    id: "6", title: "Advanced Tamil Literature", level: "Advanced", duration: "8 Weeks",
    description: "Dive deep into Tamil Sangam literature, poetry and classical texts.",
    thumbnailUrl: "", languageId: "1",
    language: { name: "Tamil", code: "ta" },
    mentor: { name: "Priya Sundaram" },
  },
];

export const mockMentors = [
  {
    id: "1", name: "Priya Sundaram", bio: "Passionate Tamil educator with 10+ years of teaching experience. Believes language is the key to cultural identity.",
    photoUrl: "", rating: 5, languages: ["Tamil"],
    yearsVolunteering: 6, studentsTaught: 80,
  },
  {
    id: "2", name: "Rahul Sharma", bio: "Hindi language enthusiast and storyteller. Makes learning Hindi fun through songs, films and conversation.",
    photoUrl: "", rating: 5, languages: ["Hindi", "English"],
    yearsVolunteering: 4, studentsTaught: 65,
  },
  {
    id: "3", name: "Anita Krishnan", bio: "Studied in Paris for 3 years. Brings authentic French culture and immersive teaching to every class.",
    photoUrl: "", rating: 4, languages: ["French"],
    yearsVolunteering: 3, studentsTaught: 45,
  },
  {
    id: "4", name: "Wei Chen", bio: "Native Mandarin speaker from Chengdu. Specialises in making tones approachable for first-time learners.",
    photoUrl: "", rating: 5, languages: ["Mandarin"],
    yearsVolunteering: 2, studentsTaught: 30,
  },
];

export const mockTestimonials = [
  {
    id: "1", studentName: "Arun Prakash", content: "I never thought I could learn French at 35. CSL's volunteer mentors made it feel effortless. Now I can hold basic conversations!",
    rating: 5, language: "French", avatarUrl: "",
  },
  {
    id: "2", studentName: "Meena Devi", content: "The Tamil course brought me closer to my roots. Priya teacher is incredibly patient and passionate. Totally free — unbelievable!",
    rating: 5, language: "Tamil", avatarUrl: "",
  },
  {
    id: "3", studentName: "Kiran Reddy", content: "Mandarin seemed impossible but Wei Chen's teaching style broke it down perfectly. The community here is so supportive.",
    rating: 5, language: "Mandarin", avatarUrl: "",
  },
  {
    id: "4", studentName: "Fatima Sheikh", content: "The Spoken English course gave me the confidence to crack my job interview. CSL changed my life — and it cost nothing.",
    rating: 5, language: "English", avatarUrl: "",
  },
  {
    id: "5", studentName: "Suresh Kumar", content: "Hindi was always my weak point. After 10 weeks at CSL I can now confidently speak with my colleagues in Mumbai.",
    rating: 4, language: "Hindi", avatarUrl: "",
  },
  {
    id: "6", studentName: "Lakshmi Nair", content: "What CSL does for this community is extraordinary. Free, high quality, taught with love. Every family should know about this.",
    rating: 5, language: "Tamil", avatarUrl: "",
  },
];

export const mockAchievements = [
  { id: "1", title: "500+ Community Members Taught", description: "Crossed 500 students milestone in our 5th year of operation.", imageUrl: "", type: "CENTER", year: 2025 },
  { id: "2", title: "Best Community Initiative Award", description: "Recognised by the Local Community Council for outstanding volunteer service.", imageUrl: "", type: "CENTER", year: 2024 },
  { id: "3", title: "Arun's DELF B1 French Certification", description: "Arun Prakash passed the official French DELF B1 exam after just 6 months at CSL.", imageUrl: "", type: "STUDENT", year: 2025 },
  { id: "4", title: "10 Languages Milestone", description: "CSL now offers structured programs in 10 different languages.", imageUrl: "", type: "CENTER", year: 2025 },
  { id: "5", title: "Meena's Tamil Poetry Award", description: "Meena Devi won first place at the State Tamil Poetry Competition.", imageUrl: "", type: "STUDENT", year: 2024 },
  { id: "6", title: "Zero Dropout Rate — 2024 Cohort", description: "Every student who enrolled in 2024 completed their course. 100% retention.", imageUrl: "", type: "CENTER", year: 2024 },
];

export const mockGallery = [
  { id: "1", url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800", caption: "Tamil class session — students practising conversation", order: 1 },
  { id: "2", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", caption: "French workshop with Mentor Anita", order: 2 },
  { id: "3", url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800", caption: "Annual language day celebration 2024", order: 3 },
  { id: "4", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800", caption: "Community volunteers planning session", order: 4 },
  { id: "5", url: "https://images.unsplash.com/photo-1543269664-647163eb1a39?w=800", caption: "Mandarin beginners group — first day!", order: 5 },
  { id: "6", url: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?w=800", caption: "Student certificate ceremony 2024", order: 6 },
];
