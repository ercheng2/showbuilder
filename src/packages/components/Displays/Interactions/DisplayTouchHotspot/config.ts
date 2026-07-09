import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayTouchHotspotConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  actionType: 'url',
  actionTarget: '',
  highlightColor: 'rgba(24, 144, 255, 0.3)',
  showBorder: true,
  borderColor: 'rgba(24, 144, 255, 0.6)',
  borderStyle: 'dashed',
  borderRadius: 4
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayTouchHotspotConfig.key
  public chartConfig = cloneDeep(DisplayTouchHotspotConfig)
  public option = cloneDeep(option)
}
