import Vue from 'vue'
import Loading from './loading.vue'
import { addClass, removeClass, getStyle } from '@/utils/dom.js'

const Mask = Vue.extend(Loading)

const loadingDirective = {
  install: (Vue) => {
    // 插入Loading
    const insertDom = (parent, el) => {
      Object.keys(el.maskStyle).forEach(property => {
        el.mask.style[property] = el.maskStyle[property]
      })
      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'loading-parent--relative')
      }
      parent.appendChild(el.mask)
      el.instance.visible = true
    }
    // 切换组件状态函数
    const toggleLoading = (el, binding) => {
      if (binding.value) {
        Vue.nextTick(() => {
          ['height', 'width'].forEach(property => {
            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px'
          })
          el.originalPosition = getStyle(el, 'position')
          insertDom(el, el)
        })
      } else {
        // eslint-disable-next-line prefer-const
        let timer = 0
        clearTimeout(timer)
        timer = setTimeout(() => {
          removeClass(el, 'loading-parent--relative')
          clearTimeout(timer)
        }, 300)
        el.instance.visible = false
      }
    }
    Vue.directive('loading', {
      bind: function (el, binding) {
        const backgroundExr = el.getAttribute('loading-background')
        const mask = new Mask({
          el: document.createElement('div'),
          data: {
            background: backgroundExr
          }
        })
        el.instance = mask
        el.mask = mask.$el // mask.$el --- loading本身最外层的dom
        el.maskStyle = {} // 样式

        binding.value && toggleLoading(el, binding)
      },
      update: function (el, binding) {
        if (binding.oldValue !== binding.value) {
          toggleLoading(el, binding)
        }
      },
      unbind: function (el) {
        if (el.mask.parentNode) {
          el.mask.parentNode.removeChild(el.mask)
        }
        el.instance && el.instance.$destroy()
      }
    })
  }
}

export default loadingDirective
