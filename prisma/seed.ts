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
  const german = await prisma.language.create({
    data: {
      name: 'German',
      code: 'de',
      description: 'Germanic language spoken in Germany, Austria, and Switzerland.',
    },
  });
  const hindi = await prisma.language.create({
    data: {
      name: 'Hindi',
      code: 'hi',
      description: 'Indo-Aryan language, one of the official languages of India.',
    },
  });
  const japanese = await prisma.language.create({
    data: {
      name: 'Japanese',
      code: 'ja',
      description: 'Fascinating language with unique writing systems, rich culture and anime heritage.',
    },
  });
  const kannada = await prisma.language.create({
    data: {
      name: 'Kannada',
      code: 'kn',
      description: 'Classical Dravidian language spoken in Karnataka, India.',
    },
  });
  const sanskrit = await prisma.language.create({
    data: {
      name: 'Sanskrit',
      code: 'sa',
      description: 'Ancient Indo-Aryan language, classical language of Hinduism and Indian philosophy.',
    },
  });
  const telugu = await prisma.language.create({
    data: {
      name: 'Telugu',
      code: 'te',
      description: 'Classical Dravidian language, widely spoken in Andhra Pradesh and Telangana.',
    },
  });

  // ── MENTORS ────────────────────────────────────────────
  const mentor1 = await prisma.mentor.create({
    data: {
      name: 'Dr. C. Deepika Das',
      bio: 'Experienced English educator with a passion for helping learners achieve fluency and confidence.',
      languages: ['en'],
      rating: 4.8,
    },
  });
  const mentor2 = await prisma.mentor.create({
    data: {
      name: 'Dr. V. Neha',
      bio: 'French native speaker dedicated to making French accessible and enjoyable for all learners.',
      languages: ['fr'],
      rating: 4.9,
    },
  });
  const mentor3 = await prisma.mentor.create({
    data: {
      name: 'Swati Agarwal',
      bio: 'German language enthusiast with expertise in teaching German grammar and conversational skills.',
      languages: ['de'],
      rating: 4.7,
    },
  });
  const mentor4 = await prisma.mentor.create({
    data: {
      name: 'Mukta Sethi',
      bio: 'Patient and engaging German mentor helping students build strong language foundations.',
      languages: ['de'],
      rating: 4.7,
    },
  });
  const mentor5 = await prisma.mentor.create({
    data: {
      name: 'Charu Narayan',
      bio: 'Hindi educator specializing in conversational Hindi and cultural context.',
      languages: ['hi'],
      rating: 4.8,
    },
  });
  const mentor6 = await prisma.mentor.create({
    data: {
      name: 'Shikha Mathur',
      bio: 'Dynamic Hindi mentor making language learning interactive and fun.',
      languages: ['hi'],
      rating: 4.8,
    },
  });
  const mentor7 = await prisma.mentor.create({
    data: {
      name: 'Tarunima Kishore',
      bio: 'Japanese specialist with deep knowledge of Japanese culture and writing systems.',
      languages: ['ja'],
      rating: 4.8,
    },
  });
  const mentor8 = await prisma.mentor.create({
    data: {
      name: 'Anurag Sinha',
      bio: 'Passionate Japanese mentor bringing anime and manga culture into language learning.',
      languages: ['ja'],
      rating: 4.7,
    },
  });
  const mentor9 = await prisma.mentor.create({
    data: {
      name: 'Bhargavi',
      bio: 'Kannada language expert dedicated to preserving and teaching classical Kannada.',
      languages: ['kn'],
      rating: 4.8,
    },
  });
  const mentor10 = await prisma.mentor.create({
    data: {
      name: 'Dr. Renu Pant',
      bio: 'Sanskrit scholar and teacher, passionate about ancient wisdom and linguistic precision.',
      languages: ['sa'],
      rating: 5.0,
    },
  });
  const mentor11 = await prisma.mentor.create({
    data: {
      name: 'Surabhi Singhal',
      bio: 'Sanskrit enthusiast dedicated to making this beautiful language accessible to modern learners.',
      languages: ['sa'],
      rating: 4.9,
    },
  });
  const mentor12 = await prisma.mentor.create({
    data: {
      name: 'Deepa Agarwal',
      bio: 'Sanskrit educator with expertise in classical texts and contemporary applications.',
      languages: ['sa'],
      rating: 4.8,
    },
  });
  const mentor13 = await prisma.mentor.create({
    data: {
      name: 'Dr. Y V Subrahmanyam',
      bio: 'Telugu literary expert and passionate educator sharing the richness of Telugu language and culture.',
      languages: ['te'],
      rating: 4.9,
    },
  });
  const mentor14 = await prisma.mentor.create({
    data: {
      name: 'Madhusmita',
      bio: 'Telugu mentor specializing in conversational Telugu and contemporary usage.',
      languages: ['te'],
      rating: 4.8,
    },
  });

  // ── COURSES ────────────────────────────────────────────
  await prisma.course.createMany({
    data: [
      // English
      {
        title: 'English for Beginners',
        languageId: english.id,
        level: 'BEGINNER',
        description: 'Learn basic English greetings, introductions, and everyday phrases.',
        status: 'PUBLISHED',
        mentorId: mentor1.id,
        duration: 8,
      },
      {
        title: 'English Conversation',
        languageId: english.id,
        level: 'INTERMEDIATE',
        description: 'Improve your English speaking skills for real-life situations.',
        status: 'PUBLISHED',
        mentorId: mentor1.id,
        duration: 10,
      },
      // French
      {
        title: 'French Basics',
        languageId: french.id,
        level: 'BEGINNER',
        description: 'Start your French journey with essential vocabulary and grammar.',
        status: 'PUBLISHED',
        mentorId: mentor2.id,
        duration: 12,
      },
      {
        title: 'French Conversation Club',
        languageId: french.id,
        level: 'ADVANCED',
        description: 'Practice fluency in a supportive group setting.',
        status: 'PUBLISHED',
        mentorId: mentor2.id,
        duration: 6,
      },
      // German
      {
        title: 'German for Beginners',
        languageId: german.id,
        level: 'BEGINNER',
        description: 'Learn basic German greetings and everyday conversational phrases.',
        status: 'PUBLISHED',
        mentorId: mentor3.id,
        duration: 10,
      },
      {
        title: 'German Intermediate',
        languageId: german.id,
        level: 'INTERMEDIATE',
        description: 'Expand your German vocabulary and grammar knowledge.',
        status: 'PUBLISHED',
        mentorId: mentor4.id,
        duration: 12,
      },
      // Hindi
      {
        title: 'Conversational Hindi',
        languageId: hindi.id,
        level: 'INTERMEDIATE',
        description: 'Improve your Hindi speaking skills for real-life situations.',
        status: 'PUBLISHED',
        mentorId: mentor5.id,
        duration: 10,
      },
      {
        title: 'Hindi for Heritage Speakers',
        languageId: hindi.id,
        level: 'ADVANCED',
        description: 'Refine your Hindi for those with informal exposure to the language.',
        status: 'PUBLISHED',
        mentorId: mentor6.id,
        duration: 8,
      },
      // Japanese
      {
        title: 'Japanese for Beginners',
        languageId: japanese.id,
        level: 'BEGINNER',
        description: 'Start with Hiragana, Katakana and essential daily Japanese phrases.',
        status: 'PUBLISHED',
        mentorId: mentor7.id,
        duration: 12,
      },
      {
        title: 'Japanese Conversation',
        languageId: japanese.id,
        level: 'INTERMEDIATE',
        description: 'Build confidence in spoken Japanese for travel and daily life.',
        status: 'PUBLISHED',
        mentorId: mentor8.id,
        duration: 10,
      },
      // Kannada
      {
        title: 'Kannada for Beginners',
        languageId: kannada.id,
        level: 'BEGINNER',
        description: 'Learn Kannada script, basic vocabulary and everyday conversations.',
        status: 'PUBLISHED',
        mentorId: mentor9.id,
        duration: 8,
      },
      {
        title: 'Kannada Literature & Culture',
        languageId: kannada.id,
        level: 'INTERMEDIATE',
        description: 'Explore Kannada poetry, literature and rich cultural heritage.',
        status: 'PUBLISHED',
        mentorId: mentor9.id,
        duration: 10,
      },
      // Sanskrit
      {
        title: 'Sanskrit Fundamentals',
        languageId: sanskrit.id,
        level: 'BEGINNER',
        description: 'Master Sanskrit script, basic grammar and foundational concepts.',
        status: 'PUBLISHED',
        mentorId: mentor10.id,
        duration: 12,
      },
      {
        title: 'Sanskrit Classical Texts',
        languageId: sanskrit.id,
        level: 'ADVANCED',
        description: 'Explore ancient Sanskrit wisdom through classical philosophical texts.',
        status: 'PUBLISHED',
        mentorId: mentor11.id,
        duration: 14,
      },
      {
        title: 'Sanskrit for Heritage Speakers',
        languageId: sanskrit.id,
        level: 'INTERMEDIATE',
        description: 'Deepen your Sanskrit knowledge through cultural and philosophical contexts.',
        status: 'PUBLISHED',
        mentorId: mentor12.id,
        duration: 10,
      },
      // Telugu
      {
        title: 'Telugu for Beginners',
        languageId: telugu.id,
        level: 'BEGINNER',
        description: 'Learn Telugu script, basic vocabulary and everyday conversations.',
        status: 'PUBLISHED',
        mentorId: mentor13.id,
        duration: 8,
      },
      {
        title: 'Telugu Literature & Culture',
        languageId: telugu.id,
        level: 'INTERMEDIATE',
        description: 'Explore Telugu poetry, literature and rich cultural heritage.',
        status: 'PUBLISHED',
        mentorId: mentor14.id,
        duration: 10,
      },
    ],
  });

  // ── TESTIMONIALS ───────────────────────────────────────
  await prisma.testimonial.createMany({
    data: [
      {
        studentName: 'Dr. L. Padmavathy',
        content: "Learning Sanskrit through CSL has been a deeply enriching journey. Our mentor, Dr. Renu Pant, teaches with exceptional clarity and dedication — her classes are interactive, encouraging, and meticulously structured. Despite her own commitments, she goes above and beyond, correcting every homework assignment and taking a personal interest in each student's progress. This course has opened a window into our culture and literature that I had long wished to explore. I consider myself fortunate to be learning under her guidance, and I am grateful to CSL for making this possible.",
        rating: 5,
        language: 'Sanskrit',
        isApproved: true,
      },
      {
        studentName: 'Dr. Rubina Saxena',
        content: "The CSL Sanskrit language course has been an enriching and intellectually engaging experience for me. Under the guidance of Dr. Renu Pant, the learning process became both clear and meaningful, as she explained concepts with depth and patience. I particularly enjoyed the interactive nature of the classes, including recitation and discussions, which made learning dynamic. The course helped me build a stronger foundation in Sanskrit and deepened my appreciation for its linguistic precision and philosophical richness. Overall, it has been a rewarding experience that has enhanced both my understanding and enjoyment of the language. Please find attached my Video.",
        rating: 5,
        language: 'Sanskrit',
        isApproved: true,
      },
      {
        studentName: 'Agam Gupta',
        content: "I'Ve really enjoyed these online English classes! They made learning so much easier by breaking down tough grammar and translation exercises into things I couls actually use every day. It was super convenient to join from home, and I feel way more confifent speaking and writing now. I'm really glad I took the leap to join!",
        rating: 5,
        language: 'English',
        isApproved: true,
      }
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
        title: '8 Languages Offered',
        description: 'CSL expanded to offer 8 languages including Sanskrit, Kannada, German and more.',
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
      totalCourses: 17,
      totalMentors: 14,
      pastStudents: 1050,
      enrolledStudents: 127,
      totalCountries: 9,
      satsangBranchesConnected: 200,
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