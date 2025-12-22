/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-indigo': '#1e1b4b',
        'obsidian': '#0f0f23',
        'cosmic-purple': '#a855f7',
        'stellar-cyan': '#22d3ee',
        'nebula-pink': '#ec4899',
        'galaxy-blue': '#3b82f6',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #0f0f23 100%)',
        'cosmic-gradient': 'linear-gradient(180deg, #1e1b4b 0%, #0f0f23 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
