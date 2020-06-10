import axios from 'axios'

// todo: 缓存
export default function (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(({ data }) => {
        data.success ? resolve(data) : reject(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function axiosPostFactory (param) {
  return new Promise((resolve, reject) => {
    param.method = 'post'
    param.headers = param.headers || { 'Content-Type': 'application/x-www-form-urlencoded' }
    axios(param).then(({ data }) => {
      data.success ? resolve(data) : reject(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
