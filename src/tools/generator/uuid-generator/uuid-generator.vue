<script setup lang="ts">
import {
  v1 as generateUuidV1,
  v3 as generateUuidV3,
  v4 as generateUuidV4,
  v5 as generateUuidV5,
  v6 as generateUuidV6,
  v7 as generateUuidV7,
  MAX as maxUuid,
  NIL as nilUuid
} from 'uuid'
import { useCopy } from '@/composable/copy'
import { computedRefreshable } from '@/composable/computedRefreshable'
import { withDefaultOnError } from '@/utils/defaults'

type GetArrItemKeyTypes<
  T extends {
    [k: number]: object
  },
  K extends keyof T[number]
> = T[number][K]

const versions = [
  { label: 'NIL', value: 'NIL', tooltip: '全为零的 UUID' },
  { label: 'MAX', value: 'MAX', tooltip: '最大 UUID' },
  { label: 'v1', value: 'v1', tooltip: '根据主机 ID、序列号和当前时间生成 UUID' },
  { label: 'v3', value: 'v3', tooltip: '根据命名空间标识符（UUID）和名称（字符串）的 MD5 哈希值生成 UUID' },
  { label: 'v4', value: 'v4', tooltip: '生成随机 UUID' },
  { label: 'v5', value: 'v5', tooltip: '根据名称空间标识符（UUID）和名称（字符串）的 SHA-1 哈希值生成 UUID' },
  { label: 'v6', value: 'v6', tooltip: '' },
  { label: 'v7', value: 'v7', tooltip: '' }
]

const namespaces = [
  { label: 'DNS', value: generateUuidV5.DNS },
  { label: 'URL', value: generateUuidV5.URL }
]

const version = useStorage<GetArrItemKeyTypes<typeof versions, 'value'>>('uuid-generator:version', 'v4')
const count = useStorage('uuid-generator:quantity', 1)
const v35Args = ref({ namespace: generateUuidV5.URL, name: '' })

const validUuidRules = [
  {
    message: 'Invalid UUID',
    validator: (value: string) => {
      if (value === nilUuid) {
        return true
      }

      return Boolean(value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/))
    }
  }
]

const generators = {
  NIL: () => nilUuid,
  MAX: () => maxUuid,
  v1: (index: number) =>
    generateUuidV1({
      clockseq: index,
      msecs: Date.now(),
      nsecs: Math.floor(Math.random() * 10000),
      node: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))
    }),
  v3: () => generateUuidV3(v35Args.value.name, v35Args.value.namespace),
  v4: () => generateUuidV4(),
  v5: () => generateUuidV5(v35Args.value.name, v35Args.value.namespace),
  v6: (index: number) =>
    generateUuidV6({
      clockseq: index,
      msecs: Date.now(),
      nsecs: Math.floor(Math.random() * 10000),
      node: Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))
    }),
  v7: () => generateUuidV7()
}

const [uuids, refreshUUIDs] = computedRefreshable(() =>
  withDefaultOnError(
    () =>
      Array.from({ length: count.value }, (_ignored, index) => {
        const generator = generators[version.value] ?? generators.NIL
        return generator(index)
      }).join('\n'),
    ''
  )
)

const { copy } = useCopy({ source: uuids, text: 'UUIDs 已复制到剪切板' })
</script>

<template>
  <div>
    <n-form
      label-placement="left"
      label-width="100"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="UUID 版本">
        <n-radio-group v-model:value="version">
          <n-radio-button v-for="v in versions" :key="v.value" :value="v.value" :label="v.label" />
        </n-radio-group>
      </n-form-item>
      <n-form-item label="数量">
        <n-input-number v-model:value="count" flex-1 :min="1" :max="50" placeholder="UUID 数量" />
      </n-form-item>
      <template v-if="version === 'v3' || version === 'v5'">
        <n-form-item label="命名空间">
          <n-radio-group v-model:value="v35Args.namespace">
            <n-radio-button v-for="namespace in namespaces" :key="namespace.value" :value="namespace.value" :label="namespace.label" />
          </n-radio-group>
        </n-form-item>
        <n-form-item label=" ">
          <n-input v-model:value="v35Args.namespace" placeholder="命名空间" :rule="validUuidRules" />
        </n-form-item>
        <n-form-item label="命名">
          <n-input v-model:value="v35Args.name" placeholder="命名" />
        </n-form-item>
      </template>
    </n-form>

    <div mb-2 flex items-center>
      <span w-100px>去除 - </span>
    </div>

    <c-input-text
      style="text-align: center; font-family: monospace"
      :value="uuids"
      multiline
      placeholder="Your uuids"
      autosize
      rows="1"
      readonly
      raw-text
      monospace
      my-3
      class="uuid-display"
    />

    <div flex justify-center gap-3>
      <c-button autofocus @click="copy()">
        复制
      </c-button>
      <c-button @click="refreshUUIDs">
        刷新
      </c-button>
    </div>
  </div>
</template>

<style scoped lang="less">
::v-deep(.uuid-display) {
  textarea {
    text-align: center;
  }
}
</style>
