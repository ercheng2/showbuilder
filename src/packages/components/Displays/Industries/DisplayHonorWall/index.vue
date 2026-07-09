<template>
  <div class="display-honor-wall" :style="{ overflowY: 'auto' }">
    <div class="honor-grid" :style="{ gridTemplateColumns: gridColumns, gap: gap + 'px' }">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="honor-card"
        :style="{ background: cardBgColor, borderRadius: borderRadius + 'px' }"
      >
        <div class="honor-image" :style="{ height: imageHeight + 'px' }">
          <img v-if="item.image" :src="item.image" @error="onImgError" />
          <div v-else class="honor-placeholder">🏆</div>
        </div>
        <div class="honor-title" :style="{ color: titleColor }">{{ item.title }}</div>
        <div class="honor-desc" :style="{ color: descColor }">{{ item.desc }}</div>
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
const { items, columns, gap, cardBgColor, borderRadius, titleColor, descColor, imageHeight } = toRefs(props.chartConfig.option)

const gridColumns = computed(() => `repeat(${columns.value}, 1fr)`)

const onImgError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none'
}
</script>

<style lang="scss" scoped>
.display-honor-wall {
  width: 100%;
  height: 100%;
  padding: 12px;
  .honor-grid {
    display: grid;
  }
  .honor-card {
    text-align: center;
    padding: 12px;
    transition: transform 0.3s;
    &:hover { transform: translateY(-2px); }
  }
  .honor-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .honor-placeholder {
      font-size: 48px;
    }
  }
  .honor-title {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  .honor-desc {
    font-size: 12px;
  }
}
</style>
