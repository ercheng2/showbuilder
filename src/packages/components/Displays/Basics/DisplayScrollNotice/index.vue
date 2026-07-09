<template>
  <div class="display-scroll-notice" :style="{ background: bgColor, fontSize: fontSize + 'px', color: color }">
    <span v-if="icon" class="notice-icon">{{ icon }}</span>
    <div class="scroll-wrapper">
      <div class="scroll-content" :style="{ animationDuration: animationDuration + 's' }">
        <span v-for="(text, i) in doubledNotices" :key="i" class="notice-item" :style="{ marginRight: gap + 'px' }">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, computed } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, speed, fontSize, color, bgColor, icon, gap } = toRefs(props.chartConfig.option)

const doubledNotices = computed(() => {
  const arr = dataset.value || []
  return [...arr, ...arr]
})

const animationDuration = computed(() => {
  const totalChars = (dataset.value || []).join('').length
  return Math.max(totalChars / (speed.value || 30) * 2, 5)
})
</script>

<style lang="scss" scoped>
.display-scroll-notice {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
  .notice-icon {
    flex-shrink: 0;
    margin: 0 8px;
  }
  .scroll-wrapper {
    flex: 1;
    overflow: hidden;
    position: relative;
  }
  .scroll-content {
    display: flex;
    white-space: nowrap;
    animation: scroll-left linear infinite;
    .notice-item {
      display: inline-block;
      white-space: nowrap;
    }
  }
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
