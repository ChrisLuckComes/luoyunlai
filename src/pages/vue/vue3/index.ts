export const DEFINE_PROPERTY = `\`\`\`js 
const obj = {}
Object.defineProperty(obj, "a", {
  value : 1,
  writable : false, // 是否可写 
  configurable : false, // 是否可配置
  enumerable : false // 是否可枚举
})
// 上面给了三个false, 下面的相关操作就很容易理解了
obj.a = 2 // 无效
delete obj.a // 无效
for(key in obj){
  console.log(key) // 无效 
}
\`\`\``;

export const VUE2_2WAY_BIND = `\`\`\`js 
Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // ...
      if (Dep.target) {
        // 收集依赖
        dep.depend()
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      // ...
      // 通知视图更新
      dep.notify()
    }
  })
\`\`\``;

export const VUE_SET = `\`\`\`js 
function set (target: Array<any> | Object, key: any, val: any): any {
    // ....
    if (!ob) {
      target[key] = val
      return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
\`\`\``;

export const VUE_ARRAY_METHODS_TO_PATCH = `\`\`\`js 
const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ]
  
  methodsToPatch.forEach(function (method) {
    // 缓存原生数组
    const original = arrayProto[method]
    // def使用Object.defineProperty重新定义属性
    def(arrayMethods, method, function mutator (...args) {
      const result = original.apply(this, args) // 调用原生数组的方法
  
      const ob = this.__ob__  // ob就是observe实例observe才能响应式
      let inserted
      switch (method) {
        // push和unshift方法会增加数组的索引，但是新增的索引位需要手动observe的
        case 'push':
        case 'unshift':
          inserted = args
          break
        // 同理，splice的第三个参数，为新增的值，也需要手动observe
        case 'splice':
          inserted = args.slice(2)
          break
      }
      // 其余的方法都是在原有的索引上更新，初始化的时候已经observe过了
      if (inserted) ob.observeArray(inserted)
      // dep通知所有的订阅者触发回调
      ob.dep.notify()
      return result
    })})
    \`\`\``;

export const CREATE_APP = `\`\`\`js 
export const createApp = ((...args) => {
      const app = ensureRenderer().createApp(...args)
    
      if (__DEV__) {
        injectNativeTagCheck(app)
        injectCompilerOptionsCheck(app)
      }
      const { mount } = app
      app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
        const container = normalizeContainer(containerOrSelector)
        if (!container) return
        const component = app._component
        if (!isFunction(component) && !component.render && !component.template) {
          // __UNSAFE__
          // Reason: potential execution of JS expressions in in-DOM template.
          // The user must make sure the in-DOM template is trusted. If it's
          // rendered by the server, the template should not contain any user data.
          component.template = container.innerHTML
          // 2.x compat check
          if (__COMPAT__ && __DEV__) {
            for (let i = 0; i < container.attributes.length; i++) {
              const attr = container.attributes[i]
              if (attr.name !== 'v-cloak' && /^(v-|:|@)/.test(attr.name)) {
                compatUtils.warnDeprecation(
                  DeprecationTypes.GLOBAL_MOUNT_CONTAINER,
                  null
                )
                break
              }
            }
          }
        }
        // clear content before mounting
        container.innerHTML = ''
        const proxy = mount(container, false, container instanceof SVGElement)
        if (container instanceof Element) {
          container.removeAttribute('v-cloak')
          container.setAttribute('data-v-app', '')
        }
        return proxy
      }
      return app
    }) as CreateAppFunction<Element>
    \`\`\``;

export const ENSURE_RENDERER = `\`\`\`ts 
const rendererOptions = /*#__PURE__*/ extend({ patchProp }, nodeOps)

// lazy create the renderer - this makes core renderer logic tree-shakable
// in case the user only imports reactivity utilities from Vue.
let renderer: Renderer<Element | ShadowRoot> | HydrationRenderer
let enabledHydration = false
function ensureRenderer() {
  return (
    renderer ||
    (renderer = createRenderer<Node, Element | ShadowRoot>(rendererOptions))
  )
}\`\`\``;

export const CREATE_RENDERER = `\`\`\`js 
export function createRenderer<
  HostNode = RendererNode,
  HostElement = RendererElement
>(options: RendererOptions<HostNode, HostElement>) {
  return baseCreateRenderer<HostNode, HostElement>(options)
}\`\`\``;

export const BASE_CREATE_RENDERER = `\`\`\`js 
function baseCreateRenderer(
      options: RendererOptions,
      createHydrationFns?: typeof createHydrationFunctions
    ): any {
      // compile-time feature flags check
      if (__ESM_BUNDLER__ && !__TEST__) {
        initFeatureFlags()
      }
    
      const target = getGlobalThis()
      target.__VUE__ = true
      if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target)
      }
      const {
        insert: hostInsert,
        remove: hostRemove,
        patchProp: hostPatchProp,
        createElement: hostCreateElement,
        createText: hostCreateText,
        createComment: hostCreateComment,
        setText: hostSetText,
        setElementText: hostSetElementText,
        parentNode: hostParentNode,
        nextSibling: hostNextSibling,
        setScopeId: hostSetScopeId = NOOP,
        insertStaticContent: hostInsertStaticContent
      } = options
      //此处省略两千行
      return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
      }\`\`\``;

