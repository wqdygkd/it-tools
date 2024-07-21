import type { Component } from 'vue'

export interface Tool {
  name: string
  path: string
  description: string
  keywords: string[]
  component: () => Promise<Component>
  icon: Component
  redirectFrom?: string[]
  isNew: boolean
  createdAt?: Date
}

export interface ToolCategory {
  name: string
  key: string
  components: Tool[]
}

export type ToolWithCategory = Tool & { category: string }
