module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^lodash-es$": "lodash", // 如果你还是使用 lodash-es，可以通过别名映射到 lodash
  },
};
