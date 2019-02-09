<template>
  <section class="articles">
    <searchBar v-model="searchBarValue" />
    <loader v-if="loading" />
    <div class="container" v-if="!loading">
      <h1 class="section-teaser" v-if="articles.length > 0">Articles</h1>
      <h1 class="section-teaser" v-else>No Articles Found</h1>
      <div class="row no-gutters"> 
        <div class="col-md-6 col-lg-4"  v-for="(article, index) in articles" :key="index">
          <article-card :article="article" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import searchBar from '../Shared/searchBar.vue'
import loader from '../Shared/loader.vue'
import articleCard from '../molecules/article-card'
import { mapGetters } from 'vuex'

export default {
  name: 'main',
  components: {
    searchBar,
    loader,
    articleCard
  },
  data () {
    return {
      show: true,
      searchBarValue: ''
    }
  },
  computed: {
    ...mapGetters(['loading', 'featuredArticles']),
    articles () {
      return this.featuredArticles.filter(post => {
        return post.title.toLowerCase().includes(this.searchBarValue.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>

</style>
