import { classMap } from '@/constants/constant';

import { ArticleAnchor } from '@/component/Anchor';

export default function Architecture() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="coreIndicators" className="font-semibold text-h2 mb-2">
          核心指标和优化方向
        </h2>
        <h3 id="loadingSpeedIndicators" className="font-semibold text-h3 mb-2">
          加载速度类指标
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>指标</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>问题发现</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>优化手段</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>FCP（首次内容渲染）</strong>
              </td>
              <td className="border border-gray-300 p-2">加载过慢，用户等待时间长</td>
              <td className="border border-gray-300 p-2">
                - 减少首屏 HTML 体积，避免阻塞渲染
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 内联关键 CSS，使用<code>preload</code>
                预加载资源
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>LCP（最大内容渲染）</strong>
              </td>
              <td className="border border-gray-300 p-2">主内容渲染延迟</td>
              <td className="border border-gray-300 p-2">
                - 懒加载非视口资源
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 优化图片格式（WebP/AVIF）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 使用<code>preconnect</code>加速域名解析
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>TTI（交互时间）</strong>
              </td>
              <td className="border border-gray-300 p-2">主线程阻塞，交互延迟</td>
              <td className="border border-gray-300 p-2">
                - 拆分大型 JavaScript，使用 Web Workers
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 延迟非必要脚本执行（<code>async</code>/
                <code>defer</code>）
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>1s 快开比 / 2s 快开比</strong>
              </td>
              <td className="border border-gray-300 p-2">冷启动性能差（如首屏加载）</td>
              <td className="border border-gray-300 p-2">
                - 缓存策略（Service Worker）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 预加载关键资源（<code>preload</code>/
                <code>prerender</code>）
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>5s 慢开比</strong>
              </td>
              <td className="border border-gray-300 p-2">资源加载或脚本执行超时</td>
              <td className="border border-gray-300 p-2">
                - 优化第三方脚本加载（延迟加载、动态加载）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 压缩 / 分包 JavaScript/CSS
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <h3 id="interactionExperienceIndicators" className="font-semibold text-h3 mb-2">
          交互体验类指标
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>指标</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>问题发现</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>优化手段</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>CLS（累积布局偏移）</strong>
              </td>
              <td className="border border-gray-300 p-2">页面布局不稳定，用户体验差</td>
              <td className="border border-gray-300 p-2">
                - 为图片 / 视频设置<code>width</code>/<code>height</code>属性
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 使用<code>loading=&quot;lazy&quot;</code>
                时预留空间
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>FID（首次输入延迟）</strong>
              </td>
              <td className="border border-gray-300 p-2">首次交互卡顿</td>
              <td className="border border-gray-300 p-2">
                - 减少主线程任务（如防抖节流）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 优化事件处理逻辑（避免同步阻塞）
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>document.ready</strong>
              </td>
              <td className="border border-gray-300 p-2">DOM 解析或脚本执行延迟</td>
              <td className="border border-gray-300 p-2">
                - 避免阻塞 DOM 的脚本（将<code>script</code>标签放在<code>&lt;/body&gt;</code>前）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 使用<code>DOMContentLoaded</code>监听
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>window.onload</strong>
              </td>
              <td className="border border-gray-300 p-2">资源（图片 / 字体）加载延迟</td>
              <td className="border border-gray-300 p-2">
                - 压缩图片 / 字体
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 使用<code>async</code>加载非关键资源
              </td>
            </tr>
          </tbody>
        </table>
        <h3 id="redirectAndNavigationIndicators" className={classMap.articleSubTitle}>
          重定向与导航类指标
        </h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>指标</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>问题发现</strong>
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100">
                <strong>优化手段</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>navigationStart</strong>
              </td>
              <td className="border border-gray-300 p-2">导航总耗时过长</td>
              <td className="border border-gray-300 p-2">
                - 减少不必要的重定向（301/302）
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 合并重定向逻辑
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                <strong>redirectStart/End</strong>
              </td>
              <td className="border border-gray-300 p-2">重定向链过长或耗时</td>
              <td className="border border-gray-300 p-2">
                - 检查服务器配置，缩短重定向链
                <br className="container-utlnW2 wrapper-d0Cc1k undefined" />- 使用 CDN 加速重定向目标资源
              </td>
            </tr>
          </tbody>
        </table>
        <h2 id="optimizationMethods" className={classMap.articleTitle}>
          优化策略
        </h2>
        <h3 id="keyPath" className={classMap.articleSubTitle}>
          关键渲染路径优化
        </h3>
        HTML/CSS解析阻塞渲染
        <ul className={classMap.ul}>
          <li>首屏CSS可以考虑内联</li>
          <li>使用preload加载关键资源（如js、字体等）</li>
          <li>压缩HTML/CSS</li>
        </ul>
        <h3 id="javascript" className={classMap.articleSubTitle}>
          JavaScript性能优化
        </h3>
        js执行阻塞主线程
        <ul className={classMap.ul}>
          <li>拆分代码为异步加载(import())</li>
          <li>使用Web Workers执行密集型计算</li>
          <li>避免同步布局抖动（频繁读写DOM样式等）</li>
          <li>优化性能差的代码</li>
        </ul>
        <h3 id="imageAndResource" className={classMap.articleSubTitle}>
          图片和资源优化
        </h3>
        图片体积大或者加载策略不当
        <ul className={classMap.ul}>
          <li>使用WebP/AVIF格式</li>
          <li>懒加载非视口资源：使用loading=&quot;lazy&quot;</li>
          <li>使用preload预加载资源</li>
        </ul>
        <h3 id="cacheStrategy" className={classMap.articleSubTitle}>
          缓存策略
        </h3>
        重复加载静态资源
        <ul className={classMap.ul}>
          <li>使用HTTP缓存（设置Cache-Control）</li>
          <li>使用离线缓存：Service Worker+Cache API</li>
          <li>使用CDN加速静态资源</li>
        </ul>
        <h3 id="layoutStability" className={classMap.articleSubTitle}>
          布局稳定性
        </h3>
        CLS高，页面布局不稳定，用户体验差
        <ul className={classMap.ul}>
          <li>为动态内容预留空间</li>
          <li>避免通过JavaScript动态插入未预留空间的元素</li>
          <li>固定元素比例，如图片的宽高</li>
        </ul>
        <h2 id="performanceOptimizationTools" className={classMap.articleTitle}>
          监控与工具
        </h2>
        <h3 id="performanceMonitoringTools" className={classMap.articleSubTitle}>
          诊断工具
        </h3>
        <ul className={classMap.ul}>
          <li>Lighthouse：自动化分析，生成建议</li>
          <li>Chrome DevTools：使用Performance、memory等面板进行性能分析</li>
        </ul>
        <h3 id="performanceAnalysisTools" className={classMap.articleSubTitle}>
          监控方案
        </h3>
        <ul className={classMap.ul}>
          <li>使用友盟、Google Analytics等工具监控性能指标进行数据上报和监控</li>
        </ul>
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>核心原则：</strong>减少阻塞、优化资源、提升交互
          </li>
          <li>
            <strong>优先级：</strong>
            <p>1.确保FCP/LCP在2s以内完成</p>
            <p>2.消除CLS，避免布局抖动</p>
            <p>3.优化TTI/FID，提升响应速度</p>
          </li>
          <li>
            <strong>持续迭代：</strong>结合监控数据，定期review代码和资源，动态调整优化策略
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: '核心指标和优化方向',
            key: 'coreIndicators',
            href: '#coreIndicators',
            children: [
              {
                title: '加载速度类指标',
                key: 'loadingSpeedIndicators',
                href: '#loadingSpeedIndicators'
              },
              {
                title: '交互体验类指标',
                key: 'interactionExperienceIndicators',
                href: '#interactionExperienceIndicators'
              },
              {
                title: '重定向与导航类指标',
                key: 'redirectAndNavigationIndicators',
                href: '#redirectAndNavigationIndicators'
              }
            ]
          },
          {
            title: '优化策略',
            key: 'optimizationMethods',
            href: '#optimizationMethods',
            children: [
              {
                title: '关键渲染路径优化',
                key: 'keyPath',
                href: '#keyPath'
              },
              {
                title: 'JavaScript性能优化',
                key: 'javascript',
                href: '#javascript'
              },
              {
                title: '图片和资源优化',
                key: 'imageAndResource',
                href: '#imageAndResource'
              },
              {
                title: '缓存策略',
                key: 'cacheStrategy',
                href: '#cacheStrategy'
              },
              {
                title: '布局稳定性',
                key: 'layoutStability',
                href: '#layoutStability'
              }
            ]
          },
          {
            title: '监控与工具',
            key: 'performanceOptimizationTools',
            href: '#performanceOptimizationTools',
            children: [
              {
                title: '诊断工具',
                key: 'performanceMonitoringTools',
                href: '#performanceMonitoringTools'
              },
              {
                title: '监控方案',
                key: 'performanceAnalysisTools',
                href: '#performanceAnalysisTools'
              }
            ]
          },
          {
            title: '总结',
            key: 'summary',
            href: '#summary',
            children: []
          }
        ]}
      />
    </article>
  );
}
