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
                secondary: "#D5D8DD",
                tertiary: "#F7F7F8",
                accent: "#67707E",
            },
            animation: {
                bannerSlide: "bannerSlide 500ms ease-out forwards",
            },
            keyframes: {
                bannerSlide: {
                    "0%": {
                        transform: "scaleX(1)",
                    },
                    "100%": {
                        transform: "scaleX(0)",
                    },
                },
            },
        },
    },
    plugins: [],
};
