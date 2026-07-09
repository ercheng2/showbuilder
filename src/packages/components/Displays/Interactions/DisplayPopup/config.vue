<template>
  <collapse-item name="弹窗设置" :expanded="true">
    <setting-item-box name="内容">
      <setting-item name="标题">
        <n-input v-model:value="optionData.title" size="small" />
      </setting-item>
      <setting-item name="内容(HTML)">
        <n-input v-model:value="optionData.content" type="textarea" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="触发方式">
      <setting-item name="触发类型">
        <n-select v-model:value="optionData.triggerType" size="small" :options="[{label:'按钮触发',value:'button'},{label:'事件触发',value:'event'}]" />
      </setting-item>
      <setting-item v-if="optionData.triggerType === 'button'" name="按钮文字">
        <n-input v-model:value="optionData.triggerText" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item><n-checkbox v-model:checked="optionData.showCloseBtn" size="small">显示关闭按钮</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.maskClosable" size="small">点击遮罩关闭</n-checkbox></setting-item>
      <setting-item name="宽度">
        <n-input-number v-model:value="optionData.width" size="small" />
      </setting-item>
      <setting-item name="高度">
        <n-input-number v-model:value="optionData.height" size="small" />
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
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: { type: Object as PropType<typeof option>, required: true }
})
</script>
