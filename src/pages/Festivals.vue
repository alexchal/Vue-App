<template>
  <section class="festivals">
    <searchBar v-model="searchBarValue" />
    <loader v-if="loading" />
    <div class="container" v-if="!loading">
      <h1 class="section-teaser" v-if="festivals.length > 0">Festivals</h1>
      <h1 class="section-teaser" v-else>No Festivals Found</h1>
      <div class="row no-gutters">
        <div class="col-md-6 col-lg-4" v-for="(festival, index) in festivals" :key="index">
          <festival-card :festival="festival" />
        </div>   
      </div>
    </div>
  </section>
</template>

<script>
import searchBar from '../Shared/searchBar.vue'
import loader from '../Shared/loader.vue'
import festivalCard from '../molecules/festival-card'
import { mapGetters } from 'vuex'

export default {
  name: 'main',
  components: {
    searchBar,
    loader,
    festivalCard
  },
  data () {
    return {
      searchBarValue: '',
      activeAlert: false
    }
  },
  methods: {
    showAlertCreate () {
      this.activeAlert = true
      setTimeout(() => {
        this.activeAlert = false
      }, 5000)
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      featuredFestivals: 'featuredFestivals',
      showSearchBar: 'searchBar'
    }),
    festivals () {
      return this.featuredFestivals.filter(post => {
        return post.title.toLowerCase().includes(this.searchBarValue.toLowerCase())
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.showAlertCreate()
    }, 3000)
  }
}
</script>


<style lang="scss" scoped>

@import '../stylus/scss/variables.scss';

/* stagger css */
.fade-enter-active,
.fade-leave-active {
  transform: translateY(-10px);
  opacity: 1;
  transition: all .5s ease-in;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0
}

.search__content {
  background-color:grey;
  padding: 1rem 0;
  position: relative;

  input {
    width: 100%;
  }
}
</style>
