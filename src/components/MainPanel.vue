<template>
  <div class="main">
    <slot name="header" v-if="showHeader">
      <app-header></app-header>
    </slot>
    <div class="main-panel">
      <slot></slot>
    </div>
    <slot name="footer">
      <app-footer v-if="isFooterShow"/>
    </slot>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
export default {
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
      showHeader: true,
      timeout: null
    }
  },
  computed: {
    isFooterShow () {
      return this.$store.state.isFooterShow
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/variable.scss';

.main{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &-panel{
    flex: 1;
    overflow-x: hidden;
    -webkit-overflow-scrolling:touch;
    background: $base-bg-color;
  }
}
</style>
