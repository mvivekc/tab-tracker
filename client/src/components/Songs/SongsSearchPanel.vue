<template>
  <panel title="Search">
    <v-text-field
      label="Search Title, Author, Album, Genera"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          'search': this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
