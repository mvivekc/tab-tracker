<template>
  <v-layout>
    <v-flex xs6  v-if="isUserLoggedIn">
      <bookmarks-panel />
      <recent-viewed-panel class="mt-2" />
    </v-flex>
    <v-flex :class="{
      xs6: isUserLoggedIn,
      xs12: !isUserLoggedIn,
      }" class="ml-2">
      <songs-search-panel/>
      <songs-panel class="mt-2"/>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import RecentViewedPanel from './RecentViewedPanel'
import BookmarksPanel from './BookmarksPanel'
import SongService from '@/services/SongService'
export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    BookmarksPanel,
    RecentViewedPanel
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    const response = await SongService.index()
    this.songs = response.data.songs
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song-title {
  font-size: 18px;
}
.song-album {
  font-size: 20px;
}
.song-author {
  font-size: 24px;
}
.album-img {
  width: 100%;
  margin: 0 auto;
}
</style>
