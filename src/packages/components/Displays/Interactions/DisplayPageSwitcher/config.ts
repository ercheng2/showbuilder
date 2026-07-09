import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayPageSwitcherConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  tabs: [
    { label: '页面1', key: 'page1' },
    { label: '页面2', key: 'page2' },
    { label: '页面3', key: 'page3' }
  ],
  activeTab: 'page1',
  tabPosition: 'top',
  tabType: 'line',
  fontSize: 14,
  color: '#333',
  activeColor: '#1890ff',
  bgColor: '#fff',
  animation: 'fade'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayPageSwitcherConfig.key
  public chartConfig = cloneDeep(DisplayPageSwitcherConfig)
  public option = cloneDeep(option)
}
