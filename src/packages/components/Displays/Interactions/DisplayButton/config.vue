<template>
  <collapse-item name="按钮设置" :expanded="true">
    <setting-item-box name="内容">
      <setting-item name="按钮文字">
        <n-input v-model:value="optionData.text" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="跳转配置">
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
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
      </setting-item>
      <setting-item name="文字颜色">
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
import { PropType } from 'vue'
import { option } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: { type: Object as PropType<typeof option>, required: true }
})
</script>
