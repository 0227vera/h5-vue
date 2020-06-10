<template>
  <div class="header" :class="{isIOS, isAndroid: !isIOS}">
    <van-nav-bar
      :title="header.title"
      :border="false"
      @click-left="onClickLeft"
      @click-right="header.onClickRight"
      :right-text="header.rightText"
    >
      <template slot="left">
        <van-icon name="arrow-left">
          <span v-if="isIOS">返回</span>
        </van-icon>
        <i class="close-icon" v-if="isIOS" v-show="header.showClose" @click.stop="closeApp">关闭</i>
        <van-icon
          v-else
          name="cross"
          class="close-icon"
          v-show="header.showClose"
          @click.stop="closeApp"
        />
      </template>
      <template slot="right" v-if="header.helpIcon.show || header.searchIcon.show">
        <van-icon
          name="search"
          class="header-search"
          v-show="header.searchIcon.show"
          @click.stop="header.searchIcon.onClick"
        />
        <i slot="right" class="header-chat" @click="goCustomerSevice">icon</i>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
// todo: 校信上关闭，如果是带有头部的环境，隐藏此头部，同时设置document.title
// todo: 如果头部上有确认等功能按钮，则不隐藏头部，仅仅隐藏关闭。
import { mapState } from 'vuex'
import deviceInfo from '@/utils/device'
export default {
  name: 'AppHeader',
  data () {
    return {
      isIOS: deviceInfo.isIOS
    }
  },
  computed: mapState({
    header: state => state.header
  }),
  components: {
  },
  created () {
    console.log(555)
  },
  methods: {
    onClickLeft () {
      history.go(-1)
      // todo: 增加返回提示未保存功能
      // todo: 如果是刚进来，则直接退出
      // 1）如果是通过history.length来判断，如果其他人在开发的时候，新增了一个welcome页面，则会出现问题
      // 如果项目是重定向进来的，history长度是不是就变了？
      // 2）如果通过当前page的name来判断，则出现只要实在首页，点击返回则就关闭了。并且，可能如果其他人不知道
      // 这个功能，不会到这里来修改首页的名字。
      // 3）通过比较go(-1)之前和之后的name，如果name没有发生变化，则认为其是第一页。
      // 在某些页面，对history做了额外阻止返回。会不会出现name不发生变化呢？（没有试验过）
      // 先采用第二种方案吧，并且提供一个阻止关闭的方法
      // onClickLeft: (fn) => {
      //   fn(true)
      // }
      let t
      if (this.$route.name === 'Home') {
        t = setTimeout(() => {
          this.closeApp()
        }, 200)
      }
      this.header.onClickLeft((isRejectOut) => {
        if (isRejectOut && t) {
          clearTimeout(t)
        }
      })
    },
    goCustomerSevice () {
      this.$router.push({ name: 'CustomerService' })
    },
    closeApp () {
    }
  }
}
</script>
<style scoped lang="scss">
.isIOS {
  height: 44px;
}
.isAndroid {
  height: 48px;
}
.header {
  background: #fff;
  width: 100%;
  overflow: hidden;
  /deep/ .van-nav-bar {
    height: 100%;
    line-height: none;
    .van-nav-bar__left {
      height: 100%;
      display: flex;
      align-items: center;
      left: 8px; // 设计规范是16px，但是返回的箭头本身有一部分左空白
      .van-icon-arrow-left {
        display: flex;
        align-items: center;
        height: 100%;
        span {
          overflow: hidden;
          height: 100%;
          display: flex;
          align-items: center;
          // 移动端上面对于奇数的字体大小的影响
          margin-top: -4px;
        }
        &::before {
          font-size: 26px;
          color: #333;
        }
      }
    }
    .van-nav-bar__title {
      font-weight: 600;
      font-size: 17px;
      height: 100%;
      max-width: 30%;
      overflow: hidden;
      text-align: center;
    }
    .van-nav-bar__right {
      height: 100%;
      width: auto;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    .van-icon {
      font-size: 17px;
      color: #333;
    }
  }
  &-chat {
    //  左边的icon大小尺寸；目前占一个色块
    width: 26px;
    height: 26px;
    background: #cccccc;
    font-size: 8px;
    font-style: normal;
    line-height: 26px;
    color: #ffffff;
    overflow: hidden;
    display: inline-block;
  }
}
.header-search {
  margin-right: 10px;
  font-size: 24px;
  vertical-align: baseline;
}
/deep/ .van-icon-search::before {
  font-size: 24px;
  font-weight: 600;
}
/deep/ .van-icon-cross::before {
  font-size: 24px;
}
.close-icon {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-style: normal;
  font-size: 17px;
  color: #333;
}
</style>
