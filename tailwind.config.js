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
            }
        }
    },
    plugins: []
}
