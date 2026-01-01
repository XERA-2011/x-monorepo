<script lang="ts" setup>
import { XAppIconButton } from '@x-monorepo-core/shadcn-ui';
import { Settings } from '@x-monorepo/icons';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <XAppIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
      <Settings class="text-foreground size-4" />
    </XAppIconButton>
  </Preferences>
</template>
