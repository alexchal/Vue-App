<template>
 <div> 
  <span>{{content.title}}</span>
  <span>{{content.date | day}} {{content.date | month}} {{content.date | year}}</span>
  <span v-html="content.description.slice(0, 10) + '...'"></span>
  <span>{{content.title}} {{url}}</span>
  <span  @click="deleteContent(content)"><Icon name="trash" /></span>
 </div>
</template>

<script>
import * as firebase from 'firebase'
import VueTypes from 'vue-types'
import filters from '../../filters/index'
import Icon from 'vue-awesome'

export default {
  extends: filters,
  components: {
    Icon
  },
  props: {
    typeObj: VueTypes.object.isRequired,
    typeDoc: VueTypes.string.isRequired
  },
  data () {
    return {
      content: this.typeObj,
      url: this.typeDoc
    }
  },
  methods: {
    deleteContent (post) {
      this.$emit('update', post)
      firebase.database().ref(`${this.typeDoc}`).child(post.id).remove()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../../stylus/scss/variables.scss';

div {
  padding: 1rem;
  background-color: lightgrey;
  margin: 0.5rem 0;

    span {
      display: inline-block;
    }
}


</style>
