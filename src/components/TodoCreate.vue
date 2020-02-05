<template>
  <div>
    <button 
      @click="showModal = true"
      class="create-button">Create todo
    </button>

    <transition name="fade-two" appear>
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
      <header class="modal__header">
        <h2>Add a Todo</h2>
      </header>
      
      <section class="section">
        <form>
          <div class="section__title">
            <label class="section__title-label">Title</label>
            <input
              v-model="allData.title"
              class="section__title-input"
              type="text">
          </div>

          <div class="section__description">
            <label class="section__description-label">Description</label>
            <textarea
              v-model="allData.description"
              cols="30"
              rows="5"
              class="section__description-input">
            </textarea>
          </div>

          <div class="section__tasks">
            <p class="section__tasks-p">Add task item</p>
            <ul>
              <li 
                v-for="(input, index) in allData.inputsTasks"
                class="section__tasks-li"
              >
              <input 
                type="text" 
                v-model="input.one"
                class="section__tasks-input"
              >
              <button 
                @click.prevent="deleteRow(index)"
                class="section__tasks-button section__tasks-button-delete"
              >Delete</button>
              </li>
            </ul>
            <button 
              @click.prevent="addRow"
              class="section__tasks-button section__tasks-button-add"
            >Add new row</button>
          </div>

          <div class="section__buttons">
            <button 
              type="button"
              class="section__button section__button-add"
              @click="createTodo">Add
            </button>
            <button 
              type="button"
              class="section__button section__button-cancel"
              @click="showModal = false">Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  data() {
    return {
      showModal: false,
      allData: {
        id: Math.random().toString(36).substr(2, 10),
        title: '',
        description: '',
        inputsTasks: []
      }
    }
  },
  methods: {
    addRow() {
      this.allData.inputsTasks.push({
        one: '',
        status: true,
        idTask: Math.random().toString(36).substr(2, 10)
      })
    },
    deleteRow(index) {
      this.allData.inputsTasks.splice(index, 1)
    },
    createTodo() {
      store.dispatch('createTodo', {...this.allData})
      this.showModal = false
      localStorage.setItem('my_todos', JSON.stringify(store.state.todos));
      this.allData = ''
    }
  }
}
</script>