export const CREATE_APP_API = `\`\`\`js 
export function createAppAPI<HostElement>(
      render: RootRenderFunction<HostElement>,
      hydrate?: RootHydrateFunction
    ): CreateAppFunction<HostElement> {
      return function createApp(rootComponent, rootProps = null) {
        if (!isFunction(rootComponent)) {
          rootComponent = { ...rootComponent }
        }
    
        if (rootProps != null && !isObject(rootProps)) {
          __DEV__ && warn('root props passed to app.mount() must be an object.')
          rootProps = null
        }
        const context = createAppContext()
        const installedPlugins = new Set()
        let isMounted = false
        const app: App = (context.app = {
          _uid: uid++,
          _component: rootComponent as ConcreteComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config
          },
          set config(v) {
            if (__DEV__) {
              warn(
                'app.config cannot be replaced. Modify individual options instead.'
              )
            }
          },
          use(plugin: Plugin, ...options: any[]) {},
          mixin(mixin: ComponentOptions) {},
          component(name: string, component?: Component): any {},
          directive(name: string, directive?: Directive) {},
          mount(
            rootContainer: HostElement,
            isHydrate?: boolean,
            isSVG?: boolean
          ): any {},
          unmount() {},
          provide(key, value) {}
        if (__COMPAT__) {
          installAppCompatProperties(app, context, render)
        }
        return app
      }
    }\`\`\``;

export const CREATE_APP_CONTEXT = `\`\`\`js 
export function createAppContext(): AppContext {
      return {
        app: null as any,
        config: {
          isNativeTag: NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: undefined,
          warnHandler: undefined,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap()
      }
    }\`\`\``;

export const DEFINE_COMPONENT = `\`\`\`js 
// implementation, close to no-op
export function defineComponent(options: unknown) {
  return isFunction(options) ? { setup: options, name: options.name } : options
}\`\`\``;

export const H = `\`\`\`js 
// Actual implementation
export function h(type: any, propsOrChildren?: any, children?: any): VNode {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // single vnode without props
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren])
      }
      // props without children
      return createVNode(type, propsOrChildren)
    } else {
      // omit props
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2)
    } else if (l === 3 && isVNode(children)) {
      children = [children]
    }
    return createVNode(type, propsOrChildren, children)
  }
}\`\`\``;

export const CREATE_VNODE = `\`\`\`js 
export const createVNode = (
      __DEV__ ? createVNodeWithArgsTransform : _createVNode
    ) as typeof _createVNode
    
    function _createVNode(
      type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
      props: (Data & VNodeProps) | null = null,
      children: unknown = null,
      patchFlag: number = 0,
      dynamicProps: string[] | null = null,
      isBlockNode = false
    ): VNode {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        if (__DEV__ && !type) {
          warn('Invalid vnode type when creating vnode: ' + type)
        }
        type = Comment
      }
      if (isVNode(type)) {
        // createVNode receiving an existing vnode. This happens in cases like
        // <component :is="vnode"/>
        // #2078 make sure to merge refs during the clone instead of overwriting it
        const cloned = cloneVNode(type, props, true /* mergeRef: true */)
        if (children) {
          normalizeChildren(cloned, children)
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & ShapeFlags.COMPONENT) {
            currentBlock[currentBlock.indexOf(type)] = cloned
          } else {
            currentBlock.push(cloned)
          }
        }
        cloned.patchFlag |= PatchFlags.BAIL
        return cloned
      }
      // class component normalization.
      if (isClassComponent(type)) {
        type = type.__vccOpts
      }
      // 2.x async/functional component compat
      if (__COMPAT__) {
        type = convertLegacyComponent(type, currentRenderingInstance)
      }
      // class & style normalization.
      if (props) {
        // for reactive or proxy objects, we need to clone it to enable mutation.
        props = guardReactiveProps(props)!
        let { class: klass, style } = props
        if (klass && !isString(klass)) {
          props.class = normalizeClass(klass)
        }
        if (isObject(style)) {
          // reactive state objects need to be cloned since they are likely to be
          // mutated
          if (isProxy(style) && !isArray(style)) {
            style = extend({}, style)
          }
          props.style = normalizeStyle(style)
        }
      }
      // encode the vnode type information into a bitmap
      const shapeFlag = isString(type)
        ? ShapeFlags.ELEMENT
        : __FEATURE_SUSPENSE__ && isSuspense(type)
        ? ShapeFlags.SUSPENSE
        : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
        ? ShapeFlags.STATEFUL_COMPONENT
        : isFunction(type)
        ? ShapeFlags.FUNCTIONAL_COMPONENT
        : 0
      if (__DEV__ && shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isProxy(type)) {
        type = toRaw(type)
        warn(
          'Vue received a Component which was made a reactive object. This can ' +
            'lead to unnecessary performance overhead, and should be avoided by ' +
            'marking the component with \'markRaw\' or using \'shallowRef\' ' +
            'instead of \'ref\'.',
          '\nComponent that was made reactive: ',
          type
        )
      }
      return createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        isBlockNode,
        true
      )
    }\`\`\``;

