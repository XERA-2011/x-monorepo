import type {
  BaseFormComponentType,
  ExtendedFormApi,
  XAppFormProps,
} from './types';

import { useStore } from '@x-monorepo-core/shared/store';
import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import XAppUseForm from './app-use-form.vue';
import { FormApi } from './form-api';

export function useXAppForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: XAppFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: XAppFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(XAppUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'XAppUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
