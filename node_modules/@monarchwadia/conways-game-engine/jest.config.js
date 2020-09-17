module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["jest-expect-message", "./test/helpers.ts"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"]
};
