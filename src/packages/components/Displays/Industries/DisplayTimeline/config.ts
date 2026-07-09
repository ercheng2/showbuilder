import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayTimelineConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  direction: 'vertical',
  items: [
    { date: '2024-01', title: '项目启动', desc: '项目正式立项启动' },
    { date: '2024-03', title: '版本1.0', desc: '完成第一个版本开发' },
    { date: '2024-06', title: '版本2.0', desc: '重大功能更新发布' },
    { date: '2024-09', title: '里程碑', desc: '用户量突破100万' }
  ],
  dotColor: '#1890ff',
  lineColor: '#e8e8e8',
  fontSize: 14,
  titleColor: '#333',
  descColor: '#666',
  dateColor: '#999'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayTimelineConfig.key
  public chartConfig = cloneDeep(DisplayTimelineConfig)
  public option = cloneDeep(option)
}
