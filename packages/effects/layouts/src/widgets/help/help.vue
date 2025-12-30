<script lang="ts" setup>
import { $t } from '@x-monorepo/locales';
import { openWindow } from '@x-monorepo/utils';

import { useXAppModal } from '@x-monorepo-core/popup-ui';
import { Badge, XAppButton, XAppButtonGroup } from '@x-monorepo-core/shadcn-ui';

import { useMagicKeys, whenever } from '@vueuse/core';

defineOptions({
  name: 'Help',
});

const keys = useMagicKeys();
whenever(keys['Alt+KeyH']!, () => {
  modalApi.open();
});

const [Modal, modalApi] = useXAppModal({
  draggable: true,
  overlayBlur: 5,
  footer: false,
  onCancel() {
    modalApi.close();
  },
});
</script>
<template>
  <Modal class="w-1/3" :title="$t('ui.widgets.qa')">
    <div class="mt-2 flex flex-col">
      <div class="mt-2 flex flex-col">
        <XAppButtonGroup class="basis-1/3" :gap="2" border size="large">
          <p class="w-24 p-2">项目地址:</p>
          <XAppButton
            variant="link"
            @click="
              openWindow('https://gitee.com/yudaocode/x-monorepo')
            "
          >
            Gitee
          </XAppButton>
          <XAppButton
            variant="link"
            @click="
              openWindow('https://github.com/yudaocode/x-monorepo')
            "
          >
            Github
          </XAppButton>
        </XAppButtonGroup>

        <XAppButtonGroup class="basis-1/3" :gap="2" border size="large">
          <p class="w-24 p-2">issues:</p>
          <XAppButton
            variant="link"
            @click="
              openWindow(
                'https://gitee.com/yudaocode/x-monorepo/issues',
              )
            "
          >
            Gitee
          </XAppButton>
          <XAppButton
            variant="link"
            @click="
              openWindow(
                'https://github.com/yudaocode/x-monorepo/issues',
              )
            "
          >
            Github
          </XAppButton>
        </XAppButtonGroup>

        <XAppButtonGroup class="basis-1/3" :gap="2" border size="large">
          <p class="w-24 p-2">开发文档:</p>
          <XAppButton
            variant="link"
            @click="openWindow('https://doc.iocoder.cn/quick-start/')"
          >
            项目文档
          </XAppButton>
          <XAppButton variant="link" @click="openWindow('https://antdv.com/')">
            antdv 文档
          </XAppButton>
        </XAppButtonGroup>
      </div>

      <div class="mt-2 flex justify-start">
        <p class="w-24 p-2">软件外包:</p>
        <img
          src="/wx-xingyu.png"
          alt="数舵科技"
          class="cursor-pointer"
          width="80%"
          @click="openWindow('https://shuduokeji.com')"
        />
      </div>
      <p class="mt-2 flex justify-center pt-4 text-sm italic">
        本项目采用 <Badge class="mx-2" variant="destructive">MIT</Badge>
        开源协议，个人与企业可100% 免费使用
      </p>
    </div>
  </Modal>
</template>
