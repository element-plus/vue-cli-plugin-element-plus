const localeList = require('./lang.js')

module.exports = [
  {
    type: 'list',
    name: 'import',
    message: 'How do you want to import Element Plus?',
    choices: [
      { name: 'Fully import', value: 'full' },
      { name: 'Import on demand', value: 'partial' }
    ],
    default: 'full',
  },
  {
    when: answers => answers.import === 'full',
    type: 'confirm',
    name: 'customTheme',
    message: 'Do you want to overwrite the SCSS variables of Element Plus?',
    default: false,
  },
  {
    type: 'list',
    name: 'lang',
    message: 'Choose the locale you want to load, the default locale is English (en)',
    choices: localeList.map(locale => ({
      name: locale,
      value: locale
    })),
    default: 'en'
  }
]
