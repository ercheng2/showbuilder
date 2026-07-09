/**
 * ShowBuilder 国产系统适配器
 * 检测国产浏览器（统信UOS/银河麒麟的 Chromium 内核）
 * 提供字体加载策略、视频兼容性检测、性能优化
 */

// ===== 浏览器检测 =====

export interface PlatformInfo {
  /** 操作系统类型 */
  os: 'uos' | 'kylin' | 'windows' | 'macos' | 'linux' | 'unknown'
  /** 浏览器引擎 */
  engine: 'chromium' | 'webkit' | 'gecko' | 'unknown'
  /** 是否为国产系统 */
  isDomestic: boolean
  /** 浏览器版本 */
  browserVersion: string
  /** 是否支持 H.264 */
  h264Supported: boolean
  /** 是否支持 WebGL */
  webglSupported: boolean
  /** 设备像素比 */
  devicePixelRatio: number
  /** 是否为低性能设备 */
  isLowPerf: boolean
}

/**
 * 检测当前运行平台
 */
export function detectPlatform(): PlatformInfo {
  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()

  // 操作系统检测
  let os: PlatformInfo['os'] = 'unknown'
  if (ua.includes('uos') || ua.includes('uniontech')) {
    os = 'uos'
  } else if (ua.includes('kylin') || ua.includes('neokylin')) {
    os = 'kylin'
  } else if (platform.includes('win')) {
    os = 'windows'
  } else if (platform.includes('mac')) {
    os = 'macos'
  } else if (platform.includes('linux')) {
    os = 'linux'
  }

  // 浏览器引擎检测
  let engine: PlatformInfo['engine'] = 'unknown'
  if (ua.includes('chrome') || ua.includes('chromium')) {
    engine = 'chromium'
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    engine = 'webkit'
  } else if (ua.includes('firefox')) {
    engine = 'gecko'
  }

  // 版本提取
  let browserVersion = '0'
  const match = ua.match(/(?:chrome|chromium|firefox|safari)\/([\d.]+)/)
  if (match) browserVersion = match[1]

  // 国产系统判定
  const isDomestic = os === 'uos' || os === 'kylin'

  // H.264 支持检测
  const h264Supported = detectH264Support()

  // WebGL 支持检测
  const webglSupported = detectWebGLSupport()

  // 设备像素比
  const devicePixelRatio = window.devicePixelRatio || 1

  // 低性能设备判定
  const isLowPerf = detectLowPerformance()

  return {
    os,
    engine,
    isDomestic,
    browserVersion,
    h264Supported,
    webglSupported,
    devicePixelRatio,
    isLowPerf
  }
}

/**
 * 检测 H.264 视频编码支持
 */
function detectH264Support(): boolean {
  try {
    const video = document.createElement('video')
    // 检查主流 H.264 编码格式
    const codecs = [
      'video/mp4; codecs="avc1.42E01E"',
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
      'video/mp4; codecs="avc1.64001E"',
      'video/mp4; codecs="avc1.64001E, mp4a.40.2"'
    ]
    return codecs.some(codec => {
      const result = video.canPlayType(codec)
      return result === 'probably' || result === 'maybe'
    })
  } catch {
    return false
  }
}

/**
 * 检测 WebGL 支持
 */
function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

/**
 * 检测是否为低性能设备
 */
function detectLowPerformance(): boolean {
  // 内存检测
  const memory = (navigator as any).deviceMemory
  if (memory && memory < 4) return true

  // 核心数检测
  const cores = navigator.hardwareConcurrency
  if (cores && cores < 4) return true

  // 低分辨率设备
  if (window.screen.width < 1366) return true

  return false
}

// ===== 字体加载策略 =====

/**
 * 字体加载配置
 */
interface FontLoadConfig {
  fontFamily: string
  url: string
  fallback: string
}

/**
 * 思源黑体字体配置
 */
export const SOURCE_HAN_SANS_CONFIG: FontLoadConfig = {
  fontFamily: 'Source Han Sans SC',
  url: '/src/assets/fonts/SourceHanSansSC.css',
  fallback: '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif'
}

/**
 * 加载 Web 字体（带降级策略）
 */
export function loadWebFont(config: FontLoadConfig): Promise<void> {
  return new Promise((resolve) => {
    // 检查字体是否已加载
    if (document.fonts && document.fonts.check('16px "' + config.fontFamily + '"')) {
      resolve()
      return
    }

    // 对国产系统使用 CDN 字体
    const platform = detectPlatform()
    const fontUrl = platform.isDomestic
      ? config.url.replace('/src/assets/', 'https://cdn.jsdelivr.net/npm/source-han-sans-sc@1.0.0/')
      : config.url

    // 创建 FontFace
    try {
      const font = new FontFace(config.fontFamily, `url(${fontUrl})`)
      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont)
        resolve()
      }).catch(() => {
        // 字体加载失败，使用回退
        console.warn(`[ShowBuilder] 字体 "${config.fontFamily}" 加载失败，使用回退字体`)
        applyFallbackFont(config.fallback)
        resolve()
      })
    } catch {
      // FontFace API 不可用
      applyFallbackFont(config.fallback)
      resolve()
    }
  })
}

/**
 * 应用回退字体
 */
function applyFallbackFont(fallback: string): void {
  const style = document.createElement('style')
  style.textContent = `* { font-family: ${fallback} !important; }`
  document.head.appendChild(style)
}

// ===== 视频兼容性 =====

/**
 * 视频源配置
 */
export interface VideoSourceConfig {
  src: string
  type: string
  codec?: string
}

/**
 * 获取兼容的视频源列表（H.264 优先）
 */
