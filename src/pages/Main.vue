<template>
  <section class="home">
    <loader v-if="loading" />
    <div class="container" v-if="!loading">
      <div class="row no-gutters">
        <div class="col-md-12 col-sm-12">
         <div class="row no-gutters">
          <div class="col-md-12 col-sm-12">
            <div class="column">
              <div class="slider">
                <swiper :options="swiperOption">
                  <swiper-slide v-for="(slider, index) in randomDocuments" :key="index">
                    <img :src="slider.imageUrl" :alt="slider.title" class="slider__img"/>
                    <div class="slider__content">
                      <div class="slider__title">
                        <p>{{slider.title}}</p>
                        <p>When: {{slider.date | day}} {{slider.date | month}} {{slider.date | year}}</p>
                        <p>Where: {{slider.location}}</p>
                      </div>
                    </div>
                    
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
              </div>
            </div>
          </div>
          </div>
          <div class="row no-gutters">
            <div class="col-md-6 col-sm-12">
              <div class="column">
                <div class="column__title"> 
                  Festivals News
                </div>
                <div class="column__content">
                  <documentloader v-if="documentFestivalsLoading" />
                  <ul class="column__list" v-if="!documentFestivalsLoading">
                    <li v-for="(festival, index) in featuredMoreFestivals" :key="index">
                      <router-link :to="{path: '/festivals/' + festival.id}">
                        <div class="column__item">
                          <img :src="festival.imageUrl" :alt="festival.title"/>
                          <div class="column__description">
                            <p>{{festival.title}} </p>
                            <span>{{festival.date | day}}
                            {{festival.date | month}}
                            {{festival.date | year}}</span>
                            <p>Posted: {{festival.date | posted}}</p>
                          </div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                  <div class="load__more" @click="onClickFuturedFestivals">
                    Load More
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="column">
                <div class="column__title"> 
                  Articles News
                </div>
                <div class="column__content">
                  <documentloader v-if="documentArticlesLoading"/>
                  <ul class="column__list" v-if="!documentArticlesLoading">
                    <li v-for="(article, index) in featuredMoreArticles" :key="index">
                      <router-link :to="{path: '/articles/' + article.id}">
                        <div class="column__item">
                          <img :src="article.imageUrl" :alt="article.title"/>
                          <div class="column__description">
                            <p>{{article.title}} </p>
                            <span>{{article.date | day}}
                            {{article.date | month}}
                            {{article.date | year}}</span>
                            <p>Posted: {{article.date | posted}}</p>
                          </div>
                        </div>
                      </router-link>
                    </li>
                  </ul>
                  <div class="load__more" @click="onClickFuturedArticles">
                    Load More
                  </div>
                </div>
              </div>
            </div>
         </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import loader from '../Shared/loader'
import documentloader from '../Shared/documentLoader'
import filters from '../filters/index'
import { mapGetters } from 'vuex'

export default {
  extends: filters,
  components: {
    loader,
    documentloader
  },
  data () {
    return {
      festivalCounter: 3,
      articleCounter: 3,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    onClickFuturedFestivals () {
      this.festivalCounter = this.festivalCounter + 3
      this.$store.dispatch('loadMoreFestivals', {counter: this.festivalCounter, type: 'document'})
    },
    onClickFuturedArticles () {
      this.articleCounter = this.articleCounter + 3
      this.$store.dispatch('loadMoreArticles', {counter: this.articleCounter, type: 'document'})
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'documentFestivalsLoading',
      'documentArticlesLoading',
      'featuredMoreFestivals',
      'randomDocuments',
      'featuredMoreArticles'
    ]),
    loadMoreFestivals () {
      this.$store.dispatch('loadMoreFestivals', {counter: 3, type: 'app'})
    },
    loadMoreArticles () {
      this.$store.dispatch('loadMoreArticles', {counter: 3, type: 'app'})
    }
  },
  beforeMount () {
    this.loadMoreFestivals
    this.loadMoreArticles
  }
}
</script>

<style lang="scss">

  @import './../stylus/scss/main';
  @import '../stylus/scss/variables.scss';

  .slider {
    background-color: #fff;
    width: 100%;
    height: 500px;

    &__content {
      position: absolute;
      width: 100%;
      height: 100%;
      bottom:0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);

      @include media-breakpoint-up(md) {
        height: 40%;
      }
    }

    &__title {
      position: relative;
      top: 5%;
      color: $white;
      font-size: 3rem;
      text-align:center;
    }

    &__img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .home {
    padding-top: 2rem;
  }

  .main__page {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    align-items: stretch;
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
      line-height: 1.1rem;

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
      background-color: #f8f8f8;
      padding: 1rem 0.5rem;
      color:#b31818;
    }
  }

  .load__more {
    background-color: $white;
    border-bottom: 1px solid #eaeaea;
    text-align:center;
    padding: 1rem 0;
    cursor: pointer;
  }

  .swiper-container{
    height: 100% !important;
  }

  .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
    background-color: $primary !important;
  }

</style>
