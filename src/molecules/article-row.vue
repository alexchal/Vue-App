<template>
  <div class="article__row">
    <span><img :src="article.imageUrl" :alt="article.title"/></span>
    <span>{{article.title}}</span>
    <span>{{article.date | day}} {{article.date | month}} {{article.date | year}}</span>
    <span v-html="article.description.slice(0, 10) + '...'"></span>
    <span>{{article.title}}</span>
    <span class="trash" @click="showPopUpArticle()"><Icon name="trash" /></span>
    <modal v-if="showModalLogIn" @close="showModalLogIn = false">
    <h3 slot="header">Do you want to delete this article?</h3>
    <div slot="body" style="with: 100%">
        <button type="submit" class="btn btn-primary" @click="deleteArticle(article)">Yes</button>
    </div>
  </modal>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import VueTypes from 'vue-types'
import filters from '../filters/index'
import Icon from 'vue-awesome'
import modal from '../Shared/modal'

export default {
  extends: filters,
  components: {
    Icon,
    modal
  },
  props: {
    article: VueTypes.object.isRequired
  },
  data () {
    return {
      showModalLogIn: false
    }
  },
  methods: {
    showPopUpArticle () {
      this.showModalLogIn = true
    },
    deleteArticle (post) {
      this.$emit('update', post)
      firebase.database().ref('articles').child(post.id).remove()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../stylus/scss/variables.scss';

.article__row {
  padding: 1rem;
  background-color: lightgrey;
  margin: 0.5rem 0;
  display:flex;
  justify-content: space-between;

  span {
    display: inline-block;
  }

  img {
    width: 50px;
    height: 50px;
  }

  .trash {
    float:right;
    cursor: pointer;
  }
}


</style>
