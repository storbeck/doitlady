<template>
<v-row v-for="swimlane in AVAILABLE_SWIMLANES" :key="swimlane" :cols="AVAILABLE_SWIMLANES.length">
  <v-col cols="12">
    <h3 class="text-capitalize">{{ swimlane }}</h3>
    <v-list
      class="drop-zone"
      @drop.prevent.stop="onDrop($event, swimlane)"
      @dragover.prevent
      @dragenter.prevent
    >
      <v-list-item
        v-for="item in items.filter(i => i.status === swimlane)"
        :key="item.id"
        :title="item.name"
        :subtitle="item.description"
        class="drag-el"
        :draggable="true"
        @dragstart="startDrag($event, item)"
      />
    </v-list>
  </v-col>
</v-row>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/items'

const AVAILABLE_SWIMLANES = ['blocked', 'in-progress', 'todo', 'done']

const itemStore = useItemStore()
const { items } = storeToRefs(itemStore);

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemId', String(item.id))
}

const onDrop = (event, list) => {
  const itemId = Number(event.dataTransfer.getData('itemId'))
  const item = items.value.find(i => i.id === itemId)
  if (!item) return

  itemStore.updateStatus(item, list)
}
</script>

<style scoped>
.drop-zone {
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  margin-bottom: 10px;
  padding: 5px;
  cursor: grab;
  user-select: none;
}
</style>
