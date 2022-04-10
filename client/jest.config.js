module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "DOM",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/src/utils/test-utils.js"],
      // "extensionsToTreatAsEsm": [".jsx"],
      testMatch: ["<rootDir>/**/*.test.js"],
      setupFiles: ["dotenv/config"],
      modulePaths: ["/src/"],
      moduleDirectories: ["node_modules", "src"],
      watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
      ],
      moduleFileExtensions: ["js"],
      moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
        "\\.(png|gif|ttf|eot|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
      },
      transformIgnorePatterns: [
        "node_modules/(?!.*?/es/.*\\.js)",
      ],
    },
  ],
  preset: "@shelf/jest-mongodb",
}
