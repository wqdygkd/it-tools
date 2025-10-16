import { MoodSmile } from '@vicons/tabler'
import { defineTool } from '../tool'

export const tool = defineTool({
  name: 'emoji 选择器',
  path: '/emoji-picker',
  description: 'emoji 选择器',
  keywords: ['emoji', 'picker', 'unicode', 'copy', 'paste'],
  component: () => import('./emoji-picker.vue'),
  icon: MoodSmile,
  createdAt: new Date('2023-08-07')
})
