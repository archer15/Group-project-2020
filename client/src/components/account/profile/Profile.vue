<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="avatar-container">
         <v-avatar size="100px" class="avatar" :class="{ loading }" @click="handleAvatarClick">
          <v-img v-if="photo" class="avatar-image" :src="photo" v-on:error="onImgError" />
          <v-icon v-else size="100px" class="avatar-image">
            mdi-account-circle
          </v-icon>
          <input
            type="file"
            ref="fileInput"
            name="avatar"
            style="display: none;"
            @change="handleAvatarChange"
          />
          <v-btn
            color="blue"
            icon
            class="upload-btn"
          >
            <v-icon dark>
              mdi-cloud-upload
            </v-icon>
          </v-btn>
          <v-progress-circular
            v-show="loading"
            indeterminate
            :size="36"
            :width="2"
            color="primary"
            class="progress"
          />
        </v-avatar>
      </v-col>
      <v-col cols="12" md="8">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="firstName"
                label="First Name"
                required
              ></v-text-field>
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col>
            <v-btn color="red" dark @click="handleUpdate">
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Profile',
  data: () => ({
    loading: false,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: ''
  }),
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  mounted () {
    this.initUser()
  },
  methods: {
    ...mapActions({
      update: 'user/update',
      updatePhoto: 'user/updatePhoto'
    }),
    initUser () {
      this.username = this.user.username
      this.firstName = this.user.firstName
      this.lastName = this.user.lastName
      this.email = this.user.email
      this.photo = this.user.photo
    },
    handleUpdate () {
      this.update({
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      })
    },
    rename (file) {
      const ext = file.name.split('.')[1]
      const name = `${uuidv4()}.${ext}`

      return name
    },
    handleAvatarClick () {
      this.$refs.fileInput.click()
    },
    handleAvatarChange ({ target }) {
      const file = target.files[0]
      if (!file) return

      this.loading = true
      const formData = new FormData()
      formData.append('avatar', file)

      this.updatePhoto(formData)
        .then(res => this.initUser())
        .finally(() => this.loading = false)
    },
    onImgError () {
      this.photo = null
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  cursor: pointer;

  &.loading {
     .avatar-image {
      opacity: 0.3;
    }

    .upload-btn {
      opacity: 1 !important;
    }
  }

  &:hover {
    .avatar-image {
      opacity: 0.3;
    }

    .upload-btn {
      opacity: 1 !important;
    }
  }

  .upload-btn {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .progress {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}

.col {
  padding-bottom: 0px !important;
  padding-top: 0px !important;
}
</style>