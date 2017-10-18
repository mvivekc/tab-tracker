<template>
  <panel title='Youtube'>
    <youtube :video-id="song.youtubeId">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
