import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DisplayPersonCardConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  avatar: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg',
  name: '张三',
  title: '高级工程师',
  department: '技术部',
  intro: '拥有10年+前端开发经验，擅长Vue/React技术栈',
  avatarSize: 80,
  layout: 'horizontal',
  nameColor: '#333',
  titleColor: '#1890ff',
  introColor: '#666',
  bgColor: '#fff',
  borderRadius: 8
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DisplayPersonCardConfig.key
  public chartConfig = cloneDeep(DisplayPersonCardConfig)
  public option = cloneDeep(option)
}
