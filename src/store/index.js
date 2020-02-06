import Vue from 'vue';
import Vuex from 'vuex';
import initialTodos from '@/api/initialTodos';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  mutations: {
    setProducts(state, todos) {
      state.todos = todos;
    },
    deleteTodo(state, todoId) {
      state.todos.splice(state.todos.findIndex(todo => todo.id === todoId), 1);
      localStorage.setItem('my_todos', JSON.stringify(state.todos));
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    refreshTodo(state, todoToUpdate) {
      const index = state.todos.findIndex((todo) => {
        return todo.id === todoToUpdate.id;
      });

      Vue.set(state.todos, index, todoToUpdate);
      localStorage.setItem('my_todos', JSON.stringify(state.todos));
      return state.todos;
    },
  },
  actions: {
    fetchTodos({
      commit,
      state
    }) {
      const todosFromLocalStorage = localStorage.getItem('my_todos');

      if (!todosFromLocalStorage) {
        return new Promise((resolve, reject) => {
          initialTodos.getProducts(todos => {
            commit('setProducts', todos);
            resolve();
          });
        });
      } else {
        Vue.set(state, 'todos', JSON.parse(todosFromLocalStorage));
      }

      return state.todos;
    },
    removeTodo(state, todo) {
      state.commit('deleteTodo', todo.id);
    },
    createTodo(state, todo) {
      state.commit('addTodo', todo);
    },
    updateTodo(state, todoToUpdate) {
      state.commit('refreshTodo', todoToUpdate);
    }
  },
  modules: {}
});