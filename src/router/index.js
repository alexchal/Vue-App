import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Festivals from '@/pages/Festivals'
import Festival from '@/pages/Festival'
import CreateFestival from '@/pages/cms/CreateFestival'
import Articles from '@/pages/Articles'
import Article from '@/pages/Article'
import CreateArticle from '@/pages/cms/CreateArticle'
import Profile from '@/pages/cms/Profile'
import SignUp from '@/pages/SignUp'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/festivals',
      name: 'Festivals',
      component: Festivals
    },
    {
      path: '/createFestival',
      name: 'createFestival',
      component: CreateFestival,
      beforeEnter: AuthGuard
    },
    {
      path: '/festivals/:id',
      name: 'Festival',
      props: true,
      component: Festival
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles
    },
    {
      path: '/createArticle',
      name: 'createArticle',
      component: CreateArticle,
      beforeEnter: AuthGuard
    },
    {
      path: '/articles/:id',
      name: 'article',
      props: true,
      component: Article
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
