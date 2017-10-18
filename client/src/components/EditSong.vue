<template>
  <v-layout>
    <v-flex  xs4>
      <panel title='Song Metadata'>
        <v-text-field
          label="Title"
          v-model="song.title"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          label="Album"
          v-model="song.album"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          label="Genre"
          v-model="song.genre"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          label="Author"
          v-model="song.author"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          label="Album Image URL"
          v-model="song.albumImgUrl"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          label="Youtube ID"
          v-model="song.youtubeId"
          :rules="[required]"
          required
        ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title='Song extra info' class="ml-2">
        <v-text-field
          multi-line
          label="Tab"
          v-model="song.tab"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          multi-line
          label="Lyrics"
          v-model="song.lyrics"
          :rules="[required]"
          required
        ></v-text-field>
      </panel>
      <div v-html="error" v-if="error" class="viv-error">
        {{error}}
      </div>
      <v-btn
        class="cyan"
        dark
        @click="update">
        Update
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
export default {
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
  async mounted () {
    const response = await SongService.fetch(this.$route.params.songId)
    this.song = response.data.song
  },
  methods: {
    async update () {
      const allFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!(this.song[key]))
      if (!allFieldsFilledIn) {
        this.error = 'All fields are required'
        return
      }
      try {
        await SongService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: this.song.id
          }
        })
      } catch (error) {
        this.error = error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
