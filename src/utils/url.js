export default {
  getUrlParams () {
    const QueryString = {}
    let search = window.location.search
    if (search) {
      search = search.substring(1)
      // 虽然知道这代码有点画蛇添足，但是有同学在改造的时候，把上面的search魔改了
      // search没有问号。导致测试环境没有问题，线上有问题了。
      if (search.indexOf('?') === 0) {
        search = search.substring(1)
      }
      const a = search.split('&')
      for (let i = 0; i < a.length; i++) {
        const as = a[i].split('=')
        if (as.length > 1) {
          Reflect.defineProperty(QueryString, as[0], {
            value: as[1]
          })
        }
      }
    }
    return QueryString
  }
}
