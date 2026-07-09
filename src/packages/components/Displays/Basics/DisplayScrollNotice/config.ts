import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayScrollNoticeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: ['欢迎使用 ShowBuilder 展示页面搭建工具', '拖拽式搭建，轻松创建展示页面', '支持一键导出纯静态HTML'],
  speed: 30,
  fontSize: 16,
  color: '#333',
  bgColor: 'rgba(255, 255, 255, 0.9)',
  icon: '📢',
  gap: 40
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayScrollNoticeConfig.key
  public chartConfig = cloneDeep(DisplayScrollNoticeConfig)
  public option = cloneDeep(option)
}
