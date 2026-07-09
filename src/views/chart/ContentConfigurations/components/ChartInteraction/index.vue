<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chart-interaction-config">
    <collapse-item name="点击跳转" :expanded="true">
      <setting-item-box name="跳转配置">
        <setting-item name="跳转类型">
          <n-select
            v-model:value="interactionConfig.actionType"
            size="small"
            :options="actionTypeOptions"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.actionType === 'url'" name="跳转URL">
          <n-input
            v-model:value="interactionConfig.actionTarget"
            size="small"
            placeholder="https://www.example.com"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.actionType === 'popup'" name="弹窗组件ID">
          <n-input
            v-model:value="interactionConfig.actionTarget"
            size="small"
            placeholder="选择弹窗组件"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.actionType === 'page'" name="目标页面ID">
          <n-input
            v-model:value="interactionConfig.actionTarget"
            size="small"
            placeholder="输入页面ID"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.actionType === 'page'" name="切换动效">
          <n-select
            v-model:value="interactionConfig.transition"
            size="small"
            :options="transitionOptions"
          />
        </setting-item>
      </setting-item-box>
    </collapse-item>

    <collapse-item name="弹窗触发" :expanded="true">
      <setting-item-box name="触发条件">
        <setting-item name="触发方式">
          <n-select
            v-model:value="interactionConfig.popupTrigger"
            size="small"
            :options="popupTriggerOptions"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.popupTrigger === 'delay'" name="延迟(ms)">
          <n-input-number
            v-model:value="interactionConfig.popupDelay"
            size="small"
            :min="0"
          />
        </setting-item>
        <setting-item v-if="interactionConfig.popupTrigger === 'scroll'" name="滚动触发比例">
          <n-slider
            v-model:value="interactionConfig.scrollThreshold"
            :min="0"
            :max="1"
            :step="0.1"
            :format-tooltip="(v: number) => Math.round(v * 100) + '%'"
          />
        </setting-item>
      </setting-item-box>
      <setting-item-box name="弹窗内容">
        <setting-item name="标题">
          <n-input v-model:value="interactionConfig.popupTitle" size="small" />
        </setting-item>
        <setting-item name="内容">
          <n-input
            v-model:value="interactionConfig.popupContent"
            type="textarea"
            size="small"
            :autosize="{ minRows: 3, maxRows: 6 }"
          />
        </setting-item>
        <setting-item>
          <n-checkbox v-model:checked="interactionConfig.showCloseBtn" size="small">
            显示关闭按钮
          </n-checkbox>
        </setting-item>
        <setting-item>
          <n-checkbox v-model:checked="interactionConfig.maskClosable" size="small">
            点击遮罩关闭
          </n-checkbox>
        </setting-item>
      </setting-item-box>
    </collapse-item>

    <collapse-item name="多页面管理" :expanded="false">
      <setting-item-box name="页面列表">
        <setting-item v-for="(page, index) in interactionConfig.pages" :key="index">
          <n-space vertical size="small">
            <n-input-group>
              <n-input v-model:value="page.name" size="small" placeholder="页面名称" />
              <n-input v-model:value="page.id" size="small" placeholder="页面ID" />
              <n-button ghost size="small" @click="removePage(index)">-</n-button>
            </n-input-group>
            <n-select
              v-model:value="page.transition"
              size="small"
              :options="transitionOptions"
              placeholder="切换动效"
            />
            <n-input-number
              v-model:value="page.duration"
              size="small"
              placeholder="动效时长(ms)"
            />
          </n-space>
        </setting-item>
        <setting-item>
          <n-button size="small" @click="addPage">+ 新增页面</n-button>
        </setting-item>
      </setting-item-box>
      <setting-item-box name="页面排序">
        <setting-item>
          <n-text depth="3">拖拽调整页面顺序</n-text>
        </setting-item>
        <setting-item v-for="(page, index) in interactionConfig.pages" :key="'sort-' + index">
          <n-space>
            <n-tag>{{ index + 1 }}</n-tag>
            <n-text>{{ page.name }}</n-text>
            <n-button
              size="tiny"
              :disabled="index === 0"
              @click="movePage(index, -1)"
            >↑</n-button>
            <n-button
              size="tiny"
              :disabled="index === interactionConfig.pages.length - 1"
              @click="movePage(index, 1)"
            >↓</n-button>
          </n-space>
        </setting-item>
      </setting-item-box>
    </collapse-item>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

interface PageConfig {
  name: string
  id: string
  transition: string
  duration: number
}

interface InteractionConfig {
  actionType: 'none' | 'url' | 'popup' | 'page'
  actionTarget: string
  transition: string
  popupTrigger: 'click' | 'hover' | 'delay' | 'scroll'
  popupDelay: number
  scrollThreshold: number
  popupTitle: string
  popupContent: string
  showCloseBtn: boolean
  maskClosable: boolean
  pages: PageConfig[]
}

const props = defineProps({
  optionData: {
    type: Object,
    required: true
  }
})

const chartEditStore = useChartEditStore()

const interactionConfig = reactive<InteractionConfig>({
  actionType: 'none',
  actionTarget: '',
  transition: 'fade',
  popupTrigger: 'click',
  popupDelay: 2000,
  scrollThreshold: 0.5,
  popupTitle: '',
  popupContent: '',
  showCloseBtn: true,
  maskClosable: true,
  pages: [
    { name: '页面1', id: 'page1', transition: 'fade', duration: 300 },
    { name: '页面2', id: 'page2', transition: 'fade', duration: 300 }
  ]
})

// 同步到组件属性
watch(interactionConfig, (newVal) => {
  const target = chartEditStore.fetchTargetIndex()
  if (target >= 0) {
    const component = chartEditStore.componentList[target]
    if (component && !component.isGroup) {
      if (!component.option) component.option = {}
      component.option._interaction = { ...newVal }
    }
  }
}, { deep: true })

const actionTypeOptions = [
  { label: '无', value: 'none' },
  { label: '打开URL', value: 'url' },
  { label: '打开弹窗', value: 'popup' },
  { label: '切换页面', value: 'page' }
]

const popupTriggerOptions = [
  { label: '点击触发', value: 'click' },
  { label: '悬停触发', value: 'hover' },
  { label: '延迟触发', value: 'delay' },
  { label: '滚动触发', value: 'scroll' }
]

const transitionOptions = [
  { label: '淡入', value: 'fade' },
  { label: '滑动', value: 'slide' },
  { label: '缩放', value: 'zoom' },
  { label: '翻转', value: 'flip' },
  { label: '无', value: 'none' }
]

const addPage = () => {
  const count = interactionConfig.pages.length + 1
  interactionConfig.pages.push({
    name: `页面${count}`,
    id: `page${count}`,
    transition: 'fade',
    duration: 300
  })
}

const removePage = (index: number) => {
  if (interactionConfig.pages.length > 1) {
    interactionConfig.pages.splice(index, 1)
  }
}

const movePage = (index: number, direction: number) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= interactionConfig.pages.length) return
  const temp = interactionConfig.pages[index]
  interactionConfig.pages[index] = interactionConfig.pages[newIndex]
  interactionConfig.pages[newIndex] = temp
}
</script>

<style lang="scss" scoped>
.chart-interaction-config {
  padding: 0;
}
</style>