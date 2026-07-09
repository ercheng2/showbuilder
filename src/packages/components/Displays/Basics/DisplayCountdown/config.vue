<template>
  <collapse-item name="倒计时设置" :expanded="true">
    <setting-item-box name="目标时间">
      <setting-item name="日期时间">
        <n-date-picker v-model:value="targetDateVal" type="datetime" size="small" @update:value="onDateChange" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="显示选项">
      <setting-item><n-checkbox v-model:checked="optionData.showDays" size="small">显示天</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.showHours" size="small">显示时</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.showMinutes" size="small">显示分</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.showSeconds" size="small">显示秒</n-checkbox></setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="optionData.color" size="small" />
      </setting-item>
      <setting-item name="背景色">
        <n-color-picker v-model:value="optionData.bgColor" size="small" />
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.borderRadius" size="small" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: { type: Object as PropType<typeof option>, required: true }
})

const targetDateVal = ref(new Date(props.optionData.targetDate).getTime())

const onDateChange = (val: number) => {
  props.optionData.targetDate = new Date(val).toISOString()
}
</script>
