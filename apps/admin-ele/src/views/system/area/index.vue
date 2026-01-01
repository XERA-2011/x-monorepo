<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { ACTION_ICON, TableAction, useXAppVxeGrid } from '#/adapter/vxe-table';
import { getAreaTree } from '#/api/system/area';
import { DocAlert, Page, useXAppModal } from '@x-monorepo/common-ui';

import { useGridColumns } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useXAppModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 查询 IP */
function handleQueryIp() {
  formModalApi.setData(null).open();
}

const [Grid, gridApi] = useXAppVxeGrid({
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          return await getAreaTree();
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
    },
    treeConfig: {
      rowField: 'id',
      reserve: true,
    },
  } as VxeTableGridOptions,
});
</script>

<template>
  <Page auto-content-height>
    <template #doc>
      <DocAlert title="地区 & IP" url="https://doc.iocoder.cn/area-and-ip/" />
    </template>

    <FormModal @success="handleRefresh" />
    <Grid table-title="地区列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: 'IP 查询',
              type: 'primary',
              icon: ACTION_ICON.SEARCH,
              onClick: handleQueryIp,
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
