import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import { CODE, SUSPENSE } from './_suspense';

export default function Index() {
  const suspense = <UseMarkDown markdown={CODE}></UseMarkDown>,
    suspenseCode = <UseMarkDown markdown={SUSPENSE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="suspense" className="font-semibold text-h2 mb-2">
          Suspense
        </h2>
        <code>Suspense</code>
        是vue中的一个内置组件，它用于处理异步依赖的加载状态，允许组件再异步操作完成之前显示一个加载状态，一旦异步操作完成，就渲染实际的内容。
        <h2 id="use" className={classMap.articleTitle}>
          使用场景
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>异步组件加载：</strong>当引入异步组件时，组件加载完成之前可以显示加载动画或占位内容，提高用户体验。
          </li>
          <li>
            <strong>数据获取：</strong>在从服务器获取到数据之前，可以显示加载状态，获取成功后再显示数据。
          </li>
        </ul>
        {suspense}
        <ul className={classMap.ul}>
          <li>
            <code>default：</code>默认插槽，用于防止需要异步加载的组件或内容。
          </li>
          <li>
            <code>fallback：</code>后备插槽，在异步操作未完成之前显示的内容，例如加载动画，占位组件等。
          </li>
        </ul>
        <h2 id="code" className={classMap.articleTitle}>
          源码解析
        </h2>
        <code>Suspense</code>组件定义位于<code>packages/runtime-core/src/components/Suspense.ts</code>
        ，以下是简化后的核心代码。
        {suspenseCode}
        代码主要通过<code>watchEffect</code>监听<code>default</code>插槽中的异步组件加载状态，利用
        <code>isResolved</code>标记异步操作的完成情况。 根据这个标记决定渲染<code>fallback</code>还是实际内容。
        <h3 id="watchEffect" className={classMap.articleSubTitle}>
          watchEffect逻辑
        </h3>
        <ul className={classMap.ul}>
          <li>
            监听<code>slots.default</code>中的插槽内容变化
          </li>
          <li>
            遍历<code>default</code>插槽中所有的<code>VNode</code>，如果发现异步组件（通过<code>__asyncLoader</code>
            属性判断），则获取并收集它的<code>promise</code>到<code>promises</code>数组中
          </li>
          <li>
            如果<code>promises</code>数组不为空，将所有的<code>promise</code>合并为一个<code>Promise.all</code>，调用
            <code>handleSuspense</code>处理。如果为空说明没有异步操作， 直接调用<code>setResolved</code>
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'Suspense',
            key: 'suspense',
            href: '#suspense'
          },
          {
            title: '使用场景',
            key: 'use',
            href: '#use'
          },
          {
            title: '源码解析',
            key: 'code',
            href: '#code',
            children: [
              {
                title: 'watchEffect逻辑',
                key: 'watchEffect',
                href: '#watchEffect'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
