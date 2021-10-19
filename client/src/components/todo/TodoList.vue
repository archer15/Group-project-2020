<script>
  /* eslint-disable */

</script>

<template>
  <v-card class="pt-5">
    <v-card-text style="height: 500px;">
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo"
      @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown">
      <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
        <div class="todo-item-left">
          <input type="checkbox" v-model="todo.completed" @change="() => handleCompleteTodo(todo.id)">

          <div v-if="!todo.editing" @dblclick="editTodo(todo)" class="todo-item-label"
            :class="{ completed : todo.completed}">
            {{ todo.title }}
          </div>
          <input v-else class="todo-item-edit" type="text" v-model="todo.title"
            @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"
            v-focus>


        </div>
        <div class="remove-item" @click="() => removeTodo(todo.id)">
          &times;
        </div>
      </div>
    </transition-group>

    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox" :checked="!anyRemaining" @change="changeAllTodos">Check All
        </label>
      </div>
      <div> {{ remaining }} items left </div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed' }"
          @click="filter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>


    </div>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'TodoList',
    data() {
      return {
        newTodo: '',
        idForTodo: 3,
        beforeEditCache: '',
        filter: 'all',
        todos: []
      }
    },
    computed: {
      remaining() {
        return this.todos.filter(todo => !todo.completed).length
      },

      anyRemaining() {
        return this.remaining != 0
      },

      todosFiltered() {
        if (this.filter == 'all') {
          return this.todos
        } else if (this.filter == 'active') {
          return this.todos.filter(todo => !todo.completed)
        } else if (this.filter == 'completed') {
          return this.todos.filter(todo => todo.completed)
        }

        return this.todos
      },

      showClearCompletedButton() {
        return this.todos.filter(todo => todo.completed).length > 0
      }

    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    async mounted () {
      const todos = await this.getTodos()
      this.todos = todos
    },
    methods: {
      ...mapActions({
        addTodoHandler: 'todo/addTodo',
        getTodos: 'todo/getTodos',
        completeTodo: 'todo/completeTodo',
        removeTodoHandler: 'todo/removeTodo'
      }),
      async handleCompleteTodo (id) {
        const todo = this.todos.find(todo => todo.id === id)
        const todos = await this.completeTodo({ todoId: todo.id, completed: todo.completed })
        this.todos = todos
      },
      async addTodo() {
        const todo = {
          id: this.idForTodo,
          title: this.newTodo,
          completed: false,
        }

        const todos = await this.addTodoHandler(todo)
        this.todos = todos

        this.newTodo = ''
        this.idForTodo++
      },
      editTodo(todo) {
        this.beforeEditCache = todo.title
        todo.editing = true
      },

      doneEdit(todo) {
        if (todo.title.trim().length == 0) {
          todo.title = this.beforeEditCache
        }
        todo.editing = false
      },

      cancelEdit(todo) {
        todo.title = this.beforeEditCache
        todo.editing = false
      },

      async removeTodo (id) {
        const todo = this.todos.find(todo => todo.id === id)
        const todos = await this.removeTodoHandler({ todoId: todo.id })
        this.todos = todos
      },

      checkAllTodos() {
        this.todos.forEach((todo) => todo.completed = event.target.checked)
      },
      clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed)
      },
      changeAllTodos() {

      }
    }
  }

</script>

<style lang="scss" scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");



  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0.2;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;

    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

</style>
