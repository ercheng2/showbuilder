<template>
  <div
    class="display-touch-hotspot"
    :style="hotspotStyle"
    @click="handleClick"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="showBorder" class="hotspot-border" :style="computedBorderStyle"></div>
    <div class="hotspot-hint" :style="{ opacity: hovering ? 1 : 0 }">
      {{ actionHint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, computed } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { actionType, actionTarget, highlightColor, showBorder, borderColor, borderStyle, borderRadius } = toRefs(props.chartConfig.option)

const hovering = ref(false)

const hotspotStyle = computed(() => ({
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  position: 'relative' as const,
  background: hovering.value ? highlightColor.value : 'transparent',
  transition: 'background 0.3s',
  borderRadius: borderRadius.value + 'px'
}))

const computedBorderStyle = computed(() => ({
  border: `2px ${borderStyle.value} ${borderColor.value}`,
  borderRadius: borderRadius.value + 'px',
  position: 'absolute' as const,
  top: 0, left: 0, right: 0, bottom: 0,
  pointerEvents: 'none' as const
}))

const actionHint = computed(() => {
  switch (actionType.value) {
    case 'url': return '🔗 ' + (actionTarget.value || '跳转链接')
    case 'popup': return '💬 打开弹窗'
    case 'page': return '📄 切换页面'
    default: return '点击触发'
  }
})

const handleClick = () => {
  const type = actionType.value
  const target = actionTarget.value
  if (type === 'url' && target) {
    window.open(target, '_blank')
  } else if (type === 'popup') {
    window.dispatchEvent(new CustomEvent('showbuilder:popup', { detail: { popupId: target } }))
  } else if (type === 'page') {
    window.dispatchEvent(new CustomEvent('showbuilder:switchPage', { detail: { pageId: target } }))
  }
}
</script>

<style lang="scss" scoped>
.display-touch-hotspot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .hotspot-hint {
    font-size: 12px;
    color: #666;
    background: rgba(255,255,255,0.9);
    padding: 2px 8px;
    border-radius: 4px;
    transition: opacity 0.3s;
    pointer-events: none;
    white-space: nowrap;
  }
}
</style>
