import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayButtonConfig: ConfigType = {
  key: 'DisplayButton',
  chartKey: 'VDisplayButton',
  conKey: 'VCDisplayButton',
  title: '按钮跳转',
  category: DisplayCategoryEnum.INTERACTION,
  categoryName: DisplayCategoryEnumName.INTERACTION,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_button.png'
}
