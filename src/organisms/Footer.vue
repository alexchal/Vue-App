<template>
  <section class="footer">
      <div class="footer__copyright">{{copyrightText}} © {{ new Date().getFullYear() }}</div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        copyrightText: 'Made by Monke '
      }
    }
  }
</script>

<style lang="scss" scoped>

@import '../stylus/scss/variables.scss';

  .footer {

    width: 100%;
    background-color: $primary;
    padding: 2rem 0;
    position: relative;
    bottom: 0;

    &__copyright {
      text-align: center;
    }
  }
  
  </style>
