import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayCountdownConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  targetDate: new Date(Date.now() + 86400000).toISOString(),
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  fontSize: 48,
  color: '#ff4444',
  bgColor: 'rgba(0,0,0,0.3)',
  borderRadius: 8,
  separator: ':'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayCountdownConfig.key
  public chartConfig = cloneDeep(DisplayCountdownConfig)
  public option = cloneDeep(option)
}
