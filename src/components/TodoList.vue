<template>
  <div>
    <todo-items />
  </div>
</template>

<script>
import TodoItems from '@/components/TodoItems'
  
export default {
  components: {
    TodoItems
  },
  name: 'TodoList',
}
</script>
