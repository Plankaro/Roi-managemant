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
    				DEFAULT: '0',
    				sm: '0',
    				md: '0',
    				lg: '0',
    				xl: '0',
    				'2xl': '2rem',
    				'3xl': '2rem',
    				'4xl': '2rem'
    			},
    			screens: {
    				xs: '22.5rem',
    				sm: '35.9375rem',
    				md: '48rem',
    				lg: '64rem',
    				xl: '80rem',
    				'2xl': '90rem',
    				'3xl': '105rem',
    				'4xl': '120rem'
    			}
    		},
    		colors: {
    			primary: {
    				'50': '#ecf0f7',
    				'100': '#c4cfe5',
    				'200': '#a7b8d9',
    				'300': '#7f97c7',
    				'400': '#6683bd',
    				'500': '#4064ac',
    				'600': '#3a5b9d',
    				'700': '#2d477a',
    				'800': '#23375f',
    				'900': '#1b2a48',
    				DEFAULT: '#23375f'
    			},
    			secondary: {
    				'50': '#fde8e9',
    				'100': '#f7b8bb',
    				'200': '#f4969a',
    				'300': '#ee666c',
    				'400': '#eb494f',
    				'500': '#e61b23',
    				'600': '#d11920',
    				'700': '#a31319',
    				'800': '#7f0f13',
    				'900': '#610b0f',
    				DEFAULT: '#610b0f'
    			},
    			blue: {
    				'50': '#ecf0f7',
    				'100': '#c4cfe5',
    				'200': '#a7b8d9',
    				'300': '#7f97c7',
    				'400': '#6683bd',
    				'500': '#4064ac',
    				'600': '#3a5b9d',
    				'700': '#2d477a',
    				'800': '#23375f',
    				'900': '#1b2a48'
    			},
    			red: {
    				'50': '#fde8e9',
    				'100': '#f7b8bb',
    				'200': '#f4969a',
    				'300': '#ee666c',
    				'400': '#eb494f',
    				'500': '#e61b23',
    				'600': '#d11920',
    				'700': '#a31319',
    				'800': '#7f0f13',
    				'900': '#610b0f'
    			},
    			white: '#ffffff',
    			black: '#000000',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		fontSize: {
    			'3xl': [
    				'1.625rem',
    				{
    					lineHeight: '2.03125rem',
    					fontWeight: '400',
    					letterSpacing: '-0.01em'
    				}
    			],
    			'4xl': [
    				'2rem',
    				{
    					lineHeight: '2.5rem',
    					fontWeight: '500',
    					letterSpacing: '-0.02em'
    				}
    			],
    			'5xl': [
    				'2.44125rem',
    				{
    					lineHeight: '2.929375rem',
    					fontWeight: '700',
    					letterSpacing: '-0.03em'
    				}
    			],
    			h1: [
    				'5rem',
    				{
    					lineHeight: '6.25rem',
    					fontWeight: '500',
    					letterSpacing: '-0.03em'
    				}
    			]
    		},
    		backgroundImage: {
    			'gradient-border': 'linear-gradient(180deg, #1B2A48, #4166AE)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
