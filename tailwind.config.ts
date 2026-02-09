import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a'
        }
      },
      boxShadow: {
        soft: '0 20px 40px rgba(0,0,0,0.12)'
      }
    }
  },
  plugins: []
};

export default config;
