<script setup lang="ts">
import {
  apiGetInfoFromHostipByIp,
  apiGetIp6FromIpify,
  apiGetIpFromIpapi,
  apiGetIpFromIpecho,
  apiGetIpFromIpify
} from '@/api/api'

const ipapi_co = ref({
  ip: '-',
  country_name: '-',
  country_capital: '-'
})
const ipify_org = ref({ ip: '-' })
const ipify6_org = ref({ ip: '-' })
const ipecho_net = ref({ ip: '-' })

onMounted(() => {
  getIpFromIpapi()
  getIpFromIpify()
  getIp6FromIpify()
  getIpFromIpecho()
})

async function getIpFromIpapi() {
  ipapi_co.value = await apiGetIpFromIpapi().catch(() => ({ ip: 'Failed' }))
}
async function getIpFromIpify() {
  ipify_org.value = await apiGetIpFromIpify().catch(() => ({ ip: 'Failed' }))
}
async function getIp6FromIpify() {
  ipify6_org.value = await apiGetIp6FromIpify().catch(() => ({ ip: 'Failed' }))
}
async function getIpFromIpecho() {
  const ip = await apiGetIpFromIpecho().catch(() => 'Failed')
  ipecho_net.value = { ip }
}

const result: {
  label: string
  ip: ComputedRef<string>
  address: ComputedRef<string> | Ref<string>
}[] = [
  {
    label: 'ipapi.co',
    ip: computed(() => ipapi_co.value.ip),
    address: computed(() => `${ipapi_co.value.country_name}/${ipapi_co.value.country_capital}`)
  },
  {
    label: 'hostip.info',
    ip: computed(() => ipapi_co.value.ip),
    address: computed(() => `${ipapi_co.value.country_name}/${ipapi_co.value.country_capital}`)
  },
  {
    label: 'ipify.org [IPv4]',
    ip: computed(() => ipify_org.value.ip),
    address: ref('-')
  },
  {
    label: 'ipify.org [IPv6]',
    ip: computed(() => ipify6_org.value.ip),
    address: ref('-')
  },
  {
    label: 'ipecho.net',
    ip: computed(() => ipecho_net.value.ip),
    address: ref('-')
  }
]

// const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection

function ip(service, port = 3478) {
  return new Promise((resolve, reject) => {
    if (void 0 !== RTCPeerConnection) {
      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: `stun:${service}:${port}`
          }
        ]
      })
      pc.onicecandidate = (ice) => {
        console.log(ice)
        ice.candidate && resolve(service, ice.candidate.candidate)
      }

      pc.createDataChannel('')

      pc.createOffer((result) => {
        result.sdp.split('\n').forEach((line) => {
          line.includes('candidate') && resolve(service, line)
        })

        // pc.setLocalDescription(
        //   result,
        //   () => {},
        //   () => {}
        // )
      })

      // setTimeout(() => {
      //   pc.localDescription
      //   && pc.localDescription.sdp
      //     .split('\n')
      //     .filter(l => l.indexOf('a=candidate:') === 0)
      //     .forEach(line => resolve(service, line))
      // }, 1e3)
    }
    else {
      resolve()
    }
  })
}

const res = await ip('stun4.l.google.com', 19302)
// console.log(res)
</script>

<template>
  <n-table>
    <thead>
      <tr>
        <th scope="col" />
        <th scope="col">
          ip
        </th>
        <th scope="col">
          地址
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ label, ip: { value: idValue }, address: { value: addressValue } } in result" :key="label">
        <td font-bold>
          {{ label }}
        </td>
        <td>
          <SpanCopyable :value="idValue" class="monospace" />
        </td>
        <td>
          <SpanCopyable :value="addressValue" />
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style lang="less" scoped>
.information {
  padding: 14px 16px;
  border-radius: 4px;
  background-color: #aaaaaa11;
}
</style>

<!-- const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
                      , ips = {}
                      , print = (id,str)=>{
                        console.log(id)
                        console.log(str)
                        const address = (/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(str) || [])[1];
                        if (ips[id] = ips[id] || [],
                        address && -1 === ips[id].indexOf(address)) {
                            ips[id].push(address);
                            const div = document.createElement("div");
                            div.textContent = address;
                            const parent = document.getElementById(id);
                            "null" === parent.textContent && (parent.textContent = ""),
                            parent.appendChild(div),
                            append(address)
                        }
                    }
                      , ip = (service,port=3478)=>{
                        if (void 0 !== RTCPeerConnection) {
                            const pc = new RTCPeerConnection({
                                iceServers: [{
                                    urls: "stun:" + service + ":" + port
                                }]
                            });
                            pc.onicecandidate = ice=>{
                                ice.candidate && print(service, ice.candidate.candidate)
                            }
                            ,
                            pc.createDataChannel(""),
                            pc.createOffer((result=>{
                                result.sdp.split("\n").forEach((line=>{
                                    -1 !== line.indexOf("candidate") && print(service, line)
                                }
                                )),
                                pc.setLocalDescription(result, (()=>{}
                                ), (()=>{}
                                ))
                            }
                            ), (()=>{}
                            )),
                            setTimeout((()=>{
                                pc.localDescription && pc.localDescription.sdp.split("\n").filter((l=>0 === l.indexOf("a=candidate:"))).forEach((line=>print(service, line)))
                            }
                            ), 1e3)
                        }
                    }
                    ;
                    ip("stun.services.mozilla.com"),
                    ip("stun4.l.google.com", 19302),
                    ip("stun1.voiceeclipse.net"),
                    ip("stun.whoi.edu"),
                    ip("stun.voippro.com"),
                    ip("stun.voipraider.com"),
                    ip("stun.voipstunt.com"),
                    ip("stun.voipwise.com"),
                    ip("stun.voipzoom.com"),
                    ip("stun.vopium.com"),
                    ip("stun.voxgratia.org") -->
                    https://webbrowsertools.com/ip-address/
