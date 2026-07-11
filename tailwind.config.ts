import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { koma: { brown: '#3D1F0D', 'brown-light': '#6B3A2A', gold: '#F5C842', 'gold-light': '#FDE88A', cream: '#FDF8F0', 'cream-dark': '#F5EDD8' } }, fontFamily: { display: ['Noto Serif Thai','serif'], body: ['Noto Sans Thai','sans-serif'] } } },
  plugins: [],
}
export default config
