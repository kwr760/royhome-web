const commonIgnoreDirs = [
  '<rootDir>/node_modules/',
  '<rootDir>/build/',
  '<rootDir>/reports/',
  '<rootDir>/dist/',
];

module.exports = {
  preset: 'ts-jest',
  projects: [
    {
      displayName: 'browser',
      testEnvironment: 'jsdom',
      testMatch: [
        '**/test/**/?(*.)spec.ts?(x)',
      ],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      moduleNameMapper: {
        '\\.(svg|md|png)$': '<rootDir>/test/mock/file.ts',
        '\\.(css|scss)$': 'identity-obj-proxy',
      },
      modulePathIgnorePatterns: commonIgnoreDirs,
      testPathIgnorePatterns: commonIgnoreDirs,
      coveragePathIgnorePatterns: commonIgnoreDirs,
    },
  ],
  collectCoverage: true,
  coverageDirectory: './reports/coverage',
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  reporters: [
    'default', [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Results',
        outputPath: './reports/unit-results.html',
      },
    ],
  ],
  coverageReporters: [
    'text', 'html',
  ],
  clearMocks: true,
};
