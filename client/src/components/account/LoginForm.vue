<script>/* eslint-disable */</script>
<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="16"
      label="Username"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
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
import { required, maxLength, email} from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  validations: {
    name: {
      required,
      maxLength: maxLength(16)
    }
  },
  data: () => ({
    name: '',
    password:'',
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 16 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    submit () {
      const payload = {
        username: this.name,
        password: this.password
      }

      this.login(payload)
        .then(response => {
          console.log(response)
          alert("Congrats! You have logged in ", this.name.toUpperCase)
        }).catch(e => {
          console.log("error: ", e)
          alert("incorrect details")
        })
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.password = ''
    },
  }
}
</script>