/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "custom-blue": "#003590",
                "custom-light-blue": "00B3F0",
                "custom-milky": "#F2F1ED",
            },
        },
    },
    plugins: [],
};
