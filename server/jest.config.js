module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.test.js?(x)"],
      setupFilesAfterEnv: ["<rootDir>/tests/utils/setupTestDB.js"],
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
  ],
}
