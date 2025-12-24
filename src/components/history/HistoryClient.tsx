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

type HistoryEvent = {
  id: string;
  title: string;
  year: number;
  description: string;
  category: string;
  location: string | null;
  imageUrl: string | null;
  sourceUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  period?: string;
  details?: {
    ruler?: string;
    significance?: string;
  };
};

const CATEGORIES = {
  'রাজনীতি': { icon: Crown, color: 'bg-amber-600' },
  'যুদ্ধ': { icon: Sword, color: 'bg-red-600' },
  'সামাজিক': { icon: Users, color: 'bg-blue-600' },
  'সংস্কৃতি': { icon: Book, color: 'bg-green-600' }
};

function TimelineEvent({ event, index, isSelected, onSelect }) {
  const classes = useThemeClasses();
  const category = CATEGORIES[event.category] || CATEGORIES['রাজনীতি'];
  const Icon = category.icon;

  // Derive period from year if not present
  const period = event.period || (event.year < 1200 ? 'প্রাচীন যুগ' : event.year < 1757 ? 'মধ্যযুগ' : 'আধুনিক যুগ');

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
            <span className="text-sm text-gray-500 font-bengali">{period}</span>
          </div>

          <h3 className="text-xl font-bold mb-2 font-bengali">{event.title}</h3>
          <p className="text-gray-600 mb-3 font-bengali-serif">{event.description}</p>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="font-bengali">{toBengaliNumber(event.year)} খ্রিস্টাব্দ</span>
            <MapPin className="w-4 h-4 ml-3 mr-1" />
            <span className="font-bengali">{event.location || 'অজানা'}</span>
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
  const classes = useThemeClasses();

  if (!event) return null;

  const category = CATEGORIES[event.category] || CATEGORIES['রাজনীতি'];
  const period = event.period || (event.year < 1200 ? 'প্রাচীন যুগ' : event.year < 1757 ? 'মধ্যযুগ' : 'আধুনিক যুগ');

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
                  <span className="text-gray-500">{period}</span>
                </div>

                <h2 className="text-3xl font-bold mb-4 font-bengali">{event.title}</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={event.imageUrl || 'https://placehold.co/400x300'}
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-700 font-bengali-serif leading-relaxed">
                      {event.description}
                    </p>
                    {event.sourceUrl && (
                        <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 block">
                            আরও জানুন (উইকিপিডিয়া)
                        </a>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 font-bengali">বিস্তারিত তথ্য</h3>

                    {/* Placeholder for details as they are not yet in DB schema fully separated */}
                    <div className="space-y-4">
                      {event.details ? (
                         <>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1 font-bengali">শাসক/নেতা</h4>
                                <p className="text-gray-600 font-bengali">{event.details.ruler}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1 font-bengali">তাৎপর্য</h4>
                                <p className="text-gray-600 font-bengali">{event.details.significance}</p>
                            </div>
                         </>
                      ) : (
                          <p className="text-gray-500 italic">বিস্তারিত তথ্য শীঘ্রই আসছে...</p>
                      )}
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

export default function HistoryClient({ events = [] }: { events: HistoryEvent[] }) {
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
          {events.length > 0 ? (
              events.map((event, index) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                  index={index}
                  isSelected={selectedEvent?.id === event.id}
                  onSelect={handleEventSelect}
                />
              ))
          ) : (
              <div className="text-center text-gray-500 py-10">
                  কোনো তথ্য পাওয়া যায়নি
              </div>
          )}
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
