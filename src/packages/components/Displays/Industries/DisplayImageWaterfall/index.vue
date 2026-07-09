<template>
  <div class="display-image-waterfall" :style="{ overflowY: autoScroll ? 'auto' : 'hidden' }" ref="containerRef">
    <div
      class="waterfall-grid"
      :style="{ columnCount: columns, columnGap: gap + 'px' }"
    >
      <div
        v-for="(url, index) in dataset"
        :key="index"
        class="waterfall-item"
        :style="{ marginBottom: gap + 'px', borderRadius: borderRadius + 'px' }"
      >
        <img
          :src="url"
          :class="{ 'hover-scale': hoverScale }"
          :style="{ borderRadius: borderRadius + 'px' }"
          @error="onImgError"
          @load="onImgLoad"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, columns, gap, borderRadius, autoScroll, scrollSpeed, hoverScale } = toRefs(props.chartConfig.option)

const containerRef = ref<HTMLElement | null>(null)

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="200" height="150" fill="%23eee"/><text x="100" y="75" text-anchor="middle" fill="%23999">No Image</text></svg>'
}

const onImgLoad = () => {
  // Trigger reflow for proper waterfall layout
}
</script>

<style lang="scss" scoped>
.display-image-waterfall {
  width: 100%;
  height: 100%;
  padding: 4px;
  .waterfall-grid {
    column-count: v-bind(columns);
    column-gap: v-bind(gap + 'px');
  }
  .waterfall-item {
    break-inside: avoid;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
      transition: transform 0.3s;
      &.hover-scale:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
