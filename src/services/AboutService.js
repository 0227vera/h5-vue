import commonPromise, { axiosPostFactory } from './commonPromise'

export default {
  geAboutData () {
    return commonPromise('/apply/workDetail')
  },
  geAboutData1 (params) {
    return axiosPostFactory({
      headers: { 'Content-Type': 'multipart/form-data' },
      data: params,
      url: '/apply/leaveSubmit'
    })
  }
}
