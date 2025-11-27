
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const HISTORICAL_EVENTS = [
  {
    year: 750,
    title: 'পাল সাম্রাজ্যের প্রতিষ্ঠা',
    description: 'গোপাল প্রথম কর্তৃক পাল সাম্রাজ্যের প্রতিষ্ঠা। বাংলার ইতিহাসে এক নতুন যুগের সূচনা।',
    category: 'রাজনীতি',
    location: 'গৌড়',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/পাল_সাম্রাজ্য'
  },
  {
    year: 1204,
    title: 'বাংলায় মুসলিম শাসনের শুরু',
    description: 'মুহাম্মদ বখতিয়ার খিলজির বাংলা বিজয়। নদিয়ার সেন রাজবংশের পতন।',
    category: 'রাজনীতি',
    location: 'নদিয়া',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/ইখতিয়ার_উদ্দিন_মুহম্মদ_বিন_বখতিয়ার_খলজী'
  },
  {
    year: 1576,
    title: 'রাজমহলের যুদ্ধ',
    description: 'মুঘল সম্রাট আকবর ও বাংলার সুলতান দাউদ খান কর্তৃক রাজমহলের যুদ্ধ সংঘটিত হয়।',
    category: 'যুদ্ধ',
    location: 'রাজমহল',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/রাজমহলের_যুদ্ধ'
  },
  {
    year: 1757,
    title: 'পলাশীর যুদ্ধ',
    description: 'নবাব সিরাজউদ্দৌলার পরাজয় এবং বাংলায় ব্রিটিশ শাসনের সূচনা।',
    category: 'যুদ্ধ',
    location: 'পলাশী',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/পলাশীর_যুদ্ধ'
  },
  {
    year: 1905,
    title: 'বঙ্গভঙ্গ',
    description: 'লর্ড কার্জন কর্তৃক বঙ্গভঙ্গ আইন। বাংলার স্বাধীনতা আন্দোলনের সূচনা।',
    category: 'রাজনীতি',
    location: 'কলকাতা',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/বঙ্গভঙ্গ_(১৯০৫)'
  },
  {
    year: 1952,
    title: 'ভাষা আন্দোলন',
    description: 'বাংলা ভাষার জন্য সংগ্রাম। সালাম, বরকত, রফিক, জব্বারের শহীদ হওয়া।',
    category: 'সামাজিক',
    location: 'ঢাকা',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/ভাষা_আন্দোলন'
  },
  {
    year: 1971,
    title: 'স্বাধীনতা যুদ্ধ',
    description: 'নয় মাসব্যাপী মুক্তিযুদ্ধ এবং বাংলাদেশের স্বাধীনতা অর্জন।',
    category: 'যুদ্ধ',
    location: 'সারা বাংলাদেশ',
    imageUrl: 'https://placehold.co/400x300',
    sourceUrl: 'https://bn.wikipedia.org/wiki/বাংলাদেশের_স্বাধীনতা_যুদ্ধ'
  }
];

const LITERATURE_WORKS = [
    {
      title: 'গীতাঞ্জলি',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      type: 'কবিতা',
      publishedYear: 1910,
      description: 'ভগবানের প্রতি ভক্তিমূলক কবিতার সংকলন। নোবেল পুরস্কারপ্রাপ্ত এই কাব্যগ্রন্থ বিশ্ব সাহিত্যে স্থান করে নিয়েছে।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'বিদ্রোহী',
      author: 'কাজী নজরুল ইসলাম',
      type: 'কবিতা',
      publishedYear: 1922,
      description: 'বিদ্রোহী কবি হিসেবে নজরুলের আত্মপ্রকাশ। সামাজিক অন্যায়ের বিরুদ্ধে জেগে ওঠার ডাক।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'বনলতা সেন',
      author: 'জীবনানন্দ দাশ',
      type: 'কবিতা',
      publishedYear: 1942,
      description: 'আধুনিক বাংলা কবিতার এক অনবদ্য নিদর্শন। রহস্যময় নারীর কাব্যিক উপস্থাপনা।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'সঞ্চয়িতা',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      type: 'কবিতা',
      publishedYear: 1931,
      description: 'রবীন্দ্রনাথের কবিতা সমগ্র। বাংলা কবিতার এক বিশাল সংগ্রহ।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'অগ্নিবীণা',
      author: 'কাজী নজরুল ইসলাম',
      type: 'কবিতা',
      publishedYear: 1922,
      description: 'বিদ্রোহ, প্রেম ও মানবতার কবিতা। নজরুলের প্রথম কাব্যগ্রন্থ।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'পথের দাবী',
      author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
      type: 'উপন্যাস',
      publishedYear: 1926,
      description: 'বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ উপন্যাস। অপু ও দুর্গার জীবনের কাহিনি।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'সংসার',
      author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
      type: 'উপন্যাস',
      publishedYear: 1924,
      description: 'নববধূ অপর্ণার জীবনের কাহিনি। নারী মনের জটিলতার অসাধারণ উপস্থাপনা।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'পদ্মা নদীর মাঝি',
      author: 'মানিক বন্দ্যোপাধ্যায়',
      type: 'উপন্যাস',
      publishedYear: 1936,
      description: 'জেলে জীবনের কঠিন বাস্তবতা ও সংগ্রামের কাহিনি।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'রক্তকরবী',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      type: 'নাটক',
      publishedYear: 1924,
      description: 'প্রেম, বিদ্রোহ ও আত্মত্যাগের কাহিনি। নন্দিনী ও রাজা রঞ্জনের টানাপোড়েন।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'নবান্ন',
      author: 'বিজন ভট্টাচার্য',
      type: 'নাটক',
      publishedYear: 1944,
      description: 'পঞ্চাশের মন্বন্তরের পটভূমিতে রচিত একটি যুগান্তকারী নাটক।',
      coverImage: 'https://placehold.co/200x300',
    },
    {
      title: 'ময়মনসিংহ গীতিকা',
      author: 'চন্দ্রকুমার দে',
      type: 'লোকসাহিত্য',
      publishedYear: 1923,
      description: 'বাংলার লোকসাহিত্যের অমূল্য সংকলন। মহুয়া, মলুয়া, চন্দ্রাবতীর গাথা।',
      coverImage: 'https://placehold.co/200x300',
    }
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data (optional, be careful in production)
  // await prisma.historyEvent.deleteMany();
  // await prisma.literatureWork.deleteMany();

  for (const event of HISTORICAL_EVENTS) {
    await prisma.historyEvent.create({
      data: event,
    });
  }

  for (const work of LITERATURE_WORKS) {
    await prisma.literatureWork.create({
      data: work,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
