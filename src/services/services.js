import qs from 'qs'
import axios from 'axios'
import commonService from './commonService'
import HomeService from './HomeService'
import AboutService from './AboutService'
import url from '../utils/url'

axios.defaults.baseURL = '{{projectContext}}'

const CancelToken = axios.CancelToken
// ajax请求队列
const axiosCancel = []

/**
 * 提供取消当前请求的方法，除了路由可取消请求外，可用于组件内对话框关闭时的请求取消
 */
export const cancelAjax = function () {
  for (let i = 0; i < axiosCancel.length; i++) {
    // 取消上一个路由中的所有未完成的请求
    axiosCancel[i]('Request Canceled')
  }
  axiosCancel.length = 0
}

const params = url.getUrlParams()
if (params.host) {
  axios.defaults.headers.common['x-api-server'] = params.host
}

axios.interceptors.request.use((request) => {
  if (request.data && request.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    request.data = qs.stringify(request.data, { allowDots: true })
  }
  if (!request.headers.noCancelRequestFlag) {
    // 将每个请求对应的cancel方法，push进请求队列
    request.cancelToken = new CancelToken((cb) => {
      axiosCancel.push(cb)
    })
  }
  return request
})
export default Object.assign({}, commonService, HomeService, AboutService)
