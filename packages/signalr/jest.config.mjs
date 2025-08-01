export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true
    }]
  },
  moduleNameMapping: {
    '^@mixcore/(.*)$': '<rootDir>/../$1/src'
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ]
};