export const CREATE_BASE_VNODE = `\`\`\`js 
function createBaseVNode(
      type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
      props: (Data & VNodeProps) | null = null,
      children: unknown = null,
      patchFlag = 0,
      dynamicProps: string[] | null = null,
      shapeFlag = type === Fragment ? 0 : ShapeFlags.ELEMENT,
      isBlockNode = false,
      needFullChildrenNormalization = false
    ) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null
      } as VNode
    
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children)
        // normalize suspense children
        if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
          ;(type as typeof SuspenseImpl).normalize(vnode)
        }
      } else if (children) {
        // compiled element vnode - if children is passed, only possible types are
        // string or Array.
        vnode.shapeFlag |= isString(children)
          ? ShapeFlags.TEXT_CHILDREN
          : ShapeFlags.ARRAY_CHILDREN
      }
      // validate key
      if (__DEV__ && vnode.key !== vnode.key) {
        warn('VNode created with invalid key (NaN). VNode type:', vnode.type)
      }
      // track vnode for block tree
      if (
        isBlockTreeEnabled > 0 &&
        // avoid a block node from tracking itself
        !isBlockNode &&
        // has current parent block
        currentBlock &&
        // presence of a patch flag indicates this node needs patching on updates.
        // component nodes also should always be patched, because even if the
        // component doesn't need to update, it needs to persist the instance on to
        // the next vnode so that it can be properly unmounted later.
        // patchFlag的存在表示节点需要更新，组件节点一直存在patchFlag，因为即使不需要更新，它需要继续保存实例到下一个VNode后续可以正确卸载它
        (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
        // the EVENTS flag is only for hydration and if it is the only flag, the
        // vnode should not be considered dynamic due to handler caching.
        vnode.patchFlag !== PatchFlags.HYDRATE_EVENTS
      ) {
        currentBlock.push(vnode)
      }
      if (__COMPAT__) {
        convertLegacyVModelProps(vnode)
        defineLegacyVNodeProperties(vnode)
      }
      return vnode
    }\`\`\``;

export const NEXTTICK = `\`\`\`js 
export function nextTick<T = void>(
      this: T,
      fn?: (this: T) => void
    ): Promise<void> {
      const p = currentFlushPromise || resolvedPromise
      return fn ? p.then(this ? fn.bind(this) : fn) : p
    }\`\`\``;

export const QUEUE_JOB = `\`\`\`js export function queueJob(job: SchedulerJob) {
          // the dedupe search uses the startIndex argument of Array.includes()
          // by default the search index includes the current job that is being run
          // so it cannot recursively trigger itself again.
          // if the job is a watch() callback, the search will start with a +1 index to
          // allow it recursively trigger itself - it is the user's responsibility to
          // ensure it doesn't end up in an infinite loop.
          if (
            !queue.length ||
            !queue.includes(
              job,
              isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
            )
          ) {
            if (job.id == null) {
              queue.push(job)
            } else {
              queue.splice(findInsertionIndex(job.id), 0, job)
            }
            queueFlush()
          }
        }
        export function queuePostFlushCb(cb: SchedulerJobs) {
          if (!isArray(cb)) {
            if (
              !activePostFlushCbs ||
              !activePostFlushCbs.includes(
                cb,
                cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
              )
            ) {
              pendingPostFlushCbs.push(cb)
            }
          } else {
            // if cb is an array, it is a component lifecycle hook which can only be
            // triggered by a job, which is already deduped in the main queue, so
            // we can skip duplicate check here to improve perf
            pendingPostFlushCbs.push(...cb)
          }
          queueFlush()
}\`\`\``;

export const QUEUE_FLUSH = `\`\`\`js 
function queueFlush() {
              if (!isFlushing && !isFlushPending) {
                isFlushPending = true
                currentFlushPromise = resolvedPromise.then(flushJobs)
              }
}\`\`\``;

