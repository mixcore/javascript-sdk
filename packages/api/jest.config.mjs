import baseConfig from '../../jest.base.config.mjs';

export default {
  ...baseConfig,
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@mixcore/(.*)$': '<rootDir>/../$1/src'
  }
};