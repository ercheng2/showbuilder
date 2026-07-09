<template>
  <div class="display-timeline" :class="'direction-' + direction">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
    >
      <div class="timeline-dot" :style="{ background: dotColor }"></div>
      <div class="timeline-line" :style="{ background: lineColor }"></div>
      <div class="timeline-content">
        <div class="timeline-date" :style="{ color: dateColor, fontSize: (fontSize - 2) + 'px' }">{{ item.date }}</div>
        <div class="timeline-title" :style="{ color: titleColor, fontSize: fontSize + 'px' }">{{ item.title }}</div>
        <div class="timeline-desc" :style="{ color: descColor, fontSize: (fontSize - 2) + 'px' }">{{ item.desc }}</div>
      </div>
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
const { direction, items, dotColor, lineColor, fontSize, titleColor, descColor, dateColor } = toRefs(props.chartConfig.option)
</script>

<style lang="scss" scoped>
.display-timeline {
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  &.direction-vertical {
    .timeline-item {
      position: relative;
      padding-left: 24px;
      padding-bottom: 20px;
      &:last-child { padding-bottom: 0; }
      &:last-child .timeline-line { display: none; }
    }
    .timeline-dot {
      position: absolute;
      left: 0;
      top: 4px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      z-index: 1;
    }
    .timeline-line {
      position: absolute;
      left: 4px;
      top: 14px;
      width: 2px;
      bottom: 0;
    }
  }
  &.direction-horizontal {
    display: flex;
    overflow-x: auto;
    .timeline-item {
      flex: 1;
      min-width: 120px;
      text-align: center;
      position: relative;
      padding-top: 24px;
    }
    .timeline-dot {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      z-index: 1;
    }
    .timeline-line {
      position: absolute;
      top: 4px;
      left: 0;
      right: 0;
      height: 2px;
    }
  }
  .timeline-content {
    .timeline-date { margin-bottom: 2px; }
    .timeline-title { font-weight: bold; margin-bottom: 2px; }
    .timeline-desc { line-height: 1.4; }
  }
}
</style>
