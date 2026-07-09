/**
 * ShowBuilder 导出引擎
 * 将编辑器中的页面配置导出为纯静态HTML文件，完全离线可运行
 */
import type { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'

interface ExportConfig {
  width: number
  height: number
  background?: string
  backgroundImage?: string | null
  componentList: Array<CreateComponentType | CreateComponentGroupType>
  projectName: string
}

interface ExportOptions {
  /** 是否内联所有资源（默认 true） */
  inlineAssets?: boolean
  /** 是否包含 Vue 运行时 */
  includeVue?: boolean
  /** 是否包含 ECharts 运行时 */
  includeECharts?: boolean
  /** 是否压缩输出 */
  minify?: boolean
}

/**
 * 生成纯静态 HTML 导出文件
 */
export function generateExportHTML(
  config: ExportConfig,
  options: ExportOptions = {}
): string {
  const {
    inlineAssets = true,
    includeVue = true,
    includeECharts = true,
    minify = false
  } = options

  const { width, height, background, backgroundImage, componentList, projectName } = config

  // 生成组件数据JSON
  const componentDataJson = JSON.stringify(componentList).replace(/</g, '\\u003c')

  // 生成样式
  const styles = generateStyles(width, height, background, backgroundImage)

  // 生成组件渲染脚本
  const renderScript = generateRenderScript()

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>${escapeHtml(projectName || 'ShowBuilder')}</title>
<style>
/* ===== ShowBuilder 导出样式 ===== */
*{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;overflow:hidden;font-family:"Source Han Sans SC","思源黑体","Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;}
${styles}
</style>
</head>
<body>
<div id="showbuilder-app">
  <div id="showbuilder-canvas" class="sb-canvas">
    <!-- 组件容器 -->
  </div>
</div>

<script>
// ===== ShowBuilder 配置数据 =====
window.__SHOWBUILDER_CONFIG__ = ${componentDataJson};
window.__SHOWBUILDER_CANVAS__ = {
  width: ${width},
  height: ${height},
  background: ${JSON.stringify(background)},
  backgroundImage: ${JSON.stringify(backgroundImage)}
};
<\/script>

${includeECharts ? '<script>' + ECHARTS_RUNTIME + '<\/script>' : ''}
${includeVue ? '<script>' + VUE_RUNTIME + '<\/script>' : ''}

<script>
${renderScript}
<\/script>
</body>
</html>`

  return minify ? minifyHtml(html) : html
}

/**
 * 生成样式表
 */
function generateStyles(
  width: number,
  height: number,
  background?: string,
  backgroundImage?: string | null
): string {
  const bg = backgroundImage
    ? `url(${backgroundImage}) center/cover no-repeat`
    : background || '#1a1a2e'

  return `
#showbuilder-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a1a;
  overflow: hidden;
}
.sb-canvas {
  position: relative;
  width: ${width}px;
  height: ${height}px;
  background: ${bg};
  transform-origin: center center;
  overflow: hidden;
}
.sb-component {
  position: absolute;
  overflow: hidden;
}
.sb-component img {
  max-width: 100%;
  max-height: 100%;
}
.sb-component video {
  display: block;
}
/* 弹窗样式 */
.sb-popup-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}
.sb-popup-content {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  overflow: hidden;
  min-width: 300px;
}
.sb-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}
.sb-popup-close {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: #999;
}
.sb-popup-close:hover { color: #333; }
.sb-popup-body { padding: 16px; overflow-y: auto; }
/* 倒计时样式 */
.sb-countdown { display:flex;align-items:center;justify-content:center; }
.sb-countdown-block { padding:4px 12px;font-weight:bold;font-variant-numeric:tabular-nums; }
.sb-countdown-sep { margin:0 4px;font-weight:bold; }
/* 滚动公告 */
.sb-scroll-notice { display:flex;align-items:center;overflow:hidden; }
.sb-scroll-inner { display:flex;white-space:nowrap;animation:sb-scroll linear infinite; }
@keyframes sb-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
/* 时间轴 */
.sb-timeline { position:relative;padding:16px; }
.sb-timeline-item { position:relative;padding-left:24px;padding-bottom:20px; }
.sb-timeline-dot { position:absolute;left:0;top:4px;width:10px;height:10px;border-radius:50%;z-index:1; }
.sb-timeline-line { position:absolute;left:4px;top:14px;width:2px;bottom:0; }
/* 人物卡片 */
.sb-person-card { display:flex;gap:16px;padding:20px; }
.sb-person-card img { object-fit:cover;border-radius:50%; }
/* 荣誉墙 */
.sb-honor-grid { display:grid;padding:12px; }
.sb-honor-card { text-align:center;padding:12px; }
/* 瀑布流 */
.sb-waterfall { column-count:3;column-gap:8px;padding:4px; }
.sb-waterfall-item { break-inside:avoid;margin-bottom:8px;overflow:hidden; }
.sb-waterfall-item img { width:100%;display:block; }
/* 按钮 */
.sb-btn { border:none;cursor:pointer;transition:all 0.3s;outline:none; }
.sb-btn:hover { filter:brightness(1.1);transform:scale(1.02); }
.sb-btn:active { filter:brightness(0.9);transform:scale(0.98); }
/* 触控热区 */
.sb-hotspot { position:relative;cursor:pointer;transition:background 0.3s; }
/* 页面切换 */
.sb-tab-bar { display:flex;border-bottom:1px solid #eee; }
.sb-tab-item { padding:8px 16px;cursor:pointer;transition:all 0.3s; }
.sb-tab-panel { display:none; }
.sb-tab-panel.active { display:block; }
@keyframes sb-fadeIn { from{opacity:0} to{opacity:1} }
@keyframes sb-slideIn { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
`
}

/**
 * 生成组件渲染脚本
 */
function generateRenderScript(): string {
  return `
(function() {
  'use strict';
  var config = window.__SHOWBUILDER_CONFIG__ || [];
  var canvas = window.__SHOWBUILDER_CANVAS__ || {};
  var canvasEl = document.getElementById('showbuilder-canvas');
  if (!canvasEl) return;

  // 缩放适配
  function resizeCanvas() {
    var scaleX = window.innerWidth / canvas.width;
    var scaleY = window.innerHeight / canvas.height;
    var scale = Math.min(scaleX, scaleY, 1);
    canvasEl.style.transform = 'scale(' + scale + ')';
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 渲染组件
  function renderComponent(comp) {
    if (!comp || comp.isGroup) return;
    var attr = comp.attr || {};
    var option = comp.option || {};
    var el = document.createElement('div');
    el.className = 'sb-component';
    el.id = comp.id || '';
    el.style.cssText = [
      'left:' + attr.x + 'px',
      'top:' + attr.y + 'px',
      'width:' + attr.w + 'px',
      'height:' + attr.h + 'px',
      'z-index:' + (attr.zIndex || 0)
    ].join(';');

    var key = comp.chartConfig ? comp.chartConfig.key : (comp.key || '');

    // 根据组件类型渲染
    switch (key) {
      case 'DisplayCarousel':
        renderCarousel(el, option);
        break;
      case 'DisplayVideo':
        renderVideo(el, option);
        break;
      case 'DisplayCountdown':
        renderCountdown(el, option);
        break;
      case 'DisplayScrollNotice':
        renderScrollNotice(el, option);
        break;
      case 'DisplayDateTime':
        renderDateTime(el, option);
        break;
      case 'DisplayButton':
        renderButton(el, option);
        break;
      case 'DisplayPopup':
        renderPopup(el, option, comp.id);
        break;
      case 'DisplayPageSwitcher':
        renderPageSwitcher(el, option);
        break;
      case 'DisplayTouchHotspot':
        renderTouchHotspot(el, option);
        break;
      case 'DisplayTimeline':
        renderTimeline(el, option);
        break;
      case 'DisplayPersonCard':
        renderPersonCard(el, option);
        break;
      case 'DisplayHonorWall':
        renderHonorWall(el, option);
        break;
      case 'DisplayImageWaterfall':
        renderImageWaterfall(el, option);
        break;
      default:
        // 通用渲染：尝试显示文本或图片
        renderGeneric(el, option);
    }

    // 应用样式
    if (comp.styles) {
      var s = comp.styles;
      var filters = [];
      if (s.filterShow) {
        if (s.opacity !== undefined) el.style.opacity = s.opacity;
        if (s.saturate !== undefined) filters.push('saturate(' + s.saturate + ')');
        if (s.contrast !== undefined) filters.push('contrast(' + s.contrast + ')');
        if (s.brightness !== undefined) filters.push('brightness(' + s.brightness + ')');
        if (s.hueRotate !== undefined) filters.push('hue-rotate(' + s.hueRotate + 'deg)');
      }
      if (filters.length) el.style.filter = filters.join(' ');
      if (s.rotateZ) el.style.transform = (el.style.transform || '') + ' rotateZ(' + s.rotateZ + 'deg)';
      if (s.blendMode && s.blendMode !== 'normal') el.style.mixBlendMode = s.blendMode;
    }

    if (comp.status) {
      if (comp.status.hide) el.style.display = 'none';
      if (comp.status.lock) el.style.pointerEvents = 'none';
    }

    canvasEl.appendChild(el);
  }

  // ===== 组件渲染函数 =====
  function renderCarousel(el, opt) {
    var images = opt.dataset || [];
    var idx = 0;
    var interval = opt.interval || 5000;
    var fit = opt.fit || 'contain';
    var radius = (opt.borderRadius || 0) + 'px';
    el.style.borderRadius = radius;
    el.style.overflow = 'hidden';

    var img = document.createElement('img');
    img.style.cssText = 'width:100%;height:100%;object-fit:' + fit + ';';
    if (images.length > 0) img.src = images[0];
    el.appendChild(img);

    if (opt.autoplay && images.length > 1) {
      setInterval(function() {
        idx = (idx + 1) % images.length;
        img.style.opacity = '0';
        setTimeout(function() {
          img.src = images[idx];
          img.style.opacity = '1';
        }, opt.effect === 'fade' ? 300 : 0);
        img.style.transition = 'opacity 0.3s';
      }, interval);
    }
    img.onerror = function() { img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"><rect width="200" height="150" fill="%23eee"/><text x="100" y="75" text-anchor="middle" fill="%23999">No Image</text></svg>'; };
  }

  function renderVideo(el, opt) {
    var video = document.createElement('video');
    video.src = opt.dataset || '';
    video.style.cssText = 'width:100%;height:100%;object-fit:' + (opt.fit || 'contain') + ';';
    if (opt.poster) video.poster = opt.poster;
    video.autoplay = opt.autoplay !== false;
    video.loop = opt.loop !== false;
    video.muted = opt.muted !== false;
    video.controls = opt.controls === true;
    video.playsInline = true;
    video.setAttribute('crossOrigin', 'anonymous');
    el.style.borderRadius = (opt.borderRadius || 0) + 'px';
    el.style.overflow = 'hidden';
    el.style.background = '#000';
    el.appendChild(video);
  }

  function renderCountdown(el, opt) {
    el.className += ' sb-countdown';
    var targetDate = new Date(opt.targetDate || Date.now()).getTime();
    var fontSize = opt.fontSize || 48;
    var color = opt.color || '#ff4444';
    var bgColor = opt.bgColor || 'rgba(0,0,0,0.3)';
    var radius = (opt.borderRadius || 8) + 'px';
    var sep = opt.separator || ':';

    function update() {
      var diff = targetDate - Date.now();
      if (diff <= 0) { el.innerHTML = '<span style="font-size:0.6em;opacity:0.7">已结束</span>'; return; }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var pad = function(n) { return n.toString().padStart(2, '0'); };
      var html = '';
      if (opt.showDays) html += '<span class="sb-countdown-block" style="background:' + bgColor + ';border-radius:' + radius + ';font-size:' + fontSize + 'px;color:' + color + '">' + pad(d) + '<small style="font-size:0.4em;margin-left:2px">天</small></span>';
      if (opt.showDays && opt.showHours) html += '<span class="sb-countdown-sep" style="font-size:' + fontSize + 'px;color:' + color + '">' + sep + '</span>';
      if (opt.showHours) html += '<span class="sb-countdown-block" style="background:' + bgColor + ';border-radius:' + radius + ';font-size:' + fontSize + 'px;color:' + color + '">' + pad(h) + '<small style="font-size:0.4em;margin-left:2px">时</small></span>';
      if (opt.showHours && opt.showMinutes) html += '<span class="sb-countdown-sep" style="font-size:' + fontSize + 'px;color:' + color + '">' + sep + '</span>';
      if (opt.showMinutes) html += '<span class="sb-countdown-block" style="background:' + bgColor + ';border-radius:' + radius + ';font-size:' + fontSize + 'px;color:' + color + '">' + pad(m) + '<small style="font-size:0.4em;margin-left:2px">分</small></span>';
      if (opt.showMinutes && opt.showSeconds) html += '<span class="sb-countdown-sep" style="font-size:' + fontSize + 'px;color:' + color + '">' + sep + '</span>';
      if (opt.showSeconds) html += '<span class="sb-countdown-block" style="background:' + bgColor + ';border-radius:' + radius + ';font-size:' + fontSize + 'px;color:' + color + '">' + pad(s) + '<small style="font-size:0.4em;margin-left:2px">秒</small></span>';
      el.innerHTML = html;
    }
    update();
    setInterval(update, 1000);
  }

  function renderScrollNotice(el, opt) {
    el.className += ' sb-scroll-notice';
    el.style.background = opt.bgColor || 'rgba(255,255,255,0.9)';
    el.style.fontSize = (opt.fontSize || 16) + 'px';
    el.style.color = opt.color || '#333';
    var notices = opt.dataset || [];
    var icon = opt.icon || '';
    var gap = opt.gap || 40;
    var speed = opt.speed || 30;
    var html = icon ? '<span style="flex-shrink:0;margin:0 8px">' + icon + '</span>' : '';
    html += '<div class="sb-scroll-inner" style="animation-duration:' + Math.max(notices.join('').length / speed * 2, 5) + 's">';
    var doubled = notices.concat(notices);
    doubled.forEach(function(t) {
      html += '<span style="margin-right:' + gap + 'px;white-space:nowrap">' + escapeHtml(t) + '</span>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderDateTime(el, opt) {
    el.style.fontSize = (opt.fontSize || 36) + 'px';
    el.style.color = opt.color || '#333';
    el.style.fontWeight = opt.fontWeight || 'bold';
    el.style.textAlign = opt.textAlign || 'center';
    el.style.background = opt.bgColor || 'transparent';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    var fmt = opt.format || 'YYYY-MM-DD HH:mm:ss';
    var weekNames = ['日','一','二','三','四','五','六'];

    function update() {
      var d = new Date();
      var result = fmt
        .replace('YYYY', d.getFullYear())
        .replace('MM', String(d.getMonth()+1).padStart(2,'0'))
        .replace('DD', String(d.getDate()).padStart(2,'0'))
        .replace('HH', String(d.getHours()).padStart(2,'0'))
        .replace('mm', String(d.getMinutes()).padStart(2,'0'))
        .replace('ss', String(d.getSeconds()).padStart(2,'0'));
      var html = '<div style="font-variant-numeric:tabular-nums;line-height:1.2">' + result + '</div>';
      if (opt.showWeekday) html += '<div style="font-size:0.5em;opacity:0.7;margin-top:4px">星期' + weekNames[d.getDay()] + '</div>';
      el.innerHTML = html;
    }
    update();
    setInterval(update, 1000);
  }

  function renderButton(el, opt) {
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    var btn = document.createElement('button');
    btn.className = 'sb-btn';
    btn.textContent = opt.text || '按钮';
    btn.style.cssText = [
      'font-size:' + (opt.fontSize || 16) + 'px',
      'color:' + (opt.color || '#fff'),
      'background:' + (opt.bgColor || '#1890ff'),
      'border-radius:' + (opt.borderRadius || 8) + 'px',
      'padding:' + (opt.padding || '8px 24px')
    ].join(';');
    btn.onclick = function() {
      var type = opt.actionType || 'url';
      var target = opt.actionTarget || '';
      if (type === 'url' && target) window.open(target, '_blank');
      if (type === 'popup') window.dispatchEvent(new CustomEvent('showbuilder:popup', {detail:{popupId:target}}));
      if (type === 'page') window.dispatchEvent(new CustomEvent('showbuilder:switchPage', {detail:{pageId:target}}));
    };
    el.appendChild(btn);
  }

  function renderPopup(el, opt, compId) {
    if (opt.triggerType === 'button') {
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      var btn = document.createElement('button');
      btn.className = 'sb-btn';
      btn.textContent = opt.triggerText || '打开弹窗';
      btn.style.cssText = 'padding:8px 20px;background:#1890ff;color:#fff;border-radius:4px;';
      btn.onclick = function() { showPopup(); };
      el.appendChild(btn);
    }
    window.addEventListener('showbuilder:popup', function(e) {
      if (e.detail && e.detail.popupId === compId) showPopup();
    });

    function showPopup() {
      var overlay = document.createElement('div');
      overlay.className = 'sb-popup-overlay';
      overlay.innerHTML = '<div class="sb-popup-content" style="width:' + (opt.width || 500) + 'px;max-height:' + (opt.height || 300) + 'px;background:' + (opt.bgColor || '#fff') + ';border-radius:' + (opt.borderRadius || 8) + 'px">'
        + '<div class="sb-popup-header"><span style="font-weight:bold;font-size:16px">' + escapeHtml(opt.title || '') + '</span>'
        + (opt.showCloseBtn ? '<button class="sb-popup-close">&times;</button>' : '')
        + '</div><div class="sb-popup-body">' + (opt.content || '') + '</div></div>';
      document.body.appendChild(overlay);
      if (opt.maskClosable) overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
      overlay.querySelector('.sb-popup-close') && (overlay.querySelector('.sb-popup-close').onclick = function() { overlay.remove(); });
    }
  }

  function renderPageSwitcher(el, opt) {
    var tabs = opt.tabs || [];
    var active = opt.activeTab || (tabs[0] && tabs[0].key);
    var pos = opt.tabPosition || 'top';
    var fontSize = opt.fontSize || 14;
    var color = opt.color || '#333';
    var activeColor = opt.activeColor || '#1890ff';
    var bgColor = opt.bgColor || '#fff';
    var anim = opt.animation || 'fade';

    el.style.display = 'flex';
    el.style.flexDirection = (pos === 'left' || pos === 'right') ? 'row' : 'column';
    el.style.background = bgColor;

    var bar = document.createElement('div');
    bar.className = 'sb-tab-bar';
    bar.style.cssText = 'flex-shrink:0;' + (pos === 'top' ? 'border-bottom:1px solid #eee' : pos === 'left' ? 'flex-direction:column;border-right:1px solid #eee' : 'flex-direction:column;border-left:1px solid #eee');
    tabs.forEach(function(t) {
      var item = document.createElement('div');
      item.className = 'sb-tab-item';
      item.textContent = t.label;
      item.style.cssText = 'font-size:' + fontSize + 'px;color:' + (t.key === active ? activeColor : color) + ';';
      if (t.key === active && pos === 'top') item.style.borderBottom = '2px solid ' + activeColor;
      item.onclick = function() { switchTab(t.key); };
      bar.appendChild(item);
    });
    el.appendChild(bar);

    var content = document.createElement('div');
    content.style.cssText = 'flex:1;position:relative;overflow:hidden;';
    tabs.forEach(function(t) {
      var panel = document.createElement('div');
      panel.className = 'sb-tab-panel' + (t.key === active ? ' active' : '');
      panel.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;animation:' + (anim === 'fade' ? 'sb-fadeIn' : 'sb-slideIn') + ' 0.3s ease';
      panel.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999">' + escapeHtml(t.label) + ' 内容区域</div>';
      content.appendChild(panel);
    });
    el.appendChild(content);

    function switchTab(key) {
      active = key;
      var items = bar.querySelectorAll('.sb-tab-item');
      items.forEach(function(item, i) {
        item.style.color = tabs[i].key === key ? activeColor : color;
        if (pos === 'top') item.style.borderBottom = tabs[i].key === key ? '2px solid ' + activeColor : 'none';
      });
      var panels = content.querySelectorAll('.sb-tab-panel');
      panels.forEach(function(p, i) {
        p.classList.toggle('active', tabs[i].key === key);
      });
      window.dispatchEvent(new CustomEvent('showbuilder:switchPage', {detail:{pageId:key}}));
    }

    window.addEventListener('showbuilder:switchPage', function(e) {
      if (e.detail && tabs.find(function(t) { return t.key === e.detail.pageId; })) {
        switchTab(e.detail.pageId);
      }
    });
  }

  function renderTouchHotspot(el, opt) {
    el.className += ' sb-hotspot';
    el.style.borderRadius = (opt.borderRadius || 4) + 'px';
    if (opt.showBorder) {
      el.style.border = '2px ' + (opt.borderStyle || 'dashed') + ' ' + (opt.borderColor || 'rgba(24,144,255,0.6)');
    }
    el.onmouseenter = function() { el.style.background = opt.highlightColor || 'rgba(24,144,255,0.3)'; };
    el.onmouseleave = function() { el.style.background = 'transparent'; };
    el.onclick = function() {
      var type = opt.actionType || 'url';
      var target = opt.actionTarget || '';
      if (type === 'url' && target) window.open(target, '_blank');
      if (type === 'popup') window.dispatchEvent(new CustomEvent('showbuilder:popup', {detail:{popupId:target}}));
      if (type === 'page') window.dispatchEvent(new CustomEvent('showbuilder:switchPage', {detail:{pageId:target}}));
    };
  }

  function renderTimeline(el, opt) {
    el.className += ' sb-timeline';
    el.style.overflowY = 'auto';
    var items = opt.items || [];
    var dir = opt.direction || 'vertical';
    var html = '';
    items.forEach(function(item, i) {
      var isLast = i === items.length - 1;
      html += '<div class="sb-timeline-item" style="' + (dir === 'horizontal' ? 'flex:1;min-width:120px;text-align:center;padding-top:24px;padding-left:0' : '') + (isLast ? '' : '') + '">';
      html += '<div class="sb-timeline-dot" style="background:' + (opt.dotColor || '#1890ff') + ';' + (dir === 'horizontal' ? 'left:50%;transform:translateX(-50%)' : '') + '"></div>';
      if (!isLast) html += '<div class="sb-timeline-line" style="background:' + (opt.lineColor || '#e8e8e8') + ';' + (dir === 'horizontal' ? 'top:4px;left:0;right:0;height:2px;width:auto' : '') + '"></div>';
      html += '<div style="' + (dir === 'horizontal' ? '' : '') + '">';
      html += '<div style="color:' + (opt.dateColor || '#999') + ';font-size:' + (opt.fontSize - 2 || 12) + 'px;margin-bottom:2px">' + escapeHtml(item.date) + '</div>';
      html += '<div style="color:' + (opt.titleColor || '#333') + ';font-weight:bold;font-size:' + (opt.fontSize || 14) + 'px;margin-bottom:2px">' + escapeHtml(item.title) + '</div>';
      html += '<div style="color:' + (opt.descColor || '#666') + ';font-size:' + (opt.fontSize - 2 || 12) + 'px">' + escapeHtml(item.desc) + '</div>';
      html += '</div></div>';
    });
    el.innerHTML = html;
    if (dir === 'horizontal') el.style.display = 'flex';
  }

  function renderPersonCard(el, opt) {
    el.className += ' sb-person-card';
    el.style.background = opt.bgColor || '#fff';
    el.style.borderRadius = (opt.borderRadius || 8) + 'px';
    var layout = opt.layout || 'horizontal';
    if (layout === 'vertical') { el.style.flexDirection = 'column'; el.style.alignItems = 'center'; el.style.textAlign = 'center'; }
    var size = opt.avatarSize || 80;
    var html = '<div><img src="' + (opt.avatar || '') + '" style="width:' + size + 'px;height:' + size + 'px;border-radius:50%;object-fit:cover" onerror="this.style.display=\\'none\\'"></div>';
    html += '<div style="flex:1">';
    html += '<div style="font-weight:bold;font-size:18px;color:' + (opt.nameColor || '#333') + ';margin-bottom:4px">' + escapeHtml(opt.name || '') + '</div>';
    html += '<div style="font-size:14px;color:' + (opt.titleColor || '#1890ff') + ';margin-bottom:2px">' + escapeHtml(opt.title || '') + '</div>';
    if (opt.department) html += '<div style="font-size:12px;color:#999;margin-bottom:4px">' + escapeHtml(opt.department) + '</div>';
    html += '<div style="font-size:13px;color:' + (opt.introColor || '#666') + ';line-height:1.5">' + escapeHtml(opt.intro || '') + '</div>';
    html += '</div>';
    el.innerHTML = html;
  }

  function renderHonorWall(el, opt) {
    el.style.overflowY = 'auto';
    var items = opt.items || [];
    var cols = opt.columns || 4;
    var gap = opt.gap || 16;
    var html = '<div class="sb-honor-grid" style="grid-template-columns:repeat(' + cols + ',1fr);gap:' + gap + 'px">';
    items.forEach(function(item) {
      html += '<div class="sb-honor-card" style="background:' + (opt.cardBgColor || '#fff') + ';border-radius:' + (opt.borderRadius || 8) + 'px">';
      html += '<div style="height:' + (opt.imageHeight || 120) + 'px;display:flex;align-items:center;justify-content:center;margin-bottom:8px">';
      if (item.image) html += '<img src="' + item.image + '" style="max-width:100%;max-height:100%;object-fit:contain" onerror="this.style.display=\\'none\\'">';
      else html += '<span style="font-size:48px">🏆</span>';
      html += '</div>';
      html += '<div style="font-size:14px;font-weight:bold;color:' + (opt.titleColor || '#333') + ';margin-bottom:4px">' + escapeHtml(item.title) + '</div>';
      html += '<div style="font-size:12px;color:' + (opt.descColor || '#999') + '">' + escapeHtml(item.desc) + '</div>';
      html += '</div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderImageWaterfall(el, opt) {
    el.style.overflowY = opt.autoScroll ? 'auto' : 'hidden';
    var images = opt.dataset || [];
    var cols = opt.columns || 3;
    var gap = opt.gap || 8;
    var radius = (opt.borderRadius || 8) + 'px';
    var html = '<div class="sb-waterfall" style="column-count:' + cols + ';column-gap:' + gap + 'px">';
    images.forEach(function(url) {
      html += '<div class="sb-waterfall-item" style="border-radius:' + radius + '"><img src="' + url + '" style="border-radius:' + radius + ';' + (opt.hoverScale ? 'transition:transform 0.3s' : '') + '" onerror="this.src=\\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22><rect width=%22200%22 height=%22150%22 fill=%22%23eee%22/><text x=%22100%22 y=%2275%22 text-anchor=%22middle%22 fill=%22%23999%22>No Image</text></svg>\\'" onmouseenter="this.style.transform=\\'scale(1.05)\\'" onmouseleave="this.style.transform=\\'scale(1)\\'"></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  function renderGeneric(el, opt) {
    // 尝试渲染通用内容
    if (opt.dataset) {
      if (typeof opt.dataset === 'string' && (opt.dataset.startsWith('http') || opt.dataset.startsWith('data:'))) {
        var img = document.createElement('img');
        img.src = opt.dataset;
        img.style.cssText = 'width:100%;height:100%;object-fit:contain;';
        el.appendChild(img);
      } else if (Array.isArray(opt.dataset) && opt.dataset.length > 0) {
        el.textContent = opt.dataset[0];
      }
    }
  }

  // 渲染所有组件
  config.forEach(function(comp) {
    try { renderComponent(comp); } catch(e) { console.error('Render error:', comp.key, e); }
  });

  // 监听全局事件
  window.addEventListener('showbuilder:popup', function() { /* handled by popup components */ });
  window.addEventListener('showbuilder:switchPage', function() { /* handled by page switcher */ });

  console.log('ShowBuilder | 页面已就绪 | 组件数: ' + config.length);
})();
`
}

/**
 * HTML 转义
 */
function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 简单的HTML压缩
 */
function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
}

/**
 * 图片转 base64
 */
export async function imageToBase64(url: string): Promise<string> {
  try {
    if (url.startsWith('data:')) return url
    const response = await fetch(url)
    const blob = await response.blob()
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return url
  }
}

/**
 * 生成 ZIP 压缩包并触发下载
 */
export async function downloadExportZip(
  config: ExportConfig,
  options: ExportOptions = {}
): Promise<void> {
  // 动态导入 JSZip
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()

  const html = generateExportHTML(config, options)
  zip.file('index.html', html)

  // 生成说明文件
  const readme = `# ShowBuilder 导出包
- 项目名称: ${config.projectName}
- 画布尺寸: ${config.width} x ${config.height}
- 组件数量: ${config.componentList.length}
- 导出时间: ${new Date().toLocaleString('zh-CN')}
- 使用说明: 直接用浏览器打开 index.html 即可查看
`
  zip.file('README.txt', readme)

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${config.projectName || 'showbuilder'}-export.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ===== 运行时库内联 =====

// Vue 3 运行时（精简版 CDN 引用）
const VUE_RUNTIME = `
// Vue 3 Runtime (CDN fallback)
if (typeof Vue === 'undefined') {
  document.write('<script src="https://unpkg.com/vue@3.2.31/dist/vue.global.prod.js"><\\/script>');
}
`

// ECharts 运行时（CDN 引用）
const ECHARTS_RUNTIME = `
// ECharts Runtime (CDN fallback)
if (typeof echarts === 'undefined') {
  document.write('<script src="https://cdn.jsdelivr.net/npm/echarts@5.3.2/dist/echarts.min.js"><\\/script>');
}
`