export const FLUSH_JOBS = `\`\`\`js 
function flushJobs(seen?: CountMap) {
      isFlushPending = false
      isFlushing = true
      if (__DEV__) {
        seen = seen || new Map()
      }
    
      // Sort queue before flush.
      // This ensures that:
      // 1. Components are updated from parent to child. (because parent is always
      //    created before the child so its render effect will have smaller
      //    priority number)
      // 2. If a component is unmounted during a parent component's update,
      //    its update can be skipped.
      queue.sort(comparator)
      // conditional usage of checkRecursiveUpdate must be determined out of
      // try ... catch block since Rollup by default de-optimizes treeshaking
      // inside try-catch. This can leave all warning code unshaked. Although
      // they would get eventually shaken by a minifier like terser, some minifiers
      // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
      const check = __DEV__
        ? (job: SchedulerJob) => checkRecursiveUpdates(seen!, job)
        : NOOP
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex]
          if (job && job.active !== false) {
            if (__DEV__ && check(job)) {
              continue
            }
            // console.log('running:', job.id)
            callWithErrorHandling(job, null, ErrorCodes.SCHEDULER)
          }
        }
      } finally {
        flushIndex = 0
        queue.length = 0
        flushPostFlushCbs(seen)
        isFlushing = false
        currentFlushPromise = null
        // some postFlushCb queued jobs!
        // keep flushing until it drains.
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs(seen)
        }
      }
}\`\`\``;

export const EFFECT = `\`\`\`js 
    // create reactive effect for rendering
    const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope // track it in component's effect scope
    ))\`\`\``;

export const REACTIVE_EFFECT = `\`\`\`js 
export class ReactiveEffect<T = any> {
    constructor(
        public fn: () => T,
        public scheduler: EffectScheduler | null = null,
        scope?: EffectScope
      ) {
        recordEffectScope(this, scope)
      }
    }
    \`\`\``;

export const TRIGGER_EFFECT = `\`\`\`js
export function triggerEffects(
    dep: Dep | ReactiveEffect[],
    debuggerEventExtraInfo?: DebuggerEventExtraInfo
  ) {
    // spread into array for stabilization
    const effects = isArray(dep) ? dep : [...dep]
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo)
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect, debuggerEventExtraInfo)
      }
    }
  }
  
  function triggerEffect(
    effect: ReactiveEffect,
    debuggerEventExtraInfo?: DebuggerEventExtraInfo
  ) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (__DEV__ && effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo))
      }
      if (effect.scheduler) {
        effect.scheduler()
      } else {
        effect.run()
      }
    }
  }\`\`\``;

export const REACTIVE = `\`\`\`js 
export function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
export function reactive(target: object) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (isReadonly(target)) {
    return target
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}\`\`\``;

export const CREATE_REACTIVE_OBJECT = `\`\`\`js 
function createReactiveObject(
      target: Target,
      isReadonly: boolean,
      baseHandlers: ProxyHandler<any>,
      collectionHandlers: ProxyHandler<any>,
      proxyMap: WeakMap<Target, any>
    ) {
      if (!isObject(target)) {
        if (__DEV__) {
          console.warn('value cannot be made reactive:'+String(target))
        }
        return target
      }
      // target is already a Proxy, return it.
      // exception: calling readonly() on a reactive object
      if (
        target[ReactiveFlags.RAW] &&
        !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
      ) {
        return target
      }
      // target already has corresponding Proxy
      const existingProxy = proxyMap.get(target)
      if (existingProxy) {
        return existingProxy
      }
      // only specific value types can be observed.
      const targetType = getTargetType(target)
      if (targetType === TargetType.INVALID) {
        return target
      }
      const proxy = new Proxy(
        target,
        targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
      )
      proxyMap.set(target, proxy)
      return proxy
}\`\`\``;

export const TARGET_TYPE_MAP = `\`\`\`js 
function targetTypeMap(rawType: string) {
          switch (rawType) {
            case 'Object':
            case 'Array':
              return TargetType.COMMON
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
              return TargetType.COLLECTION
            default:
              return TargetType.INVALID
          }
        }
        
        function getTargetType(value: Target) {
          return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
            ? TargetType.INVALID
            : targetTypeMap(toRawType(value))
}\`\`\``;

export const REF = `\`\`\`js 
export function ref<T extends object>(
  value: T
): [T] extends [Ref] ? T : Ref<UnwrapRef<T>>
export function ref<T>(value: T): Ref<UnwrapRef<T>>
export function ref<T = any>(): Ref<T | undefined>
export function ref(value?: unknown) {
  return createRef(value, false)
}\`\`\``;

export const CREATE_REF = `\`\`\`js 
function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {//如果是ref类型直接返回
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

class RefImpl<T> {
  private _value: T //当前值
  private _rawValue: T //原始值

  public dep?: Dep = undefined
  public readonly __v_isRef = true

  //如果shallow为true，就直接观察
  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = __v_isShallow ? value : toRaw(value)
    this._value = __v_isShallow ? value : toReactive(value) //如果是对象直接使用reactive
  }

  get value() {
    trackRefValue(this) //依赖收集
    return this._value
  }

  set value(newVal) {
    const useDirectValue =
      this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) { //如果值发生了变化，触发响应式修改
      this._rawValue = newVal
      this._value = useDirectValue ? newVal : toReactive(newVal) //如果是对象直接使用reactive
      triggerRefValue(this, newVal) 
    }
  }
}\`\`\``;

