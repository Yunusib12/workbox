module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{css,js,html,json}'
	],
	globIgnores:[
		'**/workbox-config.js',
		'**/sw.js',
		'node_modules/**/*'
	],
	swDest: './sw.js',
	swSrc: './sw.js'
};