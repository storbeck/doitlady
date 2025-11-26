<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="500"
  >
    <template #activator="{ props }">
      <v-btn 
        v-bind="props"
        variant="outlined"
        prepend-icon="mdi-plus"
        class="ml-3"
      >
        Add Task
      </v-btn>
    </template>
    <template #default>
      <v-card title="Add New Task">
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="taskName"
              label="Task Name"
              required
            />
            <v-textarea
              v-model="taskDescription"
              label="Task Description"
              rows="3"
            />
            <v-select
              v-model="taskStatus"
              :items="swimlanes"
              label="Status"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn 
            text 
            @click="dialogOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn 
            color="primary" 
            @click="handleAdd"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useItemStore } from '@/stores/items'

const itemStore = useItemStore()
const { swimlanes } = itemStore

const taskName = ref('')
const taskDescription = ref('')
const taskStatus = ref('todo')
const dialogOpen = ref(false)

const handleAdd = () => {
  if (!taskName.value.trim() || !taskStatus.value.trim()) {
    return
  }
  const newItem = {
    name: taskName.value,
    description: taskDescription.value,
    status: taskStatus.value,
  }
  itemStore.addItem(newItem)

  dialogOpen.value = false

  // Reset form fields
  taskName.value = ''
  taskDescription.value = ''
  taskStatus.value = 'todo'
}
</script>
