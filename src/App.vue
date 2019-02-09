<template>
  <div id="app">
    <app-header></app-header>
    <main>
      <transition name="page-transition">
        <router-view>
          <app-main></app-main>
        </router-view>
      </transition>
    </main>
    <app-footer></app-footer>    
  </div>
</template>

<script>

import Header from './organisms/Header'
import Main from './pages/Main'
import Footer from './organisms/Footer'

export default {
  components: {
    'app-header': Header,
    'app-main': Main,
    'app-footer': Footer
  }
}
</script>

<style lang="scss">
  
  .page-transition-enter-active{
    transition: opacity .8s
  }
  .page-transition-enter, .page-transition-leave-to {
    opacity: 0
  }

</style>
