import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('songs', {
      params: {
        search: search
      }
    })
  },
  post (songData) {
    return Api().post('create-song', songData)
  },
  put (songData) {
    return Api().put(`song/${songData.id}`, songData)
  },
  fetch (songId) {
    return Api().get(`song/${songId}`)
  }
}
