import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import {
  INJECT_HOOK,
  CALL_HOOK,
  SETUP,
  BEFORE_MOUNT,
  MOUNTED,
  BEFORE_UPDATED,
  BEFORE_ONUNMOUNT,
  ONUNMOUNT
} from './_lifeCycle';

export default function Index() {
  const injectHook = <UseMarkDown markdown={INJECT_HOOK}></UseMarkDown>,
    callHook = <UseMarkDown markdown={CALL_HOOK}></UseMarkDown>,
    setup = <UseMarkDown markdown={SETUP}></UseMarkDown>,
    beforeMount = <UseMarkDown markdown={BEFORE_MOUNT}></UseMarkDown>,
    mounted = <UseMarkDown markdown={MOUNTED}></UseMarkDown>,
    beforeUpdate = <UseMarkDown markdown={BEFORE_UPDATED}></UseMarkDown>,
    beforeUnmount = <UseMarkDown markdown={BEFORE_ONUNMOUNT}></UseMarkDown>,
    unmounted = <UseMarkDown markdown={ONUNMOUNT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="lifeCycle" className="font-semibold text-h2 mb-2">
          生命周期
        </h2>
        Vue3为了更好的和组合式API配合，对生命周期做出了调整。改动点如下：
        <ul className={classMap.ul}>
          <li>
            更名为以on开头
            <br />
            <code>mounted</code>改为<code>onBeforeMount</code>
          </li>
          <li>组合式API中setup替代beforeCreate和created</li>
          <li>
            destroyed改为unmounted
            <br />
            <code>destroyed</code>钩子被<code>unmounted</code>钩子替代，为了避免函数重名，组件被卸载时触发
          </li>
          <li>
            新增onRenderTracked和onRenderTriggered
            <br />
            前者用于响应式依赖被追踪时触发，后者用于渲染被触发时触发，可用于调试
          </li>
        </ul>
        <h2 id="theory" className={classMap.articleTitle}>
          相关源码
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>生命周期钩子的注册</strong>
            <code>injectHook</code>函数将生命周期钩子函数包装并添加到组件实例的对应钩子数组中。
            {injectHook}
          </li>
          <strong>生命周期钩子的触发</strong>
          <br />
          以下是简化的触发逻辑，比如<code>mounted</code>钩子在组件挂在完成后触发
          <br />
          <code>callHook</code>函数用于遍历并执行组件实例中对应生命周期钩子数组中的所有钩子函数。
          {callHook}
        </ul>
        <h2 id="setup" className={classMap.articleTitle}>
          setup
        </h2>
        那么<code>setup</code>函数是如何替代<code>beforeCreate</code>和<code>created</code>的呢？
        <br />
        它的执行时机如下：组件实例初始化时，在<code>data</code>和<code>props</code>
        初始化之后，data和methods还没初始化之前。 和<code>beforeCreate</code>类似，<code>setup</code>
        执行完成后，相当于完成了<code>created</code>钩子原本要做的事情。 贴出代码，可以看到执行顺序。
        <ul className={classMap.ul}>
          <li>
            先初始化props和slots，然后判断组件是否为有状态组件而调用<code>setupStatefulComponent</code>
          </li>
          <li>
            创建<code>setupContext</code>，初始化attrs, slots, emit等
          </li>
          <li>
            检查组件选项中是否存在<code>setup</code>函数，如果有就调用
          </li>
          <li>
            执行完成后，调用<code>handleSetupResult</code>处理返回结果
          </li>
        </ul>
        {setup}
        当然使用选项式API时，这两个钩子函数依然存在。
        <h2 id="detail" className={classMap.articleTitle}>
          生命周期详细分析
        </h2>
        组件生命周期中，这些钩子的执行顺序为：onBeforeMount - 组件挂载到 DOM - onMounted - onBeforeUnmount - 组件从 DOM
        卸载 - onUnmounted。
        <h3 id="onBeforeMount" className={classMap.articleSubTitle}>
          onBeforeMount
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>在调用之前，Vue会完成组件实例的初始化，包括解析<code>props</code>、
            <code>data</code>、<code>computed</code>、<code>methods</code>等，创建响应式数据，以及设置组件的上下文等。
            同时会生成组件的VNode树。
          </li>
          <li>
            <strong>执行时机：</strong>在组件即将挂载到DOM之前触发。
          </li>
          <li>
            <strong>相关代码：</strong>
            <br />
            {beforeMount}
          </li>
          <li>
            <strong>用途：</strong>在组件创建之前做一些准备工作，比如获取初始化数据，初始化第三方库等。
          </li>
        </ul>
        <h3 id="onMounted" className={classMap.articleSubTitle}>
          onMounted
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件已经完成了VNode的创建和挂载，真实的DOM元素已经插入到页面
          </li>
          <li>
            <strong>执行时机：</strong>在组件挂在到DOM之后触发
          </li>
          <li>
            <strong>相关代码：</strong>
            {mounted}
          </li>
          <li>
            <strong>用途：</strong>最常用的钩子，挂载完成后设置数据，绑定事件等
          </li>
        </ul>
        <h3 id="onBeforeUpdated" className={classMap.articleSubTitle}>
          onBeforeUpdated
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件检测到响应式数据发生了变化，触发了更新流程。Vue会进行
            <code>diff</code>操作，确定需要更新的部分
          </li>
          <li>
            <strong>执行时机：</strong>在组件更新之前，也就是重新渲染和执行<code>patch</code>之前触发。
          </li>
          <li>
            <strong>相关代码：</strong>
            {beforeUpdate}
          </li>
          <li>
            <strong>用途：</strong>用于在组件更新之前访问旧的状态，例如保存滚动位置、获取旧的尺寸等。
          </li>
        </ul>
        <h3 id="onUpdated" className={classMap.articleSubTitle}>
          onUpdated
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件的更新已经完成了，DOM已经更新到页面上。
          </li>
          <li>
            <strong>执行时机：</strong>在组件更新完成之后。
          </li>
          <li>
            <strong>相关代码：</strong>同上
          </li>
          <li>
            <strong>用途：</strong>用于在组件更新之后执行一些依赖于新DOM状态的操作。
          </li>
        </ul>
        <h3 id="onBeforeUnmount" className={classMap.articleSubTitle}>
          onBeforeUnmount
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件依然处于挂载状态，DOM元素仍然存在页面中
          </li>
          <li>
            <strong>执行时机：</strong>在组件即将从DOM中卸载之前触发
          </li>
          <li>
            <strong>相关代码：</strong>
            {beforeUnmount}
          </li>
          <li>
            <strong>用途：</strong>用于在组件卸载之前进行一些清理工作，如清除定时器、移除事件监听等，避免内存泄漏。
          </li>
        </ul>
        <h3 id="onBeforeUnmount" className={classMap.articleSubTitle}>
          onBeforeUnmount
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件依然处于挂载状态，DOM元素仍然存在页面中
          </li>
          <li>
            <strong>执行时机：</strong>在组件即将从DOM中卸载之前触发
          </li>
          <li>
            <strong>相关代码：</strong>
            {beforeUnmount}
          </li>
          <li>
            <strong>用途：</strong>用于在组件卸载之前进行一些清理工作，如清除定时器、移除事件监听等，避免内存泄漏。
          </li>
        </ul>
        <h3 id="onUnmounted" className={classMap.articleSubTitle}>
          onUnmounted
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>之前的操作：</strong>调用之前，组件已经完成了从DOM中的卸载，真实的DOM元素已经从页面中移除
          </li>
          <li>
            <strong>执行时机：</strong>在组件即将从DOM中卸载之后触发
          </li>
          <li>
            <strong>相关代码：</strong>
            {unmounted}
          </li>
          <li>
            <strong>用途：</strong>用于最终的清理工作，比如释放资源、销毁第三方实例等。
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: '生命周期',
            key: 'lifeCycle',
            href: '#lifeCycle'
          },
          {
            title: '相关源码',
            key: 'theory',
            href: '#theory'
          },
          {
            title: 'setup',
            key: 'setup',
            href: '#setup'
          },
          {
            title: '各生命周期详细分析',
            key: 'detail',
            href: '#detail',
            children: [
              {
                title: 'onBeforeMount',
                key: 'onBeforeMount',
                href: '#onBeforeMount'
              },
              {
                title: 'onMounted',
                key: 'onMounted',
                href: '#onMounted'
              },
              {
                title: 'onBeforeUpdated',
                key: 'onBeforeUpdated',
                href: '#onBeforeUpdated'
              },
              {
                title: 'onUpdated',
                key: 'onUpdated',
                href: '#onUpdated'
              },
              {
                title: 'onBeforeUnmount',
                key: 'onBeforeUnmount',
                href: '#onBeforeUnmount'
              },
              {
                title: 'onUnmounted',
                key: 'onUnmounted',
                href: '#onUnmounted'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