export const MUTABLE_HANDLERS = `\`\`\`js 
export const mutableHandlers: ProxyHandler<object> = {
  get, //拦截属性读取操作
  set, //拦截属性写操作
  deleteProperty, //拦截属性删除操作
  has, //检查是否拥有某个属性
  ownKeys // 针对 getOwnPropertyNames,  getOwnPropertySymbols, keys 的代理方法
}\`\`\``;

export const MUTABLE_GET = `\`\`\`js 
const get = /*#__PURE__*/ createGetter()

function createGetter(isReadonly = false, shallow = false) {
  /**
   * @param {target} 目标对象
   * @param {key} 目标key值
   * @param {receiver} this设置为recevier
   */
  return function get(target: Target, key: string | symbol, receiver: object) {
    // ReactiveFlags是reactive内部的枚举值，如果key是枚举值直接返回对应的布尔值
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlags.IS_SHALLOW) {
      return shallow
    } else if ( //如果key是raw，直接返回目标对象
      key === ReactiveFlags.RAW &&
      receiver ===
        (isReadonly
          ? shallow
            ? shallowReadonlyMap
            : readonlyMap
          : shallow
          ? shallowReactiveMap
          : reactiveMap
        ).get(target)
    ) {
      return target
    }

    const targetIsArray = isArray(target)

    //触发的是['includes', 'indexOf', 'lastIndexOf']三个数组操作之一
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)
    //key是symbol，直接返回结果
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res
    }

    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key)
    }
    //如果是潜观察，返回结果
    if (shallow) {
      return res
    }

    if (isRef(res)) {
      // ref unwrapping - skip unwrap for Array + integer key.
      return targetIsArray && isIntegerKey(key) ? res : res.value
    }
    //proxy只能代理一层，如果res是对象，就继续代理
    if (isObject(res)) {
      // Convert returned value into a proxy as well. we do the isObject check
      // here to avoid invalid value warning. Also need to lazy access readonly
      // and reactive here to avoid circular dependency.
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}

const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations()

function createArrayInstrumentations() {
  const instrumentations: Record<string, Function> = {}
  // instrument identity-sensitive Array methods to account for possible reactive
  // values
  ;(['includes', 'indexOf', 'lastIndexOf'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      const arr = toRaw(this) as any
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, TrackOpTypes.GET, i + '')
      }
      // we run the method using the original args first (which may be reactive)
      const res = arr[key](...args)
      if (res === -1 || res === false) {
        // if that didn't work, run it again using raw values.
        return arr[key](...args.map(toRaw))
      } else {
        return res
      }
    }
  })
  // instrument length-altering mutation methods to avoid length being tracked
  // which leads to infinite loops in some cases (#2137)
  ;(['push', 'pop', 'shift', 'unshift', 'splice'] as const).forEach(key => {
    instrumentations[key] = function (this: unknown[], ...args: unknown[]) {
      pauseTracking()
      const res = (toRaw(this) as any)[key].apply(this, args)
      resetTracking()
      return res
    }
  })
  return instrumentations
}
\`\`\``;
export const MUTABLE_SET = `\`\`\`js
const set = /*#__PURE__*/ createSetter()
const shallowSet = /*#__PURE__*/ createSetter(true)

function createSetter(shallow = false) {
  /**
   * @param {target} 目标对象
   * @param {key} 属性名
   * @param {value} 属性值
   * @param {receiver} this 
   */
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    let oldValue = (target as any)[key]
    // 如果是只读属性且旧值是ref新值不是，不能修改
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue)
        value = toRaw(value)
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value
        return true
      }
    } else {
      // in shallow mode, objects are set as-is regardless of reactive or not
    }
    //检查target是否有这个key
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key)
    //赋值
    const result = Reflect.set(target, key, value, receiver)
    // don't trigger if target is something up in the prototype chain of original
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        //如果不存在就trigger ADD
        trigger(target, TriggerOpTypes.ADD, key, value)
      } else if (hasChanged(value, oldValue)) {
        //存在就trigger SET
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }
    }
    return result
  }
}\`\`\``;
export const MUTABLE_OTHER = `\`\`\`js
function deleteProperty(target: object, key: string | symbol): boolean {
  const hadKey = hasOwn(target, key)
  const oldValue = (target as any)[key]
  const result = Reflect.deleteProperty(target, key)
  //如果key存在且删除成功，则调用trigger
  if (result && hadKey) {
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue)
  }
  return result
}

function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key)
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, TrackOpTypes.HAS, key)
  }
  return result
}

function ownKeys(target: object): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE, isArray(target) ? 'length' : ITERATE_KEY)
  return Reflect.ownKeys(target)
}\`\`\``;

