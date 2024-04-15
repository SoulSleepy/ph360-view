import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        colors: {
            primary: '#b3bbcadd',
            secondary: '#ced4dfdd',
            tertiary: '#c7d0dfcd',
            textBase: '#021b48',
            input: '#517ecb',
            white: '#fff',
            delete: '#6c75868f',
            navigate: '#535892bd'
        },
        extend: {
            boxShadow: {
                'dark': '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
                'neon': '1px 2px 4px 0px rgb(0, 13, 161), 2px 4px 8px 0px rgb(0, 13, 161), 2px 4px 16px 0px rgb(0, 13, 161)'
            }
        },
    },
    plugins: [],
}
export default config
