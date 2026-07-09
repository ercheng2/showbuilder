<template>
  <collapse-item name="日期时间设置" :expanded="true">
    <setting-item-box name="格式">
      <setting-item name="显示格式">
        <n-select v-model:value="optionData.format" size="small" :options="[
          {label:'YYYY-MM-DD HH:mm:ss', value:'YYYY-MM-DD HH:mm:ss'},
          {label:'YYYY-MM-DD', value:'YYYY-MM-DD'},
          {label:'MM-DD HH:mm', value:'MM-DD HH:mm'},
          {label:'HH:mm:ss', value:'HH:mm:ss'},
          {label:'YYYY年MM月DD日', value:'YYYY年MM月DD日'}
        ]" />
      </setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.showWeekday" size="small">显示星期</n-checkbox></setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
      </setting-item>
      <setting-item name="颜色">
        <n-color-picker v-model:value="optionData.color" size="small" />
      </setting-item>
      <setting-item name="对齐">
        <n-select v-model:value="optionData.textAlign" size="small" :options="[{label:'左',value:'left'},{label:'中',value:'center'},{label:'右',value:'right'}]" />
      </setting-item>
      <setting-item name="背景色">
        <n-color-picker v-model:value="optionData.bgColor" size="small" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: { type: Object as PropType<typeof option>, required: true }
})
</script>
