import{j as e,d as n}from"./index-06d0604c.js";import{U as t}from"./useMarkdown-7879de16.js";import{A as c}from"./Anchor-98b0e2a3.js";import"./index-69c83c67.js";const i=`\`\`\`ts
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
\`\`\``,l=`\`\`\`ts
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
\`\`\``,a=`\`\`\`ts
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
\`\`\``;function x(){const s=e.jsx(t,{markdown:i}),o=e.jsx(t,{markdown:l}),r=e.jsx(t,{markdown:a});return e.jsxs("article",{id:"rootArticle",className:n.article,children:[e.jsxs("main",{className:n.content,children:[e.jsx("h2",{id:"lifeCycle",className:"font-semibold text-h2 mb-2",children:"生命周期"}),"Vue3为了更好的和组合式API配合，对生命周期做出了调整。改动点如下：",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:["更名为以on开头",e.jsx("br",{}),e.jsx("code",{children:"mounted"}),"改为",e.jsx("code",{children:"onBeforeMount"})]}),e.jsx("li",{children:"组合式API中setup替代beforeCreate和created"}),e.jsxs("li",{children:["destroyed改为unmounted",e.jsx("br",{}),e.jsx("code",{children:"destroyed"}),"钩子被",e.jsx("code",{children:"unmounted"}),"钩子替代，为了避免函数重名，组件被卸载时触发"]}),e.jsxs("li",{children:["新增onRenderTracked和onRenderTriggered",e.jsx("br",{}),"前者用于响应式依赖被追踪时触发，后者用于渲染被触发时触发，可用于调试"]})]}),e.jsx("h2",{id:"theory",className:n.articleTitle,children:"相关源码"}),e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"生命周期钩子的注册"}),e.jsx("code",{children:"injectHook"}),"函数将生命周期钩子函数包装并添加到组件实例的对应钩子数组中。",s]}),e.jsx("strong",{children:"生命周期钩子的触发"}),e.jsx("br",{}),"以下是简化的触发逻辑，比如",e.jsx("code",{children:"mounted"}),"钩子在组件挂在完成后触发",e.jsx("br",{}),e.jsx("code",{children:"callHook"}),"函数用于遍历并执行组件实例中对应生命周期钩子数组中的所有钩子函数。",o]}),e.jsx("h2",{id:"setup",className:n.articleTitle,children:"setup"}),"那么",e.jsx("code",{children:"setup"}),"函数是如何替代",e.jsx("code",{children:"beforeCreate"}),"和",e.jsx("code",{children:"created"}),"的呢？",e.jsx("br",{}),"它的执行时机如下：组件实例初始化时，在",e.jsx("code",{children:"data"}),"和",e.jsx("code",{children:"props"}),"初始化之后，data和methods还没初始化之前。 和",e.jsx("code",{children:"beforeCreate"}),"类似，",e.jsx("code",{children:"setup"}),"执行完成后，相当于完成了",e.jsx("code",{children:"created"}),"钩子原本要做的事情。 贴出代码，可以看到执行顺序。",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:["先初始化props和slots，然后判断组件是否为有状态组件而调用",e.jsx("code",{children:"setupStatefulComponent"})]}),e.jsxs("li",{children:["创建",e.jsx("code",{children:"setupContext"}),"，初始化attrs, slots, emit等"]}),e.jsxs("li",{children:["检查组件选项中是否存在",e.jsx("code",{children:"setup"}),"函数，如果有就调用"]}),e.jsxs("li",{children:["执行完成后，调用",e.jsx("code",{children:"handleSetupResult"}),"处理返回结果"]})]}),r,"当然使用选项式API时，这两个钩子函数依然存在。"]}),e.jsx(c,{items:[{title:"生命周期",key:"lifeCycle",href:"#lifeCycle"},{title:"相关源码",key:"theory",href:"#theory"},{title:"setup",key:"setup",href:"#setup"}]})]})}export{x as default};
