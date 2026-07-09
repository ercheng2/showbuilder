<template>
  <div class="display-popup" :style="containerStyle">
    <button v-if="triggerType === 'button'" class="trigger-btn" @click="visible = true">
      {{ triggerText }}
    </button>
    <Teleport to="body">
      <div v-if="visible" class="popup-overlay" @click.self="overlayClick">
        <div class="popup-content" :style="popupStyle">
          <div class="popup-header">
            <span class="popup-title">{{ title }}</span>
            <button v-if="showCloseBtn" class="popup-close" @click="visible = false">✕</button>
          </div>
          <div class="popup-body" v-html="content"></div>
        </div>
      </div>
    </Teleport>
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
const { title, content, triggerType, triggerText, showCloseBtn, width: pw, height: ph, maskClosable, bgColor, borderRadius } = toRefs(props.chartConfig.option)

const visible = ref(false)

const containerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const popupStyle = computed(() => ({
  width: pw.value + 'px',
  maxHeight: ph.value + 'px',
  background: bgColor.value,
  borderRadius: borderRadius.value + 'px'
}))

const overlayClick = () => {
  if (maskClosable.value) visible.value = false
}

// Listen for external popup triggers
if (typeof window !== 'undefined') {
  window.addEventListener('showbuilder:popup', ((e: CustomEvent) => {
    if (e.detail.popupId === props.chartConfig.id) {
      visible.value = true
    }
  }) as EventListener)
}
</script>

<style lang="scss" scoped>
.display-popup {
  .trigger-btn {
    padding: 8px 20px;
    border: 1px solid #1890ff;
    background: #1890ff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.popup-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  overflow: hidden;
  min-width: 300px;
}
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  .popup-title {
    font-weight: bold;
    font-size: 16px;
  }
  .popup-close {
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    color: #999;
    &:hover { color: #333; }
  }
}
.popup-body {
  padding: 16px;
  overflow-y: auto;
}
</style>
