/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.7)',
        'glass-border': 'rgba(0, 0, 0, 0.1)',
        'accent-blue': '#007AFF',
        'accent-purple': '#5E5CE6',
        'brand-red': '#E63946',
        'accent-orange': '#FF9500',
        'surface-light': 'rgba(255, 255, 255, 0.95)',
        'surface-dark': 'rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        'display': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
        'body': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Segoe UI', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'count': 'count 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'strike': 'strike 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'expand': 'expand 2s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        count: {
          '0%': { transform: 'scale(1.15)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        strike: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        expand: {
          '0%': { 
            transform: 'translate(-50%, -50%) scale(0.5)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translate(-50%, -50%) scale(4)',
            opacity: '0'
          },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 20px 60px 0 rgba(0, 0, 0, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
        'accent': '0 0 40px rgba(0, 122, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
