<template>
  <section class="section">
    <form>
      <div class="section__title section__title-single">
        <label class="section__title-label">Title</label>
        <input
          v-model="todo.title"
          class="section__title-input"
          type="text"
        >
      </div>
      <div class="section__description">
        <label class="section__description-label">Description</label>
        <textarea
          v-model="todo.description"
          cols="30"
          rows="2"
          class="section__description-input"
        >
        </textarea>
      </div>

      <div class="section__tasks">
        <p class="section__tasks-p">Add task item</p>
        <ul>
          <li 
            v-for="(point, index) in todo.inputsTasks"
            class="section__tasks-li"
          >
          <input 
            type="checkbox"
            :checked="point.status"
            :id="point.idTask"
            v-model="point.status"
            class="section__tasks-input"
          >
          <input 
            type="text" 
            v-model="point.one"
            class="section__tasks-input"
          >
          <button 
            @click.prevent="deleteRow(index)"
            class="section__tasks-button section__tasks-button-delete"
          >Delete</button>
          </li>
        </ul>
      </div>

      <button 
        @click.prevent="addRow"
        class="section__tasks-button section__tasks-button-add"
      >Add one new row
      </button>

      <button
        type="button"
        @click="returnToDefault"
        class="section__tasks-button section__tasks-button-add">Return to default
      </button>

      <button
        :disabled="returnToDefaultIsActive"
        type="button"
        @click="revertToYourChanges"
        class="section__tasks-button section__tasks-button-add">Revert to your changes
      </button>

      <br>
      
      <router-link 
        tag="button"
        type="button"
        @click.native="updateTodo"
        to="/"
        class="section__button section__button-add">Update
      </router-link>
      
      <button
        @click.prevent="showModalBack = true"
        class="section__button section__button-cancel">Back
      </button>

      <!-- CSS properties (.modal) were taken from (_TodoCreate.scss) -->
      <transition name="fade-back" appear>
        <div 
          class="modal-overlay"
          v-if="showModalBack"
          @click="showModalBack = false"
        >
        </div>
      </transition>

      <div 
      class="modal"
      v-if="showModalBack"
      >
        <p class="modal__p">Return to the main page or continue editing the item?</p>

        <router-link to="/">
          <button
            id="show-modal"
            class="todo-item-button todo-item-button-delete">Main page
          </button>
        </router-link>

        <button
          @click="showModalBack = false"
          type="button"
          class="todo-item-button todo-item-button-cancel">Cancel
        </button>
      </div>

      <button
        @click.prevent="selectedItemToDelete(todo)"
        class="section__button section__button-delete">Delete
      </button>

      <!-- CSS properties (.modal) were taken from (_TodoCreate.scss) -->
      <!-- name="fade-delete" was taken from (_TodoItems.scss) -->
      <transition name="fade-delete" appear>
        <div 
          class="modal-overlay"
          v-if="showModal"
          @click="showModal = false"
        >
        </div>
      </transition>

      <div 
      class="modal"
      v-if="showModal"
      >
        <p class="modal__p">Are you sure you want to delete this item?</p>

        <router-link to="/">
          <button 
            @click="removeItem(itemToDelete)"
            id="show-modal"
            class="todo-item-button todo-item-button-delete">Delete
          </button>
        </router-link>

        <button
          @click="showModal = false"
          type="button"
          class="todo-item-button todo-item-button-cancel">Cancel
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import store from '@/store'
import _ from "lodash"

export default {
  data() {
    return {
      id: this.$route.params.id,
      todo: [],
      defaultTodo: [],
      backupData: [],
      showModal: false,
      showModalBack: false,
      itemToDelete: '',
      buttonReturnToDefaultIsActive: false
    }
  },
  computed: {
    returnToDefaultIsActive() {
      return !this.buttonReturnToDefaultIsActive
    }
  },
  created() {
    const getTodo = store.state.todos.find(element => element.id === this.id)
    this.todo = _.cloneDeep(getTodo)
    this.defaultTodo = _.cloneDeep(getTodo)
  },
  methods: {
    updateTodo() {      
      store.dispatch('updateTodo', {...this.todo})
    },
    deleteRow(index) {
    this.todo.inputsTasks.splice(index, 1)
    },
    returnToDefault() {
      if (!this.backupData.title || this.backupData.title != this.todo.title) {
        this.backupData = _.cloneDeep(this.todo)
      }
      this.todo = _.cloneDeep(this.defaultTodo)
      this.buttonReturnToDefaultIsActive = true
    },
    revertToYourChanges() {
      this.todo = _.cloneDeep(this.backupData)
    },
    addRow() {
      this.todo.inputsTasks.push({
        one: '',
        status: true,
        idTask: Math.random().toString(36).substr(2, 10)
      })
    },
    selectedItemToDelete(todo) {
      this.itemToDelete = todo
      this.showModal = true
    },
    removeItem(itemToDelete) {
      store.dispatch('removeTodo', itemToDelete)
      this.showModal = false
    }
  }
}
</script>