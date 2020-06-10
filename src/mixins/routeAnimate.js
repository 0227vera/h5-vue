export default {
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      // 大小的时候控制动画，如果是等于表示不需要动画，或者根据后期的时候等于的时候做淡入淡出
      if (to.meta.animateIndex < from.meta.animateIndex) {
        this.transitionName = 'right'
      } else if (to.meta.animateIndex > from.meta.animateIndex) {
        this.transitionName = 'left'
      } else {
        this.transitionName = ''
      }
    }
  }
}
