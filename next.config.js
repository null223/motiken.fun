const path = require('path')
const withImages = require("next-images")

module.exports = withImages({
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, '')
    // knowledge/*.md を文字列として import できるようにする（/api/ask 用）
    config.module.rules.push({ test: /\.md$/, type: 'asset/source' })
    return config
  },
})
