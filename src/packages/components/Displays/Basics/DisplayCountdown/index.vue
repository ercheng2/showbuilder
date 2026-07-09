<template>
  <div class="display-countdown">
    <div class="countdown-container" :style="{ fontSize: fontSize + 'px', color: color }">
      <template v-if="timeRemaining.total > 0">
        <span v-if="showDays" class="time-block" :style="{ background: bgColor, borderRadius: borderRadius + 'px' }">
          {{ padZero(timeRemaining.days) }}<small>天</small>
        </span>
        <span v-if="showDays" class="separator">{{ separator }}</span>
        <span v-if="showHours" class="time-block" :style="{ background: bgColor, borderRadius: borderRadius + 'px' }">
          {{ padZero(timeRemaining.hours) }}<small>时</small>
        </span>
        <span v-if="showHours" class="separator">{{ separator }}</span>
        <span v-if="showMinutes" class="time-block" :style="{ background: bgColor, borderRadius: borderRadius + 'px' }">
          {{ padZero(timeRemaining.minutes) }}<small>分</small>
        </span>
        <span v-if="showMinutes" class="separator">{{ separator }}</span>
        <span v-if="showSeconds" class="time-block" :style="{ background: bgColor, borderRadius: borderRadius + 'px' }">
          {{ padZero(timeRemaining.seconds) }}<small>秒</small>
        </span>
      </template>
      <span v-else class="expired-text">已结束</span>
    </div>
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
const { targetDate, showDays, showHours, showMinutes, showSeconds, fontSize, color, bgColor, borderRadius, separator } = toRefs(props.chartConfig.option)

interface TimeRemaining {
  total: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

const timeRemaining = ref<TimeRemaining>({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
let timer: ReturnType<typeof setInterval> | null = null

const calculateRemaining = () => {
  const now = Date.now()
  const target = new Date(targetDate.value).getTime()
  const diff = target - now
  if (diff <= 0) {
    timeRemaining.value = { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }
  timeRemaining.value = {
    total: diff,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  }
}

const padZero = (n: number) => n.toString().padStart(2, '0')

onMounted(() => {
  calculateRemaining()
  timer = setInterval(calculateRemaining, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.display-countdown {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .countdown-container {
    display: flex;
    align-items: center;
    .time-block {
      padding: 4px 12px;
      font-weight: bold;
      font-variant-numeric: tabular-nums;
      small {
        font-size: 0.4em;
        margin-left: 2px;
      }
    }
    .separator {
      margin: 0 4px;
      font-weight: bold;
    }
    .expired-text {
      font-size: 0.6em;
      opacity: 0.7;
    }
  }
}
</style>
