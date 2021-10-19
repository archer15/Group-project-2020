<template>
   <v-btn
    class="menu-btn"
    color="black"
    icon
    large
    elevation="2"
    @click="toggleSidebar">
    <v-icon>mdi-menu</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MenuButton',
  methods: {
    ...mapActions({
      toggleSidebar: 'ui/toggleSidebar'
    })
  }
}
</script>

<style lang="scss" scoped>
.menu-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
}
</style>