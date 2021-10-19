<template>
  <v-bar class="favorite-bar">
    <a href="https://www.youtube.com">
<img border="0" alt="YouTube" src="http://pngimg.com/uploads/youtube/youtube_PNG12.png" width="50" height="50">
</a>&nbsp;
<a href="https://www.twitter.com">
<img border="0" alt="Twitter" src="http://pngimg.com/uploads/twitter/twitter_PNG28.png" width="50" height="50">
</a>
<a href="https://www.twitch.tv">
<img border="0" alt="Twitch TV" src="http://pngimg.com/uploads/twitch/twitch_PNG56.png" width="50" height="50">
</a>
  </v-bar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'FavoriteBar',
  data: () => ({
    
  }),
  
  
}
</script>

<style>

.favorite-bar {
  position: absolute;
  top: 85%;
  left:20%;
  width: 60%;
  height:5%;
  
  margin: 1.5rem;
}
</style>