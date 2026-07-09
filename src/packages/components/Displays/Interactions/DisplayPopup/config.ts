import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayPopupConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  title: '弹窗标题',
  content: '弹窗内容',
  triggerType: 'button',
  triggerText: '打开弹窗',
  showCloseBtn: true,
  width: 500,
  height: 300,
  maskClosable: true,
  bgColor: '#fff',
  borderRadius: 8
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayPopupConfig.key
  public chartConfig = cloneDeep(DisplayPopupConfig)
  public option = cloneDeep(option)
}
