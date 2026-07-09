import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayDateTimeConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  format: 'YYYY-MM-DD HH:mm:ss',
  fontSize: 36,
  color: '#333',
  fontWeight: 'bold',
  textAlign: 'center',
  showWeekday: true,
  bgColor: 'transparent'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayDateTimeConfig.key
  public chartConfig = cloneDeep(DisplayDateTimeConfig)
  public option = cloneDeep(option)
}
