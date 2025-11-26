/**
 * Context-Aware Navbar Component
 * Dynamically adapts styling and behavior based on current theme context
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, BookOpen, Microscope, ScrollText, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme, useThemeClasses } from '@/lib/themes/provider';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: 'হোম',
    href: '/',
    icon: Home,
    description: 'বঙ্গবিশ্বের প্রধান পৃষ্ঠা'
  },
  {
    name: 'ইতিহাস',
    href: '/history',
    icon: ScrollText,
    description: 'হাজার বছরের বাংলার ইতিহাস'
  },
  {
    name: 'প্রযুক্তি',
    href: '/technology',
    icon: Microscope,
    description: 'বাংলা ভাষা ও প্রযুক্তি'
  },
  {
    name: 'সাহিত্য',
    href: '/literature',
    icon: BookOpen,
    description: 'বাংলা সাহিত্যের সমৃদ্ধ ভান্ডার'
  },
  {
    name: 'সংস্কৃতি',
    href: '/culture',
    icon: Users,
    description: 'বাঙালির সংস্কৃতি ও ঐতিহ্য'
  },
  {
    name: 'সম্পর্কে',
    href: '/about',
    icon: Info,
    description: 'বঙ্গবিশ্ব সম্পর্কে জানুন'
  }
];

function DesktopNav() {
  const pathname = usePathname();
  const { context } = useTheme();
  const classes = useThemeClasses();

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative px-4 py-2 rounded-lg transition-all duration-300",
                "flex items-center space-x-2 font-medium",
                isActive
                  ? `${classes.primary} ${classes.background} shadow-lg`
                  : `${classes.text} hover:${classes.surface}`
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="font-bengali">{item.name}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={cn(
                    "absolute inset-0 rounded-lg",
                    classes.background,
                    "z-[-1]"
                  )}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const classes = useThemeClasses();

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          classes.text
        )}
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">মেনু খুলুন</span>
      </Button>
      
      {open && (
        <div className={cn(
          "absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50",
          classes.background
        )}>
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <div className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive
                        ? `${classes.primary} ${classes.surface}`
                        : `hover:${classes.surface}`
                    )}>
                      <Icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium font-bengali">{item.name}</div>
                        <div className={cn("text-xs", classes.muted)}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeIndicator() {
  const { context, themeConfig } = useTheme();
  const classes = useThemeClasses();

  const contextInfo = {
    home: { label: 'হোম', color: 'bg-red-500' },
    history: { label: 'ইতিহাস', color: 'bg-amber-700' },
    technology: { label: 'প্রযুক্তি', color: 'bg-cyan-500' },
    literature: { label: 'সাহিত্য', color: 'bg-gray-800' },
    culture: { label: 'সংস্কৃতি', color: 'bg-pink-500' },
    about: { label: 'সম্পর্কে', color: 'bg-blue-500' }
  };

  const info = contextInfo[context];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full",
        classes.surface
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", info.color)} />
      <span className="text-xs font-medium font-bengali">{info.label}</span>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { context } = useTheme();
  const classes = useThemeClasses();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Context-specific navbar styling
  const navbarStyles = {
    home: scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent",
    history: scrolled ? "bg-[#FAEBD7]/95 backdrop-blur-md shadow-lg border-b border-[#D2B48C]" : "bg-[#FAEBD7]/80",
    technology: scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg border-b border-[#333333]" : "bg-[#0A0A0A]/80",
    literature: scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent",
    culture: scrolled ? "bg-[#FFF5F5]/95 backdrop-blur-md shadow-lg border-b border-[#FFB6C1]" : "bg-[#FFF5F5]/80",
    about: scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-transparent"
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navbarStyles[context]
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                context === 'technology' ? 'bg-cyan-500' : 'bg-red-500'
              )}>
                <span className="text-white font-bold text-sm">ব</span>
              </div>
              <span className={cn(
                "text-xl font-bold font-bengali hidden sm:block",
                classes.text
              )}>
                বঙ্গবিশ্ব
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Theme Indicator */}
            <ThemeIndicator />

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Context-specific bottom accent */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "2px" }}
            exit={{ height: 0 }}
            className={cn(
              "w-full",
              context === 'home' && "bg-red-500",
              context === 'history' && "bg-amber-700",
              context === 'technology' && "bg-cyan-500",
              context === 'literature' && "bg-gray-800",
              context === 'culture' && "bg-pink-500",
              context === 'about' && "bg-blue-500"
            )}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}