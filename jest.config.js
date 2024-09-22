module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // For configuring test environments
    testEnvironment: 'jsdom', // For browser-like environment
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transpile JavaScript and TypeScript
    },
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transformIgnorePatterns: ['/node_modules/(?!axios)'], // Ensure certain modules are transpiled
};
