<script setup lang="ts">
import { IconBrandGithub, IconBrandX, IconInfoCircle, IconMoon, IconSun } from '@tabler/icons-vue'
import { useStyleStore } from '@/stores/style.store'

const styleStore = useStyleStore()
const { isDarkTheme } = toRefs(styleStore)
</script>

<template>
  <c-tooltip tooltip="GitHub 仓库" position="bottom">
    <c-button
      circle
      variant="text"
      href="https://github.com/wqdygkd/it-tools"
      target="_blank"
      rel="noopener noreferrer"
    >
      <n-icon size="25" :component="IconBrandGithub" />
    </c-button>
  </c-tooltip>

  <c-tooltip tooltip="关于 IT-Tools" position="bottom">
    <c-button circle variant="text" to="/about">
      <n-icon size="25" :component="IconInfoCircle" />
    </c-button>
  </c-tooltip>
</template>

<style lang="less" scoped>
.n-button {
  &:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
