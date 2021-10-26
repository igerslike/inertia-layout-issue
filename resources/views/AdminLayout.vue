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
 * The admin layout for the application
 * Automatically registered in app.js/ssr.js
 *
 * @name AdminLayout
 * @parent BaseLayout
 */
</script>
