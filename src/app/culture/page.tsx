/**
 * Culture Module - Bengali Cultural Heritage
 * Showcasing festivals, folk arts, cuisine, and traditions
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Music, Palette, Utensils, Theater, MapPin, 
  Calendar, Camera, Heart, Share2, Play,
  Users, Sparkles, Globe, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber } from '@/lib/bengali';

// Mock culture data
const CULTURE_CATEGORIES = {
  'উৎসব': { 
    icon: Calendar, 
    color: 'bg-pink-500',
    description: 'বাংলার রঙিন উৎসব ও অনুষ্ঠান'
  },
  'লোকশিল্প': { 
    icon: Palette, 
    color: 'bg-orange-500',
    description: 'ঐতিহ্যবাহী বাংলার লোকশিল্প ও কারুকাজ'
  },
  'খাবার': { 
    icon: Utensils, 
    color: 'bg-green-500',
    description: 'বাঙালির রান্না ও খাদ্যসংস্কৃতি'
  },
  'পোশাক': { 
    icon: Users, 
    color: 'bg-purple-500',
    description: 'বাংলার ঐতিহ্যবাহী পোশাক ও তাঁতশিল্প'
  }
};

const FESTIVALS = [
  {
    id: 1,
    name: 'পহেলা বৈশাখ',
    englishName: 'Bengali New Year',
    date: '১৪ এপ্রিল',
    description: 'বাংলা নববর্ষ উদযাপন। হাজার বছরের ঐতিহ্য বহনকারী এই উৎসব বাঙালির জীবনের অবিচ্ছেদ্য অংশ।',
    traditions: ['হালখাতা', 'পান্তা ভাত', 'বৈশাখী মেলা', 'মঙ্গল শোভাযাত্রা'],
    regions: ['সারা বাংলাদেশ', 'পশ্চিমবঙ্গ'],
    significance: 'নতুন বছরের শুভেচ্ছা ও আনন্দ বিতরণ',
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    name: 'দুর্গাপূজা',
    englishName: 'Durga Puja',
    date: 'আশ্বিন মাস',
    description: 'হিন্দু সম্প্রদায়ের সবচেয়ে বড় ধর্মীয় উৎসব। দেবী দুর্গার পূজা ও অনুষ্ঠান।',
    traditions: ['পুজো পণ্ডাল', 'ঢাকের বাদ্য', 'ধুনুচি নাচ', 'ভোগ বিতরণ'],
    regions: ['ঢাকা', 'কলকাতা', 'সিলেট', 'চট্টগ্রাম'],
    significance: 'মঙ্গলের প্রতীক, শুভের সমাগম',
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    name: 'ঈদুল ফিতর',
    englishName: 'Eid al-Fitr',
    date: 'রমজানের পর',
    description: 'মুসলিম সম্প্রদায়ের সবচেয়ে বড় ধর্মীয় উৎসব। রমজান মাসের সিয়াম সারণান্তে ঈদের আনন্দ।',
    traditions: ['ঈদের নামাজ', 'ঈদগাহ', 'সেমাই-শিরনি', 'ঈদি পোশাক'],
    regions: ['সারা বাংলাদেশ', 'পশ্চিমবঙ্গ'],
    significance: 'ভ্রাতৃত্ব ও সম্প্রীতির বন্ধন',
    image: '/api/placeholder/400/300'
  },
  {
    id: 4,
    name: 'পৌষ সংক্রান্তি',
    englishName: 'Poush Sankranti',
    date: '১৪ জানুয়ারি',
    description: 'শীতকালীন ফসল সংগ্রহের উৎসব। পিঠে-পুলি খাওয়া ও মেলা উপভোগ করা।',
    traditions: ['পিঠে উৎসব', 'ঘোড়ায় ঘোড়ায় খেলা', 'মেলা', 'লাঠিখেলা'],
    regions: ['ঢাকা', 'রাজশাহী', 'যশোর', 'কুষ্টিয়া'],
    significance: 'ফসলের আনন্দ ও কৃতজ্ঞতা প্রকাশ',
    image: '/api/placeholder/400/300'
  }
];

const FOLK_ARTS = [
  {
    id: 1,
    name: 'আলপনা',
    description: 'বাঙালির ঐতিহ্যবাহী মাটির অলংকরণ শিল্প। ধানের গুঁড়া দিয়ে মেঝেতে আঁকা হয়।',
    materials: ['ধানের গুঁড়া', 'চাল', 'মাটির রং'],
    regions: ['ঢাকা', 'ময়মনসিংহ', 'সিলেট'],
    occasions: ['বিয়ে', 'ব্রত', 'পূজা'],
    significance: 'শুভের প্রতীক, সৌন্দর্যের বহিঃপ্রকাশ',
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'জামদানি শাড়ি',
    description: 'বাংলার বিখ্যাত তাঁতশিল্প। ইউনেস্কো কর্তৃক স্বীকৃত বিশ্ব ঐতিহ্যবাহী কারুশিল্প।',
    materials: ['সুতি', 'সোনালী সুতো', 'সুতির তাঁত'],
    regions: ['ঢাকা', 'নারায়ণগঞ্জ', 'মানিকগঞ্জ'],
    occasions: ['বিয়ে', 'ঈদ', 'পূজা'],
    significance: 'বাঙালি নারীর সৌন্দর্য ও মর্যাদার প্রতীক',
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'নকশি কাঁথা',
    description: 'রঙিন সূচিকর্মে সজ্জিত কাঁথা। গ্রামীণ বাংলার প্রাণের প্রতীক।',
    materials: ['সুতি', 'সূচি', 'রঙিন সুতো'],
    regions: ['রাজশাহী', 'রংপুর', 'দিনাজপুর'],
    occasions: ['শীতকাল', 'বিয়ে', 'নবজাতকের জন্য'],
    significance: 'মায়ের ভালোবাসা ও গ্রামীণ জীবনের কাহিনি',
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: 'পুতুল নাচ',
    description: 'ঐতিহ্যবাহী মন্দিরা নৃত্য। কাঠের পুতুল দিয়ে গল্প বলা হয়।',
    materials: ['কাঠ', 'রং', 'কাপড়'],
    regions: ['ময়মনসিংহ', 'ঢাকা', 'কুমিল্লা'],
    occasions: ['মেলা', 'উৎসব', 'গ্রাম্য অনুষ্ঠান'],
    significance: 'গল্প বলার ঐতিহ্যবাহী মাধ্যম',
    image: '/api/placeholder/300/200'
  }
];

const CUISINE = [
  {
    id: 1,
    name: 'ভাত ও ভোজ',
    description: 'বাঙালির প্রধান খাবার। ভাতের সাথে বিভিন্ন তরকারি ও ভাজা।',
    items: ['ভাত', 'ডাল', 'ভাজি', 'মাছ', 'মাংস'],
    regions: ['সারা বাংলা'],
    occasions: ['দৈনিক খাবার'],
    specialties: ['পাঁচমিশালি', 'শুঁটকি', 'ঝোল'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'ইলিশ মাছ',
    description: 'বাংলার জাতীয় মাছ। পদ্মা নদীর ইলিশ বিখ্যাত।',
    items: ['ইলিশ ভাজা', 'ইলিশ পোলাও', 'ইলিশ ঝোল'],
    regions: ['পদ্মা অববাহিকা', 'মেঘনা', 'চট্টগ্রাম'],
    occasions: ['পহেলা বৈশাখ', 'বিয়ে', 'অতিথি আপ্যায়ন'],
    specialties: ['ভাপা ইলিশ', 'শুঁটকি ইলিশ', 'ইলিশ ভর্তা'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'পিঠে পুলি',
    description: 'বাঙালির ঐতিহ্যবাহী মিষ্টি। বিভিন্ন উৎসবে পিঠে তৈরি হয়।',
    items: ['পিঠে', 'পায়েস', 'রসমালাই', 'সন্দেশ'],
    regions: ['সারা বাংলা'],
    occasions: ['পৌষ সংক্রান্তি', 'বিয়ে', 'উৎসব'],
    specialties: ['ভাপা পিঠে', 'পাকন পিঠে', 'চিতই পিঠে'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 4,
    name: 'চা ও নাস্তা',
    description: 'বিকেলের চা বাঙালি সংস্কৃতির অংশ। চায়ের সাথে বিভিন্ন নাস্তা।',
    items: ['চা', 'বিস্কুট', 'সমুচা', 'পরোটা'],
    regions: ['সিলেট', 'চট্টগ্রাম', 'ঢাকা'],
    occasions: ['বিকেলের আড্ডা', 'অতিথি আপ্যায়ন'],
    specialties: ['সাত রঙা চা', 'মালাই চা', 'লেমন চা'],
    image: '/api/placeholder/300/200'
  }
];

const TRADITIONAL_DRESSES = [
  {
    id: 1,
    name: 'শাড়ি',
    description: 'বাঙালি নারীর ঐতিহ্যবাহী পোশাক। বিভিন্ন ধরনের শাড়ি রয়েছে।',
    types: ['জামদানি', 'টাঙ্গাইল', 'মসলিন', 'কাতান'],
    materials: ['সুতি', 'সিল্ক', 'জর্জেট'],
    occasions: ['বিয়ে', 'পূজা', 'ঈদ', 'অনুষ্ঠান'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    name: 'পাঞ্জাবি',
    description: 'বাঙালি পুরুষের ঐতিহ্যবাহী পোশাক। আরামদায়ক ও সুন্দর।',
    types: ['হাতের কাজ', 'ব্লক প্রিন্ট', 'এমব্রয়ডারি'],
    materials: ['সুতি', 'সিল্ক', 'লিনেন'],
    occasions: ['ঈদ', 'বিয়ে', 'অনুষ্ঠান'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    name: 'লুঙ্গি',
    description: 'বাঙালি পুরুষের দৈনিক পোশাক। গ্রীষ্মকালে আরামদায়ক।',
    types: ['হাতের লুঙ্গি', 'চেক লুঙ্গি', 'সাদা লুঙ্গি'],
    materials: ['সুতি', 'লিনেন'],
    occasions: ['দৈনিক ব্যবহার', 'ঘরের কাজ'],
    image: '/api/placeholder/300/200'
  }
];

function FestivalCard({ festival }) {
  const { classes } = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="relative">
        <img 
          src={festival.image} 
          alt={festival.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-bengali">
          {festival.date}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 font-bengali">{festival.name}</h3>
        <p className="text-sm text-gray-600 mb-3 font-bengali-serif">{festival.englishName}</p>
        <p className="text-gray-700 mb-4 font-bengali-serif">{festival.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 font-bengali">ঐতিহ্য:</h4>
          <div className="flex flex-wrap gap-1">
            {festival.traditions.map((tradition, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tradition}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <span className="font-semibold">তাৎপর্য:</span> {festival.significance}
        </div>
      </div>
    </motion.div>
  );
}

function FolkArtCard({ art }) {
  const { classes } = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <img 
          src={art.image} 
          alt={art.name}
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 font-bengali">{art.name}</h3>
          <p className="text-sm text-gray-700 mb-3 font-bengali-serif">{art.description}</p>
          
          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-900">উপকরণ:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {art.materials.map((material, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-semibold">তাৎপর্য:</span> {art.significance}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CulturePage() {
  const [selectedCategory, setSelectedCategory] = useState('উৎসব');
  const { classes } = useThemeClasses() || {};

  return (
    <div className={`min-h-screen ${classes?.background || ''} ${classes?.text || ''}`}>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-orange-50"
      >
        <div className="absolute inset-0 bg-jamdani-pattern opacity-10" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-bengali">
            বাঙালি <span className="text-pink-600">সংস্কৃতি</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bengali-serif">
            আলপনা, জামদানি, লোকসংগীত, উৎসব - বাঙালির সংস্কৃতি ও ঐতিহ্য উদযাপন
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-4">
            {Object.keys(CULTURE_CATEGORIES).map((category) => {
              const CategoryIcon = CULTURE_CATEGORIES[category].icon;
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

          {/* Category Description */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${CULTURE_CATEGORIES[selectedCategory].color}`} />
              <span className="text-lg font-semibold font-bengali">{selectedCategory}</span>
            </div>
            <p className="text-gray-600 font-bengali-serif">
              {CULTURE_CATEGORIES[selectedCategory].description}
            </p>
          </motion.div>

          {/* Content Sections */}
          <TabsContent value="উৎসব" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {FESTIVALS.map((festival) => (
                <FestivalCard key={festival.id} festival={festival} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="লোকশিল্প" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {FOLK_ARTS.map((art) => (
                <FolkArtCard key={art.id} art={art} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="খাবার" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {CUISINE.map((food) => (
                <motion.div
                  key={food.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex">
                    <img 
                      src={food.image} 
                      alt={food.name}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-bold mb-2 font-bengali">{food.name}</h3>
                      <p className="text-sm text-gray-700 mb-3 font-bengali-serif">{food.description}</p>
                      
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-900">উপাদান:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {food.items.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {food.specialties && (
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">বিশেষত্ব:</span> {food.specialities.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="পোশাক" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {TRADITIONAL_DRESSES.map((dress) => (
                <motion.div
                  key={dress.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img 
                    src={dress.image} 
                    alt={dress.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 font-bengali">{dress.name}</h3>
                    <p className="text-sm text-gray-700 mb-3 font-bengali-serif">{dress.description}</p>
                    
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-gray-900">ধরন:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dress.types.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">উপকরণ:</span> {dress.materials.join(', ')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}