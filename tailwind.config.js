/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#D4521A',
          'orange-light': '#E8693A',
          'orange-dim': '#A33D12',
          crimson: '#8B1A2A',
          'crimson-light': '#A82438',
          gold: '#C89B3C',
          'gold-light': '#E0B84E',
        },
        dark: {
          base: '#0A0806',
          card: '#141210',
          panel: '#1C1916',
          border: '#2A2420',
          muted: '#3A3028',
        },
        warm: {
          100: '#FAF5EC',
          200: '#F4EDD8',
          300: '#EBE0C8',
          400: '#D9CDB0',
          500: '#C0B090',
          600: '#9A8C72',
          700: '#6B5D4F',
          800: '#3D3228',
          900: '#1A1510',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float-slow': 'floatSlow 20s ease-in-out infinite',
        'float-med': 'floatMed 14s ease-in-out infinite',
        'float-fast': 'floatFast 9s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
        'spin-reverse': 'spinReverse 30s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'drift': 'drift 25s ease-in-out infinite',
        'grain': 'grain 0.8s steps(1) infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-18px) rotate(2deg)' },
          '66%': { transform: 'translateY(8px) rotate(-1.5deg)' },
        },
        floatMed: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-24px) translateX(12px)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        spinReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(20px) translateY(-15px)' },
          '50%': { transform: 'translateX(-10px) translateY(-25px)' },
          '75%': { transform: 'translateX(-20px) translateY(-8px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 3%)' },
          '40%': { transform: 'translate(2%, -1%)' },
          '50%': { transform: 'translate(-3%, 1%)' },
          '60%': { transform: 'translate(1%, -2%)' },
          '70%': { transform: 'translate(-2%, 3%)' },
          '80%': { transform: 'translate(3%, -3%)' },
          '90%': { transform: 'translate(-1%, 1%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
