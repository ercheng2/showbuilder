import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayCarouselConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: [
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  ],
  autoplay: true,
  interval: 5000,
  direction: 'horizontal',
  effect: 'slide',
  showDots: true,
  showArrow: false,
  dotType: 'dot',
  dotPlacement: 'bottom',
  fit: 'contain',
  borderRadius: 10
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayCarouselConfig.key
  public chartConfig = cloneDeep(DisplayCarouselConfig)
  public option = cloneDeep(option)
}
