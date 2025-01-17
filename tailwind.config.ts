import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: "0",
					sm: "0",
					md: "0",
					lg: "0",
					xl: "0",
					"2xl": "2rem",
					"3xl": "2rem",
					"4xl": "2rem",
				},
				screens: {
					xs: "22.5rem",  // 360px ÷ 16 = 22.5rem
					sm: "35.9375rem",  // 575px ÷ 16 = 35.9375rem
					md: "48rem",  // 768px ÷ 16 = 48rem
					lg: "64rem",  // 1024px ÷ 16 = 64rem
					xl: "80rem",  // 1280px ÷ 16 = 80rem
					"2xl": "90rem",  // 1440px ÷ 16 = 90rem
					"3xl": "105rem",  // 1680px ÷ 16 = 105rem
					"4xl": "120rem",  // 1920px ÷ 16 = 120rem
				}

			},
			colors: {
				primary: {
					DEFAULT: "#23375f",
					50: "#ecf0f7",
					100: "#c4cfe5",
					200: "#a7b8d9",
					300: "#7f97c7",
					400: "#6683bd",
					500: "#4064ac",
					600: "#3a5b9d",
					700: "#2d477a",
					800: "#23375f",
					900: "#1b2a48"
				},
				secondary: {
					DEFAULT: "#610b0f",
					50: "#fde8e9",
					100: "#f7b8bb",
					200: "#f4969a",
					300: "#ee666c",
					400: "#eb494f",
					500: "#e61b23",
					600: "#d11920",
					700: "#a31319",
					800: "#7f0f13",
					900: "#610b0f"
				},
				blue: {
					50: "#ecf0f7",
					100: "#c4cfe5",
					200: "#a7b8d9",
					300: "#7f97c7",
					400: "#6683bd",
					500: "#4064ac",
					600: "#3a5b9d",
					700: "#2d477a",
					800: "#23375f",
					900: "#1b2a48"
				},
				red: {
					50: "#fde8e9",
					100: "#f7b8bb",
					200: "#f4969a",
					300: "#ee666c",
					400: "#eb494f",
					500: "#e61b23",
					600: "#d11920",
					700: "#a31319",
					800: "#7f0f13",
					900: "#610b0f"
				},
				white: "#ffffff",
				black: "#000000",
			},
			fontSize: {
				"3xl": [
					"1.625rem", // Font size: 26px ÷ 16 = 1.625rem
					{
						lineHeight: "2.03125rem", // Line height: 32.5px ÷ 16 = 2.03125rem
						fontWeight: "400",        // Font weight (Regular)
						letterSpacing: '-0.01em',
					},
				],
				"4xl": [
					"2rem", // Font size (32px ÷ 16 = 2rem)
					{
						lineHeight: "2.5rem", // Line height (40px ÷ 16 = 2.5rem)
						fontWeight: "500",    // Font weight
						letterSpacing: '-0.02em',
					},
				],
				"5xl": [
					"2.44125rem", // Font size: 39.06px ÷ 16 = 2.44125rem
					{
						lineHeight: "2.929375rem", // Line height: 46.87px ÷ 16 = 2.929375rem
						fontWeight: "700",         // Font weight
						letterSpacing: '-0.03em',
					},
				],
				h1: [
					"5rem", // Font size: 5rem = 80px
					{
						lineHeight: "6.25rem", // Line height: 6.25rem = 100px
						fontWeight: "500",     // Font weight
						letterSpacing: "-0.03em", // Letter spacing
					},
				],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
