module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.test.js?(x)"],
      setupFilesAfterEnv: [
        "<rootDir>/tests/utils/setupTestDB.js",
        "<rootDir>/config/jest.setup.js",
      ],
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
  ],
  preset: "@shelf/jest-mongodb",
}
