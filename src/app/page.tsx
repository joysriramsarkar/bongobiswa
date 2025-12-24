/**
 * Home Page - BongoBishwa
 * Main landing page with hero section and interactive elements
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Globe, BookOpen, Users, Microscope, Sparkles, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber } from '@/lib/bengali/numbers';

// Mock data for statistics
const STATS = [
  { number: 1300, label: 'বছরের ইতিহাস', icon: Globe },
  { number: 280, label: 'কোটিরও বেশি মানুষ', icon: Users },
  { number: 1000, label: 'হাজারেরও বেশি সাহিত্যকর্ম', icon: BookOpen },
  { number: 50, label: 'এর বেশি বিজ্ঞানী', icon: Microscope }
];

const MODULES = [
  {
    title: 'ইতিহাস',
    description: 'পাল সাম্রাজ্য থেকে ১৯৭১ এবং তার বাইরে - বাংলার হাজার বছরের ইতিহাস অন্বেষণ করুন',
    href: '/history',
    icon: Globe,
    color: 'bg-amber-600',
    features: ['টাইমলাইন', 'ঐতিহাসিক ঘটনা', 'ব্যক্তিত্ব', 'স্থাপত্য'],
    image: '/history.jpg'
  },
  {
    title: 'সাহিত্য',
    description: 'রবীন্দ্রনাথ, নজরুল, জীবনানন্দ - বাংলা সাহিত্যের সমৃদ্ধ ভান্ডার আবিষ্কার করুন',
    href: '/literature',
    icon: BookOpen,
    color: 'bg-gray-800',
    features: ['কবিতা', 'উপন্যাস', 'নাটক', 'লোকসাহিত্য'],
    image: '/literature.jpg'
  },
  {
    title: 'প্রযুক্তি',
    description: 'বাংলা ভাষা প্রযুক্তি, ওপেন সোর্স, ডিজিটাল বাংলা - আধুনিক বাংলার প্রযুক্তিগত অগ্রগতি',
    href: '/technology',
    icon: Microscope,
    color: 'bg-cyan-500',
    features: ['বাংলা NLP', 'ওপেন সোর্স', 'সফটওয়্যার', 'গবেষণা'],
    image: '/technology.jpg'
  },
  {
    title: 'সংস্কৃতি',
    description: 'আলপনা, জামদানি, লোকসংগীত, উৎসব - বাঙালির সংস্কৃতি ও ঐতিহ্য উদযাপন করুন',
    href: '/culture',
    icon: Users,
    color: 'bg-pink-500',
    features: ['উৎসব', 'লোকশিল্প', 'খাবার', 'পোশাক'],
    image: '/culture.jpg'
  }
];

function HeroSection() {
  const { scrollY } = useScroll();
  
  const yRange = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const smoothY = useSpring(yRange, { stiffness: 400, damping: 40 });
  const smoothOpacity = useSpring(opacity, { stiffness: 400, damping: 40 });
  const smoothScale = useSpring(scale, { stiffness: 400, damping: 40 });

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-alpona-pattern"
      style={{ opacity: smoothOpacity, scale: smoothScale }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-yellow-50 opacity-90" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20"
      />

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span className="font-bengali">ডিজিটাল রেনেসাঁ শুরু হয়েছে</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-bengali"
          style={{ y: smoothY }}
        >
          <span className="text-red-600">১৩০০</span>
          <br />
          <span className="text-yellow-600">বছরের</span>
          <br />
          <span className="text-green-600">বাংলা</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto font-bengali-serif"
        >
          বঙ্গবিশ্ব - বাংলা ভাষা, জাতি, সংস্কৃতি, ইতিহাস এবং প্রযুক্তির বিশ্বকোষ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-bengali">
            যাত্রা শুরু করুন
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button variant="outline" size="lg" className="border-red-300 text-red-700 hover:bg-red-50 px-8 py-3 text-lg font-bengali">
            <Play className="mr-2 w-5 h-5" />
            ভিডিও দেখুন
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-red-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-red-400 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 font-bengali">
                  {toBengaliNumber(stat.number)}+
                </div>
                <div className="text-gray-600 font-bengali">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ModulesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-bengali">
            বঙ্গবিশ্বের <span className="text-red-600">অধ্যায়</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bengali-serif">
            বাংলার বিভিন্ন দিক অন্বেষণ করুন - ইতিহাস থেকে শুরু করে আধুনিক প্রযুক্তি পর্যন্ত
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {MODULES.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Link href={module.href}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                    <div className={`h-2 ${module.color}`} />
                    <Image src={module.image} alt={module.title} width={500} height={300} className="w-full h-48 object-cover" />
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 font-bengali group-hover:text-red-600 transition-colors">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 mb-4 font-bengali-serif">
                            {module.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {module.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-bengali"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <ModulesSection />
    </div>
  );
}