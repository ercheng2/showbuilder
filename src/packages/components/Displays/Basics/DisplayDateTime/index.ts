import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayDateTimeConfig: ConfigType = {
  key: 'DisplayDateTime',
  chartKey: 'VDisplayDateTime',
  conKey: 'VCDisplayDateTime',
  title: '日期时间',
  category: DisplayCategoryEnum.BASIC,
  categoryName: DisplayCategoryEnumName.BASIC,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_datetime.png'
}
