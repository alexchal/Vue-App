<template>
 <article class="card">
    <div class="card__inner" :style="style">
      <div class="card__header">
        <div class="card__date">
          <span>{{festival.date | day}}</span>
          <span>{{festival.date | month}}</span>
          <span>{{festival.date | year}}</span>
        </div>
        <div class="card__icons">
          <p @click="addLikes"><Icon name="thumbs-up"/><span>{{festival.likes}}</span></p>
          <p><Icon name="comments" /><span>0</span></p>
        </div>
      </div>
      <div class="card__data">
        <div class="card__content">
          <span class="card__author">{{festival.creatorFestival}}</span>
          <h1 class="card__title">{{festival.title}}</h1>
          <p class="card__text" v-html="festival.description.slice(0, 100) + '...'"></p>
          <router-link class="card__button" :to="{path: '/festivals/' + festival.id}">
            Read more
          </router-link>
        </div>
      </div>
    </div>
  </article>

 
</template>

<script>
import * as firebase from 'firebase'
import filters from '../filters/index'
import Icon from 'vue-awesome'
import VueTypes from 'vue-types'

export default {
  extends: filters,
  components: {
    Icon
  },
  props: {
    festival: VueTypes.object.isRequired
  },
  computed: {
    style () {
      return 'background-image: url(' + this.festival.imageUrl + ')'
    }
  },
  methods: {
    addLikes () {
      const count = {
        likes: this.festival.likes++
      }
      const ref = firebase.database().ref('/festivals/' + this.festival.id)
      ref.update({likes: count.likes})
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../stylus/scss/variables.scss';

.card {
  margin: 0.5rem 1rem;
  max-height: 300px;
  overflow: hidden;

  &__inner {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    min-height: 300px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 19px 38px rgba($black, 0.3), 0 15px 12px rgba($black, 0.2);
    &:hover {
      .card__data {
        transform: translateY(0);
      }
      .card__icons {
        span {
          transform: translate(-13px, 5px);
          opacity: 1;
        }
      }
    }
  }

  &__header {
    color: $white;
    padding: 1em;
    display: flex;
    justify-content: space-between;

    .card__date {
      flex-grow: 1;
      font-size: 12px;
    }
  }

  &__icons {
    margin: 0;
    padding: 0;
    cursor: pointer;

    p {
      display: inline-block;
    }
    span {
      position: absolute;
      opacity: 0;
      top:0;
      font-size: 10px;
      font-weight: 700;
      font-family: 'Open Sans';
      transform: translate(-12px, -20px);
      transition: all 0.3s ease;
    }
  }

  &__data {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(calc(70px + 1em));
    transition: transform 0.3s;
  }

  &__content {
    padding: 1em;
    position: relative;
    z-index: 1;
  }
  &__author {
    font-size: 12px;
  }
  &__title {
    margin-top: 10px;
    color: $white;
  }
  &__text {
    height: 70px;
    margin: 0;
    word-break: break-word;
  }

  &__data {
    color: $white;
    transform: translateY(calc(70px + 4em));
  }
  &__title {
    a {
      color: $white;
    }
  }
  &__button {
    display: block;
    width: 100px;
    margin: 2em auto 1em;
    text-align: center;
    font-size: 12px;
    color: $white;
    line-height: 1;
    position: relative;
    font-weight: 700;
    &::after {
      content: '\2192';
      opacity: 0;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      transition: all 0.3s;
    }
    &:hover {
      &::after {
        transform: translate(5px, -50%);
        opacity: 1;
      }
    }
  }
}

</style>
