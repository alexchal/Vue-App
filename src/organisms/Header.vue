<template>  
  <section class="header">
  <div v-if="!userIsAuthenticated">
  <!--Pre Header -->
    <div class="pre__header">
      <div class="container">
        <div class="pre__header--info">
          <ul class="content__legal">
            <li>Disclaimer</li>
            <li>Cookies Policy</li>
            <li>Contact</li>
          </ul>
          <ul class="social__media">
            <li><Icon name="facebook-f"/></li>
            <li><Icon name="twitter"/></li>
            <li><Icon name="vimeo"/></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="header__logo">
      <router-link to="/"><img src="../../static/logo.png" class="header__logo--img" alt="Monke" /></router-link>
    </div>
    
    <div class="header__content" :class="{ activeSticky: stickyHeader }">
      <div class="container">
        <div class="header__nav">
        <nav class="list header__list list--unstyled">
          <router-link :to="{path: item.link }" style="cursor: pointer" v-for="(item, index) in menuItems" v-if="!userIsAuthenticated" :key="index"> 
            <li>{{ item.title }}</li>
          </router-link>
          <a href="#"><li v-if="!userIsAuthenticated" @click.prevent="showModalLogIn = true" >Log In</li></a>
        </nav>
        <div class="header__search" @click="triggerSearchBar"  v-show="!showSearchBar">
          <Icon name="search" />
        </div>
        <div class="header__close-search" @click="triggerSearchBar" v-show="showSearchBar">
          <Icon name="times"/>
        </div>
        </div>
      </div>
    </div>

    <transition name="header-mobile-transition">
      <div class="header__mobile" v-if="activeHamburger">
        <ul class="list header__mobile--list list--unstyled">
          <router-link :to="{path: item.link }" style="cursor: pointer" v-for="(item, index) in menuItems" v-if="!userIsAuthenticated" :key="index" v-on:click.native="closeHamburger"> 
            <li>{{ item.title }}</li>
          </router-link>
        </ul>
      </div>
    </transition>
  </div>



  <!-- CMS Header-->
  <div v-else class="header__slide">
    <ul class="list header__slide-menu list--unstyled" >
        <router-link :to="{path: item.link }" style="cursor: pointer" v-for="(item, index) in menuItems" v-if="userIsAuthenticated" :key="index"> 
          <li class="header__slide-menu-item" >{{ item.title }}</li>
        </router-link>
        <li class="header__slide-menu-item" v-if="userIsAuthenticated" @click.prevent="showModalLogOut = true" >LogOut</li>
      </ul>
  </div>
  
  <!-- Logout Modal -->

  <modal v-if="showModalLogOut" @close="showModalLogOut = false">
    <h3 slot="header">Are you sure you want to exit the app?</h3>
    <div slot="body" class="logout__body">
      <span class="lala" @click="cancel">Cancel</span>
      <span @click="onLogOut">Ok</span> 
    </div>
  </modal>

  <!-- Login Modal -->
  <modal v-if="showModalLogIn" @close="showModalLogIn = false">
    <h3 slot="header">Log In</h3>
    <div slot="body" style="with: 100%">

      <form @submit.prevent="onLogIn">
        <div class="input__field">
          <label class="label" for="email">Email</label>
          <input name="email" v-model="model.email" v-validate="'required|email'" :class="{'input': true }" type="text" placeholder="Email">
          <transition name="error-validation">
            <span v-show="errors.has('email')" class="help form-error">{{ errors.first('email') }}</span>
          </transition>
        </div>

        <div class="input__field">
          <label class="label" for="password">Password</label>
          <input v-model="model.password" v-validate="'required'" name="password" type="password" class="input" placeholder="Password" >
        
          <transition name="error-validation">              
          <span  class="form-error" v-if="errors.has('password')">
            {{ errors.first('password') }}
          </span>
          </transition>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
</modal>
  </section>
</template>

<script>

import modal from '../Shared/modal'
import Icon from 'vue-awesome'
import { mapGetters } from 'vuex'

