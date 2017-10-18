import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get('bookmarks', {
      params: params
    })
  },
  post (params) {
    return Api().post('bookmarks', {
      params: params
    })
  },
  delete (id) {
    return Api().delete(`bookmarks/${id}`)
  }
}
