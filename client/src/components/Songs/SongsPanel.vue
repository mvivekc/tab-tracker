<template>
  <panel title='Songs'>
    <v-btn
      slot="action"
      class="green"
      dark
      medium
      absolute
      right
      middle
      fab
      :to="{name: 'create-song'}">
      <v-icon>
        add
      </v-icon>
    </v-btn>
    <div
      v-for="song in songs"
      :key="song.id">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-author">
            {{song.author}}
          </div>
          <div class="song-album">
            {{song.album}}
          </div>
          <v-btn
            dark
            class="cyan"
            :to="{
              name: 'song',
              params: {
                songId: song.id
              }
            }">
            View
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-img" :src="song.albumImgUrl" />
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongService.index(value)).data.songs
      }
    }
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
