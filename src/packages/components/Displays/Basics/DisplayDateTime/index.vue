<template>
  <div class="display-datetime" :style="containerStyle">
    <div class="datetime-main">{{ formattedTime }}</div>
    <div v-if="showWeekday" class="datetime-weekday">{{ weekday }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, computed, onMounted, onUnmounted } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { format, fontSize, color, fontWeight, textAlign, showWeekday, bgColor } = toRefs(props.chartConfig.option)

const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const containerStyle = computed(() => ({
  fontSize: fontSize.value + 'px',
  color: color.value,
  fontWeight: fontWeight.value,
  textAlign: textAlign.value,
  background: bgColor.value
}))

const weekNames = ['日', '一', '二', '三', '四', '五', '六']

const formattedTime = computed(() => {
  const d = now.value
  const Y = d.getFullYear()
  const M = String(d.getMonth() + 1).padStart(2, '0')
  const D = String(d.getDate()).padStart(2, '0')
  const H = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return format.value
    .replace('YYYY', String(Y))
    .replace('MM', M)
    .replace('DD', D)
    .replace('HH', H)
    .replace('mm', m)
    .replace('ss', s)
})

const weekday = computed(() => {
  return '星期' + weekNames[now.value.getDay()]
})

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.display-datetime {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .datetime-main {
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
  }
  .datetime-weekday {
    font-size: 0.5em;
    opacity: 0.7;
    margin-top: 4px;
  }
}
</style>
