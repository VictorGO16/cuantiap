/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF9',
        sidebar: '#F5F5F4',
        border: '#E7E5E4',
        ink: {
          DEFAULT: '#1C1917',
          muted: '#78716C',
          faint: '#A8A29E',
        },
        accent: {
          DEFAULT: '#1D4ED8',
          hover: '#1E40AF',
          light: '#EFF6FF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        content: '720px',
      },
      spacing: {
        sidebar: '260px',
        'chat-panel': '380px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.DEFAULT'),
            maxWidth: 'none',
            a: { color: theme('colors.accent.DEFAULT'), textDecoration: 'none' },
            'h1,h2,h3,h4': { color: theme('colors.ink.DEFAULT'), fontWeight: '600' },
            'p,li': { color: theme('colors.ink.DEFAULT') },
            code: {
              color: theme('colors.ink.DEFAULT'),
              backgroundColor: theme('colors.sidebar'),
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontSize: '0.875em',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
