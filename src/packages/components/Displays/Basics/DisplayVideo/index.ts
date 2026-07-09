import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayVideoConfig: ConfigType = {
  key: 'DisplayVideo',
  chartKey: 'VDisplayVideo',
  conKey: 'VCDisplayVideo',
  title: '视频播放器',
  category: DisplayCategoryEnum.BASIC,
  categoryName: DisplayCategoryEnumName.BASIC,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_video.png'
}