export const EFFECT_1 = `\`\`\`js
export interface DebuggerOptions {
  onTrack?: (event: DebuggerEvent) => void //追踪时触发
  onTrigger?: (event: DebuggerEvent) => void //触发回调时触发
}

export interface ReactiveEffectOptions extends DebuggerOptions {
  lazy?: boolean //是否延迟触发 effect
  scheduler?: EffectScheduler //调度函数
  scope?: EffectScope
  allowRecurse?: boolean
  onStop?: () => void //停止监听时触发
}

export interface ReactiveEffectRunner<T = any> {
  (): T
  effect: ReactiveEffect
}

export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner {
  // 如果已经是effect，先重置
  if ((fn as ReactiveEffectRunner).effect) {
    fn = (fn as ReactiveEffectRunner).effect.fn
  }
  // 创建effect
  const _effect = new ReactiveEffect(fn)
  if (options) {
    extend(_effect, options)
    if (options.scope) recordEffectScope(_effect, options.scope)
  }
  // 如果没传lazy，直接执行一次effect
  if (!options || !options.lazy) {
    _effect.run()
  }
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner
  runner.effect = _effect
  return runner
}\`\`\``;

export const RECORD_EFFECT_SCOPE = `\`\`\`js
export function recordEffectScope(
  effect: ReactiveEffect,
  scope: EffectScope | undefined = activeEffectScope
) {
  if (scope && scope.active) {
    scope.effects.push(effect)
  }
}\`\`\``;

export const TRACK = `\`\`\`js
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (shouldTrack && activeEffect) {
    // targetMap用于收集和触发依赖
    let depsMap = targetMap.get(target)
    //检查targetMap是否存在target
    if (!depsMap) {
      //如果为空则新建一个
      targetMap.set(target, (depsMap = new Map()))
    }
    //deps收集依赖函数，当key值发生变化时，触发dep中的依赖函数
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = createDep()))
    }

    const eventInfo = __DEV__
      ? { effect: activeEffect, target, type, key }
      : undefined

    trackEffects(dep, eventInfo)
  }
}

export function trackEffects(
  dep: Dep,
  debuggerEventExtraInfo?: DebuggerEventExtraInfo
) {
  let shouldTrack = false
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit // set newly tracked
      shouldTrack = !wasTracked(dep)
    }
  } else {
    // Full cleanup mode.
    shouldTrack = !dep.has(activeEffect!)
  }

  if (shouldTrack) {
    dep.add(activeEffect!)
    activeEffect!.deps.push(dep)
    if (__DEV__ && activeEffect!.onTrack) {
      activeEffect!.onTrack({
        effect: activeEffect!,
        ...debuggerEventExtraInfo!
      })
    }
  }
}\`\`\``;

export const TRIGGER = `\`\`\`js
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  const depsMap = targetMap.get(target)
  //如果depsMap为空，代表没有收集过该依赖，直接返回
  if (!depsMap) {
    // never been tracked
    return
  }

  let deps: (Dep | undefined)[] = []
  if (type === TriggerOpTypes.CLEAR) {
    // collection being cleared
    // trigger all effects for target
    deps = [...depsMap.values()]
  } else if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      if (key === 'length' || key >= (newValue as number)) {
        deps.push(dep)
      }
    })
  } else {
    // schedule runs for SET | ADD | DELETE
    if (key !== void 0) {
      deps.push(depsMap.get(key))
    }

    // also run for iteration key on ADD | DELETE | Map.SET
    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        } else if (isIntegerKey(key)) {
          // new index added to array -> length changes
          deps.push(depsMap.get('length'))
        }
        break
      case TriggerOpTypes.DELETE:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY))
          }
        }
        break
      case TriggerOpTypes.SET:
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY))
        }
        break
    }
  }

  const eventInfo = __DEV__
    ? { target, type, key, newValue, oldValue, oldTarget }
    : undefined

  if (deps.length === 1) {
    if (deps[0]) {
      if (__DEV__) {
        triggerEffects(deps[0], eventInfo)
      } else {
        triggerEffects(deps[0])
      }
    }
  } else {
    const effects: ReactiveEffect[] = []
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep)
      }
    }
    if (__DEV__) {
      triggerEffects(createDep(effects), eventInfo)
    } else {
      triggerEffects(createDep(effects))
    }
  }
}\`\`\``;

export const COMPUTED = `\`\`\`ts
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>,
  debugOptions?: DebuggerOptions,
  isSSR = false
) {
  let getter: ComputedGetter<T>
  let setter: ComputedSetter<T>
  //判断是否只传了一个函数，如果是，那就把setter设置为空函数
  const onlyGetter = isFunction(getterOrOptions)
  if (onlyGetter) {
    getter = getterOrOptions
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly')
        }
      : NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR)

  if (__DEV__ && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack
    cRef.effect.onTrigger = debugOptions.onTrigger
  }

  return cRef as any
}\`\`\``;

