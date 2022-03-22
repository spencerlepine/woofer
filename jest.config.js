module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js?(x)"],
      setupFilesAfterEnv: [
        "<rootDir>/client/tests/utils/test-setup.js",
        "<rootDir>/client/config/jest.setup.js",
      ],
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
    {
      displayName: "DOM",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/client/src/utils/test-utils.js"],
      // "extensionsToTreatAsEsm": [".jsx"],
      testMatch: ["<rootDir>/client/**/*.test.js"],
      setupFiles: ["dotenv/config"],
      modulePaths: ["/src/"],
      moduleDirectories: ["node_modules", "src"],
      watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
      ],
      moduleFileExtensions: ["js"],
      moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/client/src/__mocks__/styleMock.js",
        "\\.(png|gif|ttf|eot|svg)$": "<rootDir>/client/src/__mocks__/fileMock.js",
      },
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
  ],
  preset: "@shelf/jest-mongodb",
}