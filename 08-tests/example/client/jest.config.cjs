module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
        jsx: 'react-jsx',
        types: ['jest', '@testing-library/jest-dom', 'vite/client'],
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'node',
        skipLibCheck: true,
      },
    }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.cjs',
    '^/vite\\.svg$': '<rootDir>/__mocks__/fileMock.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
