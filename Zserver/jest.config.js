module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/server/**/*.test.js?(x)"],
      setupFilesAfterEnv: ["<rootDir>/server/utils/test-utils.js"],
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
  ],
}
