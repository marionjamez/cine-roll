/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0066FF',
                    dark: '#003366',
                },
                dark: {
                    DEFAULT: '#1a1a1a',
                    lighter: '#2d2d2d',
                }
            }
        },
    },
    plugins: [],
}
