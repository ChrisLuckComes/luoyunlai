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