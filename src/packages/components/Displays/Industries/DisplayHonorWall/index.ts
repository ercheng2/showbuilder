import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayHonorWallConfig: ConfigType = {
  key: 'DisplayHonorWall',
  chartKey: 'VDisplayHonorWall',
  conKey: 'VCDisplayHonorWall',
  title: '荣誉墙',
  category: DisplayCategoryEnum.INDUSTRY,
  categoryName: DisplayCategoryEnumName.INDUSTRY,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_honor_wall.png'
}
