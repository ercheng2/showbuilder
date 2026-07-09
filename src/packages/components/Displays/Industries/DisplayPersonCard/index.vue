<template>
  <div class="display-person-card" :class="'layout-' + layout" :style="{ background: bgColor, borderRadius: borderRadius + 'px' }">
    <div class="card-avatar">
      <img
        :src="avatar"
        :style="{ width: avatarSize + 'px', height: avatarSize + 'px', borderRadius: '50%' }"
        @error="onImgError"
      />
    </div>
    <div class="card-info">
      <div class="card-name" :style="{ color: nameColor, fontSize: '18px' }">{{ name }}</div>
      <div class="card-title" :style="{ color: titleColor }">{{ title }}</div>
      <div v-if="department" class="card-department">{{ department }}</div>
      <div class="card-intro" :style="{ color: introColor }">{{ intro }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { avatar, name, title: personTitle, department, intro, avatarSize, layout, nameColor, titleColor, introColor, bgColor, borderRadius } = toRefs(props.chartConfig.option)

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="%23eee"/><text x="40" y="45" text-anchor="middle" fill="%23999">头像</text></svg>'
}
</script>

<style lang="scss" scoped>
.display-person-card {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  gap: 16px;
  overflow: hidden;
  &.layout-horizontal {
    flex-direction: row;
    align-items: center;
  }
  &.layout-vertical {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .card-avatar img {
    object-fit: cover;
    display: block;
  }
  .card-info {
    flex: 1;
    .card-name { font-weight: bold; margin-bottom: 4px; }
    .card-title { font-size: 14px; margin-bottom: 2px; }
    .card-department { font-size: 12px; color: #999; margin-bottom: 4px; }
    .card-intro { font-size: 13px; line-height: 1.5; }
  }
}
</style>
