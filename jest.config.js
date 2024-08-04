module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|expo-modules-core|expo-asset|@expo|expo|expo-constants)/)',
    ],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/__tests__/*.js',
      '!src/{db,model}/*.js'
    ],
    coverageReporters: ['text', 'lcov'],
    reporters: [
      "default",
      [
        "jest-sonar",
        {
          "outputDirectory": "reports",
          "outputName": "sonar-report.xml",
          "sonarQubeVersion": "LATEST"
        }
      ]
    ]
  };
