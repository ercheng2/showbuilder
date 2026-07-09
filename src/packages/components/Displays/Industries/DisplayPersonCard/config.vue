<template>
  <collapse-item name="人物介绍卡设置" :expanded="true">
    <setting-item-box name="基本信息">
      <setting-item name="头像">
        <n-input v-model:value="optionData.avatar" size="small" placeholder="头像URL" />
      </setting-item>
      <setting-item name="姓名">
        <n-input v-model:value="optionData.name" size="small" />
      </setting-item>
      <setting-item name="职务">
        <n-input v-model:value="optionData.title" size="small" />
      </setting-item>
      <setting-item name="部门">
        <n-input v-model:value="optionData.department" size="small" />
      </setting-item>
      <setting-item name="简介">
        <n-input v-model:value="optionData.intro" type="textarea" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="布局">
        <n-select v-model:value="optionData.layout" size="small" :options="[{label:'横向',value:'horizontal'},{label:'纵向',value:'vertical'}]" />
      </setting-item>
      <setting-item name="头像大小">
        <n-input-number v-model:value="optionData.avatarSize" size="small" />
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
