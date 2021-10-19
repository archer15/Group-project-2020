<script>/* eslint-disable */</script>
import { mapActions } from 'vuex'
<template> 
    <form>
        <v-text-field
        v-model="username"
        label="Username"
        required
        ></v-text-field>
        <v-text-field
        v-model="firstName"
        label="First Name"
        required
        ></v-text-field>
        <v-text-field
        v-model="lastName"
        label="Last Name"
        required
        ></v-text-field>
        <v-text-field
        v-model="email"
        label="Email"
        required
        ></v-text-field>
        <v-text-field
      v-model="password"
      type="password"
      label="Password"
      required
    ></v-text-field>
        <v-btn class="mr-4" @click="submit">
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
export default {
    name: 'RegisterForm',
    
    data: () => ({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password:'',
  }),
  methods: {
      ...mapActions({
          register: 'user/register'
      }),
      submit() {
          const payload = {
              username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
          }
          this.register(payload)
          .then(response => {
              console.log(response)
              alert("Congrats you have registered")
          }).catch(e => {
              console.log("error: ", e)
          alert("Failed to register")
          })
      }
  }

}
</script>