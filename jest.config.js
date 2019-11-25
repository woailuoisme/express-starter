module.exports = {
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],
	coverageDirectory: 'coverage',
	roots: ['./test'],
};
