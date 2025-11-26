import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Bengali Cultural Color Palette
                        bengali: {
                                // Traditional colors
                                'saffron': '#FF9933',
                                'white': '#FFFFFF',
                                'green': '#138808',
                                'clay': '#D2691E',
                                'terracotta': '#CC4E2C',
                                'jamdani-gold': '#FFD700',
                                'alpona-red': '#DC143C',
                                'river-blue': '#4682B4',
                                'paddy-green': '#228B22',
                                'mango-yellow': '#FFB347',
                                'sunset-orange': '#FF6B35',
                                'monsoon-gray': '#708090',
                                'bamboo-green': '#9ACD32',
                                'hilsa-silver': '#C0C0C0',
                                'mustard-yellow': '#FFDB58',
                                'coral-pink': '#FF7F50',
                                // Theme-specific colors
                                'history-sepia': '#F4E4C1',
                                'history-parchment': '#E8DCC0',
                                'history-ink': '#2F1B14',
                                'tech-neon': '#00FFFF',
                                'tech-cyber': '#FF00FF',
                                'tech-matrix': '#00FF00',
                                'literature-paper': '#FAFAFA',
                                'literature-ink': '#1A1A1A',
                                'culture-festival': '#FF1493',
                                'culture-vibrant': '#FF4500'
                        },
                        // Context-aware theme colors
                        context: {
                                history: {
                                        primary: '#8B4513',
                                        secondary: '#D2691E',
                                        accent: '#CD853F',
                                        background: '#FAEBD7',
                                        surface: '#F5DEB3',
                                        text: '#2F1B14'
                                },
                                technology: {
                                        primary: '#00FFFF',
                                        secondary: '#FF00FF',
                                        accent: '#00FF00',
                                        background: '#0A0A0A',
                                        surface: '#1A1A1A',
                                        text: '#E0E0E0'
                                },
                                literature: {
                                        primary: '#1A1A1A',
                                        secondary: '#666666',
                                        accent: '#333333',
                                        background: '#FFFFFF',
                                        surface: '#F8F8F8',
                                        text: '#2C2C2C'
                                },
                                culture: {
                                        primary: '#FF1493',
                                        secondary: '#FF4500',
                                        accent: '#FFD700',
                                        background: '#FFF5F5',
                                        surface: '#FFE4E1',
                                        text: '#8B0000'
                                }
                        }
                },
                fontFamily: {
                        'bengali': ['Noto Sans Bengali', 'sans-serif'],
                        'bengali-serif': ['Noto Serif Bengali', 'serif'],
                        'display': ['Inter', 'system-ui', 'sans-serif']
                },
                animation: {
                        'fade-in': 'fadeIn 0.6s ease-in-out',
                        'slide-up': 'slideUp 0.6s ease-out',
                        'slide-down': 'slideDown 0.6s ease-out',
                        'scale-in': 'scaleIn 0.4s ease-out',
                        'bounce-soft': 'bounceSoft 2s infinite',
                        'float': 'float 3s ease-in-out infinite',
                        'pulse-slow': 'pulse 3s ease-in-out infinite',
                        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
                        'matrix-rain': 'matrixRain 1s linear infinite'
                },
                keyframes: {
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                        },
                        slideUp: {
                                '0%': { transform: 'translateY(100%)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        slideDown: {
                                '0%': { transform: 'translateY(-100%)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        scaleIn: {
                                '0%': { transform: 'scale(0.8)', opacity: '0' },
                                '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        bounceSoft: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' }
                        },
                        float: {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-20px)' }
                        },
                        textGlow: {
                                '0%': { textShadow: '0 0 10px currentColor' },
                                '100%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
                        },
                        matrixRain: {
                                '0%': { transform: 'translateY(-100%)' },
                                '100%': { transform: 'translateY(100vh)' }
                        }
                },
                backgroundImage: {
                        'alpona-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z' fill='%23DC143C' opacity='0.1'/%3E%3C/svg%3E\")",
                        'jamdani-pattern': "url(\"data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='50' height='50' fill='%23FFD700' opacity='0.05'/%3E%3Cpath d='M0 25 L25 0 L50 25 L25 50 Z' stroke='%23FFD700' stroke-width='2' fill='none' opacity='0.2'/%3E%3C/svg%3E\")",
                        'terracotta-texture': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E\")"
                },
                borderRadius: {
                        'bengali': '0.5rem',
                        'jamdani': '1rem',
                        'alpona': '2rem'
                },
                boxShadow: {
                        'bengali-soft': '0 4px 20px rgba(220, 20, 60, 0.1)',
                        'bengali-warm': '0 8px 32px rgba(255, 152, 0, 0.15)',
                        'tech-neon': '0 0 20px rgba(0, 255, 255, 0.5)',
                        'tech-cyber': '0 0 30px rgba(255, 0, 255, 0.3)',
                        'literature-elegant': '0 2px 8px rgba(0, 0, 0, 0.1)',
                        'culture-vibrant': '0 8px 25px rgba(255, 20, 147, 0.2)'
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
