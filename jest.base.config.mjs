export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.base.json'
      }
    ]
  },
  moduleNameMapper: {
    '^@mixcore/(.*)$': '<rootDir>/packages/$1/src',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@mixcore/.*))'
  ],
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};