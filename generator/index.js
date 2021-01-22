module.exports = (api, opts, rootOptions) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      'element-plus': '^1.0.2-beta.28'
    }
  })

  api.injectImports(api.entryFile, `import installElementPlus from './plugins/element'`)

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
        'sass-loader': '^10.0.4',
        'sass': '^1.27.0'
      }
    })
  }

  api.afterInvoke(() => {
    const { EOL } = require('os')
    const fs = require('fs')
    const contentMain = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/createApp\(App\)(\.use\(\w*\))*\.mount\('#app'\)/))
    const renderContent = lines[renderIndex]
    lines[renderIndex] = `const app = createApp(App)`
    lines[renderIndex + 1] = `installElementPlus(app)`
    lines[renderIndex + 2]  = renderContent.replace('createApp\(App\)','app')

    fs.writeFileSync(api.resolve(api.entryFile), lines.join(EOL), { encoding: 'utf-8' })
  })

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
