import { IconId } from '@tabler/icons-vue'
import { defineTool } from '../../tool'

export const tool = defineTool({
  name: '证件号码生成器',
  path: '/id-number-generator',
  description: '随机生成虚假证件号码',
  keywords: [
    'id',
    'generator',
    '身份证'
  ],
  component: () => import('./id-number-generator.vue'),
  icon: IconId
})
