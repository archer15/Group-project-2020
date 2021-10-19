import axios from 'axios'

const Login = (payload) => {
  return axios.post('/api/user/login', payload)
}

const Register = (payload) => {
  return axios.post('/api/user/register', payload)
}

const Update = (token, payload) => {
  return axios.patch('/api/user/update', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const UpdatePhoto = (token, payload) => {
  return axios.patch('/api/user/update/photo', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

const UpdatePassword = (token, payload) => {
  return axios.patch('/api/user/update/password', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export default {
  Login,
  Register,
  Update,
  UpdatePhoto,
  UpdatePassword
}