module.exports = {
  "roots": [
    '<rootDir>/src/',
    '<rootDir>/__test__/'
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"], 
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupEnzyme.ts",
}