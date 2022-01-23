<%_ if (options.import === 'full') { _%>
import ElementPlus from 'element-plus'
<%_ if (options.customTheme) { _%>
import '../element-variables.scss'
<%_ } else { _%>
import 'element-plus/lib/theme-chalk/index.css'
<%_ } _%> 
<%_ } else { _%>
import { ElButton, ElConfigProvider } from 'element-plus'
<%_ } _%>

export default (app) => {
  <%_ if (options.import === 'full') { _%>
  app.use(ElementPlus)
  <%_ } else { _%>
  app.use(ElButton)
  app.use(ElConfigProvider)
  <%_ } _%>
}