import { IconCloudDataConnection } from '@tabler/icons-vue';

import { defineTool } from '../../tool';

export const tool = defineTool({
  name: 'IP 信息',
  path: '/ip-information',
  description: '使用不同的方法（服务器端、在线服务、webrtc）来检测您的真实 IP 地址，并绕过 IP 欺骗技术（即 VPN、代理等）',
  keywords: [
    'device',
    'information',
    'ip',
  ],
  component: () => import('./ip-information.vue'),
  icon: IconCloudDataConnection,
});
