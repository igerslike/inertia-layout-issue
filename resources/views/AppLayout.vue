<template>
    <div class="flex flex-col justify-between h-screen">
        <div class="flex flex-grow theme-transition text-copy-primary bg-bg-primary">
            <!-- Page Content -->
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * The app layout for the application (guests and users)
 * Automatically registered in app.js/ssr.js
 *
 * @name AppLayout
 * @parent BaseLayout
 */
</script>
