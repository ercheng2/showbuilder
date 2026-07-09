<template>
  <collapse-item name="视频设置" :expanded="true">
    <setting-item-box name="源">
      <setting-item name="视频地址">
        <n-input v-model:value="optionData.dataset" size="small" placeholder="视频URL" />
      </setting-item>
      <setting-item name="封面图">
        <n-input v-model:value="optionData.poster" size="small" placeholder="封面图URL" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="播放控制">
      <setting-item><n-checkbox v-model:checked="optionData.autoplay" size="small">自动播放</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.loop" size="small">循环播放</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.muted" size="small">静音</n-checkbox></setting-item>
      <setting-item><n-checkbox v-model:checked="optionData.controls" size="small">显示控制栏</n-checkbox></setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="适应方式">
        <n-select v-model:value="optionData.fit" size="small" :options="[{label:'contain',value:'contain'},{label:'cover',value:'cover'},{label:'fill',value:'fill'}]" />
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
