import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayHonorWallConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  items: [
    { image: '', title: '国家高新技术企业', desc: '2024年' },
    { image: '', title: 'ISO9001认证', desc: '2023年' },
    { image: '', title: '最佳创新奖', desc: '2024年' },
    { image: '', title: '行业领军企业', desc: '2023年' }
  ],
  columns: 4,
  gap: 16,
  cardBgColor: '#fff',
  borderRadius: 8,
  titleColor: '#333',
  descColor: '#999',
  imageHeight: 120
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayHonorWallConfig.key
  public chartConfig = cloneDeep(DisplayHonorWallConfig)
  public option = cloneDeep(option)
}
