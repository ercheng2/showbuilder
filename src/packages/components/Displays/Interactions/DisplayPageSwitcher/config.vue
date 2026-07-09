<template>
  <collapse-item name="页面切换设置" :expanded="true">
    <setting-item-box name="标签页">
      <setting-item v-for="(tab, index) in optionData.tabs" :key="index">
        <n-input-group>
          <n-input v-model:value="tab.label" size="small" placeholder="标签名" />
          <n-input v-model:value="tab.key" size="small" placeholder="Key" />
          <n-button ghost size="small" @click="optionData.tabs.splice(index, 1)">-</n-button>
        </n-input-group>
      </setting-item>
      <setting-item>
        <n-button size="small" @click="optionData.tabs.push({ label: '新页面', key: 'new' + Date.now() })">+ 新增页面</n-button>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="标签位置">
        <n-select v-model:value="optionData.tabPosition" size="small" :options="[{label:'顶部',value:'top'},{label:'左侧',value:'left'},{label:'右侧',value:'right'}]" />
      </setting-item>
      <setting-item name="切换动效">
        <n-select v-model:value="optionData.animation" size="small" :options="[{label:'淡入',value:'fade'},{label:'滑动',value:'slide'}]" />
      </setting-item>
      <setting-item name="字体大小">
        <n-input-number v-model:value="optionData.fontSize" size="small" />
      </setting-item>
      <setting-item name="默认颜色">
        <n-color-picker v-model:value="optionData.color" size="small" />
      </setting-item>
      <setting-item name="激活颜色">
        <n-color-picker v-model:value="optionData.activeColor" size="small" />
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
