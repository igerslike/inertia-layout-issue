<template>
    <div>Hello World</div>
</template>

<script lang="ts">
import BaseLayout from '@/views/BaseLayout.vue'
export default {
    layout: BaseLayout
}
</script>

<script setup lang="ts">
const props = defineProps<{
    sessions?: string[]
}>()
</script>
