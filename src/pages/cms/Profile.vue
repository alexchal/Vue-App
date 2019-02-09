<template>  
<section class="profile">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-6">
        <h1>See your history!</h1>
        <select v-model="selected" v-on:change="onSelected">
          <option disabled value="">Please select</option>
          <option>Festivals</option>
          <option>Articles</option>
        </select>
      </div>
    </div> 
  </div>
  <div class="container">
   <div class="row justify-content-center">
    <div class="col-lg-8 col-md-6">
      <div v-if="this.festivalsSelected"> 
        <div v-if="this.userfestivals.length > 0">
          <h1>You have {{this.userfestivals.length}} published festivals: </h1>
          <div class="col-md-12 col-lg-12" v-for="(festival, index) in userfestivals" :key="index">
            <festivalRow :festival="festival" :key="festival.id" @update="onStep1Update"/>
          </div>
        </div>
        <div v-else>
          <h1>No festivals published </h1>
        </div>
      </div>
      <div v-if="this.articlesSelected"> 
        <div v-if="this.userarticles.length > 0">
          <h1>You have {{this.userarticles.length}} published articles: </h1>
          <div class="col-md-12 col-lg-12" v-for="(article, index) in userarticles" :key="index">
            <articleRow :article="article" :key="article.id" @update="onStep2Update"/>
          </div>
        </div>
        <div v-else>
          <h1>No articles published </h1>
        </div>
      </div>
    </div>
   </div>
  </div>
</section>
</template>

<script>
import festivalRow from '../../molecules/festival-row'
import articleRow from '../../molecules/article-row'
import loader from '../../Shared/loader.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'main',
  components: {
    festivalRow,
    articleRow,
    loader
  },
  data () {
    return {
      selected: '',
      festivalsSelected: false,
      articlesSelected: false
    }
  },
  methods: {
    onSelected () {
      if (this.selected === 'Festivals') {
        this.festivalsSelected = !this.festivalsSelected
        this.articlesSelected = false
      } else {
        this.festivalsSelected = false
        this.articlesSelected = !this.articlesSelected
      }
    },
    onStep1Update (removeFestival) {
      this.$store.dispatch('deleteFestival', removeFestival.id)
    },
    onStep2Update (removeArticle) {
      this.$store.dispatch('deleteArticle', removeArticle.id)
    }
  },
  computed: {
    ...mapGetters({
      userarticles: 'loadedUserArticles',
      userfestivals: 'loadedUserFestivals'
    }),
    loadUserFestivals () {
      this.$store.dispatch('loadUserFestivals')
    },
    loadUserArticles () {
      this.$store.dispatch('loadUserArticles')
    }
  },
  beforeMount () {
    this.loadUserFestivals
    this.loadUserArticles
  }
}
</script>

<style lang="scss" scoped>
select {
  cursor: pointer;
}
</style>
