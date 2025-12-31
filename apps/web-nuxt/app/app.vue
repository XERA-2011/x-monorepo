<template>
  <UApp>
    <div
      class="flex min-h-screen flex-col bg-white font-sans text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100"
    >
      <AppHeader />
      <main class="flex-1">
        <NuxtRouteAnnouncer />
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </UApp>
</template>
