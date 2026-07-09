import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { DisplayCategoryEnum, DisplayCategoryEnumName } from '../../index.d'

export const DisplayPersonCardConfig: ConfigType = {
  key: 'DisplayPersonCard',
  chartKey: 'VDisplayPersonCard',
  conKey: 'VCDisplayPersonCard',
  title: '人物介绍卡',
  category: DisplayCategoryEnum.INDUSTRY,
  categoryName: DisplayCategoryEnumName.INDUSTRY,
  package: PackagesCategoryEnum.DISPLAYS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'display_person_card.png'
}
