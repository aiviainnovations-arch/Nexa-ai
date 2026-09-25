/** Nexa AI design tokens. Change colours / fonts here. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070D', // page background
        navy: '#0B1020', // secondary surface
        panel: '#111827', // raised surface
        azure: '#2563EB', // primary accent
        iris: '#7C3AED', // secondary accent
        aqua: '#22D3EE', // "live data" accent - used sparingly
        mist: '#F3F5FA', // primary text
        steel: '#8A94A8', // secondary text
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-9px)' } },
        sway: {
          '0%,100%': { transform: 'rotateY(-5deg) rotateX(2deg)' },
          '50%': { transform: 'rotateY(5deg) rotateX(-2deg)' },
        },
        pulsering: {
          '0%': { transform: 'scale(.55)', opacity: '.55' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        dash: { to: { strokeDashoffset: '-20' } },
        flow: {
          '0%': { left: '0%', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { left: '100%', opacity: '0' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        kenburns: {
          '0%': { transform: 'scale(1.03) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.13) translate3d(-1.5%,-1%,0)' },
        },
        bar: { '0%,100%': { transform: 'scaleY(.72)' }, '50%': { transform: 'scaleY(1)' } },
        shimmer: { '0%': { opacity: '.35' }, '50%': { opacity: '.9' }, '100%': { opacity: '.35' } },
        cursora: {
          '0%,100%': { transform: 'translate(6%,10%)' },
          '35%': { transform: 'translate(62%,26%)' },
          '70%': { transform: 'translate(30%,62%)' },
        },
        cursorb: {
          '0%,100%': { transform: 'translate(70%,64%)' },
          '40%': { transform: 'translate(24%,18%)' },
          '75%': { transform: 'translate(58%,40%)' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(3%,-4%,0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sway: 'sway 14s ease-in-out infinite',
        pulsering: 'pulsering 3.6s ease-out infinite',
        dash: 'dash 1.2s linear infinite',
        flow: 'flow 3.4s linear infinite',
        blink: 'blink 2s ease-in-out infinite',
        kenburns: 'kenburns 24s ease-in-out infinite alternate',
        bar: 'bar 2.6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        orbit: 'spin 18s linear infinite',
        'orbit-rev': 'spin 28s linear infinite reverse',
        cursora: 'cursora 11s ease-in-out infinite',
        cursorb: 'cursorb 13s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
