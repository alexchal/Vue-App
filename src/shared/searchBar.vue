<template>
  <div class="container">
    <transition name="test">
      <div class="search__bar" v-if="showSearchBar">
          <input type="text" v-model="search" placeholder="Search by title.." v-on:input="updateValue($event.target.value)"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        search: ''
      }
    },
    methods: {
      updateValue: function (value) {
        this.$emit('input', value)
      }
    },
    computed: {
      ...mapGetters({
        showSearchBar: 'searchBar'
      })
    }
  }
</script>

<style lang="scss" scoped>

@import '.././stylus/scss/main';

.search__bar {
  transform: translateY(20px);
  transition: all 0.5s ease;
}
.test-enter-active,
.test-leave-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.test-enter,
.test-leave-active {
  opacity: 0;
}


</style>
