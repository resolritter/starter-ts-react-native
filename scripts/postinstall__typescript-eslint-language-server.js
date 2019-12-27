// While upstream hasn't been published https://github.com/Quramy/typescript-eslint-language-service
// Using this repo https://github.com/manuth/typescript-eslint-language-service/tree/eslint-6.7-fix

const path = require("path")
const fs = require("fs")
const npmNodeModules = path.resolve(__dirname, "../node_modules")
const tsserverPluginPath = path.resolve(
  npmNodeModules,
  "./typescript-eslint-language-service",
)
console.log(npmNodeModules, tsserverPluginPath)
const execSync = require("child_process").execSync

const targetLibraryPath = path.resolve(tsserverPluginPath, "./index.js")

if (!fs.existsSync(targetLibraryPath)) {
  if (!fs.existsSync(path.resolve(tsserverPluginPath, "./node_modules"))) {
    execSync("npm install", { cwd: tsserverPluginPath })
  }
  try {
    // typescript is outputting some errors, idk what's happening
    execSync("npm run-script build", { cwd: tsserverPluginPath, stdio: "pipe" })
  } catch (_) {}

  const generatedLibraryPath = path.resolve(
    tsserverPluginPath,
    "./lib/index.js",
  )
  if (fs.existsSync(generatedLibraryPath)) {
    fs.symlinkSync(generatedLibraryPath, targetLibraryPath)
  } else {
    console.error(
      "Post-install script was not able to generate the file for typescript-eslint-language-service.",
    )
  }
}
