import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import { KEEP_ALIVE } from './_keepAlive';

export default function Index() {
  const keepAlive = <UseMarkDown markdown={KEEP_ALIVE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="keepAlive" className="font-semibold text-h2 mb-2">
          keep-alive
        </h2>
        <code>keep-alive</code>
        是vue中的一个内置组件，它的主要作用的缓存动态组件，避免这些组件在切换时被频繁销毁和重新创建，从而提高应用性能。
        <h2 id="theory" className={classMap.articleTitle}>
          实现原理
        </h2>
        <code>keep-alive</code>
        组件的核心原理是在组件切换时，不直接销毁组件实例，而是将其缓存起来，当再次需要使用该组件时直接从缓存中取出并挂载。
        <ul className={classMap.ul}>
          <li>
            <strong>
              <code>keep-alive</code>组件的定义
            </strong>
            {keepAlive}
          </li>
          <strong>2.渲染逻辑：</strong>
          <li>
            首先获取默认插槽的第一个<code>vnode</code>
          </li>
          <li>
            检查该<code>vnode</code>是否缓存，如果缓存存在直接使用缓存的<code>vnode</code>，并标记为已缓存
          </li>
          <li>如果缓存中不存在，缓存它</li>
          <li>
            最后设置<code>vnode</code>的<code>keepAliveInstance</code>属性为当前<code>keep-alive</code>实例
          </li>
          <strong>3.组件的激活和失活：</strong>
          <li>
            当一个<code>keep-alive</code>缓存的组件再次被激活时，会触发<code>activated</code>钩子函数，当一个
            <code>keep-alive</code>缓存的组件再次被失活时，会触发<code>deactivated</code>钩子函数。 这两个钩子是
            <code>keep-alive</code>组件特有的，用于处理组件缓存和激活状态的变化。
          </li>
          <br />
        </ul>
        <h2 id="summary" className={classMap.articleTitle}>
          总结
        </h2>
        <code>keep-alive</code>组件通过缓存组件的<code>vnode</code>来避免组件的频繁创建和销毁，利用<code>Map</code>和
        <code>Set</code>数据结构管理缓存，通过<code>include</code>、<code>exclude</code>、<code>max</code>
        属性来控制缓存的范围和数量。 同时提供了<code>activated</code>和<code>deactivated</code>
        钩子函数，用于处理组件的激活和失活状态。这样在频繁切换组件的场景下显著提高了性能。
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'keep-alive',
            key: 'keepAlive',
            href: '#keepAlive'
          },
          {
            title: '实现原理',
            key: 'theory',
            href: '#theory'
          },
          {
            title: '总结',
            key: 'summary',
            href: '#summary'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
