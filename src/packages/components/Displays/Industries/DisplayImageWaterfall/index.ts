import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayImageWaterfallConfig: ConfigType = {
  key: 'DisplayImageWaterfall',
  chartKey: 'VDisplayImageWaterfall',
  conKey: 'VCDisplayImageWaterfall',
  title: '图片流水墙',
  category: DisplayCategoryEnum.INDUSTRY,
  categoryName: DisplayCategoryEnumName.INDUSTRY,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_image_waterfall.png'
}
