import type { ComponentType } from './component';
import type {
  XAppFormSchema as FormSchema,
  XAppFormProps,
} from '@x-monorepo/common-ui';

import {
  setupXAppForm,
  useXAppForm as useForm,
  z,
} from '@x-monorepo/common-ui';
import { $t } from '@x-monorepo/locales';
import { isMobile } from '@x-monorepo/utils';

async function initSetupXAppForm() {
  setupXAppForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
      },
    },
    defineRules: {
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
      selectRequired: (value, _params, ctx) => {
        if (value === undefined || value === null) {
          return $t('ui.formRules.selectRequired', [ctx.label]);
        }
        return true;
      },
      // 手机号非必填
      mobile: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return true;
        } else if (!isMobile(value)) {
          return $t('ui.formRules.mobile', [ctx.label]);
        }
        return true;
      },
      // 手机号必填
      mobileRequired: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        if (!isMobile(value)) {
          return $t('ui.formRules.mobile', [ctx.label]);
        }
        return true;
      },
    },
  });
}

const useXAppForm = useForm<ComponentType>;

export { initSetupXAppForm, useXAppForm, z };

export type XAppFormSchema = FormSchema<ComponentType>;
export type { XAppFormProps };
