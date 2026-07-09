<template>
  <div class="display-video" :style="{ borderRadius: borderRadius + 'px', overflow: 'hidden' }">
    <video
      ref="videoRef"
      :src="option.dataset"
      :poster="option.poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :controls="controls"
      :style="{ objectFit: fit, width: '100%', height: '100%' }"
      preload="auto"
      crossOrigin="anonymous"
      playsinline
    ></video>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const videoRef = ref<HTMLVideoElement | null>(null)
const { w, h } = toRefs(props.chartConfig.attr)
const { autoplay, loop, muted, controls, fit, borderRadius } = toRefs(props.chartConfig.option)

const option = shallowReactive({ ...configOption })

watch(
  () => props.chartConfig.option,
  (newData: any) => {
    Object.assign(option, newData)
    if (videoRef.value) {
      const vid = videoRef.value
      vid.loop = newData.loop
      vid.muted = newData.muted
      if (vid.paused) vid.play().catch(() => {})
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.display-video {
  width: 100%;
  height: 100%;
  background: #000;
  video {
    display: block;
  }
}
</style>
