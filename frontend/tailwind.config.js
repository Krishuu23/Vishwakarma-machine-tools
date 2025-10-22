/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        primary: "#031020", // Even Deeper Dark Blue - Almost black
        "primary-light": "#102F50", // Slightly lighter for gradients
        secondary: "#57BFFF", // Slightly brighter blue for stronger contrast/pop
        background: "#F5F7FA",
        surface: "#FFFFFF",
        "surface-light": "rgba(255, 255, 255, 0.9)",
        "text-primary": "#1C1C1E",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
      },
      textShadow: {
  'sm': '0 1px 2px var(--tw-shadow-color)', // Example
  'md': '0 2px 4px var(--tw-shadow-color)',
  'lg': '0 4px 8px var(--tw-shadow-color)',
  'xl': '0 8px 16px var(--tw-shadow-color)',
  'glow': '0 0 5px var(--secondary), 0 0 10px var(--secondary)', // Custom glow
},
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(#E5E7EB 1px, transparent 1px)', // A subtle gray dot pattern
      },
      backgroundSize: {
        'dot-pattern': '20px 20px', // Size of each repeating dot
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.1 },
          '50%': { transform: 'scale(1.02)', opacity: 0.15 },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '25%': { transform: 'translateY(-8px) translateX(5px) scale(1.02)' },
          '50%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '75%': { transform: 'translateY(8px) translateX(-5px) scale(0.98)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '25%': { transform: 'translateY(-5px) translateX(-3px) scale(1.01)' },
          '50%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '75%': { transform: 'translateY(5px) translateX(3px) scale(0.99)' },
        },
        'background-pan': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' }, // Or '200% 0%' for horizontal
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'pulse-slow': 'pulse-slow 8s infinite ease-in-out',
        'float-slow': 'float-slow 20s infinite ease-in-out',
        'float-fast': 'float-fast 15s infinite ease-in-out',
        'background-pan': 'background-pan 30s linear infinite', // Adjust speed as needed
        'fade-in-delay-100': 'fade-in-up 0.7s ease-out 0.1s forwards',
        'fade-in-delay-200': 'fade-in 0.7s ease-out 0.2s forwards',
        'fade-in-delay-400': 'fade-in 0.7s ease-out 0.4s forwards',
        'fade-in-delay-fast': 'fade-in 0.5s ease-out forwards', // For faster fades
        'fade-in-delay-slow': 'fade-in 0.8s ease-out forwards', // For slower fades
        // You can add more specific delays or create dynamic styles in React for precise control
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        'text-shadow': (value) => ({
          textShadow: value,
        }),
      },
      { values: theme('textShadow') }
    )
  },
  ],
}