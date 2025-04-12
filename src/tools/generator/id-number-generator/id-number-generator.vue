<script setup lang="ts">
import type { CascaderOption } from 'naive-ui'
import type { City } from './citys'
import { citys } from './citys'

export interface CityOption extends City, CascaderOption {
  // text: string
  // code: string
  shortCode?: string
  parentCode?: string | null
}

console.log(citys)
// import { useCopy } from '@/composable/copy'
// import { textToBase64 } from '@/utils/base64'
const formModel = ref({
  address: null,
  name: '',
  email: '',
  password: ''
})

const hoverTrigger = ref(false)
const checkStrategyIsChild = ref(true)
const showPath = ref(true)
const filterable = ref(false)

const options = getOptions(citys)

function submitForm() {
  // 表单提交逻辑
  // console.log('提交的表单数据:', formModel.value)
}

function trimCityCode(cityCode: string): string {
  if (cityCode.slice(-4) === '0000') {
    return cityCode.slice(0, 2)
  }
  else if (cityCode.slice(-2) === '00') {
    return cityCode.slice(0, 4)
  }
  else {
    return cityCode
  }
}
function cityParentCode(cityCode: string): string | null {
  if (cityCode.length === 2) {
    return null
  }
  else if (cityCode.length === 4) {
    return cityCode.slice(0, 2)
  }
  else {
    return cityCode.slice(0, 4)
  }
}

function getOptions(citys: CityOption) {
  const cityMap: { [key: string]: CityOption & { children?: CityOption[] } } = {}

  citys.forEach((city) => {
    const shortCode = trimCityCode(city.code)
    city.shortCode = shortCode
    city.parentCode = cityParentCode(shortCode)
    city.parentCode = cityParentCode(shortCode)
    cityMap[shortCode] = { ...city }
  })

  const options: CascaderOption[] = []
  citys.forEach((item) => {
    if (item.parentCode) {
      const parentCity = cityMap[item.parentCode]
      //  || item.parentCode.length === 4 ? cityMap[cityParentCode(item.parentCode) as string] : null
      if (parentCity) {
        const shortCode = item.shortCode as string
        const city = cityMap[shortCode]
        if (!parentCity.children) {
          parentCity.children = []
        }
        parentCity.children?.push(city)
      }
    }

    else {
      const shortCode = item.shortCode as string
      const city = cityMap[shortCode]
      options.push(city)
    }
  })
  // for (let i = 1; i <= length; ++i) {
  //   if (iterator === 1) {
  //     options.push({
  //       value: `v-${i}`,
  //       label: `l-${i}`,
  //       disabled: i % 5 === 0,
  //       children: getOptions(depth, iterator + 1, `${String(i)}`)
  //     })
  //   }
  //   else if (iterator === depth) {
  //     options.push({
  //       value: `v-${prefix}-${i}`,
  //       label: `l-${prefix}-${i}`,
  //       disabled: i % 5 === 0
  //     })
  //   }
  //   else {
  //     options.push({
  //       value: `v-${prefix}-${i}`,
  //       label: `l-${prefix}-${i}`,
  //       disabled: i % 5 === 0,
  //       children: getOptions(depth, iterator + 1, `${prefix}-${i}`)
  //     })
  //   }
  // }
  console.log(options)
  return options
}
function handleUpdateValue(value: string, option: CascaderOption) {
  console.log(value, option)
}
// const header = computed(() => `Authorization: Basic ${textToBase64(`${username.value}:${password.value}`)}`)

// const { copy } = useCopy({ source: header, text: 'Header copied to the clipboard' })

function listToTree(list) {
  const map = new Map()
  const tree = []

  // 创建哈希映射
  list.forEach(item => map.set(item.code, { ...item, children: [] }))

  // 构建树结构
  list.forEach((item) => {
    const node = map.get(item.code)
    const parentCode = getParentCode(item.code)
    if (parentCode === '000000') {
      tree.push(node)
    }
    else {
      const parent = map.get(parentCode)
      parent?.children?.push(node)
    }
  })

  return tree
}

function getParentCode(code) {
  const arr = code.split('')

  let count = 0

  // 从最后一位开始逆向扫描
  for (let i = 5; i >= 0; i--) {
    if (arr[i] !== '0') {
      arr[i] = '0' // 替换非零位
      if (++count === 2) { break } // 找到两个后立即终止
    }
  }

  return arr.join('') // 直接返回6位字符串
}
console.log(listToTree(a))
</script>

