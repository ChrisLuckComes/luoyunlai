import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import { PROCESS_ELEMENT, TRANSFORM_STYLE, DEEP, RENDER } from './_scoped';

export default function Index() {
  const processElement = <UseMarkDown markdown={PROCESS_ELEMENT}></UseMarkDown>,
    transformStyle = <UseMarkDown markdown={TRANSFORM_STYLE}></UseMarkDown>,
    render = <UseMarkDown markdown={RENDER}></UseMarkDown>,
    deep = <UseMarkDown markdown={DEEP}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="scoped" className="font-semibold text-h2 mb-2">
          style scoped
        </h2>
        scoped是Vue3中的一个特性，它可以让样式只在当前组件中生效，不会影响到其他组件。Vue3实现这个属性的核心思路是在编译阶段，为组件的模板元素和样式添加唯一的属性，然后通过这些属性来限定作用范围。
        下面详细介绍
        <h2 id="theory" className={classMap.articleTitle}>
          实现原理
        </h2>
        <ul className={classMap.ul}>
          <strong>1.源码编译阶段</strong>
          <ul className={classMap.ul}>
            <li>
              在<code>@vue/compiler-dom</code>中，当编译组件模板时，如果<code>style</code>标签带有
              <code>scoped</code>属性，会为模板中的每一个元素添加唯一属性。
              {processElement}
            </li>
            <strong>2.样式编译阶段：</strong>
            <li>
              在<code>@vue/compiler-dom</code>中，会为样式规则添加属性选择器。
              {transformStyle}
            </li>
            <strong>3.运行时渲染阶段：</strong>
            <li>
              在组件渲染时，之前添加的<code>data-v-id</code>
              属性会被应用到实际的DOM元素上，同时样式中的属性选择器会确保样式只作用带有该属性的元素。
              {render}
            </li>
          </ul>
          <br />
        </ul>
        <h2 id="deep" className={classMap.articleTitle}>
          deep
        </h2>
        在<code>scoped</code>样式中，可以使用<code>v-deep</code>关键字来穿透作用域，应用样式到子组件。
        <br />
        <code>如下函数将深度选择器的前后分开，只在后面的选择器添加属性选择器，从而实现样式穿透</code>
        {deep}
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'style scoped',
            key: 'scoped',
            href: '#scoped'
          },
          {
            title: '实现原理',
            key: 'theory',
            href: '#theory'
          },
          {
            title: 'deep',
            key: 'deep',
            href: '#deep'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
