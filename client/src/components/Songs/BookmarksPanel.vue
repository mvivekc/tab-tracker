<template>
  <panel title='Bookmarks'>
    <template>
      <v-data-table
          :headers="headers"
          :pagination.sync="pagination"
          :items="bookmarks"
          class="elevation-1"
        >
        <template slot="items" scope="props">
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.author }}</td>
        </template>
      </v-data-table>
    </template>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data () {
    return {
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Author', value: 'author' }
      ],
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (!this.isUserLoggedIn) {
      return
    }
    this.bookmarks = (await BookmarksService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
