import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
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
			// === FLUID FONT SIZES ===
			// clamp(min, preferred, max) - designed to be pixel-perfect at 1440px
			fontSize: {
				// Body text sizes
				'fluid-xs': ['clamp(0.6875rem, 0.625rem + 0.27vw, 0.8125rem)', { lineHeight: '1.5' }],     // 11px → 13px
				'fluid-sm': ['clamp(0.75rem, 0.68rem + 0.31vw, 0.875rem)', { lineHeight: '1.5' }],         // 12px → 14px
				'fluid-base': ['clamp(0.8125rem, 0.74rem + 0.32vw, 0.9375rem)', { lineHeight: '1.5' }],    // 13px → 15px
				'fluid-md': ['clamp(0.875rem, 0.8rem + 0.33vw, 1rem)', { lineHeight: '1.5' }],             // 14px → 16px
				'fluid-lg': ['clamp(0.9375rem, 0.875rem + 0.27vw, 1.0625rem)', { lineHeight: '1.5' }],     // 15px → 17px
				'fluid-xl': ['clamp(1rem, 0.93rem + 0.31vw, 1.125rem)', { lineHeight: '1.4' }],            // 16px → 18px
				// Heading sizes
				'fluid-h6': ['clamp(1.0625rem, 0.98rem + 0.36vw, 1.25rem)', { lineHeight: '1.4' }],        // 17px → 20px
				'fluid-h5': ['clamp(1.125rem, 1.04rem + 0.38vw, 1.375rem)', { lineHeight: '1.3' }],        // 18px → 22px
				'fluid-h4': ['clamp(1.1875rem, 1.1rem + 0.38vw, 1.4375rem)', { lineHeight: '1.3' }],       // 19px → 23px
				'fluid-h3': ['clamp(1.25rem, 1.15rem + 0.44vw, 1.5rem)', { lineHeight: '1.3' }],           // 20px → 24px
				'fluid-h2': ['clamp(1.375rem, 1.25rem + 0.56vw, 1.625rem)', { lineHeight: '1.2' }],        // 22px → 26px
				'fluid-h1': ['clamp(1.5rem, 1.38rem + 0.56vw, 1.75rem)', { lineHeight: '1.2' }],           // 24px → 28px
			},
			// === FLUID BORDER RADIUS ===
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Fluid radius tokens - pixel-perfect at 1440px
				'fluid-lg': 'clamp(1.25rem, 1.25rem + 0.4167vw, 1.625rem)',    // 20px → 26px (26px at 1440px)
				'fluid-xl': 'clamp(1.5rem, 1.5rem + 0.4167vw, 1.875rem)',      // 24px → 30px (30px at 1440px)
				'pill': '9999px',                                            // Pill shape
			},
			// === RESPONSIVE MAX WIDTHS ===
			maxWidth: {
				// Content containers - pixel-perfect at 1440px
				'form-sm': 'min(28.125rem, 92vw)',     // 450px form container
				'form-md': 'min(26.125rem, 90vw)',     // 418px social buttons
				'form-lg': 'min(25rem, 88vw)',         // 400px divider
				'tab-sm': 'min(23.1875rem, 85vw)',     // 371px tab switcher
				'tab-md': 'min(18.0625rem, 80vw)',     // 289px tab container
			},
			// === FLUID HEIGHTS ===
			height: {
				'input': 'clamp(2.75rem, 2.5rem + 0.65vw, 3.125rem)',       // 44px → 50px
				'btn': 'clamp(2.625rem, 2.4rem + 0.58vw, 3rem)',            // 42px → 48px
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
			},
			fontFamily: {
				sans: ['var(--font-mulish)', 'Mulish', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
