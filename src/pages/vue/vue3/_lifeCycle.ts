export const INJECT_HOOK = `\`\`\`ts
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
\`\`\``;

export const CALL_HOOK = `\`\`\`ts
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
\`\`\``;

export const SETUP = `\`\`\`ts
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
\`\`\``;

export const BEFORE_MOUNT = `\`\`\`ts
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
\`\`\``;

export const MOUNTED = `\`\`\`ts
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
\`\`\``;

export const BEFORE_UPDATED = `\`\`\`ts
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
\`\`\``;

export const BEFORE_ONUNMOUNT = `\`\`\`ts
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
\`\`\``;

export const ONUNMOUNT = `\`\`\`ts
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
\`\`\``;