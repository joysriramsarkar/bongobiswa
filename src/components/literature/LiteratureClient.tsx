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
import { toBengaliNumber } from '@/lib/bengali';
import { WikiImage } from '@/components/WikiImage';
import { getLiteratureWorksByCategory } from '@/actions/literature';

// Mock literature data for books
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

// Interface for Author display
interface AuthorDisplay {
  id: string;
  name: string;
  birth: string | number;
  death: string | number;
  works: number;
  description: string;
  avatar: string;
  famousWorks: string[];
}

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
          <WikiImage
            id={book.wikidataId}
            term={book.term || book.title}
            fallback={book.coverImage || 'https://placehold.co/200x300'}
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
          <p className="text-xs text-gray-500 mb-3 font-bengali">{toBengaliNumber(book.publishedYear)} খ্রিস্টাব্দ</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({toBengaliNumber(100)})</span>
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

function AuthorSpotlight({ author }: { author: AuthorDisplay }) {
  const classes = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start space-x-4">
         <img
          src={author.avatar || 'https://placehold.co/100x100'}
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/100x100';
          }}
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 font-bengali">{author.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {toBengaliNumber(author.birth)} - {toBengaliNumber(author.death)}
          </p>
          <p className="text-sm text-gray-700 mb-3 font-bengali-serif line-clamp-3">{author.description}</p>

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

export default function LiteratureClient({ initialWorks = [], initialAuthors = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('কবিতা');
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState<AuthorDisplay[]>(initialAuthors);
  const [works, setWorks] = useState<any[]>(initialWorks);
  const classes = useThemeClasses();

  useEffect(() => {
    async function fetchWorks() {
        const fetchedWorks = await getLiteratureWorksByCategory(selectedCategory);
        setWorks(fetchedWorks);
    }
    fetchWorks();
  }, [selectedCategory]);

  const filteredWorks = works.filter(book =>
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
              {filteredWorks.length > 0 ? (
                filteredWorks.map((book) => (
                    <BookCard
                    key={book.id}
                    book={book}
                    category={selectedCategory}
                    />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-10">
                    {works.length === 0 ? 'লোড হচ্ছে...' : 'কোনো তথ্য পাওয়া যায়নি'}
                </div>
              )}
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
            {authors.length > 0 ? (
              authors.map((author) => (
                <AuthorSpotlight key={author.id} author={author} />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-10">
                তথ্য লোড হচ্ছে...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
