module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native|expo-modules-core|expo-asset|@expo|expo|expo-constants)/)',
    ],
  };
  