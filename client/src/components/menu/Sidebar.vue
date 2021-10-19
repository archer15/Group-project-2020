<template>
  <v-navigation-drawer
    v-model="sidebar.open"
    app
    right
    stateless
  >
    <v-container class="sidebar">
      <div class="top-bar">
        <div v-if="auth" class="logout-container">
          <LogoutDialog>
            <template v-slot:button="{ on, attrs }">
              <v-btn
                small
                text
                color="grey"
                v-bind="attrs"
                v-on="on">
                Logout
              </v-btn>
            </template>
          </LogoutDialog>
        </div>
        <div class="btns" v-else>
          <LoginButton />
          <RegisterButton />
        </div>
      </div>

      <div v-if="auth" class="avatar-container">
        <ProfileDialog>
          <template v-slot:button="{ on, attrs }">
            <v-avatar v-on="on" v-bind="attrs" size="100px">
              <v-img v-if="photo && !imgError" :src="photo" v-on:error="onImgError" />
              <v-icon v-else size="100px">
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </template>
        </ProfileDialog>
        <h3 class="mt-1">Welcome, {{firstName | capitalize}}!</h3>
      </div>

      <v-divider class="divider"></v-divider>

      <v-list>
        <ProfileDialog v-if="auth">
          <template v-slot:button="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon>
                <v-icon>mdi-account-box</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </ProfileDialog>
        <CalendarDialog v-if="auth">
          <template v-slot:button="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon>
                <v-icon>mdi-calendar-account</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Calendar</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          </CalendarDialog>
      </v-list>
    </v-container>

  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginButton from '@/components/account/LoginButton'
import RegisterButton from '@/components/account/RegisterButton'
import LogoutDialog from '@/components/account/LogoutDialog'
import ProfileDialog from '@/components/account/profile/ProfileDialog'
import CalendarDialog from '@/components/common/CalendarDialog'

export default {
  name: 'Sidebar',
  components: {
    LoginButton,
    RegisterButton,
    LogoutDialog,
    ProfileDialog,
    CalendarDialog,
  },
  data: () => ({
    drawer: null,
    imgError: null
  }),
  computed: {
    ...mapGetters({
      sidebar: 'ui/sidebar',
      auth: 'user/auth',
      firstName: 'user/firstName',
      photo: 'user/photo'
    })
  },
  watch: {
    photo (val) {
      if (val) {
        this.imgError = null
      }
    }
  },
  methods: {
    onImgError (err) {
      this.imgError = err
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  .avatar-container {
    margin: 1rem 0rem;
    text-align: center;
  }

  .top-bar {
    margin-bottom: 1rem;

    .logout-container {
      display: flex;
      justify-content: flex-end;
    }

    .btns {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>