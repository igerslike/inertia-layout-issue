<template>
    <div id="base">
        <div class="font-sans theme-transition bg-bg-primary">
            <!-- Render secondary layout - AppLayout or AdminLayout -->
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * The base layout for the application
 * Automatically registered in app.js/ssr.js
 *
 * @name BaseLayout
 * @parent none
 * @children AppLayout or AdminLayout
 */
</script>
