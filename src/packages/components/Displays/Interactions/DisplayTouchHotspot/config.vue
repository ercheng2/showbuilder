<template>
  <collapse-item name="触控热区设置" :expanded="true">
    <setting-item-box name="触发动作">
      <setting-item name="动作类型">
        <n-select v-model:value="optionData.actionType" size="small" :options="[
          {label:'打开URL', value:'url'},
          {label:'打开弹窗', value:'popup'},
          {label:'切换页面', value:'page'}
        ]" />
      </setting-item>
      <setting-item v-if="optionData.actionType === 'url'" name="URL地址">
        <n-input v-model:value="optionData.actionTarget" size="small" placeholder="https://" />
      </setting-item>
      <setting-item v-if="optionData.actionType === 'popup'" name="弹窗ID">
        <n-input v-model:value="optionData.actionTarget" size="small" placeholder="弹窗ID" />
      </setting-item>
      <setting-item v-if="optionData.actionType === 'page'" name="页面ID">
        <n-input v-model:value="optionData.actionTarget" size="small" placeholder="页面ID" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item><n-checkbox v-model:checked="optionData.showBorder" size="small">显示边框</n-checkbox></setting-item>
      <setting-item name="高亮颜色">
        <n-color-picker v-model:value="optionData.highlightColor" size="small" />
      </setting-item>
      <setting-item name="边框颜色">
        <n-color-picker v-model:value="optionData.borderColor" size="small" />
      </setting-item>
      <setting-item name="边框样式">
        <n-select v-model:value="optionData.borderStyle" size="small" :options="[{label:'虚线',value:'dashed'},{label:'实线',value:'solid'},{label:'点线',value:'dotted'}]" />
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
