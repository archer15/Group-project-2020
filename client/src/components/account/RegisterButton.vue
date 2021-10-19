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
          Register
        </v-btn>
      </template>

      <v-card>
        <v-container class="register-container">
          <h1 class="mb-1">Register</h1>
          <RegisterForm />
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import RegisterForm from '@/components/account/RegisterForm.vue'
export default {
  name: 'RegisterButton',
  components: {
    RegisterForm,
  },
  data: () => ({
    dialog: null
  })
}
</script>

<style lang="scss" scoped>
.register-container {
  padding: 1rem 2rem;
  text-align: center;
}
</style>