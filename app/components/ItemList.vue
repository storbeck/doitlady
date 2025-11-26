<template>
  <v-row 
    v-for="swimlane in swimlanes" 
    :key="swimlane" 
    :cols="swimlanes.length"
  >
    <v-col cols="12">
      <h3 class="text-capitalize">{{ swimlane }}</h3>
      <v-list
        class="drop-zone border"
        @drop.prevent.stop="onDrop($event, swimlane)"
        @dragover.prevent
        @dragenter.prevent
      >
        <v-list-item
          v-for="item in items.filter(i => i.status === swimlane)"
          :key="item.id"
          :draggable="true"
          @dragstart="startDrag($event, item)"
          class="drag-el border"
        >
          <v-container class="d-flex align-center pa-0">
            <v-list-item-prepend class="w-10">
              <v-icon class="mr-2">mdi-drag</v-icon>
            </v-list-item-prepend>
            <v-list-item-content class="flex-grow-1">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-append>
              <v-icon @click="itemStore.remoteItem(item)">mdi-close</v-icon>
            </v-list-item-append>
          </v-container>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/items'

const itemStore = useItemStore()
const { swimlanes } = itemStore
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

<style lang="scss" scoped>
.drop-zone {
  margin-bottom: 10px;
  padding: 10px;
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
