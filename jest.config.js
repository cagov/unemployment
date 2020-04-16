/**
 * In order for Azure DevOps artifacts to be published for test results,
 * and code coverage metrics, we need to use jest-junit and cobertura
 * test and coverage reporters respectively.
 */
const outputDirectory = "<rootDir>/test-output";
module.exports = {
  coverageDirectory: outputDirectory,
  coverageReporters: ["cobertura"],
  reporters: ["default", ["jest-junit", { outputDirectory }]],
  roots: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/setupTestFramework.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
