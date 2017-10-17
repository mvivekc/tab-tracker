import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import EditSong from '@/components/EditSong'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong/Index'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(Router)
Vue.use(VueYouTubeEmbed)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'songs'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/song/create',
      name: 'create-song',
      component: CreateSong
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/song/:songId/edit',
      name: 'edit-song',
      component: EditSong
    }
  ]
})
