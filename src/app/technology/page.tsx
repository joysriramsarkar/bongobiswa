/**
 * Technology Module - Bengali Tech Evolution
 * Showcasing Bengali language technology, NLP, and digital innovations
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Cpu, Globe, Code, Database, Brain, Zap, 
  Terminal, Monitor, Smartphone, GitBranch, 
  TrendingUp, Users, Award, Lightbulb 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThemeClasses } from '@/lib/themes/provider';
import { toBengaliNumber } from '@/lib/bengali/index';

// Mock technology data
const TECH_CATEGORIES = {
  'বাংলা NLP': { 
    icon: Brain, 
    color: 'bg-cyan-500',
    description: 'বাংলা ভাষা প্রক্রিয়াকরণ ও কৃত্রিম বুদ্ধিমত্তা'
  },
  'ওপেন সোর্স': { 
    icon: Code, 
    color: 'bg-green-500',
    description: 'বাংলা ভাষায় ওপেন সোর্স প্রকল্প ও অবদান'
  },
  'ডিজিটাল বাংলা': { 
    icon: Monitor, 
    color: 'bg-purple-500',
    description: 'বাংলা টাইপোগ্রাফি, ফন্ট ও ডিজিটাল সমাধান'
  },
  'মোবাইল অ্যাপ': { 
    icon: Smartphone, 
    color: 'bg-blue-500',
    description: 'বাংলা ভাষায় মোবাইল অ্যাপ্লিকেশন ও সার্ভিস'
  }
};

const TECH_STATS = [
  { 
    metric: 'ইন্টারনেট ব্যবহারকারী', 
    value: 45, 
    unit: 'মিলিয়ন',
    growth: 12.5,
    description: 'বাংলাদেশে ইন্টারনেট ব্যবহারকারীর সংখ্যা'
  },
  { 
    metric: 'বাংলা ওয়েবসাইট', 
    value: 25000, 
    unit: '+',
    growth: 18.2,
    description: 'বাংলা ভাষায় তৈরি ওয়েবসাইট'
  },
  { 
    metric: 'মোবাইল অ্যাপ', 
    value: 500, 
    unit: '+',
    growth: 25.8,
    description: 'বাংলা ভাষা সমর্থিত মোবাইল অ্যাপ'
  },
  { 
    metric: 'ওপেন সোর্স প্রকল্প', 
    value: 1200, 
    unit: '+',
    growth: 15.3,
    description: 'বাংলা ভাষায় ওপেন সোর্স প্রকল্প'
  }
];

const NLP_PROJECTS = [
  {
    id: 1,
    name: 'বাংলাBERT',
    description: 'বাংলা ভাষার জন্য প্রিট্রেইন্ড ট্রান্সফরমার মডেল। বাংলা NLP টাস্কে অত্যন্ত কার্যকর।',
    accuracy: 92,
    github: 'https://github.com/sagorbrkr/bangla-bert',
    contributors: 45,
    stars: 1200,
    features: ['টেক্সট ক্লাসিফিকেশন', 'নেমড এন্টিটি রিকগনিশন', 'সেন্টিমেন্ট অ্যানালাইসিস'],
    applications: ['চ্যাটবট', 'কন্টেন্ট মডারেশন', 'সার্চ ইঞ্জিন']
  },
  {
    id: 2,
    name: 'বাংলা NLP লাইব্রেরি',
    description: 'বাংলা ভাষা প্রক্রিয়াকরণের জন্য কম্প্রিহেন্সিভ পাইথন লাইব্রেরি।',
    accuracy: 88,
    github: 'https://github.com/Rifat1493/bengali-nlp',
    contributors: 32,
    stars: 850,
    features: ['টোকেনাইজেশন', 'স্টেমিং', 'পোস ট্যাগিং'],
    applications: ['টেক্সট অ্যানালাইসিস', 'ডেটা প্রিপ্রসেসিং', 'মেশিন লার্নিং']
  },
  {
    id: 3,
    name: 'বাংলা টেক্সট-টু-স্পিচ',
    description: 'বাংলা লেখা থেকে স্বাভাবিক কথ্য ভাষায় রূপান্তর করার সিস্টেম।',
    accuracy: 95,
    github: 'https://github.com/souvikdutta96/bengali-tts',
    contributors: 28,
    stars: 620,
    features: ['প্রাকৃতিক ভয়েস', 'মাল্টিপল স্পিকার', 'ইমোশনাল TTS'],
    applications: ['অ্যাক্সেসিবিলিটি', 'অডিওবুক', 'ভয়েস অ্যাসিস্ট্যান্ট']
  }
];

const OPEN_SOURCE_PROJECTS = [
  {
    id: 1,
    name: 'অভ্র কিবোর্ড',
    description: 'বাংলা টাইপিংয়ের জন্য সবচেয়ে জনপ্রিয় ওপেন সোর্স কিবোর্ড লেআউট সফটওয়্যার।',
    language: 'C++',
    downloads: '5M+',
    contributors: 15,
    github: 'https://github.com/OmniMic/Avro-Keyboard',
    features: ['ফোনেটিক টাইপিং', 'মাল্টিপল লেআউট', 'ডিকশনারি সাপোর্ট'],
    impact: 'বাংলা ডিজিটাল লিখনের বিপ্লব'
  },
  {
    id: 2,
    name: 'বিজয় ইউনিকোড',
    description: 'ইউনিকোড ভিত্তিক বাংলা টাইপিং সফটওয়্যার। প্রফেশনাল ব্যবহারের জন্য আদর্শ।',
    language: 'C#',
    downloads: '3M+',
    contributors: 8,
    github: 'https://github.com/bijoy/bijoy-unicode',
    features: ['ইউনিকোড সাপোর্ট', 'কাস্টম লেআউট', 'প্রোফেশনাল টুলস'],
    impact: 'প্রফেশনাল বাংলা টাইপিং এর মান উন্নয়ন'
  },
  {
    id: 3,
    name: 'বাংলা উইকিপিডিয়া',
    description: 'বাংলা ভাষায় বিশ্বকোষ তৈরির বৃহত্তম ওপেন সোর্স প্রকল্প।',
    language: 'MediaWiki',
    downloads: 'N/A',
    contributors: '2000+',
    github: 'https://bn.wikipedia.org',
    features: ['উইকি প্ল্যাটফর্ম', 'মাল্টিমিডিয়া সাপোর্ট', 'গ্লোবাল কন্ট্রিবিউশন'],
    impact: 'বাংলা জ্ঞান ভান্ডার নির্মাণ'
  }
];

const DIGITAL_INITIATIVES = [
  {
    id: 1,
    name: 'ডিজিটাল বাংলাদেশ',
    description: 'বাংলাদেশ সরকারের ডিজিটাল রূপান্তর কর্মসূচি।',
    status: 'চলমান',
    progress: 75,
    features: ['ই-গভর্নেন্স', 'ডিজিটাল সাক্ষরতা', 'টেক পার্ক'],
    achievements: ['১০ কোটি ইন্টারনেট ব্যবহারকারী', '১০০% ডিজিটাল সার্ভিস কভারেজ']
  },
  {
    id: 2,
    name: 'বাংলা ফন্ট প্রকল্প',
    description: 'উন্নতমানের বাংলা ফন্ট তৈরি ও বিতরণ কর্মসূচি।',
    status: 'চলমান',
    progress: 60,
    features: ['ওপেন সোর্স ফন্ট', 'ওয়েব ফন্ট', 'মোবাইল ফন্ট'],
    achievements: ['৫০+ ফন্ট রিলিজ', '১ মিলিয়ন+ ডাউনলোড']
  }
];

function StatCard({ stat }) {
  const { classes } = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 border border-cyan-500 rounded-lg p-6 text-center"
    >
      <div className="text-3xl font-bold text-cyan-400 mb-2 font-bengali">
        {toBengaliNumber(stat.value)}{stat.unit}
      </div>
      <div className="text-sm text-gray-400 mb-2 font-bengali">{stat.metric}</div>
      <div className="text-xs text-gray-500 mb-3">{stat.description}</div>
      <div className="flex items-center justify-center space-x-1">
        <TrendingUp className="w-3 h-3 text-green-400" />
        <span className="text-xs text-green-400">+{stat.growth}%</span>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, category }) {
  const { classes } = useThemeClasses();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-cyan-400 font-bengali">{project.name}</h3>
          <Badge className="bg-cyan-600 text-white">
            {project.accuracy ? `${project.accuracy}%` : project.status}
          </Badge>
        </div>
        
        <p className="text-gray-300 mb-4 font-bengali-serif">{project.description}</p>
        
        {project.features && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">বৈশিষ্ট্য:</h4>
            <div className="flex flex-wrap gap-1">
              {project.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {project.applications && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">প্রয়োগ:</h4>
            <div className="flex flex-wrap gap-1">
              {project.applications.map((app, index) => (
                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                  {app}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>⭐ {toBengaliNumber(project.stars || 0)}</span>
            <span>👥 {toBengaliNumber(project.contributors)}</span>
          </div>
          <Button size="sm" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">
            GitHub
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 300;

    const matrix = "বঙ্গবিশ্ববাংলাভাষাপ্রযুক্তিডিজিটালনলপকৃত্রিমবুদ্ধিমত্তা";
    const matrixArray = matrix.split("");

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FFFF';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 overflow-hidden">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4 font-bengali animate-pulse">
            বাংলা প্রযুক্তির ভবিষ্যৎ
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-bengali-serif">
            কৃত্রিম বুদ্ধিমত্তা, মেশিন লার্নিং, এবং ওপেন সোর্স প্রযুক্তির মাধ্যমে বাংলা ভাষার ডিজিটাল বিপ্লব
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TechnologyPage() {
  const [selectedCategory, setSelectedCategory] = useState('বাংলা NLP');
  const { classes } = useThemeClasses();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Matrix Effect */}
      <section className="relative">
        <MatrixRain />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 font-bengali">
              বাংলা <span className="text-cyan-400">ডিজিটাল পরিসংখ্যান</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-8">
          {/* Category Tabs */}
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            {Object.keys(TECH_CATEGORIES).map((category) => {
              const CategoryIcon = TECH_CATEGORIES[category].icon;
              return (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white font-bengali"
                >
                  <CategoryIcon className="w-4 h-4 mr-2" />
                  {category}
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
              <div className={`w-3 h-3 rounded-full ${TECH_CATEGORIES[selectedCategory].color}`} />
              <span className="text-lg font-semibold text-cyan-400 font-bengali">{selectedCategory}</span>
            </div>
            <p className="text-gray-400 font-bengali-serif">
              {TECH_CATEGORIES[selectedCategory].description}
            </p>
          </motion.div>

          {/* Content Sections */}
          <TabsContent value="বাংলা NLP" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NLP_PROJECTS.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  category="বাংলা NLP"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ওপেন সোর্স" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OPEN_SOURCE_PROJECTS.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  category="ওপেন সোর্স"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ডিজিটাল বাংলা" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {DIGITAL_INITIATIVES.map((initiative) => (
                <motion.div
                  key={initiative.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-400 font-bengali">{initiative.name}</h3>
                    <Badge className="bg-purple-600 text-white">
                      {initiative.progress}%
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 mb-4 font-bengali-serif">{initiative.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>অগ্রগতি</span>
                      <span>{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} className="h-2" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">অর্জন:</h4>
                    <ul className="space-y-1">
                      {initiative.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <Lightbulb className="w-3 h-3 mr-2 mt-1 text-purple-400 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="মোবাইল অ্যাপ" className="space-y-8">
            <div className="text-center py-12">
              <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 font-bengali">মোবাইল অ্যাপ সেকশন</h3>
              <p className="text-gray-400 font-bengali-serif">বাংলা ভাষায় মোবাইল অ্যাপ্লিকেশনের তথ্য শীঘ্রই আসছে...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}