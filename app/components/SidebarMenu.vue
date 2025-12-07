<!-- components/SidebarMenu.vue -->
<script setup>
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { ArrowForwardIosRound } from '@vicons/material'

const props = defineProps({
  menuData: {
    type: Array,
    required: true
  }
})

const collapseIcon = ArrowForwardIosRound

const collapsed = ref(false)
const expandedKeys = ref([])

function handleExpand(keys) {
  expandedKeys.value = keys
}

// 转换菜单数据格式
const menuOptions = computed(() => {
  return props.menuData.map(item => formatMenu(item))
})

function formatMenu(item) {
  return {
    label: () => h('span', item.label),
    key: item.key,
    icon: item.icon ? () => h(NIcon, { component: item.icon }) : undefined,
    children: item.children?.map(child => formatMenu(child))
  }
}
</script>

<template>
  <n-layout has-sider class="h-full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="h-full flex flex-col">
        <!-- 菜单头部 -->
        <div class="h-16 flex items-center justify-center border-b">
          <n-gradient-text type="info" size="24">
            {{ collapsed ? 'Logo' : 'Admin System' }}
          </n-gradient-text>
        </div>

        <!-- 菜单主体 -->
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :expanded-keys="expandedKeys"
          :indent="18"
          class="flex-1"
          @update:expanded-keys="handleExpand"
        />

        <!-- 折叠按钮 -->
        <div
          class="cursor-pointer border-t p-4 hover:bg-[var(--hover-color)]"
          @click="collapsed = !collapsed"
        >
          <div class="flex items-center justify-center">
            <NIcon :size="18" :component="collapseIcon" />
          </div>
        </div>
      </div>
    </n-layout-sider>
  </n-layout>
</template>

<style scoped>
.n-layout-sider {
  transition: all 0.3s var(--n-bezier);
}

.n-menu {
  --n-item-height: 48px;
  --n-font-size: 14px;
}
</style>
