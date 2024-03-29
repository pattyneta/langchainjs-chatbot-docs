// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-family-heading": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #F2D03E 
		"--color-primary-50": "253 248 226", // #fdf8e2
		"--color-primary-100": "252 246 216", // #fcf6d8
		"--color-primary-200": "252 243 207", // #fcf3cf
		"--color-primary-300": "250 236 178", // #faecb2
		"--color-primary-400": "246 222 120", // #f6de78
		"--color-primary-500": "242 208 62", // #F2D03E
		"--color-primary-600": "218 187 56", // #dabb38
		"--color-primary-700": "182 156 47", // #b69c2f
		"--color-primary-800": "145 125 37", // #917d25
		"--color-primary-900": "119 102 30", // #77661e
		// secondary | #2D82B7 
		"--color-secondary-50": "224 236 244", // #e0ecf4
		"--color-secondary-100": "213 230 241", // #d5e6f1
		"--color-secondary-200": "203 224 237", // #cbe0ed
		"--color-secondary-300": "171 205 226", // #abcde2
		"--color-secondary-400": "108 168 205", // #6ca8cd
		"--color-secondary-500": "45 130 183", // #2D82B7
		"--color-secondary-600": "41 117 165", // #2975a5
		"--color-secondary-700": "34 98 137", // #226289
		"--color-secondary-800": "27 78 110", // #1b4e6e
		"--color-secondary-900": "22 64 90", // #16405a
		// tertiary | #c342cd 
		"--color-tertiary-50": "246 227 248", // #f6e3f8
		"--color-tertiary-100": "243 217 245", // #f3d9f5
		"--color-tertiary-200": "240 208 243", // #f0d0f3
		"--color-tertiary-300": "231 179 235", // #e7b3eb
		"--color-tertiary-400": "213 123 220", // #d57bdc
		"--color-tertiary-500": "195 66 205", // #c342cd
		"--color-tertiary-600": "176 59 185", // #b03bb9
		"--color-tertiary-700": "146 50 154", // #92329a
		"--color-tertiary-800": "117 40 123", // #75287b
		"--color-tertiary-900": "96 32 100", // #602064
		// success | #53A548 
		"--color-success-50": "229 242 228", // #e5f2e4
		"--color-success-100": "221 237 218", // #ddedda
		"--color-success-200": "212 233 209", // #d4e9d1
		"--color-success-300": "186 219 182", // #badbb6
		"--color-success-400": "135 192 127", // #87c07f
		"--color-success-500": "83 165 72", // #53A548
		"--color-success-600": "75 149 65", // #4b9541
		"--color-success-700": "62 124 54", // #3e7c36
		"--color-success-800": "50 99 43", // #32632b
		"--color-success-900": "41 81 35", // #295123
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #d21919 
		"--color-error-50": "248 221 221", // #f8dddd
		"--color-error-100": "246 209 209", // #f6d1d1
		"--color-error-200": "244 198 198", // #f4c6c6
		"--color-error-300": "237 163 163", // #eda3a3
		"--color-error-400": "224 94 94", // #e05e5e
		"--color-error-500": "210 25 25", // #d21919
		"--color-error-600": "189 23 23", // #bd1717
		"--color-error-700": "158 19 19", // #9e1313
		"--color-error-800": "126 15 15", // #7e0f0f
		"--color-error-900": "103 12 12", // #670c0c
		// surface | #25282A 
		"--color-surface-50": "222 223 223", // #dedfdf
		"--color-surface-100": "211 212 212", // #d3d4d4
		"--color-surface-200": "201 201 202", // #c9c9ca
		"--color-surface-300": "168 169 170", // #a8a9aa
		"--color-surface-400": "102 105 106", // #66696a
		"--color-surface-500": "37 40 42", // #25282A
		"--color-surface-600": "33 36 38", // #212426
		"--color-surface-700": "28 30 32", // #1c1e20
		"--color-surface-800": "22 24 25", // #161819
		"--color-surface-900": "18 20 21", // #121415	
	}
}