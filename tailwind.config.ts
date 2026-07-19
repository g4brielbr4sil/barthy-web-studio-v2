import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        stage: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config