export default {
  components: {
    modal,
    Icon
  },
  data () {
    return {
      model: {
        email: '',
        password: ''
      },
      showModalLogOut: false,
      showModalLogIn: false,
      activeHamburger: false,
      stickyHeader: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      showSearchBar: 'searchBar'
    }),
    menuItems () {
      let menuItems = [
        { title: 'Home', link: '/' },
        { title: 'Festivals', link: '/festivals' },
        { title: 'Articles', link: '/articles' },
        { title: 'Sign Up', link: '/signup' }
      ]

      if (this.userIsAuthenticated) {
        menuItems = [
          { title: 'Profile', link: '/profile' },
          { title: 'Create Festival', link: '/createFestival' },
          { title: 'Create Article', link: '/createArticle' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.user !== null && this.user !== undefined
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    closeHamburger () {
      this.activeHamburger = !this.activeHamburger
    },
    cancel () {
      this.showModalLogOut = !this.showModalLogOut
    },
    onLogOut () {
      this.showModalLogOut = !this.showModalLogOut
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    onLogIn () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('LogInUser', {email: this.model.email, password: this.model.password})
          this.showModalLogIn = !this.showModalLogIn
        }
      })
    },
    onHamburger () {
      this.activeHamburger = !this.activeHamburger
    },
    onScroll () {
      window.addEventListener('scroll', this.headerIsSticky)
    },
    headerIsSticky () {
      // If we are on the cms, the component is not being desrtoyed,
      // so we have to check whether the element exist or not
      let preHeaderHeight = document.querySelector('.pre__header')
      if (preHeaderHeight !== null) {
        preHeaderHeight = preHeaderHeight.offsetHeight
        const headerLogoHeight = document.querySelector('.header__logo').offsetHeight
        const headerContentHeight = document.querySelector('.header__content').offsetHeight
        const totalHeight = preHeaderHeight + headerLogoHeight

        if ((document.documentElement.scrollTop ||
        document.body.scrollTop) > totalHeight) {
          this.stickyHeader = true
          document.querySelector('body').style.paddingTop = headerContentHeight + 'px'
        } else {
          this.stickyHeader = false
          document.querySelector('body').style.paddingTop = 0
        }
      }
    },
    triggerSearchBar () {
      this.$store.dispatch('triggerSearchBar', {active: !this.showSearchBar})
    }
  },
  mounted () {
    this.onScroll()
  },
  destroyed () {
    window.removeEventListener('scroll', this.headerIsSticky)
  }
}
</script>

<style lang="scss" scoped>
  
  @import '../stylus/scss/main';
  @import '../stylus/scss/variables.scss';

  .header {

    .pre__header {
      background-color: $primary;
      padding: 0.5rem;

      &--info {
        display: flex;
        justify-content: space-between;
      }

      .content__legal,
      .social__media {
        display: flex;
        list-style: none;

        li {
          margin: 0 0.5rem;
          color: $white;
          cursor: pointer;
          font-size: 0.8rem;

          @include media-breakpoint-up(sm) {
            margin: 0 1rem;
          }
        }

      }
    }

    &__content {
      display: flex;
      background-color: $primary;
      padding: 0.3rem 0;
    }

    &__content-mb {
      background-color: $black;
      width: 100%;
      height: 20vh;
    }

    &__logo {
      text-align:center;
      background-color: $black;

      &--img {
        padding: 0.5rem 0;
        width: 100px;
        height: 100px;
      }
    }

    .header__nav {
      display: flex;
      justify-content: space-between;
    }

    &__search,
    &__close-search {
      color: $white;
      cursor: pointer;
      margin: 0.7rem 0;

      >svg {
        width:25px;
        height: 25px;
      }
    }

    &__list {
      display: flex;

      li {
        display: inline-block;
        list-style: outside none none;
        padding: 12px 9px;
        position: relative;
        font-size: 0.9rem;
        color: $white;
        text-decoration: none;
        cursor: pointer;
        transition: all .25s cubic-bezier(.4,.25,.3,1), color 125ms cubic-bezier(.4,.25,.3,1);

        &:hover {
          &:before{
            width: 100%;
          }
        }

        &:before{
          content: "";
          position: absolute;
          bottom: -.2rem;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: currentColor;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          transition: width 175ms cubic-bezier(.4,.25,.3,1);
        }

        @include media-breakpoint-up(md) {
          font-size: 1.3rem;
          padding: 12px 12px;
        }
      }
    }

    &__mobile {
      background-color: $black;
      position: relative;
      top: 0;
      width: 100vw;
      height: 60vh;
      z-index: 10000;

      &--list{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;

        li {
          padding: 1rem;
          color: $white;
        }
      }
    }



    // CMS HEADER

    &__slide {
      position: fixed;
      top: 0;
      left:0;
      background-color: $color-menus;
      width: 17vw;
      height: 100vh;
      z-index: 100;

      li {
        font-size: 1.5rem;
        padding: 2rem 1rem;
      }

      &-menu {

        &-item {
            padding: 2rem 0;
            text-align: center;
            cursor: pointer;
            color: $white;

            &:after,&:before{
                display: block;
                content: "";
                position: relative;
                height: 1px;
            }
            &:after{
                width: 100%;
                background-color: $white;
                top: 1rem;
            }

            &:before{
                width: 0;
                background-color: $primary;
                z-index: 1;
                bottom: -2.8rem;
                transition: all $main-transition;
            }
            &:hover::before{
                width: 100%;
            }
        }
      }
    }

  }

  .logout__body {
    
    display: flex;
    justify-content: space-around;

    span {
      cursor: pointer;
      font-size: 20px;
    }

  }

  .header-mobile-transition-enter-active{
    transition: opacity .8s;
  }
  .header-mobile-transition-enter, .header-mobile-transition-leave-to {
    opacity: 0;
  }

  .error-validation-enter-active{
    transition: opacity .5s
  }
  .error-validation-enter, .error-validation-leave-to {
    opacity: 0;
    transition: opacity .5s
  }

  

  .activeSticky {
    position: fixed;
    z-index: 1001;
    width: 100%;
    top: 0;
  }

</style>
