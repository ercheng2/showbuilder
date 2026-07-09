<template>
  <collapse-item name="荣誉墙设置" :expanded="true">
    <setting-item-box name="荣誉列表">
      <setting-item v-for="(item, index) in optionData.items" :key="index">
        <n-space vertical size="small">
          <n-input v-model:value="item.image" size="small" placeholder="图片URL" />
          <n-input v-model:value="item.title" size="small" placeholder="名称" />
          <n-input v-model:value="item.desc" size="small" placeholder="描述" />
          <n-button size="tiny" @click="optionData.items.splice(index, 1)">删除</n-button>
        </n-space>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.items.push({ image: '', title: '', desc: '' })">+ 新增</n-button>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="布局">
      <setting-item name="每行列数">
        <n-input-number v-model:value="optionData.columns" size="small" :min="1" :max="6" />
      </setting-item>
      <setting-item name="间距">
        <n-input-number v-model:value="optionData.gap" size="small" />
      </setting-item>
      <setting-item name="图片高度">
        <n-input-number v-model:value="optionData.imageHeight" size="small" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="卡片背景">
        <n-color-picker v-model:value="optionData.cardBgColor" size="small" />
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
