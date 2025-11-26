<template>
  <ItemList />
</template>
<script setup lang="ts">
definePageMeta({
    middleware: ['authenticated']
})
</script>