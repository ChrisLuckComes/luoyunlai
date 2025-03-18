import { classMap } from '@/constants/constant';

import { LazyImage } from '@/component/image';
import { ArticleAnchor } from '@/component/Anchor';
import { UseMarkDown } from '@/hooks/useMarkdown';
import {
  SERVER,
  VUE,
  ROUTER,
  DATA_REQUEST,
  DATA_PREFETCH,
  COMPONENT_INSTANCE_AND_DATA_INJECTION,
  GENERATE_HTML,
  STATE_SERIALIZATION,
  SEND_HTML,
  STATE_RECOVERY,
  HYDRATION,
  ASYNC_DATA
} from './_ssr';

export default function Architecture() {
  const server = <UseMarkDown markdown={SERVER}></UseMarkDown>,
    vue = <UseMarkDown markdown={VUE}></UseMarkDown>,
    router = <UseMarkDown markdown={ROUTER}></UseMarkDown>,
    dataRequest = <UseMarkDown markdown={DATA_REQUEST}></UseMarkDown>,
    dataPrefetch = <UseMarkDown markdown={DATA_PREFETCH}></UseMarkDown>,
    componentInstanceAndDataInjection = <UseMarkDown markdown={COMPONENT_INSTANCE_AND_DATA_INJECTION}></UseMarkDown>,
    generateHtml = <UseMarkDown markdown={GENERATE_HTML}></UseMarkDown>,
    stateSerialization = <UseMarkDown markdown={STATE_SERIALIZATION}></UseMarkDown>,
    sendHtml = <UseMarkDown markdown={SEND_HTML}></UseMarkDown>,
    stateRecovery = <UseMarkDown markdown={STATE_RECOVERY}></UseMarkDown>,
    hydration = <UseMarkDown markdown={HYDRATION}></UseMarkDown>,
    asyncData = <UseMarkDown markdown={ASYNC_DATA}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="preset" className="font-semibold text-h2 mb-2">
          前置知识
        </h2>
        <strong>客户端渲染(CSR)与服务端渲染(SSR): </strong>
        <ul className={classMap.ul}>
          <li>
            <span>
              <strong>客户端渲染(CSR)：</strong>
              传统单页面应用(SPA)常采用此模式。浏览器先加载空白HTML页面，再下载js文件。js代码在浏览器执行，动态创建和填充DOM元素。缺点是首屏加载时间长，不利于SEO
            </span>
          </li>
          <li>
            <span>
              <strong>服务端渲染(SSR)：</strong>
              服务器端直接生成完整HTML页面并发送给客户端，客户端接收后将其激活为可交互应用。优点是首屏加载速度快，有利于SEO。
            </span>
          </li>
        </ul>
        <h2 id="ssr" className="font-semibold text-h2 mb-2">
          服务器端渲染过程
        </h2>
        <ul className={classMap.ul}>
          <li id="environmentSetup">
            <strong>环境搭建：</strong>
            <ul className={classMap.subUl}>
              <li>
                <span>
                  <strong>选择服务器框架：</strong>
                  常用Express、Koa等，以express为例创建服务：{server}
                </span>
              </li>
              <li>
                <span>
                  <strong>
                    引入Vue3和<code>@vue/server-renderer</code>：
                  </strong>
                  {vue}
                </span>
              </li>
            </ul>
          </li>
          <li id="routeMatching">
            <strong>路由匹配</strong>
            <br />
            服务器接收客户端HTTP请求，获取请求URL，使用<code>vue-router</code>匹配路由。
            {router}
          </li>
          <li id="dataRequest">
            <strong>数据预取</strong>
            <br />
            在Vue3中，数据预获取可以使用组件的<code>setup</code>函数中的异步操作。
            {dataRequest}
            在服务器端，可以在组件实例化前手动调用数据预获取逻辑
            {dataPrefetch}
          </li>
          <li id="componentInstanceAndDataInjection">
            <strong>组件实例化和数据注入</strong>
            <br />
            服务器端创建组件实例，并注入数据。
            {componentInstanceAndDataInjection}
          </li>
          <li id="generateHtml">
            <strong>生成HTML</strong>
            <br />
            将组件实例和数据序列化到HTML中。
            {generateHtml}
          </li>
          <li id="stateSerialization">
            <strong>状态序列化拼接HTML</strong>
            <br />
            将序列化后的状态和HTML拼接成完整的HTML页面。
            {stateSerialization}
          </li>
          <li id="sendHtml">
            <strong>发送HTML到客户端</strong>
            <br />
            将完整的HTML页面发送给客户端。
            {sendHtml}
          </li>
        </ul>
        <h2 id="clientActivation" className="font-semibold text-h2 mb-2">
          客户端激活过程
        </h2>
        <ul className={classMap.ul}>
          <li id="receiveHtml">
            <strong>接收HTML</strong>
            <br />
            客户端接收服务器发送的完整HTML页面，浏览器解析HTML并构建DOM树，此时页面显示静态HTML内容。
          </li>
          <li id="stateRecovery">
            <strong>状态恢复</strong>
            {stateRecovery}
          </li>
          <li id="hydration">
            <strong>Hydration(激活)过程</strong>
            {hydration}在<code>hydration</code>
            过程中，Vue会对比服务端渲染的HTML和客户端重新生成的虚拟DOM。对于相同部分，复用服务器端渲染的DOM节点，有差异的部分进行更新。
            同时，重新绑定事件处理函数到对应DOM元素上，当Hydration完成后，触发客户端的生命周期钩子。
          </li>
        </ul>
        <h2 id="performanceOptimization" className="font-semibold text-h2 mb-2">
          性能优化
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>缓存策略：</strong>对服务器端渲染结果进行缓存，减少重复渲染开销。
          </li>
          <li>
            <strong>代码分割：</strong>将客户端代码分割，只加载当前页面需要的代码，减少初始加载时间。
          </li>
          <li>
            <strong>图片优化：</strong>对页面图片进行压缩优化，减少加载时间
          </li>
        </ul>
        <h2 id="nuxt" className="font-semibold text-h2 mb-2">
          Nuxt.js
        </h2>
        业内通常直接使用Nuxt.js框架，它简化了Vue
        SSR的开发流程，提供了自动路由、数据预取、代码分割等功能，无需再手动实现。和CSR一样配置路由，正常开发即可。
        <h3 id="asyncData" className={classMap.articleSubTitle}>
          数据预取
        </h3>
        Nuxt.js 3提供了多种方式，可以使用<code>useAsyncData</code>、<code>useFetch</code>等。以下是使用
        <code>useFetch</code>的示例，它更简洁。
        {asyncData}
        Nuxt.js实现原理跟前文提到的一样，在组件实例化之前调用setup函数。
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        ssr的渲染过程是服务器端和客户端协同工作的过程，服务器端负责请求梳理、数据预取、组件渲染和状态序列化；客户端负责接收HTML、恢复状态和激活组件，使页面具备交互能力。
        当然实战过程中我们可以直接使用Nuxt.js框架，它让开发变得更加简单高效，开发只需要专注业务逻辑
      </main>
      <ArticleAnchor
        items={[
          {
            title: '前置知识',
            key: 'preset',
            href: '#preset',
            children: []
          },
          {
            title: '服务器端渲染过程',
            key: 'ssr',
            href: '#ssr',
            children: [
              {
                title: '环境搭建',
                key: 'environmentSetup',
                href: '#environmentSetup',
                children: []
              },
              {
                title: '路由匹配',
                key: 'routeMatching',
                href: '#routeMatching',
                children: []
              },
              {
                title: '数据预取',
                key: 'dataRequest',
                href: '#dataRequest',
                children: []
              },
              {
                title: '组件实例化和数据注入',
                key: 'componentInstanceAndDataInjection',
                href: '#componentInstanceAndDataInjection',
                children: []
              },
              {
                title: '生成HTML',
                key: 'generateHtml',
                href: '#generateHtml',
                children: []
              },
              {
                title: '状态序列化拼接HTML',
                key: 'stateSerialization',
                href: '#stateSerialization',
                children: []
              },
              {
                title: '发送HTML到客户端',
                key: 'sendHtml',
                href: '#sendHtml',
                children: []
              }
            ]
          },
          {
            title: '客户端激活过程',
            key: 'clientActivation',
            href: '#clientActivation',
            children: [
              {
                title: '接收HTML',
                key: 'receiveHtml',
                href: '#receiveHtml',
                children: []
              },
              {
                title: '状态恢复',
                key: 'stateRecovery',
                href: '#stateRecovery',
                children: []
              },
              {
                title: 'Hydration(激活)过程',
                key: 'hydration',
                href: '#hydration',
                children: []
              }
            ]
          },
          {
            title: '性能优化',
            key: 'performanceOptimization',
            href: '#performanceOptimization',
            children: []
          },
          {
            title: 'Nuxt.js',
            key: 'nuxt',
            href: '#nuxt',
            children: [
              {
                title: '数据预取',
                key: 'dataPrefetch',
                href: '#dataPrefetch',
                children: []
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
