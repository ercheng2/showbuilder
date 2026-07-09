import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayTimelineConfig: ConfigType = {
  key: 'DisplayTimeline',
  chartKey: 'VDisplayTimeline',
  conKey: 'VCDisplayTimeline',
  title: '时间轴',
  category: DisplayCategoryEnum.INDUSTRY,
  categoryName: DisplayCategoryEnumName.INDUSTRY,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_timeline.png'
}
