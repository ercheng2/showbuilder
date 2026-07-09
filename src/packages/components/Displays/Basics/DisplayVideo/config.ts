import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayVideoConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
  poster: '',
  autoplay: true,
  loop: true,
  muted: true,
  controls: true,
  fit: 'contain',
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayVideoConfig.key
  public chartConfig = cloneDeep(DisplayVideoConfig)
  public option = cloneDeep(option)
}
