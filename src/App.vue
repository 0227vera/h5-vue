<template>
  <div id="app" :class="isDown ? 'ease-show-app' : 'ease-in-app'">
    <Main-panel>
      <transition-group tag="div" class="transition-container" :name="transitionName" :appear="true">
        <router-view key="mainPanel" />
      </transition-group>
    </Main-panel>
  </div>
</template>
<script>
import MainPanel from './components/MainPanel'
import routeAnimate from './mixins/routeAnimate'
function fn () {
  !this.$store.state.header.showClose ? this.$store.commit('UPDATE_DEFAULT_HEADER_CLOSE') : window.removeEventListener('popstate', fn)
}
export default {
  mixins: [routeAnimate],
  data () {
    return {
      isDown: false,
      transitionName: ''
    }
  },
  components: {
    MainPanel
  },
  mounted () {
    setTimeout(() => {
      this.isDown = true
    }, 0)
    // 监听返回，设置按钮为关闭
    window.addEventListener('popstate', fn.bind(this))
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app.ease-in-app {
  opacity: 0;
}
#app.ease-show-app {
  opacity: 1;
  transition: all 2s ease;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.transition-container {
  width: 100%;
  height: 100%;
}
.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: fixed !important;
  width: 100%;
  height: 100%;
  left: 0;
  overflow: hidden;
  background: #f7f8fa;
}

.right-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.right-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.right-leave {
  transform: translateX(0);
  opacity: 1;
}
.right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0);
}
.left-leave {
  transform: translateX(0);
}
.left-leave-to {
  transform: translateX(-100%);
}
</style>
