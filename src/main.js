import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {store} from './store'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import '././configFirebase'

Vue.use(VeeValidate)
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLogIn', user)
      }
    })
    this.$store.dispatch('loadFestivals')
    this.$store.dispatch('loadArticles')
  }
})
