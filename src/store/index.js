import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const fn = function () {
  console.warn('trigger empty function')
}

// 头部逻辑左边是很清晰的，右边我们设置了文字按钮、搜索，以及项目中自定义的按钮，通常最多是两个按钮，业务可根绝场景修改，详情看AppHeader.vue组件
const defaultHeader = {
  title: '打卡',
  onClickLeft: fn,
  onClickRight: fn,
  showClose: false,
  searchIcon: {
    show: false,
    onClick: fn
  },
  rightText: '',
  // todo: help search 统一归位right
  helpIcon: {
    show: false
  }
}

export default new Vuex.Store({
  state: {
    header: defaultHeader,
    isFooterShow: true
  },
  mutations: {
    UPDATE_HEADER (state, header) {
      state.header = Object.assign({}, defaultHeader, header)
    },
    UPDATE_FOOTER (state, isFooterShow) {
      state.isFooterShow = isFooterShow
    },
    // App.vue中，监听到返回后，设置头部出现关闭按钮,
    // 注意这里和上面的UPDATE_HEADER不同的地方，这里改变的是defaultHeader对象，将showClose给永久展示了。
    // 也就不会随着页面的重新配置导致不出现关闭按钮
    UPDATE_DEFAULT_HEADER_CLOSE (state) {
      defaultHeader.showClose = true
      const obj = { showClose: true }
      state.header = { ...defaultHeader, ...state.header, ...obj }
    }
  },
  actions: {
  },
  modules: {
  }
})
