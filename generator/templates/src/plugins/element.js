const hasCustomLocale = options.lang !== 'zh-CN'
<%_ if (options.import === 'full') { _%>
import ElementPlus from 'element-plus'
<%_ if (options.customTheme) { _%>
import '../element-variables.scss'
<%_ } else { _%>
import 'element-plus/lib/theme-chalk/index.css'
<%_ } _%> 
<%_ if (hasCustomLocale) { _%>
import locale from 'element-plus/lib/locale/lang/<%= options.lang %>'
<%_ } _%>
<%_ } else { _%>
import { Button } from 'element-plus'
<%_ if (hasCustomLocale) { _%>
import lang from 'element-plus/lib/locale/lang/<%= options.lang %>'
import locale from 'element-plus/lib/locale'
<%_ }} _%>

export default (app) => {
  <%_ if (options.import === 'full') { _%>
  <%_ if (hasCustomLocale) { _%>
  app.use(ElementPlus, { locale })
  <%_ } else { _%>
  app.use(ElementPlus)
  <%_ } _%>
  <%_ } else { _%>
  <%_ if (hasCustomLocale) { _%>
  locale.use(lang)
  <%_ } _%>
  app.use(Button)
  <%_ } _%>
}