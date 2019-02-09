<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-container__close" @click.prevent="$emit('close')">
            <Icon name="times" />
          </div>
          <div class="modal-header">
            <slot name="header">
              Default Header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Default Body
            </slot>
          </div>    

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from 'vue-awesome'

export default {
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>

  @import '../stylus/scss/variables';

  .modal {
    &-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($black, .5);
      display: table;
      transition: opacity .35s ease;
    }

    &-wrapper {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

    &-container {
      position: relative;
      width: 18rem;
      margin: 0 auto;
      padding: 1rem;
      background-color: $white;
      transition: all .35s ease;

      &__close {
        position: absolute;
        top: 0;
        right: 0;
        width: 2rem;
        height: 2rem;
        padding: .25rem;
        cursor: pointer;

        svg {
          stroke: $black;
          height: 100%;
          width: 100%;
        }
      }
    }

    &-header {
      color: $black;
      line-height: 1.25;
    }

    &-body {
      margin: 1rem 0;
      line-height: 1.25;
    }

    &-default-button {
      float: right;
    }
  }
</style>
