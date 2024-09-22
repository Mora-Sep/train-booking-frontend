module.exports = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios)", // Ensure axios is transpiled
    ],
    moduleNameMapper: {
        "^axios$": require.resolve("axios"), // Use axios from node_modules
    },
};
