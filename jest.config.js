export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "\\.css\\.ts$": "@vanilla-extract/jest-transform",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
