export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // Custom Portfolio Color Palette
        primary: {
          DEFAULT: '#4B6EF5', // Indigo Blue - Trust, Professionalism
          50: '#EEF2FF',
          100: '#E0E7FF', 
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#4B6EF5', // Main primary
          600: '#4338CA',
          700: '#3730A3',
          800: '#312E81',
          900: '#1E1B4B',
        },
        secondary: {
          DEFAULT: '#00C6A2', // Teal Green - Innovation, Focus
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#00C6A2', // Main secondary
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        accent: {
          DEFAULT: '#FFB454', // Warm Amber - Warm contrast
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FFB454', // Main accent
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Custom background colors
        'bg-light': '#FAFAFA',
        'bg-dark': '#121212',
        'bg-dark-alt': '#1A1A1A',
        
        // Custom text colors
        'text-light': '#111827', // slate-900 equivalent
        'text-dark': '#E5E7EB',  // slate-200 equivalent
        
        // Keep existing colors for backwards compatibility
        'base-200': '#232946',
        'base-content': '#b8c1ec',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
