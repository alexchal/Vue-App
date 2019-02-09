<template> 
<div class="festival__row"> 
  <span><img :src="festival.imageUrl" :alt="festival.title"/></span>
  <span><b>Title:</b> {{festival.title}}</span>
  <span><b>Date:</b> {{festival.date | day}} {{festival.date | month}} {{festival.date | year}}</span>
  <span v-html="festival.description.slice(0, 10) + '...'"></span>
  <span class="trash"  @click="showPopUpFestival()"><Icon name="trash" /></span>
  <modal v-if="showModalLogIn" @close="showModalLogIn = false">
    <h3 slot="header">Do you want to delete this festival?</h3>
    <div slot="body" style="with: 100%">
        <button type="submit" class="btn btn-primary" @click="deleteFestival(festival)">Yes</button>
    </div>
  </modal>
</div>
 
</template>

<script>
import * as firebase from 'firebase'
import VueTypes from 'vue-types'
import modal from '../Shared/modal'
import filters from '../filters/index'
import Icon from 'vue-awesome'

export default {
  extends: filters,
  components: {
    Icon,
    modal
  },
  props: {
    festival: VueTypes.object.isRequired
  },
  data () {
    return {
      showModalLogIn: false
    }
  },
  methods: {
    showPopUpFestival () {
      this.showModalLogIn = true
    },
    deleteFestival (post) {
      this.showModalLogIn = false
      this.$emit('update', post)
      firebase.database().ref('festivals').child(post.id).remove()
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../stylus/scss/variables.scss';

.festival__row {
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
