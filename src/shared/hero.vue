<template>
  <div class="hero">
    <picture>
      <img :src= "`../../../static/articles/article${imageIndex}.png`" alt="Monke">
    </picture>
    <h1 class="hero__text">{{text}}</h1>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      text: VueTypes.string.isRequired,
      imageIndex: VueTypes.number.isRequired
    },
    data () {
      return {
        heroText: this.heroText,
        heroImageIndex: this.heroImageIndex
      }
    }
  }
</script>

<style lang="scss" scoped>

@import '.././stylus/scss/main';

.hero {
  position: relative;

  @include media-breakpoint-up(md) {
    height: 25rem;
  }

  picture > img {
    display: block;
    height: 400px;
    object-fit: cover;
    object-position: center center;
    pointer-events: none;
    width: 100%;
  }

  &__text {
    color: $white;
    font-size: 2rem;
    font-weight: 700;
    position: relative;
    text-align: center;
    top: -150px;
    z-index: 1000;

    @include media-breakpoint-up(md) {
      top: -230px;
      font-size: 5rem;
    }
  }
}

</style>
