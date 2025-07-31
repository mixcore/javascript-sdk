export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.base.json'
      }
    ]
  },
  moduleNameMapper: {
    '^@mixcore/(.*)$': '<rootDir>/packages/$1/src'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@mixcore/.*))'
  ]
};