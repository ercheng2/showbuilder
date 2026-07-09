<template>
  <collapse-item name="图片流水墙设置" :expanded="true">
    <setting-item-box name="图片列表">
      <setting-item v-for="(item, index) in optionData.dataset" :key="index">
        <n-input-group>
          <n-input v-model:value="optionData.dataset[index]" size="small" placeholder="图片地址" />
          <n-button ghost size="small" @click="optionData.dataset.splice(index, 1)">-</n-button>
        </n-input-group>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.dataset.push('')">+ 新增图片</n-button>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="布局">
      <setting-item name="列数">
        <n-input-number v-model:value="optionData.columns" size="small" :min="1" :max="6" />
      </setting-item>
      <setting-item name="间距">
        <n-input-number v-model:value="optionData.gap" size="small" />
      </setting-item>
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.borderRadius" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="交互">
      <setting-item><n-checkbox v-model:checked="optionData.autoScroll" size="small">自动滚动</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.hoverScale" size="small">悬停放大</n-checkbox></setting-item>
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
