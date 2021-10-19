<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          color="grey"
          v-bind="attrs"
          v-on="on">
          Login
        </v-btn>
      </template>

      <v-card>
        <v-container class="login-container">
          <h1 class="mb-1">Login</h1>
          <LoginForm />
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LoginForm from '@/components/account/LoginForm.vue'
export default {
  name: 'LoginButton',
  components: {
    LoginForm
  },
  data: () => ({
    dialog: null
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  padding: 1rem 2rem;
  text-align: center;
}
</style>