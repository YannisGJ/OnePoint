/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        color: {
            pageBg: "#1f2123",
        },
        extend: {
            backgroundImage: {
                steamSplash: "url('/Steamsplash.svg')",
                eaSplash: "url('/EAsplash.svg')",
                epicSplash: "url('/Epicsplash.svg')",
                bgSteamHome: "url('/HomePage.svg')",
            },
            dropShadow: {
                loggincards: [
                    "0 4px 3px rgb(0 0 0 / 0.11)",
                    "0 2px 2px rgb(0 0 0 / 0.10)",
                ],
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        function ({ addUtilities }: { addUtilities: any }) {
            const newUtilities = {
                ".clip-polygon-top": {
                    clipPath: "polygon(0 0, 100% 0, 0% 100%)",
                },
                ".clip-polygon-center": {
                    clipPath: "polygon(25% 0, 100% 0, 75% 100%, 0% 100%)",
                },
                ".clip-polygon-bottom": {
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
