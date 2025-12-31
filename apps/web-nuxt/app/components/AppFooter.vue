<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer
    class="mt-auto border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-900/50"
  >
    <UContainer
      class="flex flex-col items-center justify-between gap-4 md:flex-row"
    >
      <p class="text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ year }} XERA. All rights reserved.
      </p>

      <div class="flex items-center gap-4">
        <UButton
          to="https://github.com/XERA-2011/x-monorepo"
          target="_blank"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-github"
        />
        <UButton
          to="#"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-lucide-twitter"
        />
      </div>
    </UContainer>
  </footer>
</template>
