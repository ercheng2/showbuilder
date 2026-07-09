<template>
  <div class="display-button" :style="containerStyle">
    <button
      class="action-btn"
      :style="btnStyle"
      @click="handleClick"
    >
      {{ text }}
    </button>
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
const { text, fontSize, color, bgColor, borderRadius, actionType, actionTarget, padding } = toRefs(props.chartConfig.option)

const containerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const btnStyle = computed(() => ({
  fontSize: fontSize.value + 'px',
  color: color.value,
  background: bgColor.value,
  borderRadius: borderRadius.value + 'px',
  padding: padding.value,
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s',
  outline: 'none'
}))

const handleClick = () => {
  const type = actionType.value
  const target = actionTarget.value
  if (type === 'url' && target) {
    window.open(target, '_blank')
  } else if (type === 'popup') {
    // Emit popup event - handled by the editor runtime
    const event = new CustomEvent('showbuilder:popup', { detail: { popupId: target } })
    window.dispatchEvent(event)
  } else if (type === 'page') {
    const event = new CustomEvent('showbuilder:switchPage', { detail: { pageId: target } })
    window.dispatchEvent(event)
  }
}
</script>

<style lang="scss" scoped>
.display-button {
  .action-btn:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }
  .action-btn:active {
    filter: brightness(0.9);
    transform: scale(0.98);
  }
}
</style>