export const COMPUTED_REF_IMPL = `\`\`\`ts
export class ComputedRefImpl<T> {
  public dep?: Dep = undefined

  private _value!: T
  public readonly effect: ReactiveEffect<T>

  public readonly __v_isRef = true
  public readonly [ReactiveFlags.IS_READONLY]: boolean = false

  public _dirty = true
  public _cacheable: boolean

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean,
    isSSR: boolean
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      // 触发更新时，将dirty设为true，不会立即更新
      if (!this._dirty) {
        this._dirty = true
        triggerRefValue(this)
      }
    })
    this.effect.computed = this
    this.effect.active = this._cacheable = !isSSR
    this[ReactiveFlags.IS_READONLY] = isReadonly
  }

  get value() {
    // the computed ref may get wrapped by other proxies e.g. readonly() #3376
    const self = toRaw(this)
    trackRefValue(self)
    // 如果dirty为true，才需要重新run
    if (self._dirty || !self._cacheable) {
      self._dirty = false
      self._value = self.effect.run()!
    }
    return self._value
  }

  set value(newValue: T) {
    this._setter(newValue)
  }
}\`\`\``;

export const PATCH = `\`\`\`ts
// Note: functions inside this closure should use 'const xxx = () => {}'
// style in order to prevent being inlined by minifiers.
const patch: PatchFn = (
  n1, // 旧节点
  n2, // 新节点
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  slotScopeIds = null,
  optimized = __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren
) => {
  // 如果新旧节点一样，退出patch
  if (n1 === n2) {
    return
  }

  // 旧节点跟新节点类型不同，直接卸载旧节点
  // patching & not same type, unmount old tree
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1)
    unmount(n1, parentComponent, parentSuspense, true)
    n1 = null
  }

  // 新节点patchFlag设置为PatchFlags.BAIL，表示无需优化
  if (n2.patchFlag === PatchFlags.BAIL) {
    optimized = false
    n2.dynamicChildren = null
  }

  const { type, ref, shapeFlag } = n2
  // 按新节点类型来处理
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor)
      break
    case Comment:
      processCommentNode(n1, n2, container, anchor)
      break
    case Static:
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, isSVG)
      } else if (__DEV__) {
        patchStaticNode(n1, n2, container, isSVG)
      }
      break
    case Fragment:
      processFragment(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        ;(type as typeof TeleportImpl).process(
          n1 as TeleportVNode,
          n2 as TeleportVNode,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized,
          internals
        )
      } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
        ;(type as typeof SuspenseImpl).process(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized,
          internals
        )
      } else if (__DEV__) {
        warn('Invalid VNode type:', type, typeof type)
      }
  }

  // set ref
  if (ref != null && parentComponent) {
    setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
  }
}\`\`\``;

export const PATCH_CHILDREN = `\`\`\`ts
const patchChildren: PatchChildrenFn = (
  n1,
  n2,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  slotScopeIds,
  optimized = false
) => {
  const c1 = n1 && n1.children
  const prevShapeFlag = n1 ? n1.shapeFlag : 0
  const c2 = n2.children

  const { patchFlag, shapeFlag } = n2
  // fast path
  if (patchFlag > 0) {
    if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
      // this could be either fully-keyed or mixed (some keyed some not)
      // presence of patchFlag means children are guaranteed to be arrays
      patchKeyedChildren(
        c1 as VNode[],
        c2 as VNodeArrayChildren,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      return
    } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
      // unkeyed
      patchUnkeyedChildren(
        c1 as VNode[],
        c2 as VNodeArrayChildren,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
      return
    }
  }

  // children has 3 possibilities: text, array or no children.
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text children fast path
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
    }
    if (c2 !== c1) {
      hostSetElementText(container, c2 as string)
    }
  } else {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // prev children was array
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // two arrays, cannot assume anything, do full diff
        patchKeyedChildren(
          c1 as VNode[],
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else {
        // no new children, just unmount old
        unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
      }
    } else {
      // prev children was text OR null
      // new children is array OR null
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, '')
      }
      // mount new if array
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(
          c2 as VNodeArrayChildren,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      }
    }
  }
}\`\`\``;

