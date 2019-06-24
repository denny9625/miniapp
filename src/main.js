import Vue from 'vue'
import App from './App'
import fly from './http/config'
import store from './store/index'
Vue.prototype.$store=store;
Vue.prototype.$http=fly
console.log(fly)
Vue.config.productionTip = true
App.mpType = 'app'
wx.setEnableDebug({
  enableDebug: false
})
const app = new Vue(App)
app.$mount()
