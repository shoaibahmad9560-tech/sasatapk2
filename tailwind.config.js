/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                amazon: {
                    blue: '#131921',
                    light_blue: '#232f3e',
                    yellow: '#febd69',
                    orange: '#f90',
                    default: '#0f1111'
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'Arial', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
