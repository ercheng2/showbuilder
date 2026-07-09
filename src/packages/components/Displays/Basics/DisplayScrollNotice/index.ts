import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayScrollNoticeConfig: ConfigType = {
  key: 'DisplayScrollNotice',
  chartKey: 'VDisplayScrollNotice',
  conKey: 'VCDisplayScrollNotice',
  title: '滚动公告',
  category: DisplayCategoryEnum.BASIC,
  categoryName: DisplayCategoryEnumName.BASIC,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_scroll_notice.png'
}