export function getCompatibleVideoSources(
  sources: VideoSourceConfig[]
): VideoSourceConfig[] {
  const platform = detectPlatform()

  // H.264 优先排序
  const prioritized = [...sources].sort((a, b) => {
    const aH264 = a.type.includes('mp4') || (a.codec && a.codec.includes('avc1'))
    const bH264 = b.type.includes('mp4') || (b.codec && b.codec.includes('avc1'))
    if (aH264 && !bH264) return -1
    if (!aH264 && bH264) return 1
    return 0
  })

  // 如果设备不支持 H.264，过滤掉
  if (!platform.h264Supported) {
    return prioritized.filter(s => !s.type.includes('mp4'))
  }

  return prioritized
}

/**
 * 获取推荐的视频编码格式
 */
export function getRecommendedVideoFormat(): { container: string; codec: string } {
  const platform = detectPlatform()

  if (platform.h264Supported) {
    return {
      container: 'mp4',
      codec: 'avc1.64001E' // H.264 High Profile
    }
  }

  // 回退到 WebM（VP8）
  return {
    container: 'webm',
    codec: 'vp8'
  }
}

// ===== 性能优化 =====

/**
 * 性能配置
 */
export interface PerformanceConfig {
  /** 最大帧率 */
  maxFPS: number
  /** 是否启用动画 */
  enableAnimations: boolean
  /** 是否启用阴影 */
  enableShadows: boolean
  /** 是否启用模糊效果 */
  enableBlur: boolean
  /** 图片懒加载偏移 */
  lazyLoadOffset: number
  /** 组件渲染批量大小 */
  batchRenderSize: number
}

/**
 * 获取平台推荐的性能配置
 */
export function getPerformanceConfig(): PerformanceConfig {
  const platform = detectPlatform()

  if (platform.isLowPerf || platform.isDomestic) {
    return {
      maxFPS: 30,
      enableAnimations: true,
      enableShadows: false,
      enableBlur: false,
      lazyLoadOffset: 100,
      batchRenderSize: 10
    }
  }

  return {
    maxFPS: 60,
    enableAnimations: true,
    enableShadows: true,
    enableBlur: true,
    lazyLoadOffset: 300,
    batchRenderSize: 20
  }
}

/**
 * 应用性能优化配置
 */
export function applyPerformanceOptimizations(config?: PerformanceConfig): void {
  const perfConfig = config || getPerformanceConfig()

  // 限制动画帧率
  if (perfConfig.maxFPS < 60) {
    const frameInterval = 1000 / perfConfig.maxFPS
    const originalRAF = window.requestAnimationFrame
    let lastTime = 0
    window.requestAnimationFrame = function (callback: FrameRequestCallback): number {
      const now = performance.now()
      if (now - lastTime >= frameInterval) {
        lastTime = now
        return originalRAF(callback)
      }
      return originalRAF(() => {
        // 跳过帧
      })
    }
  }

  // 禁用阴影
  if (!perfConfig.enableShadows) {
    const style = document.createElement('style')
    style.id = 'sb-perf-no-shadows'
    style.textContent = `* { box-shadow: none !important; text-shadow: none !important; }`
    document.head.appendChild(style)
  }

  // 禁用模糊
  if (!perfConfig.enableBlur) {
    const style = document.createElement('style')
    style.id = 'sb-perf-no-blur'
    style.textContent = `* { filter: none !important; backdrop-filter: none !important; }`
    document.head.appendChild(style)
  }

  console.log('[ShowBuilder] 性能优化已应用', perfConfig)
}

// ===== 初始化适配 =====

/**
 * 初始化平台适配
 */
export function initPlatformAdapter(): void {
  const platform = detectPlatform()

  console.log('[ShowBuilder] 平台信息:', platform)

  // 国产系统添加 CSS 类名
  if (platform.isDomestic) {
    document.documentElement.classList.add('sb-platform-domestic')
    document.documentElement.classList.add(`sb-os-${platform.os}`)
  }

  // 低性能设备优化
  if (platform.isLowPerf) {
    document.documentElement.classList.add('sb-low-perf')
  }

  // 加载字体
  loadWebFont(SOURCE_HAN_SANS_CONFIG).then(() => {
    document.documentElement.classList.add('sb-fonts-loaded')
  })

  // 应用性能优化
  applyPerformanceOptimizations()

  // 监听内存警告
  if ('memory' in performance) {
    const memory = (performance as any).memory
    if (memory) {
      const checkMemory = () => {
        const usedRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        if (usedRatio > 0.8) {
          console.warn('[ShowBuilder] 内存使用率过高:', Math.round(usedRatio * 100) + '%')
          // 触发清理
          document.dispatchEvent(new CustomEvent('showbuilder:memoryWarning'))
        }
      }
      setInterval(checkMemory, 30000)
    }
  }
}

/**
 * 检查当前浏览器是否兼容
 */
export function checkBrowserCompatibility(): { compatible: boolean; issues: string[] } {
  const issues: string[] = []

  // 检查基础 API
  if (typeof Promise === 'undefined') issues.push('不支持 Promise')
  if (typeof fetch === 'undefined') issues.push('不支持 fetch')
  if (typeof CSS.supports === 'undefined') issues.push('不支持 CSS.supports')
  if (typeof window.requestAnimationFrame === 'undefined') issues.push('不支持 requestAnimationFrame')

  // 检查 CSS Grid
  if (!CSS.supports('display', 'grid')) issues.push('不支持 CSS Grid')

  // 检查 CSS 变量
  if (!CSS.supports('--custom', 'test')) issues.push('不支持 CSS 变量')

  // 检查 Flexbox
  if (!CSS.supports('display', 'flex')) issues.push('不支持 Flexbox')

  // 检查 ES6
  try {
    eval('() => {}')
  } catch {
    issues.push('不支持 ES6 箭头函数')
  }

  return {
    compatible: issues.length === 0,
    issues
  }
}