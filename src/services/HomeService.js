import commonPromise, { axiosPostFactory } from './commonPromise'

export default {
  getHomeData () {
    return commonPromise('/apply/workDetail')
  },
  getHomeData1 (params) {
    return axiosPostFactory({
      headers: { 'Content-Type': 'multipart/form-data' },
      data: params,
      url: '/apply/leaveSubmit'
    })
  }
}
