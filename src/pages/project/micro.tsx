import { classMap } from '@/constants/constant';

import DEVELOPMENT from '@images/knowledge/development.png';
import { LazyImage } from '@/component/image';
import { ArticleAnchor } from '@/component/Anchor';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { SINGLE_SPA, QIANKUN } from './_micro';

export default function Index() {
  const singleSpa = <UseMarkDown markdown={SINGLE_SPA} />;
  const qiankun = <UseMarkDown markdown={QIANKUN} />;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          微前端
        </h2>
        <p>
          微前端是一种将前端应用拆分成多个小型、自治的前端应用，并将它们组合成一个整体应用的架构模式。它借鉴了后端微服务架构的思想，旨在解决大型前端项目在开发、部署、维护等方面的复杂性问题，
          使得不同的团队可以独立开发、测试、部署各自负责的前端模块。
        </p>
        <br />
        <h2 id="plan" className="font-semibold text-h2 mb-2">
          常见方案
        </h2>
        <h3 id="iframe" className={classMap.articleSubTitle}>
          iframe方案
        </h3>
        使用<code>iframe</code>标签将子应用嵌入到主应用中
        <ul className={classMap.ul}>
          <li>
            <strong>优点</strong>
            <br />
            <ul className={classMap.subUl}>
              <li>
                <strong>隔离性强：</strong>每个微前端应用在独立的<code>iframe</code>
                中运行，天然具备良好的隔离性，不会影响主应用和其他子应用。
              </li>
              <li>
                <strong>技术栈无关：</strong>子应用可以采用不同的技术栈，如React、Vue等，无兼容性问题。
              </li>
            </ul>
          </li>
          <li>
            <strong>缺点</strong>
            <br />
            <ul className={classMap.subUl}>
              <li>
                <strong>通信复杂：</strong>主应用和子应用通信需要通过<code>postMessage</code>，通信机制相对复杂。
              </li>
              <li>
                <strong>性能问题：</strong>
                子应用的加载会带来一定的性能开销，特别是在嵌套多个<code>iframe</code>时。
              </li>
              <li>
                <strong>样式问题：</strong>
                每个<code>iframe</code>都有独立的样式，可能会导致和主应用样式不一致，需要进行额外处理。
              </li>
            </ul>
          </li>
        </ul>
        <ul className={classMap.ul}>
          <strong>实现原理：</strong>
          <li>
            <strong>
              嵌入<code>iframe</code>：
            </strong>
            在主应用的HTML中使用<code>iframe</code>标签，指定<code>src</code>为子应用的URL。
          </li>
          <li>
            <strong>通信机制：</strong>
            主应用和子应用之间使用<code>window.postMessage</code>进行通信。主应用向子应用发送消息，子应用可以监听
            <code>message</code>事件来接收消息。
          </li>
        </ul>
        <h3 id="framework" className={classMap.articleSubTitle}>
          微前端框架方案
        </h3>
        使用微前端框架（如qiankun、wujie、microApp、single-spa等）来管理微前端应用。这些框架提供了统一的生命周期管理、通信机制、状态管理等，
        使得微前端应用可以更加灵活地进行开发、部署和维护。
        <ul className={classMap.ul}>
          <li>
            <strong>优点</strong>
            <br />
            <ul className={classMap.subUl}>
              <li>
                <strong>标准化管理：</strong>框架提供了统一的规范和接口，使得微前端的管理更加标准化和规范化。
              </li>
              <li>
                <strong>易于集成：</strong>可以方便的集成不同技术栈的微前端应用，减少开发成本。
              </li>
              <li>
                <strong>社区支持：</strong>热门框架有活跃的社区支持，能够及时获取最新的技术方案。
              </li>
            </ul>
          </li>
          <li>
            <strong>缺点</strong>
            <br />
            <ul className={classMap.subUl}>
              <li>
                <strong>学习成本：</strong>需要学习框架的使用方法和理念，增加了开发人员的学习成本。
              </li>
              <li>
                <strong>框架约束：</strong>可能受框架限制，导致部分需求无法实现。
              </li>
            </ul>
          </li>
        </ul>
        <ul className={classMap.ul}>
          <strong>实现原理：</strong>
          <li>
            <strong>应用注册：</strong>
            在主应用中注册子应用，并指定子应用的入口文件、路由、生命周期、主要函数等。
          </li>
          <li>
            <strong>路由匹配：</strong>
            框架根据当前的URL进行路由匹配，当匹配到某个子应用的路由规则时，会调用该应用的加载函数，动态加载代码。
          </li>
          <li>
            <strong>生命周期管理：</strong>
            框架会根据应用的状态（如加载、挂载、卸载等）调用相应的生命周期函数，确保应用的正确运行。
          </li>
        </ul>
        <h2 id="topFramework" className="font-semibold text-h2 mb-2">
          主流框架
        </h2>
        <h3 id="single-spa" className={classMap.articleSubTitle}>
          single-spa
        </h3>
        <p>
          single-spa 是一个用于构建微前端架构的 JavaScript 库。它允许开发者将多个独立的前端应用组合成一个整体应用，
          允许不同的团队使用不同的技术栈独立开发和部署。
        </p>
        <br />
        开发者需要注册每个微前端应用，需要指定应用名称、加载函数。singleSpa会根据当前的URL进行路由匹配，当匹配到某个子应用的
        <code>activeWhen</code>规则时，会调用该应用的加载函数，动态加载代码；当应用需要卸载时，调用卸载函数
        {singleSpa}
        <h3 id="qiankun" className={classMap.articleSubTitle}>
          qiankun
        </h3>
        <p>
          qiankun是蚂蚁开源出品，基于single-spa进行了二次封装和拓展的微前端框架，提供了更简单易用的API和更丰富的功能。
        </p>
        <br />
        qiankun采用主应用+子应用的架构模式，主应用通过<code>registerMicroApps</code>
        注册子应用，并指定子应用的入口文件、路由、生命周期、主要函数等。
        <br />
        qiankun提供了沙箱机制，确保子应用之间的隔离性，主应用和子应用之间可以通过<code>initGlobalState</code>
        实现状态的共享和通信。
        {qiankun}
        <h3 id="wujie" className={classMap.articleSubTitle}>
          wujie
        </h3>
        wujie是腾讯开源的微前端框架，基于WebComponent+iframe，提供样式隔离（Shadow
        DOM）、JS沙箱（Proxy代理）、高性能加载等能力。
        <br />
        <strong>样式隔离：</strong>当加载子应用时，将子应用的DOM节点包裹在Shadow
        DOM中，确保子应用的样式不会影响到主应用。
        <br />
        <strong>JS沙箱：</strong>
        使用Proxy对window对象进行代理，子应用对window对象的修改不会影响到主应用的全局window对象。
        <h3 id="microApp" className={classMap.articleSubTitle}>
          microApp
        </h3>
        microApp是京东开源的微前端框架，它采用无iframe的架构模式，通过动态创建DOM节点并将子应用的HTML、CSS和JavaScript插入到主应用的指定容器中进行渲染。在渲染过程中，
        microApp会对HTML进行解析和处理，将其中的资源路径进行重写，确保子应用的资源能够正确加载。它的沙箱机制和wujie类似，但除了Shadow
        DOM来实现样式隔离之外，还支持添加唯一的样式前缀。
        <br />
        microApp提供了一套简单易用的通信API，主应用和子应用可以通过<code>microApp.emit</code>方法发送消息，通过
        <code>microApp.on</code>方法接收消息。
      </main>
      <ArticleAnchor
        items={[
          {
            title: '微前端',
            key: 'pre',
            href: '#pre',
            children: []
          },
          {
            title: '常见方案',
            key: 'plan',
            href: '#plan',
            children: [
              {
                title: 'iframe方案',
                key: 'iframe',
                href: '#iframe',
                children: []
              },
              {
                title: '微前端框架方案',
                key: 'framework',
                href: '#framework',
                children: []
              }
            ]
          },
          {
            title: '主流框架',
            key: 'topFramework',
            href: '#topFramework',
            children: [
              {
                title: 'single-spa',
                key: 'single-spa',
                href: '#single-spa',
                children: []
              },
              {
                title: 'qiankun',
                key: 'qiankun',
                href: '#qiankun',
                children: []
              },
              {
                title: 'wujie',
                key: 'wujie',
                href: '#wujie',
                children: []
              },
              {
                title: 'microApp',
                key: 'microApp',
                href: '#microApp',
                children: []
              }
            ]
          }
        ]}
      />
    </article>
  );
}
