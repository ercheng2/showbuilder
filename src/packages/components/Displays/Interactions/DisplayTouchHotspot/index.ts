import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayTouchHotspotConfig: ConfigType = {
  key: 'DisplayTouchHotspot',
  chartKey: 'VDisplayTouchHotspot',
  conKey: 'VCDisplayTouchHotspot',
  title: '触控热区',
  category: DisplayCategoryEnum.INTERACTION,
  categoryName: DisplayCategoryEnumName.INTERACTION,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_touch_hotspot.png'
}
