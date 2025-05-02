import{j as e,d as r}from"./index-e7a72d43.js";import{A as u}from"./Anchor-dd99810c.js";import{U as t}from"./useMarkdown-8e9f0c87.js";const p=`\`\`\`js
export function initState (vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch)
    }
  }
\`\`\``,m=`\`\`\`js
const computedWatcherOptions = { lazy: true }

function initComputed (vm: Component, computed: Object) {
    // $flow-disable-line
    const watchers = vm._computedWatchers = Object.create(null)
    // computed properties are just getters during SSR
    const isSSR = isServerRendering()
  
    for (const key in computed) {
      const userDef = computed[key]
      const getter = typeof userDef === 'function' ? userDef : userDef.get
  
      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions //{lazy: true} 缓存标记
        )
      }
  
      if (!(key in vm)) {
        defineComputed(vm, key, userDef)
      }
    }
  }
\`\`\``,f=`\`\`\`js
export function defineComputed (
    target: any,
    key: string,
    userDef: Object | Function
  ) {
    const shouldCache = !isServerRendering()
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef)
      sharedPropertyDefinition.set = noop
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop
      sharedPropertyDefinition.set = userDef.set || noop
    }

    Object.defineProperty(target, key, sharedPropertyDefinition)
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      const watcher = this._computedWatchers && this._computedWatchers[key]
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate()
        }
        if (Dep.target) {
          watcher.depend()
        }
        return watcher.value
      }
    }
  }
  
  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }
\`\`\``,j=`\`\`\`js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
\`\`\``,x=`\`\`\`js
function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
\`\`\``,y=`\`\`\`js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
\`\`\``,v=`\`\`\`js
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, 'callback for immediate watcher ' + watcher.expression)
    }
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
\`\`\``,w=`\`\`\`js
/**
 * Evaluate the getter, and re-collect dependencies.
 */
get () {
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, 'getter for watcher ' + this.expression)
    } else {
      throw e
    }
  } finally {
    // 如果deep为true，遍历对象，将每一个属性都添加监听
    if (this.deep) {
      traverse(value)
    }
    popTarget()
    this.cleanupDeps()
  }
  return value
}
\`\`\``,k=`\`\`\`js
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
run () {
  if (this.active) {
    const value = this.get()
    if (
      value !== this.value ||
      // 当watch的目标是对象或数组时或者deep为true时，即使触发get获取到的值和this.value一样也会执行回调函数
      isObject(value) ||
      this.deep
    ) {
      // set new value
      const oldValue = this.value
      this.value = value
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          handleError(e, this.vm, 'callback for watcher ' + this.expression)
        }
      } else {
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
\`\`\``;function C(){const c=e.jsx(t,{markdown:p}),n=e.jsx(t,{markdown:m}),i=e.jsx(t,{markdown:f}),o=e.jsx(t,{markdown:j}),s=e.jsx(t,{markdown:x}),a=e.jsx(t,{markdown:v}),h=e.jsx(t,{markdown:y}),d=e.jsx(t,{markdown:k}),l=e.jsx(t,{markdown:w});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"pre",className:r.articleTitle,children:"computed和watch"}),"在组件中两者都可以获取到更新后的值，那么它们各自有什么特点，区别在哪呢？",e.jsx("br",{}),"我们从源码来看一下。 首先从入口函数",e.jsx("code",{children:"initState"}),"开始，先初始化",e.jsx("code",{children:"data"}),"，再初始化computed和watch(如果有的话)",e.jsx("div",{className:r.assist,children:"src\\core\\instance\\state.js"}),c,e.jsx("h2",{id:"computed",className:r.articleTitle,children:"computed"}),e.jsx("code",{children:"initState"}),"首先调用了",e.jsx("code",{children:"initComputed"}),",遍历computed给每一个key都加上",e.jsx("code",{children:"Watcher"}),"。遍历过程中如果vm中没有这个key，调用",e.jsx("code",{children:"defineComputed(vm, key, userDef)"}),"添加上该计算属性",n,"首先判断是不是SSR，如果不是就调用",e.jsx("code",{children:"createComputedGetter"}),"，是就调用",e.jsx("code",{children:"createGetterInvoker"}),"，两者的区别就是后者不涉及watcher。",e.jsx("br",{}),e.jsx("code",{children:"dirty"}),"就是定义Watcher时传入的",e.jsx("code",{children:"lazy"}),"，标识计算属性需要缓存，如果dirty是true(每次触发update会设置为true)，那么获取计算属性值时才需要调用",e.jsx("code",{children:"watcher.evaluate()"}),"，执行完成后将dirty再次设为false， ,否则直接return ",e.jsx("code",{children:"watcher.value"}),"。",i,e.jsx("code",{children:"sharedPropertyDefinition"}),"是全局变量,它是",e.jsx("code",{children:"Object.defineProperty"}),"的公共配置参数。在",e.jsx("code",{children:"initProps,initData"}),"通过",e.jsx("code",{children:"proxy"}),"函数统一定义属性。",o,e.jsx("h2",{id:"watch",className:r.articleTitle,children:"watch"}),"遍历watch属性，调用",e.jsx("code",{children:"createWatcher"}),s,"调用",e.jsx("code",{children:"$watch"}),"创建Watcher，",e.jsx("code",{children:"$watch"}),"在",e.jsx("code",{children:"stateMixin"}),"中被添加到Vue原型上。",e.jsx("br",{}),h,e.jsx("code",{children:"$watch"}),"会设置",e.jsx("code",{children:"options.user = true"}),"，以表示当前watcher是watch类型。可以看到watch基本上跟",e.jsx("code",{children:"computed"}),"类似，只是细节上的区别。",a,e.jsx("h2",{id:"summary",className:r.articleTitle,children:"总结"}),e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"最显著的区别：computed保存了计算结果，可以直接使用。而watch只是将旧值和新值传入并执行回调函数"}),e.jsxs("li",{children:["computed可以定义",e.jsx("code",{children:"get,set"}),"属性，watch不支持。"]}),e.jsxs("li",{children:["watch支持",e.jsx("code",{children:"immediate"}),"，可以传入当前值watcher.value立即执行一次回调函数。"]}),e.jsx("li",{children:"computed支持缓存，在依赖没有变化的时候无需重新执行。watch不支持缓存，每次更新都会执行回调函数"}),e.jsxs("li",{children:["watch支持",e.jsx("code",{children:"deep"}),"属性 ，触发get时会遍历对象，将每一个属性都添加监听。",l]}),e.jsxs("li",{children:["当watch的目标是对象或数组时或者deep为true时，即使触发get获取到的值和this.value一样也会执行回调函数，而computed不会。",d]})]})]}),e.jsx(u,{items:[{title:"前言",key:"pre",href:"#pre"},{title:"computed",key:"computed",href:"#computed"},{title:"watch",key:"watch",href:"#watch"},{title:"总结",key:"summary",href:"#summary"}]})]})}export{C as default};
