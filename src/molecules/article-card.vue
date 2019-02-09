<template>
  <article class="card">
    <router-link class="card__inner" :to="{path: '/articles/' + article.id}">
    <figure class="card__content">
      <img :src="article.imageUrl" :key="article.id" :alt="article.title" />
      <div class="card__image">
        <img :src="article.imageUrl" :key="article.id" :alt="article.title" />
      </div>
      <figcaption>
        <h3>{{article.title}}</h3>
        <p>{{article.author}}</p>
        <p>Published: {{article.date | day}} {{article.date | month}} {{article.date | year}}</p>
      </figcaption>
      <span class="card__read-more">Read More</span>
    </figure>
  </router-link>

  </article>
</template>

<script>
  import filters from '../filters/index'
  import VueTypes from 'vue-types'

  export default {
    extends: filters,
    props: {
      article: VueTypes.object.isRequired
    }
  }
</script>

<style lang="scss" scoped>

.card {
  margin: 0 0.5rem;

  &__content {
    position: relative;
    overflow: hidden;
    width: 100%;
    background-color: #20638f;
    text-align: left;
    color: #ffffff;
    margin: 1rem 0;

    * {
      transition: all 0.3s ease-out;
    }

    > img {
      transform: scale(1.05);
      max-width: 100%;
      vertical-align: top;
      position: relative;
      filter: blur(5px);
      opacity: 0.6;
    }

    figcaption {
      position: absolute;
      top: 75%;
      bottom: 46px;
      left: 20px;
      right: 20px;
      border-bottom: 2px solid #ffffff;
      padding-top: 20px;
      z-index: 1;
      transition-delay: 0.2s;
    }

    h3 {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 5px;
      text-transform: uppercase;
    }

    p {
      font-size: 0.9em;
      letter-spacing: 1px;
      font-weight: 400;
      opacity: 0;
    }


    &:hover {
      .card__read-more,
       figcaption {
        opacity: 1;
        transform: translateX(0px);
      }

      figcaption,
      .card__image {
        transition-delay: 0s;
      }

      figcaption {
        top: 50%;
      }

      .card__image {
        bottom: 50%;
      }

      p {
        opacity: 1;
        transition-delay: 0.2s;
      }
    }

  }

  &__image {
  
    position: absolute;
    top: 0;
    bottom: 25%;
    right: 0;
    left: 0;
    overflow: hidden;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1), 0px 1px 0 rgba(255, 255, 255, 0.2);
    transition-delay: 0.2s;
    
    >img {
      position: absolute;
      top: 0;
      width: 100%;
      transform: scale(1.05);
    }
  }

  &__read-more {
    display: block;
    opacity: 0;
    -webkit-transform: translateX(-20px);
    transform: translateX(-20px);
    line-height: 48px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 20px;
    color: #ffffff;
    right: 0;
    bottom: 0;
    font-weight: 500;
    position: absolute;
  }
}

</style>
