<template>
  <div class="alert">
    <div class="alert__inner">Your {{content}} published!</div>
  </div>
</template>

<script>
  import VueTypes from 'vue-types'

  export default {
    props: {
      alertText: VueTypes.string.isRequired
    },
    data () {
      return {
        content: this.alertText
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../stylus/scss/variables';

.alert{
  position: fixed;
  top: 5%;
  right: 0;
  width: 15%;
  border-radius: 50%;
  transform: translateX(100%);
  transition: all 1s ease;

  &__inner{
    background-color: $success;
    color: white;
    padding: 1rem 0.5rem;
    text-align: center;
  }

  &__isActive{
    transform: translateX(0);
  }
}

</style>
