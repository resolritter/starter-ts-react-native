const { resolve: resolvePath } = require("path")

module.exports = {
  resolver: { extraNodeModules: { src: resolvePath(__dirname, "src") } },
  transformer: {
    getTransformOptions: async function () {
      return {
        transform: { experimentalImportSupport: false, inlineRequires: true },
      }
    },
  },
}
