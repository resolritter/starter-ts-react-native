module.exports = {
  preset: "react-native",
  displayName: "app",
  projects: ["<rootDir>/e2e/jest.config.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: { "^(src|test)/(.*)": `${__dirname}/$1/$2` },
  testRegex: `^${__dirname}/test/e2e/batch/.*\\.ts$`.split("/").join("\\/"),
}
