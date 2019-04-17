module.exports = {
	theme: {
		fontFamily: {
			serif: ['Kameron', 'sans-serif']
		},
		extend: {
			colors: {
				cyan: '#9cdbff'
			},
			margin: {
				'96': '24rem',
				'128': '32rem'
			}
		}
	},
	variants: {
		opacity: ['responsive', 'hover']
	},

	plugins: [
		require('tailwindcss-alpha')({
			modules: {
				backgroundColors: true,
				textColors: true,
				borderColors: true
			},
			alpha: {
				'0': '0',
				'25': '.25',
				'30': '.3',
				'40': '.4',
				'50': '.5',
				'75': '.75',
				'85': '.85',
				'100': '1'
			}
		}),

		require('tailwindcss-visuallyhidden')(),

		function({ addVariant }) {
			addVariant('on', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) => `.on${separator}${className}[data-state="on"]`
				)
			})
		},

		function({ addVariant }) {
			addVariant('action', ({ modifySelectors, separator }) => {
				modifySelectors(
					({ className }) =>
						`.action${separator}${className}[data-state="action"]`
				)
			})
		},

		function({ addUtilities }) {
			addUtilities(
				{
					'.perf-fixed': {
						position: 'fixed',
						transform: 'translateZ(0)'
					}
				},
				{
					variants: ['responsive']
				}
			)
		}
	]
}
