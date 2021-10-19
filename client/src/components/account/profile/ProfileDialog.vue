<template>
  <DialogButton
    v-model="dialog"
    max-width="600"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <template v-slot:button="slotProps">
      <slot name="button" v-bind="slotProps"></slot>
    </template>

    <template v-if="dialog" v-slot:content>
      <v-card class="card">
        <v-toolbar v-if="$vuetify.breakpoint.xsOnly" dense>
          <v-spacer></v-spacer>
          <v-btn icon @click="hideDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-tabs v-model="tab" grow center-active>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Profile
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            Change Password
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item class="tab-item">
            <Profile />
          </v-tab-item>
          <v-tab-item class="tab-item">
            <ChangePassword />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </DialogButton>
</template>

<script>
import DialogButton from '@/components/common/DialogButton'
import Profile from '@/components/account/profile/Profile'
import ChangePassword from "@/components/account/profile/ChangePassword"
export default {
  name: 'ProfileDialog',
  components: {
    DialogButton,
    Profile,
    ChangePassword
  },
  data: () => ({
    dialog: null,
    tab: null
  }),
  methods: {
    hideDialog () {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  .header {
    text-align: center;
  }

  .tab-item {
    padding: 1rem;
  }
}
</style>