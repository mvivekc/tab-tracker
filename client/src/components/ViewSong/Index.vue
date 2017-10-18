<template>
  <v-layout>
    <v-flex xs6>
      <song-metadata :song="song">
      </song-metadata>
      <lyrics :song="song" class="mt-2"></lyrics>
    </v-flex>
    <v-flex xs6>
      <you-tube :song="song" class="ml-2">
      </you-tube>
      <tab :song="song" class="ml-2 mt-2"></tab>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import SongMetadata from '@/components/ViewSong/SongMetadata'
import SongService from '@/services/SongService'
import HistoriesService from '@/services/HistoriesService'
import Lyrics from './Lyrics'
import Tab from './Tab'
import YouTube from './YouTube'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    try {
      const response = await SongService.fetch(this.$route.params.songId)
      this.song = response.data.song
      if (this.isUserLoggedIn) {
        await HistoriesService.post({
          songId: this.song.id
        })
      }
    } catch (e) {
      this.error = e
    }
  },
  data () {
    return {
      song: {
        title: null,
        author: null,
        genre: null,
        album: null,
        albumImgUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    SongMetadata,
    Tab,
    Lyrics,
    YouTube
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
