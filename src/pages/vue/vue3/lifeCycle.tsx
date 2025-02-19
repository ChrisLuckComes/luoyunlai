import { classMap } from '@/constants/constant';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import { INJECT_HOOK, CALL_HOOK, SETUP } from './_lifeCycle';

export default function Index() {
  const injectHook = <UseMarkDown markdown={INJECT_HOOK}></UseMarkDown>,
    callHook = <UseMarkDown markdown={CALL_HOOK}></UseMarkDown>,
    setup = <UseMarkDown markdown={SETUP}></UseMarkDown>;

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
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
