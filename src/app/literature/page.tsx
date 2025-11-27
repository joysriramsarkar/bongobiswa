/**
 * Literature Module - 3D Bookshelf Interface
 * Virtual library showcasing Bengali literature with interactive 3D effects
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Book, BookOpen, Users, Feather, Star, Search, Filter, ChevronRight, Heart, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber } from '@/lib/bengali/index';

// Mock literature data
const LITERATURE_CATEGORIES = {
  'কবিতা': { 
    icon: Feather, 
    color: 'bg-purple-600',
    description: 'বাংলা কবিতার সমৃদ্ধ ভান্ডার'
  },
  'উপন্যাস': { 
    icon: Book, 
    color: 'bg-blue-600',
    description: 'বাংলা উপন্যাসের বিচিত্র জগৎ'
  },
  'নাটক': { 
    icon: BookOpen, 
    color: 'bg-green-600',
    description: 'বাংলা নাটকের ঐতিহ্য'
  },
  'লোকসাহিত্য': { 
    icon: Users, 
    color: 'bg-orange-600',
    description: 'লোকসাহিত্যের অমূল্য সম্পদ'
  }
};

const LITERATURE_WORKS = {
  'কবিতা': [
    {
      id: 1,
      title: 'গীতাঞ্জলি',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      year: 1910,
      description: 'ভগবানের প্রতি ভক্তিমূলক কবিতার সংকলন। নোবেল পুরস্কারপ্রাপ্ত এই কাব্যগ্রন্থ বিশ্ব সাহিত্যে স্থান করে নিয়েছে।',
      rating: 5,
      reviews: 1250,
      quotes: ['তোমার খোলা হাত ছুঁয়ে দেখি এই বিশ্ব', 'আমার এ পথ চাওয়া তোমারই চাওয়া'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 2,
      title: 'বিদ্রোহী',
      author: 'কাজী নজরুল ইসলাম',
      year: 1922,
      description: 'বিদ্রোহী কবি হিসেবে নজরুলের আত্মপ্রকাশ। সামাজিক অন্যায়ের বিরুদ্ধে জেগে ওঠার ডাক।',
      rating: 5,
      reviews: 980,
      quotes: ['বিদ্রোহী, আমি বিদ্রোহী বলেছি', 'চল্ চল্ চল্, রে চল্ চল্ চল্'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 3,
      title: 'বনলতা সেন',
      author: 'জীবনানন্দ দাশ',
      year: 1942,
      description: 'আধুনিক বাংলা কবিতার এক অনবদ্য নিদর্শন। রহস্যময় নারীর কাব্যিক উপস্থাপনা।',
      rating: 5,
      reviews: 756,
      quotes: ['বনলতা সেন', 'অশ্বারোহী স্মৃতি'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 8,
      title: 'সঞ্চয়িতা',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      year: 1931,
      description: 'রবীন্দ্রনাথের কবিতা সমগ্র। বাংলা কবিতার এক বিশাল সংগ্রহ।',
      rating: 5,
      reviews: 1500,
      quotes: ['চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 9,
      title: 'অগ্নিবীণা',
      author: 'কাজী নজরুল ইসলাম',
      year: 1922,
      description: 'বিদ্রোহ, প্রেম ও মানবতার কবিতা। নজরুলের প্রথম কাব্যগ্রন্থ।',
      rating: 5,
      reviews: 850,
      quotes: ['বল বীর - বল উন্নত মম শির!'],
      cover: '/api/placeholder/200/300'
    }
  ],
  'উপন্যাস': [
    {
      id: 4,
      title: 'পথের দাবী',
      author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
      year: 1926,
      description: 'বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ উপন্যাস। অপু ও দুর্গার জীবনের কাহিনি।',
      rating: 5,
      reviews: 2100,
      quotes: ['জীবনের যা হয়, ভালোর জন্যই হয়'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 5,
      title: 'সংসার',
      author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
      year: 1924,
      description: 'নববধূ অপর্ণার জীবনের কাহিনি। নারী মনের জটিলতার অসাধারণ উপস্থাপনা।',
      rating: 5,
      reviews: 1850,
      quotes: ['সংসারের সুখ আমি চাই না'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 10,
      title: 'পদ্মা নদীর মাঝি',
      author: 'মানিক বন্দ্যোপাধ্যায়',
      year: 1936,
      description: 'জেলে জীবনের কঠিন বাস্তবতা ও সংগ্রামের কাহিনি।',
      rating: 5,
      reviews: 1200,
      quotes: ['কুবের মাঝি'],
      cover: '/api/placeholder/200/300'
    }
  ],
  'নাটক': [
    {
      id: 6,
      title: 'রক্তকরবী',
      author: 'রবীন্দ্রনাথ ঠাকুর',
      year: 1924,
      description: 'প্রেম, বিদ্রোহ ও আত্মত্যাগের কাহিনি। নন্দিনী ও রাজা রঞ্জনের টানাপোড়েন।',
      rating: 5,
      reviews: 650,
      quotes: ['আমি রাজপথে চলতে চাই না'],
      cover: '/api/placeholder/200/300'
    },
    {
      id: 11,
      title: 'নবান্ন',
      author: 'বিজন ভট্টাচার্য',
      year: 1944,
      description: 'পঞ্চাশের মন্বন্তরের পটভূমিতে রচিত একটি যুগান্তকারী নাটক।',
      rating: 5,
      reviews: 350,
      quotes: ['দুর্ভিক্ষের নাটক'],
      cover: '/api/placeholder/200/300'
    }
  ],
  'লোকসাহিত্য': [
    {
      id: 7,
      title: 'ময়মনসিংহ গীতিকা',
      author: 'চন্দ্রকুমার দে',
      year: 1923,
      description: 'বাংলার লোকসাহিত্যের অমূল্য সংকলন। মহুয়া, মলুয়া, চন্দ্রাবতীর গাথা।',
      rating: 5,
      reviews: 420,
      quotes: ['মহুয়া সুন্দরী'],
      cover: '/api/placeholder/200/300'
    }
  ]
};

const FAMOUS_AUTHORS = [
  {
    id: 1,
    name: 'রবীন্দ্রনাথ ঠাকুর',
    birth: 1861,
    death: 1941,
    works: 2230,
    description: 'বাংলা সাহিত্যের অপরিহার্য ব্যক্তিত্ব। গীতাঞ্জলির জন্য নোবেল পুরস্কারপ্রাপ্ত।',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Rabindranath_Tagore.jpg',
    famousWorks: ['গীতাঞ্জলি', 'গোরা', 'চোখের বালি', 'ঘরে বাইরে']
  },
  {
    id: 2,
    name: 'কাজী নজরুল ইসলাম',
    birth: 1899,
    death: 1976,
    works: 3200,
    description: 'বিদ্রোহী কবি হিসেবে খ্যাত। বাংলা সাহিত্যে অসামান্য অবদান।',
    avatar: '/api/placeholder/100/100',
    famousWorks: ['বিদ্রোহী', 'ধূমকেতু', 'চক্রবাক', 'সিন্দাবাদ']
  },
  {
    id: 3,
    name: 'শরৎচন্দ্র চট্টোপাধ্যায়',
    birth: 1876,
    death: 1938,
    works: 36,
    description: 'বাংলা উপন্যাসের অগ্রদূত। সামাজিক উপন্যাসের জনক।',
    avatar: '/api/placeholder/100/100',
    famousWorks: ['পথের দাবী', 'সংসার', 'শ্রীকান্ত', 'গৃহদাহ']
  },
  {
    id: 4,
    name: 'জীবনানন্দ দাশ',
    birth: 1899,
    death: 1954,
    works: 250, // আনুমানিক সংখ্যা যোগ করা হয়েছে
    description: 'আধুনিক বাংলা কবিতার প্রধান পুরোধা। অদ্ভুতুড়ে কবিতার স্রষ্টা।',
    avatar: '/api/placeholder/100/100',
    famousWorks: ['বনলতা সেন', 'মহাপৃথিবী', 'সাতটি তারার তিমির', 'শেষ প্রশ্ন']
  },
  {
    id: 5,
    name: 'সত্যজিৎ রায়',
    birth: 1921,
    death: 1992,
    works: 50,
    description: 'চলচ্চিত্র নির্মাতা, লেখক, এবং চিত্রকর। ফেলুদা ও প্রফেসর শঙ্কু চরিত্রের স্রষ্টা।',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Satyajit_Ray_in_New_York_(cropped).jpg/250px-Satyajit_Ray_in_New_York_(cropped).jpg',
    famousWorks: ['পথের পাঁচালী', 'ফেলুদা', 'প্রোফেসর শঙ্কু', 'সোনার কেল্লা']
  }
];

function BookCard({ book, category }) {
  const classes = useThemeClasses();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer"
    >
      <Card className="overflow-hidden h-full">
        <div className="relative">
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-64 object-cover"
          />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-bengali ${LITERATURE_CATEGORIES[category].color}`}>
            {category}
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 font-bengali">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2 font-bengali">{book.author}</p>
          <p className="text-xs text-gray-500 mb-3 font-bengali">{toBengaliNumber(book.year)} খ্রিস্টাব্দ</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3 h-3 ${i < book.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({toBengaliNumber(book.reviews)})</span>
            </div>
            
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" className="p-1">
                <Heart className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="p-1">
                <Bookmark className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="p-1">
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AuthorSpotlight({ author }) {
  const classes = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <img 
          src={author.avatar} 
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 font-bengali">{author.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {toBengaliNumber(author.birth)} - {toBengaliNumber(author.death)}
          </p>
          <p className="text-sm text-gray-700 mb-3 font-bengali-serif">{author.description}</p>
          
          <div className="mb-3">
            <span className="text-sm font-semibold text-gray-900">উল্লেখযোগ্য কর্ম:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {author.famousWorks.map((work, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {work}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-semibold">সর্বমোট রচনা:</span> {toBengaliNumber(author.works)}টি
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiteraturePage() {
  const [selectedCategory, setSelectedCategory] = useState('কবিতা');
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useThemeClasses();

  const filteredWorks = LITERATURE_WORKS[selectedCategory]?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className={`min-h-screen ${classes.background} ${classes.text}`}>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-bengali">
            বাংলা <span className="text-gray-800">সাহিত্য</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bengali-serif">
            রবীন্দ্রনাথ, নজরুল, জীবনানন্দ - বাংলা সাহিত্যের সমৃদ্ধ ভান্ডার আবিষ্কার করুন
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-4">
            {Object.keys(LITERATURE_CATEGORIES).map((category) => {
              const CategoryIcon = LITERATURE_CATEGORIES[category].icon;
              return (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex items-center space-x-2 font-bengali"
                >
                  <CategoryIcon className="w-4 h-4" />
                  <span>{category}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="বই বা লেখক খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-bengali"
              />
            </div>
          </div>

          {/* Category Description */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${LITERATURE_CATEGORIES[selectedCategory].color}`} />
              <span className="text-lg font-semibold font-bengali">{selectedCategory}</span>
            </div>
            <p className="text-gray-600 font-bengali-serif">
              {LITERATURE_CATEGORIES[selectedCategory].description}
            </p>
          </motion.div>

          {/* Books Grid */}
          <TabsContent value={selectedCategory} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorks.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  category={selectedCategory}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Author Spotlight Section */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 font-bengali">
              খ্যাতনামা <span className="text-gray-800">লেখক</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bengali-serif">
              বাংলা সাহিত্যের মহান ব্যক্তিত্বদের সাথে পরিচিত হন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {FAMOUS_AUTHORS.map((author) => (
              <AuthorSpotlight key={author.id} author={author} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}