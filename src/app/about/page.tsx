/**
 * About Page - BongoBishwa Project Information
 * Details about the project, mission, team, and vision
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Globe, Heart, BookOpen, Users, Target, Award,
  Mail, Github, Twitter, Linkedin, Star, ArrowRight,
  Zap, Sparkles, Lightbulb, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber } from '@/lib/bengali/index';

// Mock team data
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'ড. অনিক রহমান',
    role: 'প্রতিষ্ঠাতা ও সিইও',
    bio: 'বাংলা ভাষা প্রযুক্তি ও ডিজিটাল সংরক্ষণের অন্যতম পথিকৃৎ। ১৫ বছরের অভিজ্ঞতা।',
    avatar: '/api/placeholder/100/100',
    social: {
      github: 'https://github.com/anikrahman',
      linkedin: 'https://linkedin.com/in/anikrahman',
      twitter: 'https://twitter.com/anikrahman'
    },
    expertise: ['বাংলা NLP', 'ডিজিটাল আর্কাইভ', 'ওপেন সোর্স']
  },
  {
    id: 2,
    name: 'প্রিয়া সেনগুপ্ত',
    role: 'প্রধান প্রযুক্তি কর্মকর্তা',
    bio: 'আধুনিক ওয়েব প্রযুক্তি ও ব্যবহারকারী অভিজ্ঞতা ডিজাইনের বিশেষজ্ঞ।',
    avatar: '/api/placeholder/100/100',
    social: {
      github: 'https://github.com/priyasengupta',
      linkedin: 'https://linkedin.com/in/priyasengupta',
      twitter: 'https://twitter.com/priyasengupta'
    },
    expertise: ['ফুলস্ট্যাক ডেভেলপমেন্ট', 'UI/UX ডিজাইন', 'ক্লাউড আর্কিটেকচার']
  },
  {
    id: 3,
    name: 'অধ্যাপক কামরুল হাসান',
    role: 'একাডেমিক উপদেষ্টা',
    bio: 'বাংলা সাহিত্য ও ইতিহাসের খ্যাতনামা গবেষক। ৩০টি গ্রন্থের রচয়িতা।',
    avatar: '/api/placeholder/100/100',
    social: {
      github: 'https://github.com/kamrulhasan',
      linkedin: 'https://linkedin.com/in/kamrulhasan'
    },
    expertise: ['বাংলা সাহিত্য', 'ইতিহাস গবেষণা', 'ডিজিটাল হিউম্যানিটিজ']
  },
  {
    id: 4,
    name: 'তাসনিম আক্তার',
    role: 'কন্টেন্ট কিউরেটর',
    bio: 'বাংলা সংস্কৃতি ও লোকঐতিহ্যের গবেষক। ডিজিটাল সংরক্ষণে অবদান।',
    avatar: '/api/placeholder/100/100',
    social: {
      github: 'https://github.com/tasnimakhter',
      linkedin: 'https://linkedin.com/in/tasnimakhter',
      twitter: 'https://twitter.com/tasnimakhter'
    },
    expertise: ['সংস্কৃতি গবেষণা', 'কন্টেন্ট কিউরেশন', 'ডিজিটাল আর্কাইভিং']
  }
];

const MISSION_POINTS = [
  {
    icon: BookOpen,
    title: 'জ্ঞান সংরক্ষণ',
    description: 'হাজার বছরের বাংলা ভাষা, সাহিত্য, ইতিহাস ও সংস্কৃতিকে ডিজিটাল মাধ্যমে সংরক্ষণ করা।'
  },
  {
    icon: Users,
    title: 'প্রবেশগম্যতা',
    description: 'বিশ্বব্যাপী বাংলাভাষী মানুষের কাছে বাংলার ঐতিহ্য সহজে পৌঁছে দেওয়া।'
  },
  {
    icon: Zap,
    title: 'প্রযুক্তি উদ্ভাবন',
    description: 'বাংলা ভাষায় আধুনিক প্রযুক্তি ও কৃত্রিম বুদ্ধিমত্তার প্রয়োগ।'
  },
  {
    icon: Globe,
    title: 'বৈশ্বিক পরিচয়',
    description: 'বাংলা ভাষা ও সংস্কৃতিকে বিশ্ব দরবারে তুলে ধরা।'
  }
];

const STATS = [
  { 
    metric: 'সংরক্ষিত ডিজিটাল সম্পদ', 
    value: 50000, 
    unit: '+',
    description: 'বই, নিবন্ধ, ছবি ও ভিডিও'
  },
  { 
    metric: 'সক্রিয় ব্যবহারকারী', 
    value: 250000, 
    unit: '+',
    description: 'বিশ্বব্যাপী বাংলাভাষী মানুষ'
  },
  { 
    metric: 'দৈনিক ভিজিট', 
    value: 10000, 
    unit: '+',
    description: 'প্ল্যাটফর্মে নিয়মিত ভিজিট'
  },
  { 
    metric: 'অবদানকারী', 
    value: 500, 
    unit: '+',
    description: 'স্বেচ্ছাসেবক ও গবেষক'
  }
];

const TECHNOLOGY_STACK = [
  {
    category: 'ফ্রন্টএন্ড',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: '🎨'
  },
  {
    category: 'ব্যাকএন্ড',
    technologies: ['Node.js', 'PostgreSQL', 'Prisma', 'REST API'],
    icon: '⚙️'
  },
  {
    category: 'বাংলা প্রযুক্তি',
    technologies: ['বাংলা NLP', 'OCR', 'টেক্সট-টু-স্পিচ', 'মেশিন লার্নিং'],
    icon: '🤖'
  },
  {
    category: 'ডিপ্লয়মেন্ট',
    technologies: ['Vercel', 'AWS', 'Docker', 'GitHub Actions'],
    icon: '🚀'
  }
];

function TeamMemberCard({ member }) {
  const { classes } = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img 
          src={member.avatar} 
          alt={member.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold font-bengali">{member.name}</h3>
          <p className="text-sm text-blue-600 font-bengali">{member.role}</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 font-bengali-serif">{member.bio}</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {member.expertise.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        {member.social.github && (
          <Button size="sm" variant="outline" className="p-2">
            <Github className="w-4 h-4" />
          </Button>
        )}
        {member.social.linkedin && (
          <Button size="sm" variant="outline" className="p-2">
            <Linkedin className="w-4 h-4" />
          </Button>
        )}
        {member.social.twitter && (
          <Button size="sm" variant="outline" className="p-2">
            <Twitter className="w-4 h-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function MissionCard({ mission, index }) {
  const { classes } = useThemeClasses();
  const Icon = mission.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2 font-bengali">{mission.title}</h3>
          <p className="text-gray-700 font-bengali-serif">{mission.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TechStackCard({ tech }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-3xl mb-4 text-center">{tech.icon}</div>
      <h3 className="text-lg font-bold text-center mb-3 font-bengali">{tech.category}</h3>
      <div className="flex flex-wrap gap-1 justify-center">
        {tech.technologies.map((tech, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { classes } = useThemeClasses();

  return (
    <div className={`min-h-screen ${classes.background} ${classes.text}`}>
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-bengali">
            বঙ্গবিশ্ব <span className="text-blue-600">সম্পর্কে</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bengali-serif">
            বাংলা ভাষা, জাতি, সংস্কৃতি, ইতিহাস এবং প্রযুক্তির বিশ্বকোষ
          </p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 font-bengali">
              আমাদের <span className="text-blue-600">মিশন</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bengali-serif">
              বাংলার হাজার বছরের ঐতিহ্যকে ডিজিটাল যুগে নিয়ে যাওয়া
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {MISSION_POINTS.map((mission, index) => (
              <MissionCard key={index} mission={mission} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2 font-bengali">
                  {toBengaliNumber(stat.value)}{stat.unit}
                </div>
                <div className="text-lg font-semibold mb-2 font-bengali">{stat.metric}</div>
                <div className="text-sm text-gray-600 font-bengali-serif">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 font-bengali">
              আমাদের <span className="text-blue-600">টিম</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bengali-serif">
              বঙ্গবিশ্বের পেছনে থাকা উত্সাহী ও দক্ষ ব্যক্তিবর্গ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 font-bengali">
              প্রযুক্তি <span className="text-blue-600">স্ট্যাক</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bengali-serif">
              আধুনিক প্রযুক্তির মাধ্যমে বঙ্গবিশ্ব নির্মাণ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNOLOGY_STACK.map((tech, index) => (
              <TechStackCard key={index} tech={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 font-bengali">
              আমাদের <span className="text-yellow-300">সাথে যোগ দিন</span>
            </h2>
            <p className="text-xl mb-8 font-bengali-serif">
              বাংলার ঐতিহ্য সংরক্ষণে আপনার অবদান দিন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                স্বেচ্ছাসেবক হিসেবে যোগ দিন
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                আরও জানুন
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}