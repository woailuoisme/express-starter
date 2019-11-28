module.exports = {
	verbose: true,
	collectCoverage: true,
	collectCoverageFrom: ['server/**/*.js', '!**/node_modules/**'],
	coverageDirectory: 'coverage',
	roots: ['./tests'],
};
