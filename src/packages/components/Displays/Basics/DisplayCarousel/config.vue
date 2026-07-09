<template>
  <collapse-item name="轮播设置" :expanded="true">
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
    <setting-item-box name="播放设置">
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.autoplay" size="small" />
          <n-text>自动播放</n-text>
        </n-space>
      </setting-item>
      <setting-item name="间隔(ms)">
        <n-input-number v-model:value="optionData.interval" size="small" />
      </setting-item>
      <setting-item name="方向">
        <n-select v-model:value="optionData.direction" size="small" :options="[{label:'水平',value:'horizontal'},{label:'垂直',value:'vertical'}]" />
      </setting-item>
      <setting-item name="效果">
        <n-select v-model:value="optionData.effect" size="small" :options="[{label:'slide',value:'slide'},{label:'fade',value:'fade'},{label:'card',value:'card'}]" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="指示器">
      <setting-item><n-switch v-model:value="optionData.showDots" size="small" /><n-text>显示指示点</n-text></setting-item>
      <setting-item><n-switch v-model:value="optionData.showArrow" size="small" /><n-text>显示箭头</n-text></setting-item>
      <setting-item name="指示器样式">
        <n-select v-model:value="optionData.dotType" size="small" :options="[{label:'点',value:'dot'},{label:'线',value:'line'}]" />
      </setting-item>
      <setting-item name="指示器位置">
        <n-select v-model:value="optionData.dotPlacement" size="small" :options="[{label:'上',value:'top'},{label:'下',value:'bottom'},{label:'左',value:'left'},{label:'右',value:'right'}]" />
      </setting-item>
    </setting-item-box>
    <setting-item-box name="样式">
      <setting-item name="圆角">
        <n-input-number v-model:value="optionData.borderRadius" size="small" />
      </setting-item>
      <setting-item name="图片适应">
        <n-select v-model:value="optionData.fit" size="small" :options="[{label:'contain',value:'contain'},{label:'cover',value:'cover'},{label:'fill',value:'fill'}]" />
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
