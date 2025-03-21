/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#2291f9',
				secondary: '#F8560B',
				accent: '#50E3C2',
				text: '#333333',
				background: '#F5F5F5',
			},
		},
	},
	plugins: [],
}