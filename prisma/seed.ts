import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CSL database...');

  // Clear existing data
  await prisma.siteStats.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.course.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.language.deleteMany();

  // ── LANGUAGES ──────────────────────────────────────────
  const tamil = await prisma.language.create({
    data: {
      name: 'Tamil',
      code: 'ta',
      description: 'Classical Dravidian language spoken in South India and Sri Lanka.',
    },
  });
  const hindi = await prisma.language.create({
    data: {
      name: 'Hindi',
      code: 'hi',
      description: 'Indo-Aryan language, one of the official languages of India.',
    },
  });
  const english = await prisma.language.create({
    data: {
      name: 'English',
      code: 'en',
      description: 'Global lingua franca for business and communication.',
    },
  });
  const french = await prisma.language.create({
    data: {
      name: 'French',
      code: 'fr',
      description: 'Romance language spoken across Europe, Africa, and the Americas.',
    },
  });
  const mandarin = await prisma.language.create({
    data: {
      name: 'Mandarin',
      code: 'zh',
      description: 'Most widely spoken Chinese language, official in China and Taiwan.',
    },
  });
  const telugu = await prisma.language.create({
    data: {
      name: 'Telugu',
      code: 'te',
      description: 'Classical Dravidian language, widely spoken in Andhra Pradesh and Telangana.',
    },
  });
  const japanese = await prisma.language.create({
    data: {
      name: 'Japanese',
      code: 'ja',
      description: 'Fascinating language with unique writing systems, rich culture and anime heritage.',
    },
  });

  // ── MENTORS ────────────────────────────────────────────
  const mentor1 = await prisma.mentor.create({
    data: {
      name: 'Priya Sharma',
      bio: 'Native Tamil speaker with 5+ years teaching experience. Passionate about sharing language and culture.',
      languages: ['ta', 'hi'],
      rating: 4.8,
    },
  });
  const mentor2 = await prisma.mentor.create({
    data: {
      name: 'Raj Kumar',
      bio: 'Multilingual educator. Teaches Hindi and English to beginners and intermediate learners.',
      languages: ['hi', 'en'],
      rating: 4.6,
    },
  });
  const mentor3 = await prisma.mentor.create({
    data: {
      name: 'Marie Dupont',
      bio: 'French native from Paris. Loves helping students achieve conversational fluency.',
      languages: ['fr', 'en'],
      rating: 4.9,
    },
  });
  const mentor4 = await prisma.mentor.create({
    data: {
      name: 'Wei Chen',
      bio: 'Mandarin teacher specializing in spoken Chinese for everyday conversations.',
      languages: ['zh', 'en'],
      rating: 4.7,
    },
  });
  const mentor5 = await prisma.mentor.create({
    data: {
      name: 'Ravi Teja',
      bio: 'Telugu literature enthusiast with a passion for teaching mother tongue to younger generations.',
      languages: ['te', 'en'],
      rating: 4.7,
    },
  });
  const mentor6 = await prisma.mentor.create({
    data: {
      name: 'Yuki Tanaka',
      bio: 'Native Japanese speaker from Tokyo. Makes Japanese fun through manga, anime and daily conversation.',
      languages: ['ja', 'en'],
      rating: 4.8,
    },
  });

  // ── COURSES ────────────────────────────────────────────
  await prisma.course.createMany({
    data: [
      // Tamil
      {
        title: 'Tamil for Beginners',
        languageId: tamil.id,
        level: 'BEGINNER',
        description: 'Learn basic Tamil greetings, introductions, and everyday phrases.',
        status: 'PUBLISHED',
        mentorId: mentor1.id,
        duration: 8,
      },
      {
        title: 'Tamil Intermediate',
        languageId: tamil.id,
        level: 'INTERMEDIATE',
        description: 'Expand vocabulary and tackle more complex sentence structures.',
        status: 'PUBLISHED',
        mentorId: mentor1.id,
        duration: 12,
      },
      // Hindi
      {
        title: 'Conversational Hindi',
        languageId: hindi.id,
        level: 'INTERMEDIATE',
        description: 'Improve your Hindi speaking skills for real-life situations.',
        status: 'PUBLISHED',
        mentorId: mentor2.id,
        duration: 10,
      },
      {
        title: 'Hindi for Heritage Speakers',
        languageId: hindi.id,
        level: 'ADVANCED',
        description: 'Refine your Hindi for those with informal exposure to the language.',
        status: 'PUBLISHED',
        mentorId: mentor2.id,
        duration: 8,
      },
      // English
      {
        title: 'English for Work',
        languageId: english.id,
        level: 'INTERMEDIATE',
        description: 'Professional English for meetings, emails, and presentations.',
        status: 'PUBLISHED',
        mentorId: mentor2.id,
        duration: 6,
      },
      // French
      {
        title: 'French Basics',
        languageId: french.id,
        level: 'BEGINNER',
        description: 'Start your French journey with essential vocabulary and grammar.',
        status: 'PUBLISHED',
        mentorId: mentor3.id,
        duration: 12,
      },
      {
        title: 'French Conversation Club',
        languageId: french.id,
        level: 'ADVANCED',
        description: 'Practice fluency in a supportive group setting.',
        status: 'PUBLISHED',
        mentorId: mentor3.id,
        duration: 6,
      },
      // Mandarin
      {
        title: 'Mandarin Speaking',
        languageId: mandarin.id,
        level: 'BEGINNER',
        description: 'Focus on pronunciation and basic conversational Mandarin.',
        status: 'PUBLISHED',
        mentorId: mentor4.id,
        duration: 10,
      },
      // Telugu
      {
        title: 'Telugu for Beginners',
        languageId: telugu.id,
        level: 'BEGINNER',
        description: 'Learn Telugu script, basic vocabulary and everyday conversations.',
        status: 'PUBLISHED',
        mentorId: mentor5.id,
        duration: 8,
      },
      {
        title: 'Telugu Literature & Culture',
        languageId: telugu.id,
        level: 'INTERMEDIATE',
        description: 'Explore Telugu poetry, literature and rich cultural heritage.',
        status: 'PUBLISHED',
        mentorId: mentor5.id,
        duration: 10,
      },
      // Japanese
      {
        title: 'Japanese for Beginners',
        languageId: japanese.id,
        level: 'BEGINNER',
        description: 'Start with Hiragana, Katakana and essential daily Japanese phrases.',
        status: 'PUBLISHED',
        mentorId: mentor6.id,
        duration: 12,
      },
      {
        title: 'Japanese Conversation',
        languageId: japanese.id,
        level: 'INTERMEDIATE',
        description: 'Build confidence in spoken Japanese for travel and daily life.',
        status: 'PUBLISHED',
        mentorId: mentor6.id,
        duration: 10,
      },
    ],
  });

  // ── TESTIMONIALS ───────────────────────────────────────
  await prisma.testimonial.createMany({
    data: [
      {
        studentName: 'Arun M.',
        content: 'CSL changed my life. I went from zero Tamil to having conversations with my grandparents in just 6 months. The mentors are incredibly patient.',
        rating: 5,
        language: 'Tamil',
        isApproved: true,
      },
      {
        studentName: 'Sarah L.',
        content: 'Free French lessons with native speakers? Unbelievable. Marie is the best teacher I have ever had.',
        rating: 5,
        language: 'French',
        isApproved: true,
      },
      {
        studentName: 'David K.',
        content: 'I needed English for my job. The professional English course was exactly what I needed. Highly recommend.',
        rating: 5,
        language: 'English',
        isApproved: true,
      },
      {
        studentName: 'Lakshmi R.',
        content: 'Learning Hindi at CSL helped me connect with my roots. The community is warm and welcoming.',
        rating: 4,
        language: 'Hindi',
        isApproved: true,
      },
      {
        studentName: 'Emily T.',
        content: 'Mandarin seemed impossible until I found CSL. Wei breaks it down into manageable steps. Amazing experience.',
        rating: 5,
        language: 'Mandarin',
        isApproved: true,
      },
      {
        studentName: 'Vijay S.',
        content: 'Volunteer-run, free, and high quality. This is what community learning should look like.',
        rating: 5,
        language: 'Tamil',
        isApproved: true,
      },
      {
        studentName: 'Sneha P.',
        content: 'Telugu classes at CSL reconnected me with my heritage. Ravi sir explains everything so clearly.',
        rating: 5,
        language: 'Telugu',
        isApproved: true,
      },
      {
        studentName: 'Kenji R.',
        content: 'Yuki sensei made Japanese so approachable. I can now watch anime without subtitles!',
        rating: 5,
        language: 'Japanese',
        isApproved: true,
      },
    ],
  });

  // ── ACHIEVEMENTS ───────────────────────────────────────
  await prisma.achievement.createMany({
    data: [
      {
        title: '1,000 Students Milestone',
        description: 'CSL celebrated teaching over 1,000 students across all languages.',
        type: 'CENTER',
        year: 2024,
      },
      {
        title: 'Top Mentor Award',
        description: 'Priya Sharma recognized for exceptional dedication to Tamil learners.',
        type: 'STUDENT',
        year: 2024,
      },
      {
        title: '7 Languages Offered',
        description: 'CSL expanded to offer 7 languages including Telugu and Japanese.',
        type: 'CENTER',
        year: 2025,
      },
      {
        title: 'Best Community Initiative',
        description: 'Recognized by the Local Community Council for outstanding volunteer service.',
        type: 'CENTER',
        year: 2024,
      },
    ],
  });

  // ── SITE STATS ─────────────────────────────────────────
  await prisma.siteStats.create({
    data: {
      totalCourses: 12,
      totalMentors: 6,
      pastStudents: 1050,
      enrolledStudents: 127,
      totalCountries: 9,
    },
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });