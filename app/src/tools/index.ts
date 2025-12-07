import type { ToolCategory } from './tools.types'

import { tool as IdNumberGenerator } from './generator/id-number-generator'

export const toolsByCategory: ToolCategory[] = [
  {
    name: '生成器',
    key: 'generator',
    components: [
      IdNumberGenerator
    ]
  }
]

export const tools = toolsByCategory.flatMap(({ components }) => components)
export const toolsWithCategory = toolsByCategory.flatMap(({ components, name }) =>
  components.map(tool => ({ category: name, ...tool }))
)
