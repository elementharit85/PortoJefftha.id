// Konfigurasi Tailwind bersama untuk semua halaman (dimuat setelah CDN Tailwind)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: '#180707',
        deep: '#0e0404',
        surface: '#240c0c',
        line: '#3d1414',
        rose: { DEFAULT: '#ff9191', dark: '#cb5c5c' },
        ember: '#df310a',
      },
      fontFamily: { sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'] },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.15)' },
          '66%': { transform: 'translate(-30px,30px) scale(0.9)' },
        },
        gradient: { '0%': { backgroundPosition: '0% center' }, '100%': { backgroundPosition: '200% center' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'blob-slow': 'blob 26s ease-in-out infinite reverse',
        gradient: 'gradient 6s linear infinite',
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fadeUp .8s ease-out both',
        'spin-slow': 'spin 14s linear infinite',
      },
    },
  },
};
