import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayButtonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  text: '点击按钮',
  fontSize: 16,
  color: '#fff',
  bgColor: '#1890ff',
  borderRadius: 8,
  actionType: 'url',
  actionTarget: 'https://www.example.com',
  popupId: '',
  pageId: '',
  padding: '8px 24px'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayButtonConfig.key
  public chartConfig = cloneDeep(DisplayButtonConfig)
  public option = cloneDeep(option)
}
