<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'

// Libraries
import { v4 as uuidV4 } from 'uuid'

type TodoListItem = {
  id: ReturnType<typeof uuidV4>
  text: string
}

const todoInputRef = ref<HTMLInputElement | null>(null)
const todoInputValue = ref('')
const todoList = reactive<TodoListItem[]>([])

onMounted(() => {
  todoInputRef.value?.focus()
})

const hasTodoInputValue = computed(() => todoInputValue.value === '')

/**
 * 提交表單
 */
function onSubmit() {
  // 如果 Input 沒有值，就不做任何事
  if (todoInputValue.value === '') {
    return
  }

  // 新增 todo 到 todoList
  const newTodoItem: TodoListItem = {
    id: uuidV4(),
    text: todoInputValue.value.trim(),
  }
  todoList.push(newTodoItem);

  // 清除輸入值
  clearInput()
}

/**
 * 清除輸入值
 */
function clearInput() {
  todoInputValue.value = ''
  todoInputRef.value?.focus()
}
</script>

<template>
  <!-- Title -->
  <h1>Todo List</h1>

  <!-- 輸入表單 -->
  <form class="todoForm" @submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="Enter todo"
      ref="todoInputRef"
      v-model.trim="todoInputValue"
      @keyup.esc="clearInput"
    />
    <button type="submit" :disabled="hasTodoInputValue">
      Submit
    </button>
    <button
      type="button"
      @click="clearInput"
      :disabled="hasTodoInputValue"
    >
      Clear
    </button>
  </form>

  <!-- 清單 -->
  <ul>
    <li v-for="todo in todoList" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.todoForm {
  display: flex;
  gap: 0 8px;
}
</style>
