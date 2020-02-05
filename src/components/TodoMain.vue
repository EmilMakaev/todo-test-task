<template>
  <div id="app">
    <div 
      class="todo-create">
      <todo-create />
    </div>

    <todo-list 
      class="todo-container" />
  </div>
</template>


<script>
import TodoList from '@/components/TodoList'
import TodoCreate from '@/components/TodoCreate'

export default {
  name: 'app',
  components: {
    TodoList,
    TodoCreate
  }
}
</script>
