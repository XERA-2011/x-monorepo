import { $t, setupI18n } from '#/locales';
import { setupFormCreate } from '#/plugins/form-create';
import { useTitle } from '@vueuse/core';
import { registerAccessDirective } from '@x-monorepo/access';
import { registerLoadingDirective } from '@x-monorepo/common-ui';
import { preferences } from '@x-monorepo/preferences';
import { initStores } from '@x-monorepo/stores';
import { ElLoading } from 'element-plus';
import { createApp, watchEffect } from 'vue';
import VueDOMPurifyHTML from 'vue-dompurify-html';

import { initComponentAdapter } from './adapter/component';
import { initSetupXAppForm } from './adapter/form';
import App from './app.vue';
import { router } from './router';

import '@x-monorepo/styles';
import '@x-monorepo/styles/ele';

async function bootstrap(namespace: string) {
  // 初始化组件适配器
  await initComponentAdapter();

  // 初始化表单组件
  await initSetupXAppForm();

  // // 设置弹窗的默认配置
  // setDefaultModalProps({
  //   fullscreenButton: false,
  // });
  // // 设置抽屉的默认配置
  // setDefaultDrawerProps({
  //   zIndex: 2000,
  // });
  const app = createApp(App);
  app.use(VueDOMPurifyHTML);
  // 注册Element Plus提供的v-loading指令
  app.directive('loading', ElLoading.directive);

  // 注册XApp提供的v-loading和v-spinning指令
  registerLoadingDirective(app, {
    loading: false, // XApp提供的v-loading指令和Element Plus提供的v-loading指令二选一即可，此处false表示不注册XApp提供的v-loading指令
    spinning: 'spinning',
  });

  // 国际化 i18n 配置
  await setupI18n(app);

  // 配置 pinia-tore
  await initStores(app, { namespace });

  // 安装权限指令
  registerAccessDirective(app);

  // 初始化 tippy
  const { initTippy } = await import('@x-monorepo/common-ui/es/tippy');
  initTippy(app);

  // 配置路由及路由守卫
  app.use(router);

  // 配置Motion插件
  const { MotionPlugin } = await import('@x-monorepo/plugins/motion');
  app.use(MotionPlugin);

  // formCreate
  setupFormCreate(app);

  // 动态更新标题
  watchEffect(() => {
    if (preferences.app.dynamicTitle) {
      const routeTitle = router.currentRoute.value.meta?.title;
      const pageTitle =
        (routeTitle ? `${$t(routeTitle)} - ` : '') + preferences.app.name;
      useTitle(pageTitle);
    }
  });

  app.mount('#app');
}

export { bootstrap };
