import axios from 'axios'

const AddTodo = (payload, token) => {
  return axios.post('/api/todo/add', payload, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const RemoveTodo = (payload, token) => {
  return axios.post('/api/todo/remove', payload, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const CompleteTodo = (payload, token) => {
  return axios.patch('/api/todo/complete', payload, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

const GetTodos = (token) => {
  return axios.get('/api/todo', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export default {
  AddTodo,
  RemoveTodo,
  CompleteTodo,
  GetTodos
}