module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,js,html}'
	],
	globIgnores:[
		'**/workbox-config.js',
		'**/sw.js',
		'node_modules/**/*'
	],
	swDest: './sw.js',
	swSrc: './sw.js'
};