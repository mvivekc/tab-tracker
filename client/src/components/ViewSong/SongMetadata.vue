<template>
  <panel title="Song Metadata">
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
          class="cyan"
          dark
          :to="{
            name: 'edit-song',
            params () {
              return {
                songId: song.id
              }
            }
          }">
          Edit
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && !this.isBookmarked"
          class="cyan"
          dark
          @click="setBookmark">
          Bookmark
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && this.isBookmarked"
          class="cyan"
          dark
          @click="unSetBookmark">
          UnBookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-img" :src="song.albumImgUrl" />
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      isBookmarked: false
    }
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      const bookmarks = (await BookmarksService.index({
        songId: this.song.id
      })).data
      if (bookmarks.length) {
        this.bookmark = bookmarks[0]
      }
      this.isBookmarked = !!bookmarks.length
    }
  },
  methods: {
    async setBookmark () {
      this.bookmark = (await BookmarksService.post({
        songId: this.song.id
      })).data
      this.isBookmarked = true
    },
    async unSetBookmark () {
      await BookmarksService.delete(this.bookmark.id)
      this.isBookmarked = false
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
