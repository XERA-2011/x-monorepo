<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/settings/profile')
    }
  ]
})
</script>

<template>
  <div>Redirecting...</div>
</template>
