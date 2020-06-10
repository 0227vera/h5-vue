export default {
  getDaviceVersion () {
    if (!window.mCall || !window.mCall.getVersion) {
      return '0.0.0'
    }
    return window.mCall.getVersion()
  },
  getDaviceId () {
    if (!window.mCall) {
      return '-1'
    }
    return window.mCall.getDeviceId()
  },
  closeH5 () {
    if (!window.mCall) {
      // 没有的话，推到history的第一页。不确定是否需要这个场景，先这样写着
      window.history.go(-window.history.length + 1)
    }
    window.mCall.close()
  },
  scanCode (fn, failed) {
    if (!window.mCall) {
      if (failed) {
        failed()
      } else {
        throw new Error('current env no support mCall method')
      }
      return
    }
    window.mCall.scanCode()
    Object.defineProperty(window, 'scanHandle', {
      value: fn
    })
  }
}
