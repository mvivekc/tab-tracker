import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('histories', {
      params: params
    })
  },
  post (songData) {
    return Api().post('histories', songData)
  }
}
