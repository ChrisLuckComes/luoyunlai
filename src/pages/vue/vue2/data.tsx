import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { LazyImage } from '@/component/image';

import HEAP_MEMORY from '@images/vue/heapMemory.png';
import { INIT_DATA } from './_data';
import { ArticleAnchor } from '@/component/Anchor';

export default function Index() {
  const initData = <UseMarkDown markdown={INIT_DATA}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="title" className={classMap.articleTitle}>
          为什么data必须是函数
        </h2>
        根本原因如下：
        <h2 id="heap" className={classMap.articleTitle}>
          根本原因：堆内存
        </h2>
        <LazyImage src={HEAP_MEMORY}></LazyImage>
        javaScript将对象放在堆内存中，对象的复制或者传递都只是它的引用，实际上还是指向同一个对象的内存地址。
        所以在vue中data如果是对象的话，在多次被复用的情况下，任意一个地方修改了属性会影响其他所有地方，那么vue是怎么处理的呢？
        
        <h2 id="example" className={classMap.articleTitle}>
          实际例子
        </h2>
        <div className={classMap.assist}>错误示例</div>
        <pre className={classMap.markdown}>
          {`// 错误示例
const sharedData = {
  count: 0
}

Vue.component('counter', {
  data: sharedData,
  template: '<button @click="count++">Count: {{ count }}</button>'
})`}
        </pre>
        这种情况下，所有counter组件会共享同一个count值，点击任何一个按钮都会影响所有组件。

        <h2 id="closure" className={classMap.articleTitle}>
          函数执行
        </h2>
        <div className={classMap.assist}>src\core\instance\state.js</div>
        答案是使用函数，<code>data.call(vm, vm)</code>
        <br />
        <br />
        执行函数时两个重要的步骤就是确定变量对象和this。
        <br />
        this判断也不复杂，就那么几种情况
        <h3 id="diff" className={classMap.articleSubTitle}>
          this
        </h3>
        <ul className={classMap.ul}>
          <li>全局作用域：this就是宿主环境，在浏览器中是window，在node.js环境是global</li>
          <li>
            函数执行：
            <ul className={classMap.ul}>
              <li>xxx.call(xxxThis,xxx): 使用call和apply传入的第一个参数就是this</li>
              <li>xxx.func(...): 谁调用的就是this就是谁，此时就是xxx</li>
              <li>箭头函数：自身没有this，所在环境的this</li>
            </ul>
          </li>
        </ul>
        <br />
        vue就是使用<code>call</code>
        给每个组件当组件被复用时执行data函数时传入各自的this。 data函数内
        <code>return {`{...}`}</code>相当于
        <code>let xxx = {`{...}`}; return xxx;</code>
        ，xxx是单独的变量声明，会开辟独立的内存地址，也就实现了给每个组件单独维护一份data的目的

        <h2 id="best-practice" className={classMap.articleTitle}>
          最佳实践
        </h2>
        <ul className={classMap.ul}>
          <li>始终使用函数返回data对象，即使是在单文件组件中</li>
          <li>避免在data函数中返回复杂对象，应该只返回组件需要的数据</li>
          <li>对于需要在多个组件间共享的数据，应该使用Vuex或provide/inject</li>
          <li>在data函数中不要使用箭头函数，因为箭头函数会绑定父级作用域的this</li>
        </ul>

        {initData}
      </main>
      <ArticleAnchor
        items={[
          {
            title: '堆内存',
            key: 'heap',
            href: '#heap'
          },
          {
            title: '实际例子',
            key: 'example',
            href: '#example'
          },
          {
            title: '函数执行',
            key: 'func',
            href: '#func',
            children: [
              {
                title: 'this',
                key: 'this',
                href: '#this'
              }
            ]
          },
          {
            title: '最佳实践',
            key: 'best-practice',
            href: '#best-practice'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
