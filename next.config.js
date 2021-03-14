const path = require('path')
const withImages = require("next-images")

module.exports = withImages({
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, '')
    return config
  },
})
