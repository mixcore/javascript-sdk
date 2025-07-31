import baseConfig from '../../jest.base.config.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  ...baseConfig,
  displayName: '@mixcore/template',
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: path.resolve(__dirname, '../../tsconfig.base.json')
      }
    ]
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@mixcore/api$': '<rootDir>/../../packages/api/src',
    '^@mixcore/template$': '<rootDir>/src'
  }
};