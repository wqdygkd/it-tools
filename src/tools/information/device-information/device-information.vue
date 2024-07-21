<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { useCopy } from '@/composable/copy';

const { width, height } = useWindowSize();

const sections = [
  {
    name: '屏幕',
    information: [
      {
        label: '屏幕尺寸',
        tip: 'window.screen.availWidth x window.screen.availHeight',
        value: computed(() => `${window.screen.availWidth} x ${window.screen.availHeight}`),
        showCopy: true,
      },
      {
        label: '方向',
        tip: 'window.screen.orientation.type',
        value: computed(() => window.screen.orientation.type),
        showCopy: true,
      },
      {
        label: 'Orientation angle',
        tip: 'window.screen.orientation.angle',
        value: computed(() => `${window.screen.orientation.angle}°`),
        showCopy: true,
      },
      {
        label: 'Color depth',
        tip: 'window.screen.colorDepth',
        value: computed(() => `${window.screen.colorDepth} bits`),
        showCopy: true,
      },
      {
        label: '像素比',
        tip: 'window.devicePixelRatio',
        value: computed(() => `${window.devicePixelRatio} dppx`),
        showCopy: true,
      },
      {
        label: '窗户尺寸',
        tip: 'window.innerWidth x window.innerHeight',
        value: computed(() => `${width.value} x ${height.value}`),
        showCopy: true,
      },
    ],
  },
  {
    name: 'Device',
    information: [
      {
        label: 'Browser vendor',
        value: computed(() => navigator.vendor),
        showCopy: true,
      },
      {
        label: 'Languages',
        value: computed(() => navigator.languages.join(', ')),
        showCopy: true,
      },
      {
        label: 'Platform',
        value: computed(() => navigator.platform),
        showCopy: true,
      },
      {
        label: 'User agent',
        value: computed(() => navigator.userAgent),
        showCopy: true,
      },
    ],
  },
];

const { copy, isJustCopied } = useCopy({ createToast: false });
const tooltipText = computed(() => (isJustCopied.value ? '已复制' : '复制到剪切板'));
</script>

<template>
  <c-card v-for="{ name, information } in sections" :key="name" :title="name">
    <n-grid cols="1 400:2" x-gap="12" y-gap="12">
      <n-gi v-for="{ label, value: { value }, showCopy } in information" :key="label" class="information">
        <div class="label">
          {{ label }}
        </div>

        <div class="value">
          <n-ellipsis v-if="value">
            {{ value }}
          </n-ellipsis>
          <div v-else class="undefined-value">
            unknown
          </div>

          <c-tooltip v-if="showCopy" :tooltip="tooltipText">
            <c-button circle variant="text" size="small" @click="copy(value, { notificationMessage: '' })">
              <icon-mdi-content-copy />
            </c-button>
          </c-tooltip>
        </div>
      </n-gi>
    </n-grid>
  </c-card>
</template>

<style lang="less" scoped>
.information {
  padding: 14px 16px;
  border-radius: 4px;
  background-color: #aaaaaa11;

  .label {
    font-size: 14px;
    opacity: 0.8;
    line-height: 1;
    margin-bottom: 5px;
  }
  .value {
    font-size: 20px;
    font-weight: 400;
  }

  .undefined-value {
    opacity: 0.8;
  }
}
</style>
