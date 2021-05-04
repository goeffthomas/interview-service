module.exports = {
	transform: {
		'^.+\\.(ts)?$': 'ts-jest',
	},
	testMatch: ['**/?(*.)+(test).[t]s'],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.ts'],
	coveragePathIgnorePatterns: ['src/config'],
	coverageDirectory: '<rootDir>/src',
	globals: {
		__DEV__: true,
	},
	maxConcurrency: 10,
	moduleFileExtensions: ['ts', 'json', 'js', 'node'],
	setupFiles: ['./jest.global.js'],
	verbose: true,
	testEnvironment: 'node',
	clearMocks: true,
};
