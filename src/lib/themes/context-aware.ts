/**
 * Context-Aware Theme System for BongoBishwa
 * Dynamically applies themes based on route context
 */

export type ThemeContext = 'home' | 'history' | 'technology' | 'literature' | 'culture' | 'about';

export interface ThemeConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    display: string;
  };
  styles: {
    borderRadius: string;
    boxShadow: string;
    backgroundPattern?: string;
  };
  animations: {
    pageTransition: string;
    hoverEffects: string;
    scrollEffects: string;
  };
}

export const THEME_CONFIGS: Record<ThemeContext, ThemeConfig> = {
  home: {
    name: 'BongoBishwa Home',
    colors: {
      primary: '#DC143C', // Alpona red
      secondary: '#FFD700', // Jamdani gold
      accent: '#4682B4', // River blue
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: '#1A1A1A',
      muted: '#666666',
      border: '#E5E5E5'
    },
    fonts: {
      primary: 'font-bengali',
      secondary: 'font-bengali-serif',
      display: 'font-display'
    },
    styles: {
      borderRadius: 'rounded-bengali',
      boxShadow: 'shadow-bengali-soft',
      backgroundPattern: 'bg-alpona-pattern'
    },
    animations: {
      pageTransition: 'animate-fade-in',
      hoverEffects: 'hover:scale-105',
      scrollEffects: 'animate-float'
    }
  },
  history: {
    name: 'Bengali History',
    colors: {
      primary: '#8B4513', // Sepia brown
      secondary: '#D2691E', // Clay
      accent: '#CD853F', // Peru
      background: '#FAEBD7', // Parchment
      surface: '#F5DEB3', // Wheat
      text: '#2F1B14', // Dark sepia
      muted: '#8B7355',
      border: '#D2B48C'
    },
    fonts: {
      primary: 'font-bengali-serif',
      secondary: 'font-serif',
      display: 'font-bengali-serif'
    },
    styles: {
      borderRadius: 'rounded-none',
      boxShadow: 'shadow-lg',
      backgroundPattern: 'bg-terracotta-texture'
    },
    animations: {
      pageTransition: 'animate-slide-up',
      hoverEffects: 'hover:shadow-xl',
      scrollEffects: 'animate-pulse-slow'
    }
  },
  technology: {
    name: 'Bengali Technology',
    colors: {
      primary: '#00FFFF', // Cyan neon
      secondary: '#FF00FF', // Magenta
      accent: '#00FF00', // Matrix green
      background: '#0A0A0A', // Near black
      surface: '#1A1A1A', // Dark gray
      text: '#E0E0E0', // Light gray
      muted: '#A0A0A0',
      border: '#333333'
    },
    fonts: {
      primary: 'font-mono',
      secondary: 'font-display',
      display: 'font-mono'
    },
    styles: {
      borderRadius: 'rounded-sm',
      boxShadow: 'shadow-tech-neon',
      backgroundPattern: undefined
    },
    animations: {
      pageTransition: 'animate-fade-in',
      hoverEffects: 'hover:text-tech-neon hover:shadow-tech-cyber',
      scrollEffects: 'animate-matrix-rain'
    }
  },
  literature: {
    name: 'Bengali Literature',
    colors: {
      primary: '#1A1A1A', // Literature ink
      secondary: '#666666', // Muted gray
      accent: '#333333', // Dark gray
      background: '#FFFFFF', // Paper white
      surface: '#F8F8F8', // Off white
      text: '#2C2C2C', // Rich black
      muted: '#666666',
      border: '#E0E0E0'
    },
    fonts: {
      primary: 'font-bengali-serif',
      secondary: 'font-serif',
      display: 'font-bengali-serif'
    },
    styles: {
      borderRadius: 'rounded-bengali',
      boxShadow: 'shadow-literature-elegant',
      backgroundPattern: undefined
    },
    animations: {
      pageTransition: 'animate-fade-in',
      hoverEffects: 'hover:shadow-md',
      scrollEffects: 'animate-slide-up'
    }
  },
  culture: {
    name: 'Bengali Culture',
    colors: {
      primary: '#FF1493', // Festival pink
      secondary: '#FF4500', // Vibrant orange
      accent: '#FFD700', // Celebration gold
      background: '#FFF5F5', // Light pink
      surface: '#FFE4E1', // Misty rose
      text: '#8B0000', // Dark red
      muted: '#CD5C5C',
      border: '#FFB6C1'
    },
    fonts: {
      primary: 'font-bengali',
      secondary: 'font-display',
      display: 'font-bengali'
    },
    styles: {
      borderRadius: 'rounded-jamdani',
      boxShadow: 'shadow-culture-vibrant',
      backgroundPattern: 'bg-jamdani-pattern'
    },
    animations: {
      pageTransition: 'animate-scale-in',
      hoverEffects: 'hover:scale-110 hover:rotate-1',
      scrollEffects: 'animate-bounce-soft'
    }
  },
  about: {
    name: 'About BongoBishwa',
    colors: {
      primary: '#4682B4', // River blue
      secondary: '#228B22', // Paddy green
      accent: '#FFB347', // Mango yellow
      background: '#FFFFFF',
      surface: '#F0F8FF', // Alice blue
      text: '#1A1A1A',
      muted: '#708090', // Monsoon gray
      border: '#B0C4DE'
    },
    fonts: {
      primary: 'font-bengali',
      secondary: 'font-display',
      display: 'font-display'
    },
    styles: {
      borderRadius: 'rounded-alpona',
      boxShadow: 'shadow-bengali-warm',
      backgroundPattern: undefined
    },
    animations: {
      pageTransition: 'animate-fade-in',
      hoverEffects: 'hover:shadow-lg',
      scrollEffects: 'animate-float'
    }
  }
};

