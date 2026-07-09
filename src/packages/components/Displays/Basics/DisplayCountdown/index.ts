import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayCountdownConfig: ConfigType = {
  key: 'DisplayCountdown',
  chartKey: 'VDisplayCountdown',
  conKey: 'VCDisplayCountdown',
  title: '倒计时',
  category: DisplayCategoryEnum.BASIC,
  categoryName: DisplayCategoryEnumName.BASIC,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_countdown.png'
}
