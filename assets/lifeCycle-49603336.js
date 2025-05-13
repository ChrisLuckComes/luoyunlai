import{j as e,d as n}from"./index-52cacda3.js";import{U as s}from"./useMarkdown-2196212a.js";import{A as u}from"./Anchor-4d1d2fe9.js";const h=`\`\`\`ts
function injectHook(
  type: LifecycleHooks,
  hook: Function & { __weh?: Function },
  target: ComponentInternalInstance | null = currentInstance,
  prepend: boolean = false
) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args: unknown[]) => {
        if (target.isUnmounted) {
          return;
        }
        // 执行钩子函数
        return callWithAsyncErrorHandling(hook, target, type, args);
      });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
\`\`\``,x=`\`\`\`ts
function callHook(
  hooks: Function[],
  instance: ComponentInternalInstance,
  type: LifecycleHooks
) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++) {
      callWithAsyncErrorHandling(hooks[i], instance, type);
    }
  }
}

function mountComponent(
  initialVNode: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) {
  // ...
  // 组件挂载完成
  callHook(instance.mounted, instance, LifecycleHooks.MOUNTED);
  // ...
}
\`\`\``,p=`\`\`\`ts
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR = false
) {
  const { props, children } = instance.vnode
  const isStateful = isStatefulComponent(instance)
  initProps(instance, props, isStateful, isSSR)
  initSlots(instance, children)

  const setupResult = isStateful
    ? setupStatefulComponent(instance, isSSR)
    : undefined

  return setupResult
}

function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type as ComponentOptions
  // 创建组件上下文
  instance.provides = parentProvides
  const setupContext = (instance.setupContext =
    Component.setup ? createSetupContext(instance) : null)

  const setup = Component.setup
  if (setup) {
    setCurrentInstance(instance)
    const setupResult = callWithErrorHandling(setup, instance, ErrorCodes.SETUP_FUNCTION, [
      instance.props,
      setupContext
    ])
    unsetCurrentInstance()
    handleSetupResult(instance, setupResult, isSSR)
  } else {
    finishComponentSetup(instance)
  }
}
\`\`\``,j=`\`\`\`ts
function mountComponent(
  initialVNode: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) {
  // ... 组件初始化逻辑

  // 调用 onBeforeMount 钩子
  callHook(instance.beforeMount, instance, LifecycleHooks.BEFORE_MOUNT);

  // 实际挂载组件
  const subTree = (instance.subTree = renderComponentRoot(instance));
  patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);

  // ... 其他逻辑
}
\`\`\``,m=`\`\`\`ts
function mountComponent(
  initialVNode: VNode,
  container: RendererElement,
  anchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  optimized: boolean
) {
  // ... 组件初始化和挂载逻辑

  // 组件挂载完成
  callHook(instance.mounted, instance, LifecycleHooks.MOUNTED);

  // ... 其他逻辑
}
\`\`\``,f=`\`\`\`ts
const componentUpdateFn = () => {
  if (!instance.isMounted) {
    // 组件挂载逻辑
  } else {
    let { next, vnode } = instance
    if (next) {
      // 更新 vnode
      next.el = vnode.el
      updateComponentPreRender(instance, next)
    } else {
      next = vnode
    }
    // 调用 onBeforeUpdated 钩子
    callHook(instance.beforeUpdate, instance, LifecycleHooks.BEFORE_UPDATE)
    // 重新渲染组件
    const nextTree = renderComponentRoot(instance)
    const prevTree = instance.subTree
    instance.subTree = nextTree
    // 打补丁更新 DOM
    patch(prevTree, nextTree, hostParent, hostAnchor, instance, parentSuspense, isSVG)
    // ... 其他逻辑
  }
}
\`\`\``,k=`\`\`\`ts
function unmountComponent(
  instance: ComponentInternalInstance,
  shouldKeepAlive: boolean,
  doRemove: boolean
) {
  // 调用 onBeforeUnmount 钩子
  callHook(instance.beforeUnmount, instance, LifecycleHooks.BEFORE_UNMOUNT);

  // 实际卸载组件
  if (!shouldKeepAlive) {
    unmount(instance.subTree, instance, null, true);
  }

  // ... 其他逻辑
}
\`\`\``,U=`\`\`\`ts
function unmountComponent(
  instance: ComponentInternalInstance,
  shouldKeepAlive: boolean,
  doRemove: boolean
) {

  // 实际卸载组件
  if (!shouldKeepAlive) {
    unmount(instance.subTree, instance, null, true);
  }

  // 调用 onUnmounted 钩子
  callHook(instance.unmounted, instance, LifecycleHooks.UNMOUNTED);
}
\`\`\``;function g(){const t=e.jsx(s,{markdown:h}),l=e.jsx(s,{markdown:x}),r=e.jsx(s,{markdown:p}),i=e.jsx(s,{markdown:j}),c=e.jsx(s,{markdown:m}),d=e.jsx(s,{markdown:f}),o=e.jsx(s,{markdown:k}),a=e.jsx(s,{markdown:U});return e.jsxs("article",{id:"rootArticle",className:n.article,children:[e.jsxs("main",{className:n.content,children:[e.jsx("h2",{id:"lifeCycle",className:"font-semibold text-h2 mb-2",children:"生命周期"}),"Vue3为了更好的和组合式API配合，对生命周期做出了调整。改动点如下：",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:["更名为以on开头",e.jsx("br",{}),e.jsx("code",{children:"mounted"}),"改为",e.jsx("code",{children:"onBeforeMount"})]}),e.jsx("li",{children:"组合式API中setup替代beforeCreate和created"}),e.jsxs("li",{children:["destroyed改为unmounted",e.jsx("br",{}),e.jsx("code",{children:"destroyed"}),"钩子被",e.jsx("code",{children:"unmounted"}),"钩子替代，为了避免函数重名，组件被卸载时触发"]}),e.jsxs("li",{children:["新增onRenderTracked和onRenderTriggered",e.jsx("br",{}),"前者用于响应式依赖被追踪时触发，后者用于渲染被触发时触发，可用于调试"]})]}),e.jsx("h2",{id:"theory",className:n.articleTitle,children:"相关源码"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"生命周期钩子的注册"}),e.jsx("code",{children:"injectHook"}),"函数将生命周期钩子函数包装并添加到组件实例的对应钩子数组中。",t]}),e.jsx("strong",{children:"生命周期钩子的触发"}),e.jsx("br",{}),"以下是简化的触发逻辑，比如",e.jsx("code",{children:"mounted"}),"钩子在组件挂在完成后触发",e.jsx("br",{}),e.jsx("code",{children:"callHook"}),"函数用于遍历并执行组件实例中对应生命周期钩子数组中的所有钩子函数。",l]}),e.jsx("h2",{id:"setup",className:n.articleTitle,children:"setup"}),"那么",e.jsx("code",{children:"setup"}),"函数是如何替代",e.jsx("code",{children:"beforeCreate"}),"和",e.jsx("code",{children:"created"}),"的呢？",e.jsx("br",{}),"它的执行时机如下：组件实例初始化时，在",e.jsx("code",{children:"data"}),"和",e.jsx("code",{children:"props"}),"初始化之后，data和methods还没初始化之前。 和",e.jsx("code",{children:"beforeCreate"}),"类似，",e.jsx("code",{children:"setup"}),"执行完成后，相当于完成了",e.jsx("code",{children:"created"}),"钩子原本要做的事情。 贴出代码，可以看到执行顺序。",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:["先初始化props和slots，然后判断组件是否为有状态组件而调用",e.jsx("code",{children:"setupStatefulComponent"})]}),e.jsxs("li",{children:["创建",e.jsx("code",{children:"setupContext"}),"，初始化attrs, slots, emit等"]}),e.jsxs("li",{children:["检查组件选项中是否存在",e.jsx("code",{children:"setup"}),"函数，如果有就调用"]}),e.jsxs("li",{children:["执行完成后，调用",e.jsx("code",{children:"handleSetupResult"}),"处理返回结果"]})]}),r,"当然使用选项式API时，这两个钩子函数依然存在。",e.jsx("h2",{id:"detail",className:n.articleTitle,children:"生命周期详细分析"}),"组件生命周期中，这些钩子的执行顺序为：onBeforeMount - 组件挂载到 DOM - onMounted - onBeforeUnmount - 组件从 DOM 卸载 - onUnmounted。",e.jsx("h3",{id:"onBeforeMount",className:n.articleSubTitle,children:"onBeforeMount"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"在调用之前，Vue会完成组件实例的初始化，包括解析",e.jsx("code",{children:"props"}),"、",e.jsx("code",{children:"data"}),"、",e.jsx("code",{children:"computed"}),"、",e.jsx("code",{children:"methods"}),"等，创建响应式数据，以及设置组件的上下文等。 同时会生成组件的VNode树。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件即将挂载到DOM之前触发。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),e.jsx("br",{}),i]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"在组件创建之前做一些准备工作，比如获取初始化数据，初始化第三方库等。"]})]}),e.jsx("h3",{id:"onMounted",className:n.articleSubTitle,children:"onMounted"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件已经完成了VNode的创建和挂载，真实的DOM元素已经插入到页面"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件挂在到DOM之后触发"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),c]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"最常用的钩子，挂载完成后设置数据，绑定事件等"]})]}),e.jsx("h3",{id:"onBeforeUpdated",className:n.articleSubTitle,children:"onBeforeUpdated"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件检测到响应式数据发生了变化，触发了更新流程。Vue会进行",e.jsx("code",{children:"diff"}),"操作，确定需要更新的部分"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件更新之前，也就是重新渲染和执行",e.jsx("code",{children:"patch"}),"之前触发。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),d]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"用于在组件更新之前访问旧的状态，例如保存滚动位置、获取旧的尺寸等。"]})]}),e.jsx("h3",{id:"onUpdated",className:n.articleSubTitle,children:"onUpdated"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件的更新已经完成了，DOM已经更新到页面上。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件更新完成之后。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),"同上"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"用于在组件更新之后执行一些依赖于新DOM状态的操作。"]})]}),e.jsx("h3",{id:"onBeforeUnmount",className:n.articleSubTitle,children:"onBeforeUnmount"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件依然处于挂载状态，DOM元素仍然存在页面中"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件即将从DOM中卸载之前触发"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),o]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"用于在组件卸载之前进行一些清理工作，如清除定时器、移除事件监听等，避免内存泄漏。"]})]}),e.jsx("h3",{id:"onBeforeUnmount",className:n.articleSubTitle,children:"onBeforeUnmount"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件依然处于挂载状态，DOM元素仍然存在页面中"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件即将从DOM中卸载之前触发"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),o]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"用于在组件卸载之前进行一些清理工作，如清除定时器、移除事件监听等，避免内存泄漏。"]})]}),e.jsx("h3",{id:"onUnmounted",className:n.articleSubTitle,children:"onUnmounted"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"之前的操作："}),"调用之前，组件已经完成了从DOM中的卸载，真实的DOM元素已经从页面中移除"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"执行时机："}),"在组件即将从DOM中卸载之后触发"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"相关代码："}),a]}),e.jsxs("li",{children:[e.jsx("strong",{children:"用途："}),"用于最终的清理工作，比如释放资源、销毁第三方实例等。"]})]})]}),e.jsx(u,{items:[{title:"生命周期",key:"lifeCycle",href:"#lifeCycle"},{title:"相关源码",key:"theory",href:"#theory"},{title:"setup",key:"setup",href:"#setup"},{title:"各生命周期详细分析",key:"detail",href:"#detail",children:[{title:"onBeforeMount",key:"onBeforeMount",href:"#onBeforeMount"},{title:"onMounted",key:"onMounted",href:"#onMounted"},{title:"onBeforeUpdated",key:"onBeforeUpdated",href:"#onBeforeUpdated"},{title:"onUpdated",key:"onUpdated",href:"#onUpdated"},{title:"onBeforeUnmount",key:"onBeforeUnmount",href:"#onBeforeUnmount"},{title:"onUnmounted",key:"onUnmounted",href:"#onUnmounted"}]}]})]})}export{g as default};
