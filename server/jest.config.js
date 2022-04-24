module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 60,
    },
  },
  coverageReporters: ["json", "html", "lcov"],
  coveragePathIgnorePatterns: ["/node_modules/", "/*.test.js/"],
  projects: [
    {
      displayName: "node",
      testEnvironment: "node",
      testMatch: ["<rootDir>/**/*.test.js?(x)"],
      setupFilesAfterEnv: [
        "<rootDir>/tests/utils/test-setup.js",
        "<rootDir>/config/jest.setup.js",
      ],
      transformIgnorePatterns: ["node_modules/(?!.*?/es/.*\\.js)"],
    },
  ],
  preset: "@shelf/jest-mongodb",
}
