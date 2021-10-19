<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col offset-sm="2" sm="8" cols="12">
          <v-text-field
            v-model="currentPassword"
            :append-icon="show.currentPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.currentPassword ? 'text' : 'password'"
            :error-messages="currentPasswordErrors"
            name="currentPassword"
            label="Current Password"
            @click:append="show.currentPassword = !show.currentPassword"
            required
            @input="$v.currentPassword.$touch()"
            @blur="$v.currentPassword.$touch()"
          ></v-text-field>
        </v-col>
        <v-col offset-sm="2" sm="8" cols="12">
          <v-text-field
            v-model="newPassword"
            :append-icon="show.newPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.newPassword ? 'text' : 'password'"
            :error-messages="newPasswordErrors"
            name="newPassword"
            label="New Password"
            @click:append="show.newPassword = !show.newPassword"
            @input="$v.newPassword.$touch()"
            @blur="$v.newPassword.$touch()"
          ></v-text-field>
        </v-col>
        <v-col offset-sm="2" sm="8" cols="12">
          <v-text-field
            v-model="confirmPassword"
            :append-icon="show.confirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.confirmPassword ? 'text' : 'password'"
            :error-messages="confirmPasswordErrors"
            name="confirmPassword"
            label="Confirm Password"
            @click:append="show.confirmPassword = !show.confirmPassword"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="action-bar">
        <v-btn type="reset" class="mr-4" @click="handleClear">
          Clear
        </v-btn>
        <v-btn type="submit" color="primary" @click="handleSubmit">
          Submit
        </v-btn>
      </div>
    </v-container>

    <v-snackbar v-model="snackbar.show" :color="snackbar.variant" top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'ChangePassword',
  mixins: [validationMixin],
  validations: {
    currentPassword: {
      required
    },
    newPassword: {
      required
    },
    confirmPassword: {
      sameAsPassword: sameAs('newPassword')
    }
  },
  data: () => ({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    show: {
      currentPassword: false,
      newPassword: false,
      confirmPassword: false
    },
    snackbar: {
      show: null,
      text: '',
      variant: 'success'
    }
  }),
  computed: {
    currentPasswordErrors () {
      const errors = []
      if (!this.$v.currentPassword.$dirty) return errors
      !this.$v.currentPassword.required && errors.push('Password is required')
      return errors
    },
    newPasswordErrors () {
      const errors = []
      if (!this.$v.newPassword.$dirty) return errors
      !this.$v.newPassword.required && errors.push('Password is required')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAsPassword && errors.push('Passwords must match')
      return errors
    }
  },
  methods: {
    ...mapActions({
      changePassword: 'user/changePassword'
    }),
    handleClear () {
      this.$v.$reset()
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    showSnackbar ({ text, variant }) {
      this.snackbar.text = text
      this.snackbar.variant = variant
      this.snackbar.show = true
    },
    handleSubmit (e) {
      e.preventDefault()
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.showSnackbar({
          text: 'Form invalid!',
          variant: 'danger'
        })
        return
      }

      this.changePassword({
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
      .then(res => {
        this.handleClear()
        this.showSnackbar({ text: 'Successfully changed password!', variant: 'success' })
      })
      .catch(err => {
        console.error(err)
        this.showSnackbar({ text: 'Failed to change password!', variant: 'danger' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.action-bar {
  display: flex;
  justify-content: flex-end;
}
</style>