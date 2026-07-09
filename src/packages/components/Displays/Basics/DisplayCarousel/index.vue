<template>
  <div class="display-carousel" :style="{ borderRadius: borderRadius + 'px', overflow: 'hidden' }">
    <n-carousel
      :autoplay="autoplay"
      :interval="interval"
      :direction="direction"
      :effect="effect"
      :dot-type="dotType"
      :dot-placement="dotPlacement"
      :show-arrow="showArrow"
      :show-dots="showDots"
      :draggable="true"
    >
      <div v-for="(url, index) in option.dataset" :key="index" class="carousel-slide">
        <img
          :src="url"
          :style="{ objectFit: fit, width: '100%', height: '100%' }"
          @error="onImgError"
        />
      </div>
    </n-carousel>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const {
  autoplay, interval, direction, effect, showDots,
  showArrow, dotType, dotPlacement, fit, borderRadius
} = toRefs(props.chartConfig.option)

const option = shallowReactive({ dataset: configOption.dataset })

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => { option.dataset = newData },
  { immediate: true, deep: false }
)

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="200" height="150" fill="%23eee"/><text x="100" y="75" text-anchor="middle" fill="%23999">No Image</text></svg>'
}
</script>

<style lang="scss" scoped>
.display-carousel {
  width: 100%;
  height: 100%;
  .carousel-slide {
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
