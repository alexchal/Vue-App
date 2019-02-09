<template>
  <section class="festival">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <button class="btn btn-primary" @click="goBack"> Back </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="main__column">
            <div class="column__title">
              <h1>{{festival.title}}</h1>
                <ul class="festival__info list--unstyled">
                  <li><b>Date:</b> {{festival.date | day }} {{festival.date | month }} {{festival.date | year }}</li>
                  <li><b>Location:</b> {{festival.location}}</li>
                </ul>
            </div>
            <div class="main__description" v-html="festival.description"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="column">
              <div class="column__title"> 
                Last Articles
              </div>
              <div class="column__content">
                <ul class="column__list">
                  <li v-for="(article, index) in articles" :key="index">
                    <router-link :to="{path: '/articles/' + article.id}">
                      <div class="column__item">
                        <img :src="article.imageUrl" :alt="article.title"/>
                        <div class="column__description">
                          <p>{{article.title}} </p>
                          <span>{{article.date | day}}
                          {{article.date | month}}
                          {{article.date | year}}</span>
                        </div>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template> 

<script>
  import filters from '../filters/index'
  import VueTypes from 'vue-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'main',
    extends: filters,
    props: {
      id: VueTypes.string.isRequired
    },
    computed: {
      ...mapGetters(['loadedFestival', 'featuredArticles']),
      festival () {
        return this.loadedFestival(this.id)
      },
      articles () {
        return this.featuredArticles.slice(0, 5)
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style  lang="scss" scoped>

@import '../stylus/scss/main';
  
  .main__column {
    background-color: #fff;
    border: 1px solid #eaeaea;
    margin: 1rem 0;

    .festival__info {
      color: $black;
      padding: 1rem 0;
    }
  }
  .column {
    margin: 1rem 0.5rem;
    border: 1px solid #eaeaea;

    &__item {
      display: flex;
      padding: 1rem 0.3rem;

      > img {
        width: 50px;
        height: 50px;
      }
    }

    &__description {
      width: 100%;
      padding-left: 0.5rem;
      line-height: 1.5rem;

      > span {
        font-size: 14px;
      }
    }

    &__list {
      list-style: none;

      > li {
        background-color: $white;
        border-bottom: 1px solid #eaeaea;
      }
    }

    &__title {
      border-bottom: 1px solid #eaeaea;
      background-color: #fff;
      padding: 1rem;
    }
  }
  .main__description {
      padding: 1rem;
      word-break: break-word;
    }
</style>