<template>
  <div>
    <n-collapse>
      <n-collapse-item title="二代身份证号码规则" name="1">
        <n-card title="" embedded :bordered="false">
          一代身份证号码是十五位， 2013年1月1日开始，全面停止使用一代身份证了。<br>
          二代身份证号码：<br>
          1-6位：行政区域代码。1、2位，省（直辖市，自治区）代码； 3、4位，地级市（自治州）代码； 5、6位，区（县，自治县，县级市）代码<br>
          7-14位：出生年、月、日，格式为YYYYMMDD<br>
          15-17位：顺序码，奇数为男，偶数为女<br>
          18位：校验码，用于验证身份证号的合法性
        </n-card>
      </n-collapse-item>
    </n-collapse>
    <n-divider />

    <n-form
      :model="formModel"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      size="small"
      :style="{ maxWidth: '640px' }"
    >
      <n-form-item label="出生地" path="name">
        <n-cascader
          v-model:value="formModel.address"
          placeholder="没啥用的值"
          :expand-trigger="hoverTrigger ? 'hover' : 'click'"
          :options="options"
          :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
          :show-path="showPath"
          value-field="code"
          label-field="text"
          :filterable="filterable"
          @update:value="handleUpdateValue"
        />
      </n-form-item>
      <n-form-item label="出生日期" path="email">
        <n-input v-model:value="formModel.email" placeholder="请输入邮箱" />
      </n-form-item>
      <n-form-item label="日期" path="password">
        <n-input v-model:value="formModel.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item label="年龄" path="password">
        <n-input v-model:value="formModel.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item label="性别" path="password">
        <n-input v-model:value="formModel.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item label="姓名" path="password">
        <n-input v-model:value="formModel.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item label="生成数量" path="password">
        <n-input v-model:value="formModel.password" type="password" placeholder="请输入密码" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="submitForm">
          提交
        </n-button>
      </n-form-item>
    </n-form>

    <!-- <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :size="size"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="Input" path="inputValue">
        <n-input v-model:value="model.inputValue" placeholder="Input" />
      </n-form-item>
      <n-form-item label="Textarea" path="textareaValue">
        <n-input
          v-model:value="model.textareaValue"
          placeholder="Textarea"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>
      <n-form-item label="Select" path="selectValue">
        <n-select
          v-model:value="model.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="Multiple Select" path="multipleSelectValue">
        <n-select
          v-model:value="model.multipleSelectValue"
          placeholder="Select"
          :options="generalOptions"
          multiple
        />
      </n-form-item>
      <n-form-item label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item>
      <n-form-item label="Switch" path="switchValue">
        <n-switch v-model:value="model.switchValue" />
      </n-form-item>
      <n-form-item label="Checkbox Group" path="checkboxGroupValue">
        <n-checkbox-group v-model:value="model.checkboxGroupValue">
          <n-space>
            <n-checkbox value="Option 1">
              Option 1
            </n-checkbox>
            <n-checkbox value="Option 2">
              Option 2
            </n-checkbox>
            <n-checkbox value="Option 3">
              Option 3
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="Radio Group" path="radioGroupValue">
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">
          <n-space>
            <n-radio value="Radio 1">
              Radio 1
            </n-radio>
            <n-radio value="Radio 2">
              Radio 2
            </n-radio>
            <n-radio value="Radio 3">
              Radio 3
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Radio Button Group" path="radioGroupValue">
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
          <n-radio-button value="Radio 1">
            Radio 1
          </n-radio-button>
          <n-radio-button value="Radio 2">
            Radio 2
          </n-radio-button>
          <n-radio-button value="Radio 3">
            Radio 3
          </n-radio-button>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Input Number" path="inputNumberValue">
        <n-input-number v-model:value="model.inputNumberValue" />
      </n-form-item>
      <n-form-item label="Time Picker" path="timePickerValue">
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item>
      <n-form-item label="Slider" path="sliderValue">
        <n-slider v-model:value="model.sliderValue" :step="5" />
      </n-form-item>
      <n-form-item label="Transfer" path="transferValue">
        <n-transfer
          v-model:value="model.transferValue"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="Nested Path" :show-feedback="false">
        <n-grid :cols="2" :x-gap="24">
          <n-form-item-gi path="nestedValue.path1">
            <n-input
              v-model:value="model.nestedValue.path1"
              placeholder="Nested Path 1"
            />
          </n-form-item-gi>
          <n-form-item-gi path="nestedValue.path2">
            <n-select
              v-model:value="model.nestedValue.path2"
              placeholder="Nested Path 2"
              :options="generalOptions"
            />
          </n-form-item-gi>
        </n-grid>
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="handleValidateButtonClick">
          验证
        </n-button>
      </div>
    </n-form> -->

    城市选择
    <!-- <n-cascader
      v-model:value="value"
      placeholder="没啥用的值"
      :expand-trigger="hoverTrigger ? 'hover' : 'click'"
      :options="options"
      :check-strategy="checkStrategyIsChild ? 'child' : 'all'"
      :show-path="showPath"
      :filterable="filterable"
      @update:value="handleUpdateValue"
    /> -->
  </div>
</template>

<style lang="less" scoped>
::v-deep(.n-statistic-value__content) {
  font-family: monospace;
  font-size: 17px !important;
  white-space: nowrap;
}
</style>
