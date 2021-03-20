import axios from 'axios'
import config from './config'

export default {
  getSignedURL (file) {
    let endpoint = config.AWS_LAMBDA_GETSIGNEDURL_ENDPOINT
    let payload = {
      filePath: file.name,
      contentType: file.type
    }
    return axios.post(endpoint, payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res) => {
        return Promise.resolve(res.data.url || '/')
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject('/')
      })
  }
}