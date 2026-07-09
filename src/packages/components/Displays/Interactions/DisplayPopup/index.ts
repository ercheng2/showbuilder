import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayPopupConfig: ConfigType = {
  key: 'DisplayPopup',
  chartKey: 'VDisplayPopup',
  conKey: 'VCDisplayPopup',
  title: '弹窗',
  category: DisplayCategoryEnum.INTERACTION,
  categoryName: DisplayCategoryEnumName.INTERACTION,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_popup.png'
}
