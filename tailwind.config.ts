import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        checkIntoClass: {
          primary: '#28a745',
          'primary-focus': '#218838',
          'primary-content': '#ffffff', 
          secondary: '#17a2b8',
          'secondary-focus': '#138496',
          'secondary-content': '#ffffff',
        },
      },
    ],
  },
  plugins: [daisyui],
};

export default config;
