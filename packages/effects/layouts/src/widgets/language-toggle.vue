<script setup lang="ts">
import type { SupportedLanguagesType } from '@x-monorepo/locales';

import {
  XAppDropdownRadioMenu,
  XAppIconButton,
} from '@x-monorepo-core/shadcn-ui';
import { SUPPORT_LANGUAGES } from '@x-monorepo/constants';
import { Languages } from '@x-monorepo/icons';
import { loadLocaleMessages } from '@x-monorepo/locales';
import { preferences, updatePreferences } from '@x-monorepo/preferences';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <XAppDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <XAppIconButton class="hover:animate-[shrink_0.3s_ease-in-out]">
        <Languages class="text-foreground size-4" />
      </XAppIconButton>
    </XAppDropdownRadioMenu>
  </div>
</template>
