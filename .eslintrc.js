module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-unused-vars': ['off'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/explicit-function-return-type': ['warn'],
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				useTabs: true,
				semi: true,
				trailingComma: 'all',
				printWidth: 100,
				endOfLine: 'auto',
				tabWidth: 4,
			},
		],
	},
};