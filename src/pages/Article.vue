<template>
  <section class="article">
    <hero :text="article.title" :imageIndex="article.imageArticleIndex" />

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
              <h1>{{article.title}}</h1>
                <ul class="article__info list--unstyled">
                  <li><b>Published:</b> {{article.date | day }} {{article.date | month }} {{article.date | year }}</li>
                  <li><b>Author:</b> {{article.author}}</li>
                </ul>
            </div>
            <div class="main__description" v-html="article.description"></div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="column">
              <div class="column__title"> 
                Last Festivals
              </div>
              <div class="column__content">
                <ul class="column__list">
                  <li v-for="(festival, index) in festivals" :key="index">
                    <router-link :to="{path: '/festivals/' + festival.id}">
                      <div class="column__item">
                        <img :src="festival.imageUrl" :alt="festival.title"/>
                        <div class="column__description">
                          <p>{{festival.title}} </p>
                          <span>{{festival.date | day}}
                          {{festival.date | month}}
                          {{festival.date | year}}</span>
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
  import hero from '../Shared/hero.vue'
  import VueTypes from 'vue-types'
  import { mapGetters } from 'vuex'

  export default {
    name: 'main',
    extends: filters,
    components: {
      hero
    },
    props: {
      id: VueTypes.string.isRequired
    },
    computed: {
      ...mapGetters(['loading', 'loadedArticle', 'featuredFestivals']),
      article () {
        return this.loadedArticle(this.id)
      },
      festivals () {
        return this.featuredFestivals.slice(0, 5)
      }
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>

@import '../stylus/scss/main';

  .main__column {
    background-color: #fff;
    border: 1px solid #eaeaea;
    margin: 1rem 0;

    .article__info {
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
