<template>
  <div class="footer" :class="{ isIOS, isAndroid: !isIOS }">
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="item in tabbarList"
        :key="item.path"
        :icon="item.icon"
        :to="item.path"
      >{{ item.name }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import deviceInfo from '@/utils/device'
export default {
  name: 'AppFooter',
  data () {
    return {
      isIOS: deviceInfo.isIOS,
      tabbarList: [
        { name: '打卡', path: '/', icon: 'location' },
        { name: '设置', path: '/setting', icon: 'setting' }
      ]
    }
  },
  computed: {
    active: {
      // warning
      // 目前的设计是高亮根据路由配置的meta来实现。
      // 如果是子路由，则加一个.来分割
      get () {
        return this.$route.meta.tabIndex
      },
      set () {
        // console.log()
      }
    }
  },
  components: {}
}
</script>
<style scoped lang="scss">
.isIOS {
  height: 48px;
}
.isAndroid {
  height: 50px;
}
.footer {
  overflow: hidden;
  /deep/ .van-tabbar {
    height: 100%;
    position: relative;
  }
}
</style>
