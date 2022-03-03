import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
const breakpoints = createBreakpoints({
	xs: '320px',
	sm: '480px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1536px',
});
const theme = extendTheme({
	colors: {
		brand: {
			icons: '#118ab2',
			// ...
			textPrimary: '#4a5570',
			textSecondary: '#7B8793',
			green: '#06d6a0',
		},
	},

	fonts: {
		body: 'Tajawal, sans-serif',
	},
	styles: {
		global: ({ dir }) => ({
			// styles for the `body`
			body: {
				fontFamily: 'Tajawal, sans-serif',

				direction: 'rtl',
			},
		}),
	},
	breakpoints,
});

export default theme;
