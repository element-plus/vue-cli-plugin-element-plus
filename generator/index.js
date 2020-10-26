module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      'element-plus': '^1.0.1-alpha.10'
    }
  })

  api.injectImports(utils.getMain(), `import './plugins/element.js'`)

  api.render({
    './src/plugins/element.js': './templates/src/plugins/element.js',
    './src/App.vue': './templates/src/App.vue'
  })

  if (opts.import === 'partial') {
    api.extendPackage({
      devDependencies: {
        'babel-plugin-component': '^1.1.1'
      }
    })
  } else if (opts.customTheme) {
    api.render({
      './src/element-variables.scss': './templates/src/element-variables.scss'
    })
    api.extendPackage({
      devDependencies: {
        'sass-loader': '^7.0.3',
        'sass': '^4.9.2'
      }
    })
  }

  api.onCreateComplete(() => {
    if (opts.import === 'partial') {
      utils.updateBabelConfig(cfg => {
        const pluginComponent = ['component', {
          'libraryName': 'element-plus',
          'styleLibraryName': 'theme-chalk'
        }]
        cfg.plugins = cfg.plugins || []
        cfg.plugins.push(pluginComponent)
        return cfg
      })
    }
  })
}
