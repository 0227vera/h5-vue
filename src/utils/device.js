// 运行环境是浏览器
const inBrowser = typeof window !== 'undefined'
const userAgent = window.navigator.userAgent.toLowerCase()

// 运行环境是微信
const weexPlatform = String(userAgent.match(/MicroMessenger/i)) === 'micromessenger'
// 浏览器 UA 判断
const UA = inBrowser && userAgent
const isIE = UA && /msie|trident/.test(UA)
const isIE9 = UA && UA.indexOf('msie 9.0') > 0
const isEdge = UA && UA.indexOf('edge/') > 0
const isAndroid = UA && UA.indexOf('android') > 0
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
const platformInfo = {
  inBrowser,
  weexPlatform,
  UA,
  isIE,
  isIE9,
  isEdge,
  isAndroid,
  isIOS,
  isChrome
}

export default platformInfo
