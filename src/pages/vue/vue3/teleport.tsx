import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import { TELEPORT, TELEPORT_CODE } from './_teleport';

export default function Index() {
  const teleport = <UseMarkDown markdown={TELEPORT}></UseMarkDown>,
    teleportCode = <UseMarkDown markdown={TELEPORT_CODE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="teleport" className="font-semibold text-h2 mb-2">
          Teleport
        </h2>
        <code>Teleport</code>
        是vue中的一个内置组件，它能将组件内部的一部分HTML元素&quot;传送&quot;到DOM树的其他位置进行渲染，而不是在原本的父组件渲染位置。
        <h2 id="use" className={classMap.articleTitle}>
          使用场景
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>弹窗，对话框</strong>
          </li>
          <li>
            <strong>全局提示框</strong>
          </li>
        </ul>
        {teleport}
        <code>to</code>为必填属性，指定要将内容传送到目标元素的选择器或DOM节点。
        <h2 id="code" className={classMap.articleTitle}>
          源码解析
        </h2>
        <code>Teleport</code>组件定义位于<code>packages/runtime-core/src/components/Teleport.ts</code>
        ，以下是简化后的核心代码。
        {teleportCode}
        可以看到代码其实并不复杂
        <ul className={classMap.ul}>
          <li>
            <code>onMounted</code>
            将内容挂载到目标元素上
          </li>
          <li>
            <code>onUpdated</code>组件更新之后，如果目标元素有变化需要卸载再挂载
          </li>
          <li>
            <code>onBeforeUnmount</code>生命周期中将内容从目标元素上卸载。
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'Teleport',
            key: 'teleport',
            href: '#teleport'
          },
          {
            title: '使用场景',
            key: 'use',
            href: '#use'
          },
          {
            title: '源码解析',
            key: 'code',
            href: '#code'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
