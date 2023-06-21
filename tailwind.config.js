/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: "'Montserrat', sans-serif"
            },
            colors: {
                'error-color': '#f80000'
            },
            screens: {
                xs: '576px'
            },
            keyframes: {
                loader: {
                    '0%': { transform: 'scale(1.5)' },
                    '100%': { transform: 'scale(0)' }
                }
            },
            animation: {
                'route-loader': '1s linear infinite loader'
            }
        }
    },
    plugins: []
}
