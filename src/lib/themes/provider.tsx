/**
 * Theme Provider Hook for Context-Aware Theming
 */

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContext, getThemeFromPath, generateThemeCSS, THEME_CONFIGS } from './context-aware';

interface ThemeProviderState {
  context: ThemeContext;
  setContext: (context: ThemeContext) => void;
  themeConfig: typeof THEME_CONFIGS[ThemeContext];
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultContext = 'home',
  pathname,
}: {
  children: React.ReactNode;
  defaultContext?: ThemeContext;
  pathname?: string;
}) {
  const [context, setContext] = useState<ThemeContext>(() => {
    return getThemeFromPath(pathname || '') || defaultContext;
  });

  const themeConfig = THEME_CONFIGS[context];

  // Apply theme CSS custom properties
  useEffect(() => {
    const css = generateThemeCSS(context);
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.id = 'theme-styles';
    
    // Remove existing theme styles
    const existingStyles = document.getElementById('theme-styles');
    if (existingStyles) {
      existingStyles.remove();
    }
    
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.getElementById('theme-styles')) {
        document.getElementById('theme-styles')?.remove();
      }
    };
  }, [context]);

  // Update body classes for theme
  useEffect(() => {
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .trim();
    
    document.body.classList.add(`theme-${context}`);
    
    // Add theme-specific body classes
    const themeClasses = {
      home: 'bg-white text-gray-900',
      history: 'bg-[#FAEBD7] text-[#2F1B14]',
      technology: 'bg-[#0A0A0A] text-[#E0E0E0]',
      literature: 'bg-white text-[#2C2C2C]',
      culture: 'bg-[#FFF5F5] text-[#8B0000]',
      about: 'bg-white text-gray-900'
    };
    
    document.body.classList.add(...themeClasses[context].split(' '));
  }, [context]);

  const value = {
    context,
    setContext,
    themeConfig,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    return {
      context: 'home',
      setContext: () => {},
      themeConfig: THEME_CONFIGS['home'],
    };
  }
  return context;
}

/**
 * Hook to get theme-aware CSS classes
 */
export function useThemeClasses() {
  const { context, themeConfig } = useTheme();
  
  const classes = {
    background: `bg-[${themeConfig.colors.background}] ${themeConfig.styles.backgroundPattern || ''}`,
    surface: `bg-[${themeConfig.colors.surface}] ${themeConfig.styles.borderRadius} ${themeConfig.styles.boxShadow}`,
    text: `text-[${themeConfig.colors.text}] ${themeConfig.fonts.primary}`,
    accent: `text-[${themeConfig.colors.accent}] ${themeConfig.fonts.display}`,
    border: `border-[${themeConfig.colors.border}]`,
    primary: `text-[${themeConfig.colors.primary}]`,
    secondary: `text-[${themeConfig.colors.secondary}]`,
    muted: `text-[${themeConfig.colors.muted}]`,
    card: `bg-[${themeConfig.colors.surface}] border-[${themeConfig.colors.border}] ${themeConfig.styles.borderRadius} ${themeConfig.styles.boxShadow}`,
    button: `bg-[${themeConfig.colors.primary}] text-[${themeConfig.colors.background}] hover:bg-[${themeConfig.colors.secondary}] transition-colors ${themeConfig.styles.borderRadius}`,
    input: `bg-[${themeConfig.colors.background}] border-[${themeConfig.colors.border}] text-[${themeConfig.colors.text}] ${themeConfig.styles.borderRadius}`,
    pageTransition: themeConfig.animations.pageTransition,
    hoverEffects: themeConfig.animations.hoverEffects,
    scrollEffects: themeConfig.animations.scrollEffects,
  };

  return { classes };
}