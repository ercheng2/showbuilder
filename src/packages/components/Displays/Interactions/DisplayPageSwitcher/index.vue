<template>
  <div class="display-page-switcher" :style="containerStyle">
    <div class="tab-bar" :class="'tab-' + tabPosition" :style="{ background: bgColor }">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        :style="tabStyle(tab)"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="page-content">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="page-panel"
        :class="{ active: activeTab === tab.key }"
        :style="panelStyle"
      >
        <slot :name="tab.key" :page="tab.key">
          <div class="page-placeholder">{{ tab.label }} 内容区域</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, computed, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { tabs, activeTab: activeTabProp, tabPosition, fontSize, color, activeColor, bgColor, animation } = toRefs(props.chartConfig.option)

const activeTab = ref(activeTabProp.value)

watch(activeTabProp, (val) => { activeTab.value = val })

const containerStyle = computed(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: (tabPosition.value === 'left' || tabPosition.value === 'right') ? 'row' : 'column'
}))

const tabStyle = (tab: { key: string }) => ({
  fontSize: fontSize.value + 'px',
  color: activeTab.value === tab.key ? activeColor.value : color.value,
  borderBottom: activeTab.value === tab.key && tabPosition.value === 'top' ? '2px solid ' + activeColor.value : 'none'
})

const panelStyle = computed(() => ({
  animation: animation.value === 'fade' ? 'fadeIn 0.3s ease' : 'slideIn 0.3s ease'
}))

const switchTab = (key: string) => {
  activeTab.value = key
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('showbuilder:switchPage', { detail: { pageId: key } }))
  }
}

// Listen for external page switches
if (typeof window !== 'undefined') {
  window.addEventListener('showbuilder:switchPage', ((e: CustomEvent) => {
    const found = tabs.value.find(t => t.key === e.detail.pageId)
    if (found) activeTab.value = e.detail.pageId
  }) as EventListener)
}
</script>

<style lang="scss" scoped>
.display-page-switcher {
  overflow: hidden;
  .tab-bar {
    display: flex;
    flex-shrink: 0;
    &.tab-top { border-bottom: 1px solid #eee; }
    &.tab-left { flex-direction: column; border-right: 1px solid #eee; }
    &.tab-right { flex-direction: column; border-left: 1px solid #eee; }
  }
  .tab-item {
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    &:hover { opacity: 0.8; }
  }
  .page-content {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  .page-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    &.active { display: block; }
  }
  .page-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
</style>
