/**
 * History Module - Infinite Timeline
 * Interactive timeline showing Bengali history from Pala Empire to modern times
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Crown, Book, Users, Sword, Scroll, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber, formatBengaliDate } from '@/lib/bengali/index';

// Mock historical data
const HISTORICAL_EVENTS = [
  {
    id: 1,
    year: 750,
    title: 'পাল সাম্রাজ্যের প্রতিষ্ঠা',
    description: 'গোপাল প্রথম কর্তৃক পাল সাম্রাজ্যের প্রতিষ্ঠা। বাংলার ইতিহাসে এক নতুন যুগের সূচনা।',
    period: 'প্রাচীন যুগ',
    category: 'রাজনীতি',
    location: 'গৌড়',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'গোপাল প্রথম',
      significance: 'বৌদ্ধ ধর্মের পৃষ্ঠপোষকতা',
      achievements: ['শিক্ষা বিস্তার', 'নালন্দা বিশ্ববিদ্যালয় সমৃদ্ধি', 'শিল্পকলার উন্নতি']
    }
  },
  {
    id: 2,
    year: 1204,
    title: 'বাংলায় মুসলিম শাসনের শুরু',
    description: 'মুহাম্মদ বখতিয়ার খিলজির বাংলা বিজয়। নদিয়ার সেন রাজবংশের পতন।',
    period: 'মধ্যযুগ',
    category: 'রাজনীতি',
    location: 'নদিয়া',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'মুহাম্মদ বখতিয়ার খিলজি',
      significance: 'ইসলামিক শাসনের সূচনা',
      achievements: ['ইসলাম ধর্মের প্রসার', 'নতুন স্থাপত্য শৈলী', 'বাণিজ্যের উন্নতি']
    }
  },
  {
    id: 3,
    year: 1576,
    title: 'রাজমহলের যুদ্ধ',
    description: 'মুঘল সম্রাট আকবর ও বাংলার সুলতান দাউদ খান কর্তৃক রাজমহলের যুদ্ধ সংঘটিত হয়।',
    period: 'মধ্যযুগ',
    category: 'যুদ্ধ',
    location: 'রাজমহল',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'দাউদ খান কররানী',
      significance: 'বাংলায় মুঘল শাসনের সূচনা',
      achievements: ['মুঘল সাম্রাজ্যের অংশ হিসেবে অন্তর্ভুক্তি', 'নতুন প্রশাসনিক ব্যবস্থা']
    }
  },
  {
    id: 4,
    year: 1757,
    title: 'পলাশীর যুদ্ধ',
    description: 'নবাব সিরাজউদ্দৌলার পরাজয় এবং বাংলায় ব্রিটিশ শাসনের সূচনা।',
    period: 'ঔপনিবেশিক যুগ',
    category: 'যুদ্ধ',
    location: 'পলাশী',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'নবাব সিরাজউদ্দৌলা',
      significance: 'ব্রিটিশ ঔপনিবেশিক শাসনের সূচনা',
      achievements: ['বাংলার স্বাধীনতা হারানো', 'ব্রিটিশ শাসনের অধীনে চলে যাওয়া']
    }
  },
  {
    id: 5,
    year: 1905,
    title: 'বঙ্গভঙ্গ',
    description: 'লর্ড কার্জন কর্তৃক বঙ্গভঙ্গ আইন। বাংলার স্বাধীনতা আন্দোলনের সূচনা।',
    period: 'আধুনিক যুগ',
    category: 'রাজনীতি',
    location: 'কলকাতা',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'লর্ড কার্জন',
      significance: 'স্বাধীনতা আন্দোলনের সূচনা',
      achievements: ['স্বদেশী আন্দোলন', 'জাতীয়তাবাদের উন্মেষ', 'ছাত্র আন্দোলন']
    }
  },
  {
    id: 6,
    year: 1952,
    title: 'ভাষা আন্দোলন',
    description: 'বাংলা ভাষার জন্য সংগ্রাম। সালাম, বরকত, রফিক, জব্বারের শহীদ হওয়া।',
    period: 'আধুনিক যুগ',
    category: 'সামাজিক',
    location: 'ঢাকা',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'পাকিস্তান সরকার',
      significance: 'বাংলা ভাষার স্বীকৃতি',
      achievements: ['আন্তর্জাতিক মাতৃভাষা দিবস', 'বাংলা ভাষার মর্যাদা', 'জাতীয় চেতনার জাগরণ']
    }
  },
  {
    id: 7,
    year: 1971,
    title: 'স্বাধীনতা যুদ্ধ',
    description: 'নয় মাসব্যাপী মুক্তিযুদ্ধ এবং বাংলাদেশের স্বাধীনতা অর্জন।',
    period: 'স্বাধীনতা যুগ',
    category: 'যুদ্ধ',
    location: 'সারা বাংলাদেশ',
    image: '/api/placeholder/400/300',
    details: {
      ruler: 'শেখ মুজিবুর রহমান',
      significance: 'স্বাধীন বাংলাদেশ প্রতিষ্ঠা',
      achievements: ['স্বাধীনতা অর্জন', 'জাতিসংঘের সদস্যপদ', 'নতুন জাতির সূচনা']
    }
  }
];

const CATEGORIES = {
  'রাজনীতি': { icon: Crown, color: 'bg-amber-600' },
  'যুদ্ধ': { icon: Sword, color: 'bg-red-600' },
  'সামাজিক': { icon: Users, color: 'bg-blue-600' },
  'সংস্কৃতি': { icon: Book, color: 'bg-green-600' }
};

function TimelineEvent({ event, index, isSelected, onSelect }) {
  const classes = useThemeClasses();
  const category = CATEGORIES[event.category];
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => onSelect(event)}
        className={`md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} cursor-pointer p-6 rounded-lg border-2 transition-all duration-300 ${
          isSelected
            ? 'border-amber-600 shadow-xl bg-amber-50'
            : 'border-amber-200 hover:border-amber-400 hover:shadow-lg'
        }`}
      >
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={`${category.color} text-white`}>
              <Icon className="w-3 h-3 mr-1" />
              {event.category}
            </Badge>
            <span className="text-sm text-gray-500 font-bengali">{event.period}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 font-bengali">{event.title}</h3>
          <p className="text-gray-600 mb-3 font-bengali-serif">{event.description}</p>
          
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-bengali">{toBengaliNumber(event.year)} খ্রিস্টাব্দ</span>
            <MapPin className="w-4 h-4 ml-3 mr-1" />
            <span className="font-bengali">{event.location}</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="md:w-2/12 flex justify-center">
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`w-6 h-6 rounded-full border-4 border-white shadow-lg cursor-pointer ${
              isSelected ? category.color : 'bg-gray-400'
            }`}
            onClick={() => onSelect(event)}
          />
          {/* Vertical Line */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gray-300" />
        </div>
      </div>

      {/* Empty Space for Alternating Layout */}
      <div className="md:w-5/12" />
    </motion.div>
  );
}

