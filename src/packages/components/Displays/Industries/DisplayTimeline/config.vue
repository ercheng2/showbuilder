<template>
  <collapse-item name="时间轴设置" :expanded="true">
    <setting-item-box name="布局">
      <setting-item name="方向">
        <n-select v-model:value="optionData.direction" size="small" :options="[{label:'纵向',value:'vertical'},{label:'横向',value:'horizontal'}]" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="节点列表">
      <setting-item v-for="(item, index) in optionData.items" :key="index">
        <n-space vertical size="small">
          <n-input v-model:value="item.date" size="small" placeholder="日期" />
          <n-input v-model:value="item.title" size="small" placeholder="标题" />
          <n-input v-model:value="item.desc" size="small" placeholder="描述" />
          <n-button size="tiny" @click="optionData.items.splice(index, 1)">删除此节点</n-button>
        </n-space>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.items.push({ date: '', title: '', desc: '' })">+ 新增节点</n-button>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="圆点颜色">
        <n-color-picker v-model:value="optionData.dotColor" size="small" />
      </setting-item>
      <setting-item name="线条颜色">
        <n-color-picker v-model:value="optionData.lineColor" size="small" />
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
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
