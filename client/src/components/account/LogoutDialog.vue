<template>
  <DialogButton
    v-model="dialog"
    persistent
    max-width="350"
  >
    <template v-slot:button="slotProps">
      <slot name="button" v-bind="slotProps"></slot>
    </template>

    <template v-if="dialog" v-slot:content>
      <v-card>
        <v-card-title class="title">
          Are you sure you want to logout?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="hideDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="handleLogout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </DialogButton>
</template>

<script>
import DialogButton from '@/components/common/DialogButton'
import { mapActions } from 'vuex'
export default {
  name: 'LogoutDialog',
  components: {
    DialogButton
  },
  data: () => ({
    dialog: null
  }),
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    hideDialog () {
      this.dialog = false
    },
    handleLogout () {
      this.logout()
      this.hideDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  word-break: break-word;
}
</style>