export const PATCH_KEYED_CHILDREN_SEQUENCE = `\`\`\`ts
// can be all-keyed or mixed
const patchKeyedChildren = (
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string[] | null,
  optimized: boolean
) => {
  let i = 0
  const l2 = c2.length
  let e1 = c1.length - 1 // prev ending index
  let e2 = l2 - 1 // next ending index

  // 首先从头开始遍历
  // 1. sync from start
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i]
    const n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]))
    if (isSameVNodeType(n1, n2)) { // 如果新旧节点类型相同直接patch
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    } else { // 不同则退出循环
      break
    }
    i++
  }

  // 针对性优化尾部节点可复用的情况
  // 2. sync from end
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1]
    const n2 = (c2[e2] = optimized
      ? cloneIfMounted(c2[e2] as VNode)
      : normalizeVNode(c2[e2]))
    if (isSameVNodeType(n1, n2)) {
      patch(
        n1,
        n2,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      )
    } else {
      break
    }
    e1--
    e2--
  }
  // 3. common sequence + mount 说明旧节点已遍历完，直接mount剩余新节点
  // (a b)
  // (a b) c
  // i = 2, e1 = 1, e2 = 2
  // (a b)
  // c (a b)
  // i = 0, e1 = -1, e2 = 0
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1
      const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
      while (i <= e2) {
        patch(
          null,
          (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i])),
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        i++
      }
    }
  }

  // 4. common sequence + unmount 说明新节点已遍历完，卸载剩余旧节点
  // (a b) c
  // (a b)
  // i = 2, e1 = 2, e2 = 1
  // a (b c)
  // (b c)
  // i = 0, e1 = 0, e2 = -1
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentComponent, parentSuspense, true)
      i++
    }
  }

  // 5. unknown sequence 
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    const s1 = i // prev starting index
    const s2 = i // next starting index
    // 首先遍历剩余新节点组成map，key不变，value为下标
    // 5.1 build key:index map for newChildren
    const keyToNewIndexMap: Map<string | number | symbol, number> = new Map()
    for (i = s2; i <= e2; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i] as VNode)
        : normalizeVNode(c2[i]))
      if (nextChild.key != null) { // key不能为空
        if (__DEV__ && keyToNewIndexMap.has(nextChild.key)) {
          warn(
            'Duplicate keys found during update:',
            JSON.stringify(nextChild.key),
            'Make sure keys are unique.'
          )
        }
        keyToNewIndexMap.set(nextChild.key, i)
      }
    }
    // 遍历剩余旧节点
    // 5.2 loop through old children left to be patched and try to patch
    // matching nodes & remove nodes that are no longer present
    let j
    let patched = 0
    const toBePatched = e2 - s2 + 1
    let moved = false
    // used to track whether any node has moved
    let maxNewIndexSoFar = 0
    // works as Map<newIndex, oldIndex>
    // Note that oldIndex is offset by +1
    // and oldIndex = 0 is a special value indicating the new node has
    // no corresponding old node.
    // used for determining longest stable subsequence
    const newIndexToOldIndexMap = new Array(toBePatched)
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i]
      if (patched >= toBePatched) {
        // all new children have been patched so this can only be a removal
        unmount(prevChild, parentComponent, parentSuspense, true)
        continue
      }
      let newIndex
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key)
      } else {
        // key-less node, try to locate a key-less node of the same type
        for (j = s2; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j - s2] === 0 &&
            isSameVNodeType(prevChild, c2[j] as VNode)
          ) {
            newIndex = j
            break
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild, parentComponent, parentSuspense, true)
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i + 1
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex
        } else {
          moved = true
        }
        patch(
          prevChild,
          c2[newIndex] as VNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
        patched++
      }
    }

    // 5.3 move and mount
    // generate longest stable subsequence only when nodes have moved
    const increasingNewIndexSequence = moved
      ? getSequence(newIndexToOldIndexMap)
      : EMPTY_ARR
    j = increasingNewIndexSequence.length - 1
    // looping backwards so that we can use last patched node as anchor
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i
      const nextChild = c2[nextIndex] as VNode
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
      if (newIndexToOldIndexMap[i] === 0) {
        // mount new
        patch(
          null,
          nextChild,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        )
      } else if (moved) {
        // move if:
        // There is no stable subsequence (e.g. a reverse)
        // OR current node is not among the stable sequence
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER)
        } else {
          j--
        }
      }
    }
  }
}\`\`\``;

export const GET_SEQUENCE = `\`\`\`ts
export const getSequence = (arr: number[]) => {
  const p = arr.slice() // 记录每个元素在最长递增子序列的前一个元素的索引

  const result = [0] // 记录最长递增子序列的索引，初始化为第一个元素的索引0
  let i, j, u, v, c // 临时变量

  const len = arr.length

  /**
   * 遍历数组arr
   * 对于每个元素arrI,如果arrI不等于0,进行如下操作
   * 获取result数组的最后一个元素的索引j
   * 如果arr[j] < arrI，则arrI可以直接添加到最长递增子序列的末尾。将p[i]设置为j，
   * 表示arrI在最长递增子序列的前一个元素是arr[j]，然后将i添加到result数组中。
   * 如果不能添加到末尾，则使用二分查找找到result数组中第一个大于等于arrI的元素的索引u，
   * 如果u大于0，则将p[i]设置为result[u-1]，表示arrI在最长递增子序列的前一个元素是result[u-1]
   * 然后将result[u]设置为i
   * 最后回溯构建最长递增子序列
   */
  for (i = 0; i < len; i++) {
    const arrI = arr[i]
    if (arrI !== 0) {
      j = result[result.length - 1]
      if (arr[j] < arrI) {
        p[i] = j
        result.push(i)
        continue
      }
      u = 0
      v = result.length - 1
      while (u < v) {
        c = (u + v) >> 1
        if (arr[result[c]] < arrI) {
          u = c + 1
        } else {
          v = c
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1]
        }
        result[u] = i
      }
    }
  }
  u = result.length
  v = result[u - 1]
  while (u-- > 0) {
    result[u] = v
    v = p[v]
  }
  return result
}

\`\`\``;
