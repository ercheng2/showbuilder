import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayCarouselConfig: ConfigType = {
  key: 'DisplayCarousel',
  chartKey: 'VDisplayCarousel',
  conKey: 'VCDisplayCarousel',
  title: '轮播图',
  category: DisplayCategoryEnum.BASIC,
  categoryName: DisplayCategoryEnumName.BASIC,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_carousel.png'
}