/**
 * Get theme context from pathname
 */
export function getThemeFromPath(pathname: string): ThemeContext {
  if (pathname.startsWith('/history')) return 'history';
  if (pathname.startsWith('/technology')) return 'technology';
  if (pathname.startsWith('/literature')) return 'literature';
  if (pathname.startsWith('/culture')) return 'culture';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

/**
 * Get CSS classes for a specific theme context
 */
export function getThemeClasses(context: ThemeContext, element: 'background' | 'surface' | 'text' | 'accent' | 'border'): string {
  const theme = THEME_CONFIGS[context];
  
  switch (element) {
    case 'background':
      return `bg-[${theme.colors.background}] ${theme.styles.backgroundPattern || ''}`;
    case 'surface':
      return `bg-[${theme.colors.surface}] ${theme.styles.borderRadius} ${theme.styles.boxShadow}`;
    case 'text':
      return `text-[${theme.colors.text}] ${theme.fonts.primary}`;
    case 'accent':
      return `text-[${theme.colors.accent}] ${theme.fonts.display}`;
    case 'border':
      return `border-[${theme.colors.border}]`;
    default:
      return '';
  }
}

/**
 * Generate CSS custom properties for theme
 */
export function generateThemeCSS(context: ThemeContext): string {
  const theme = THEME_CONFIGS[context];
  
  return `
    :root {
      --theme-primary: ${theme.colors.primary};
      --theme-secondary: ${theme.colors.secondary};
      --theme-accent: ${theme.colors.accent};
      --theme-background: ${theme.colors.background};
      --theme-surface: ${theme.colors.surface};
      --theme-text: ${theme.colors.text};
      --theme-muted: ${theme.colors.muted};
      --theme-border: ${theme.colors.border};
      --theme-font-primary: ${theme.fonts.primary};
      --theme-font-secondary: ${theme.fonts.secondary};
      --theme-font-display: ${theme.fonts.display};
      --theme-border-radius: ${theme.styles.borderRadius};
      --theme-box-shadow: ${theme.styles.boxShadow};
    }
  `;
}