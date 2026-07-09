<template>
  <collapse-item name="滚动公告设置" :expanded="true">
    <setting-item-box name="公告列表">
      <setting-item v-for="(item, index) in optionData.dataset" :key="index">
        <n-input-group>
          <n-input v-model:value="optionData.dataset[index]" size="small" placeholder="公告内容" />
          <n-button ghost size="small" @click="optionData.dataset.splice(index, 1)">-</n-button>
        </n-input-group>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.dataset.push('')">+ 新增公告</n-button>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="滚动速度">
        <n-input-number v-model:value="optionData.speed" size="small" />
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
      </setting-item>
      <setting-item name="字体颜色">
        <n-color-picker v-model:value="optionData.color" size="small" />
      </setting-item>
      <setting-item name="背景色">
        <n-color-picker v-model:value="optionData.bgColor" size="small" />
      </setting-item>
      <setting-item name="图标">
        <n-input v-model:value="optionData.icon" size="small" placeholder="emoji或文字" />
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
