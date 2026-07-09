import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayPageSwitcherConfig: ConfigType = {
  key: 'DisplayPageSwitcher',
  chartKey: 'VDisplayPageSwitcher',
  conKey: 'VCDisplayPageSwitcher',
  title: '多页面切换',
  category: DisplayCategoryEnum.INTERACTION,
  categoryName: DisplayCategoryEnumName.INTERACTION,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_page_switcher.png'
}
