<script setup lang="ts">
import { useToolStore } from '@/tools/tools.store'
import type { Tool } from '@/tools/tools.types'

import { Button } from '@/shadcn/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shadcn/components/ui/tooltip'

const props = defineProps<{ tool: Tool }>()

const toolStore = useToolStore()

const { tool } = toRefs(props)

const isFavorite = computed(() => toolStore.isToolFavorite({ tool }))
const buttonType = computed(() => (isFavorite.value ? 'primary' : 'default'))

function toggleFavorite(event: MouseEvent) {
  event.preventDefault()

  if (toolStore.isToolFavorite({ tool })) {
    toolStore.removeToolFromFavorites({ tool })
    return
  }

  toolStore.addToolToFavorites({ tool })
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <icon-mdi-heart />
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <!-- <c-tooltip :tooltip="isFavorite ? '取消收藏' : '加入收藏' ">
    <c-button
      variant="text"
      circle
      :type="buttonType"
      :style="{ opacity: isFavorite ? 1 : 0.2 }"
      @click="toggleFavorite"
    >
      <!-- <icon-mdi-heart /> -->
    </c-button>
  </c-tooltip> -->
</template>
