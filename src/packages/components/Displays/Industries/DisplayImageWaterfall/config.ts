import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayImageWaterfallConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dataset: [
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg',
  ],
  columns: 3,
  gap: 8,
  borderRadius: 8,
  autoScroll: true,
  scrollSpeed: 30,
  hoverScale: true
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayImageWaterfallConfig.key
  public chartConfig = cloneDeep(DisplayImageWaterfallConfig)
  public option = cloneDeep(option)
}
