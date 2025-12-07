import { IconId } from '@tabler/icons-vue'
import { defineTool } from '../../tool'

export const tool = defineTool({
  name: '证件号码生成器',
  path: '/id-number-generator',
  description: '本工具提供中国大陆第二代身份证号码生成功能，可以根据指定的条件，如：出身地、出身日期、性别等生成符合中国大陆 GB 11643-1999 国标的身份证号码。本工具生成的结果不代表真实的身份证号码，仅供参考（请勿用于非法用途）。',
  keywords: [
    'id',
    'generator',
    '身份证'
  ],
  component: () => import('./id-number-generator.vue'),
  icon: IconId
})