function EventModal({ event, isOpen, onClose }) {
  if (!event) return null;

  const classes = useThemeClasses();
  const category = CATEGORIES[event.category];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className={`h-2 ${category.color}`} />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
              >
                ×
              </button>
              
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Badge className={`${category.color} text-white`}>
                    {event.category}
                  </Badge>
                  <span className="text-gray-500">{event.period}</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-4 font-bengali">{event.title}</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-bengali-serif leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-bengali">বিস্তারিত তথ্য</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 font-bengali">শাসক/নেতা</h4>
                        <p className="text-gray-600 font-bengali">{event.details.ruler}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 font-bengali">তাৎপর্য</h4>
                        <p className="text-gray-600 font-bengali">{event.details.significance}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 font-bengali">অর্জন</h4>
                        <ul className="space-y-1">
                          {event.details.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-amber-600 flex-shrink-0" />
                              <span className="text-gray-600 font-bengali">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HistoryPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const classes = useThemeClasses();

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300);
  };

  return (
    <div className={`min-h-screen ${classes.background} ${classes.text}`}>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 opacity-90" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-bengali">
            বাংলার <span className="text-amber-700">ইতিহাস</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bengali-serif">
            পাল সাম্রাজ্য থেকে ১৯৭১ - হাজার বছরের গৌরবময় ইতিহাস অন্বেষণ করুন
          </p>
        </div>
      </motion.section>

      {/* Timeline Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center space-x-4">
          <Button
            variant={isAutoPlay ? "default" : "outline"}
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="flex items-center space-x-2"
          >
            {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="font-bengali">{isAutoPlay ? 'বিরতি' : 'অটো প্লে'}</span>
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {HISTORICAL_EVENTS.map((event, index) => (
            <TimelineEvent
              key={event.id}
              event={event}
              index={index}
              isSelected={selectedEvent?.id === event.id}
              onSelect={handleEventSelect}
            />
          ))}
        </div>
      </section>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}