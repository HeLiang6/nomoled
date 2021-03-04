// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import {
  Pagination,
  Dialog,
  Collapse,
  CollapseItem,
  DatePicker,
  Autocomplete,
  Dropdown,
  Breadcrumb,
  BreadcrumbItem,
  DropdownMenu,
  DropdownItem,
  Submenu,
  RadioGroup,
  Radio,
  TimeSelect,
  Input,
  InputNumber,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Menu,
  MenuItem,
  Slider,
  MenuItemGroup,
  Select,
  Popover,
  Option,
  Button,
  Table,
  Cascader,
  TableColumn,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Progress,
  Container,
  Header,
  Main,
  Loading,
  MessageBox,
  Message
} from 'element-ui'
import App from './App'
import store from './store'
import i18n from './i18n/i18n'
import './router/login'
import Routers from 'vue-router'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
Vue.use(VueGoogleMaps, {
  load: {
    // 填入申请的apiKey账号
    apiKey: 'AIzaSyDGqVX7tgjVCSn20BISY90QOBM62T4KcIA',
    libraries: ['places'],
    useBetaRenderer: false
  }
})
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyDGqVX7tgjVCSn20BISY90QOBM62T4KcIA&libraries=drawing',
//     libraries: 'places' // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)

//     /// / If you want to set the version, you can do so:
//     // v: '3.26',
//   }
// })
// 解决重复跳转同一个路由
promise.polyfill()
const originalPush = Routers.prototype.push
Routers.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Slider)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Dialog)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Submenu)
Vue.use(Input)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Progress)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.use(Loading.directive)
Vue.config.productionTip = false

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
// 权限指令
Vue.directive('has', {
  bind: function (el, binding) {
    if (!Vue.prototype.$_has(binding.value)) {
      el.style.display = 'none'
    }
  }
})
// 权限检查方法
Vue.prototype.$_has = function (value) {
  let isExist = false
  //  获取拥有的权限
  console.log(value)
  // let role = store.state.user
  // console.log(role)
  // let role = store.state.d2admin.user.info.role
  // if (role === value) {
  isExist = true
  // }
  return isExist
}
/* eslint-disable no-new */
const _Vue = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  Bus: new Vue()
})
export default _Vue
