<template>
  <div class="todo-item">
    <div
      v-for="todo in todos"
      class="todo-item-content"
    >
      <div class="todo-item-content-title">
        {{todo.title}}
      </div>
      <div class="todo-item-content-description">
        {{todo.description}}
      </div>
    
      <div class="todo-item-task-list">
        <p v-for="point in todo.inputsTasks.slice(0, 2)">{{point.one}}</p>
      </div>

      <router-link v-bind:to="'/' + todo.id">
        <button class="todo-item-button todo-item-button-edit">Edit</button>
      </router-link>
      
      <button 
        @click="selectedItemToDelete(todo)"
        id="show-modal"
        class="todo-item-button todo-item-button-delete">Delete
      </button>

      <transition name="fade-delete" appear>
        <div 
          class="modal-overlay"
          v-if="showModal"
          @click="showModal = false">
        </div>
      </transition>

      <!-- CSS properties (.modal) were taken from (_TodoCreate.scss) -->
      <div 
      class="modal"
      v-if="showModal"
      >
        <p class="modal__p">Are you sure you want to delete this item?</p>

        <button 
          @click="removeItem(itemToDelete)"
          id="show-modal"
          class="todo-item-button todo-item-button-delete">Delete
        </button>

        <button
          @click="showModal = false"
          type="button"
          class="todo-item-button todo-item-button-cancel">Cancel
        </button>

      </div>
    </div>
    <div 
      v-if="todos.length <= 0"
      class="todo-item-content">
      No todos. Let's create one!
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
    showModal: false,
    itemToDelete: '',
    }
  },
  computed: {
    todos() {
      return store.state.todos
    }
  },
  methods: {
    selectedItemToDelete(todo) {
      this.itemToDelete = todo
      this.showModal = true
    },
    removeItem(itemToDelete) {
      store.dispatch('removeTodo', itemToDelete)
      this.showModal = false
    }
  },
  created () {
    store.dispatch('fetchTodos')
  }
}
</script>