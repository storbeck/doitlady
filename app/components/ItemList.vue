<template>
  <v-row 
    v-for="swimlane in swimlanes" 
    :key="swimlane" 
    :cols="swimlanes.length"
  >
    <v-col cols="12">
      <h3 class="text-capitalize">{{ swimlane }}</h3>
      <v-list
        :class="{ 'drop-zone': true, 'dragover': isDragOver(swimlane), 'border': true }"
        @drop.prevent.stop="onDrop($event, swimlane)"
        @dragover.prevent
        @dragenter="onDragEnter(swimlane)"
        @dragleave="onDragLeave(swimlane)"
      >
        <v-list-item
          v-for="item in items.filter(i => i.status === swimlane)"
          :key="item.id"
          class="drag-el border"
          :draggable="true"
          @dragstart="startDrag($event, item)"
        >
          <v-container class="d-flex align-center pa-0">
            
            <v-icon class="mr-2 w-10">mdi-drag</v-icon>
            <v-container class="flex-grow-1 pa-0">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            </v-container>
            
            <v-icon @click="itemStore.removeItem(item)">mdi-close</v-icon>
          </v-container>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/items'
import { ref } from 'vue'


const { data } = await useFetch('/api/hello')
console.log('API Response:', data.value)

const itemStore = useItemStore()
const { swimlanes } = itemStore
const { items } = storeToRefs(itemStore);

const dragOverCounts = ref<Record<string, number>>({})

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemId', String(item.id))
}

const onDrop = (event, list) => {
  const itemId = event.dataTransfer.getData('itemId')
  const item = items.value.find(i => i.id === itemId)
  if (!item) return

  itemStore.updateStatus(item, list)
  dragOverCounts.value = {}
}

const onDragEnter = (swimlane: string) => {
  if (!dragOverCounts.value[swimlane]) {
    dragOverCounts.value[swimlane] = 0
  }
  dragOverCounts.value[swimlane]++
}

const onDragLeave = (swimlane: string) => {
  if (dragOverCounts.value[swimlane]) {
    dragOverCounts.value[swimlane]--
  }
}

const isDragOver = (swimlane: string) => {
  return (dragOverCounts.value[swimlane] || 0) > 0
}
</script>

<style lang="scss" scoped>
.drop-zone {
  margin-bottom: 10px;
  padding: 10px;
}

// style drop-zone when dragging over
.drop-zone.dragover {
  background-color: rgba(var(--v-theme-on-surface), 0.1);
}

.drag-el {
  margin-bottom: 10px;
  padding: 5px;
  cursor: grab;
  user-select: none;
  &:hover {
    background-color: rgba(var(--v-theme-on-surface), 0.04);
  }
}
</style>
