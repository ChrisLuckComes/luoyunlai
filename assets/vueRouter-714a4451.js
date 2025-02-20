import{j as e,d as t}from"./index-058c629c.js";import{U as r}from"./useMarkdown-8861a8d5.js";import{A as d}from"./Anchor-75b3735e.js";import"./index-a0d8c73b.js";const m=`\`\`\`js
export function initUse(Vue: GlobalAPI) {
    Vue.use = function (plugin: Function | any) {
      const installedPlugins =
        this._installedPlugins || (this._installedPlugins = [])
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }
  
      // additional parameters
      const args = toArray(arguments, 1)
      args.unshift(this)
      // 判断是否有install属性
      if (isFunction(plugin.install)) {
        plugin.install.apply(plugin, args)
      } else if (isFunction(plugin)) {
        plugin.apply(null, args)
      }
      installedPlugins.push(plugin)
      return this
    }
  }
\`\`\``,f=`\`\`\`js
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  //使用mixin在每个组件都注入route对象，并且定义_route对象为响应式。
  Vue.mixin({
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  //在this上定义$router属性访问_router
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  //在this上定义$route属性访问_route
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })

  // 全局注册router-link和router-view组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}

\`\`\``,R=`\`\`\`js
export default class VueRouter {
    static install: () => void 
    static version: string
    static isNavigationFailure: Function
    static NavigationFailureType: any
    static START_LOCATION: Route
  
    app: any
    apps: Array<any>
    ready: boolean
    readyCbs: Array<Function>
    options: RouterOptions
    mode: string
    history: HashHistory | HTML5History | AbstractHistory
    matcher: Matcher
    fallback: boolean
    beforeHooks: Array<?NavigationGuard>
    resolveHooks: Array<?NavigationGuard>
    afterHooks: Array<?AfterNavigationHook>
  
    constructor (options: RouterOptions = {}) {
      this.app = null
      this.apps = []
      this.options = options
      this.beforeHooks = []
      this.resolveHooks = []
      this.afterHooks = []
      // 从options中取出路由配置并处理
      this.matcher = createMatcher(options.routes || [], this)
  
      let mode = options.mode || 'hash'
      this.fallback =
        mode === 'history' && !supportsPushState && options.fallback !== false
      if (this.fallback) {
        mode = 'hash'
      }
      if (!inBrowser) {
        mode = 'abstract'
      }
      this.mode = mode
  
      //根据路由模式来确定history对象
      switch (mode) {
        case 'history':
          this.history = new HTML5History(this, options.base)
          break
        case 'hash':
          this.history = new HashHistory(this, options.base, this.fallback)
          break
        case 'abstract':
          this.history = new AbstractHistory(this, options.base)
          break
        default:
          if ("production" !== 'production') {
            assert(false, 'invalid mode: '+ mode)
          }
      }
    }
  
    match (raw: RawLocation, current?: Route, redirectedFrom?: Location): Route {
      return this.matcher.match(raw, current, redirectedFrom)
    }
  
    get currentRoute (): ?Route {
      return this.history && this.history.current
    }
  
    init (app: any /* Vue component instance */) {
      this.apps.push(app)
  
      // set up app destroyed handler
      // https://github.com/vuejs/vue-router/issues/2639
      app.$once('hook:destroyed', () => {
        // clean out app from this.apps array once destroyed
        const index = this.apps.indexOf(app)
        if (index > -1) this.apps.splice(index, 1)
        // ensure we still have a main app or null if no apps
        // we do not release the router so it can be reused
        if (this.app === app) this.app = this.apps[0] || null
  
        if (!this.app) this.history.teardown()
      })
  
      // main app previously initialized
      // return as we don't need to set up new history listener
      if (this.app) {
        return
      }
  
      this.app = app
  
      const history = this.history
  
      if (history instanceof HTML5History || history instanceof HashHistory) {
        const handleInitialScroll = routeOrError => {
          const from = history.current
          const expectScroll = this.options.scrollBehavior
          const supportsScroll = supportsPushState && expectScroll
  
          if (supportsScroll && 'fullPath' in routeOrError) {
            handleScroll(this, routeOrError, from, false)
          }
        }
        const setupListeners = routeOrError => {
          history.setupListeners()
          handleInitialScroll(routeOrError)
        }
        history.transitionTo(
          history.getCurrentLocation(),
          setupListeners,
          setupListeners
        )
      }
  
      history.listen(route => {
        this.apps.forEach(app => {
          app._route = route
        })
      })
    }
  
    beforeEach (fn: Function): Function {
      return registerHook(this.beforeHooks, fn)
    }
  
    beforeResolve (fn: Function): Function {
      return registerHook(this.resolveHooks, fn)
    }
  
    afterEach (fn: Function): Function {
      return registerHook(this.afterHooks, fn)
    }
  
    push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
      // $flow-disable-line
      if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          this.history.push(location, resolve, reject)
        })
      } else {
        this.history.push(location, onComplete, onAbort)
      }
    }
  
    replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
      // $flow-disable-line
      if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          this.history.replace(location, resolve, reject)
        })
      } else {
        this.history.replace(location, onComplete, onAbort)
      }
    }
  
    go (n: number) {
      this.history.go(n)
    }
  
    back () {
      this.go(-1)
    }
  
    forward () {
      this.go(1)
    }
  
  }
}
\`\`\``,y=`\`\`\`js
export function createMatcher (
    routes: Array<RouteConfig>,
    router: VueRouter
  ): Matcher {
    // 调用createRouteMap，返回pathList,pathMap,nameMap
    const { pathList, pathMap, nameMap } = createRouteMap(routes)

    function addRoutes (routes) {
        createRouteMap(routes, pathList, pathMap, nameMap)
      }

    function addRoute (parentOrRoute, route) {
        const parent = (typeof parentOrRoute !== 'object') ? nameMap[parentOrRoute] : undefined
        // $flow-disable-line
        createRouteMap([route || parentOrRoute], pathList, pathMap, nameMap, parent)
    
        // add aliases of parent
        if (parent && parent.alias.length) {
          createRouteMap(
            // $flow-disable-line route is defined if parent is
            parent.alias.map(alias => ({ path: alias, children: [route] })),
            pathList,
            pathMap,
            nameMap,
            parent
          )
        }
    }

    function match (
        raw: RawLocation,
        currentRoute?: Route,
        redirectedFrom?: Location
      ): Route {
        const location = normalizeLocation(raw, currentRoute, false, router)
        const { name } = location
    
        if (name) {
          const record = nameMap[name]
          if ("production" !== 'production') {
            warn(record, 'Route with name '${name}' does not exist')
          }
          if (!record) return _createRoute(null, location)
          const paramNames = record.regex.keys
            .filter(key => !key.optional)
            .map(key => key.name)
    
          if (typeof location.params !== 'object') {
            location.params = {}
          }
    
          if (currentRoute && typeof currentRoute.params === 'object') {
            for (const key in currentRoute.params) {
              if (!(key in location.params) && paramNames.indexOf(key) > -1) {
                location.params[key] = currentRoute.params[key]
              }
            }
          }
    
          location.path = fillParams(record.path, location.params, 'named route "${name}"')
          return _createRoute(record, location, redirectedFrom)
        } else if (location.path) {
          location.params = {}
          for (let i = 0; i < pathList.length; i++) {
            const path = pathList[i]
            const record = pathMap[path]
            if (matchRoute(record.regex, location.path, location.params)) {
              return _createRoute(record, location, redirectedFrom)
            }
          }
        }
        // no match
        return _createRoute(null, location)
      }

    function getRoutes () {
        return pathList.map(path => pathMap[path])
    }

    return {
        match,
        addRoute,
        getRoutes,
        addRoutes
    }
}
\`\`\``,g=`\`\`\`js
export function createRouteMap (
    routes: Array<RouteConfig>,
    oldPathList?: Array<string>,
    oldPathMap?: Dictionary<RouteRecord>,
    oldNameMap?: Dictionary<RouteRecord>,
    parentRoute?: RouteRecord
  ): {
    pathList: Array<string>,
    pathMap: Dictionary<RouteRecord>,
    nameMap: Dictionary<RouteRecord>
  } {
    // pathList用来控制匹配优先级
    const pathList: Array<string> = oldPathList || []
    // $flow-disable-line
    const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
    // $flow-disable-line
    const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)
  
    //填充pathList,pathMap,nameMap
    routes.forEach(route => {
      addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)
    })
  
    // 保证通配符路由在最底部
    for (let i = 0, l = pathList.length; i < l; i++) {
      if (pathList[i] === '*') {
        pathList.push(pathList.splice(i, 1)[0])
        l--
        i--
      }
    }
  
    return {
      pathList,
      pathMap,
      nameMap
    }
  }
\`\`\``,b=`\`\`\`js
function addRouteRecord (
    pathList: Array<string>,
    pathMap: Dictionary<RouteRecord>,
    nameMap: Dictionary<RouteRecord>,
    route: RouteConfig,
    parent?: RouteRecord,
    matchAs?: string
  ) {
    const { path, name } = route

    const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)

    const record: RouteRecord = {
        path: normalizedPath,
        regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        components: route.components || { default: route.component },
        alias: route.alias
          ? typeof route.alias === 'string'
            ? [route.alias]
            : route.alias
          : [],
        instances: {},
        enteredCbs: {},
        name,
        parent,
        matchAs,
        redirect: route.redirect,
        beforeEnter: route.beforeEnter,
        meta: route.meta || {},
        props:
          route.props == null
            ? {}
            : route.components
              ? route.props
              : { default: route.props }
      }

    //…… 如果有children就递归调用自身，过程省略

    // 填充pathList和pathMap
    if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
    }

    // 填充nameMap
    if (name) {
        if (!nameMap[name]) {
          nameMap[name] = record
        } else if ("production" !== 'production' && !matchAs) {
          warn(
            false,
            'Duplicate named routes definition: ' +
              ' name: "${name}", path: record.path'
          )
        }
    }
}
\`\`\``,x=`\`\`\`js
export default {
    name: 'RouterView',
    functional: true,
    props: {
      name: {
        type: String,
        default: 'default'
      }
    },
    render (_, { props, children, parent, data }) {
        // used by devtools to display a router-view badge
        data.routerView = true
    
        // directly use parent context's createElement() function
        // so that components rendered by router-view can resolve named slots
        const h = parent.$createElement
        const name = props.name
        const route = parent.$route
        const cache = parent._routerViewCache || (parent._routerViewCache = {})
    
        // match的组件可能不止一个，需要判断深度，如果父级routeView为true，则depth+1
        let depth = 0
        let inactive = false
        while (parent && parent._routerRoot !== parent) {
          const vnodeData = parent.$vnode ? parent.$vnode.data : {}
          if (vnodeData.routerView) {
            depth++
          }
          if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
            inactive = true
          }
          parent = parent.$parent
        }
        data.routerViewDepth = depth
    
        // 如果是keep-alive组件，那么从缓存里获取
        if (inactive) {
          const cachedData = cache[name]
          const cachedComponent = cachedData && cachedData.component
          if (cachedComponent) {
            // #2301
            // pass props
            if (cachedData.configProps) {
              fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps)
            }
            return h(cachedComponent, data, children)
          } else {
            // render previous empty view
            return h()
          }
        }
    
        // 根据深度匹配route对象，取出component
        const matched = route.matched[depth]
        const component = matched && matched.components[name]
    
        // 没有匹配到则创建一个空节点
        if (!matched || !component) {
          cache[name] = null
          return h()
        }
    
        // cache component
        cache[name] = { component }
    
        // attach instance registration hook
        // this will be called in the instance's injected lifecycle hooks
        data.registerRouteInstance = (vm, val) => {
          // val could be undefined for unregistration
          const current = matched.instances[name]
          if (
            (val && current !== vm) ||
            (!val && current === vm)
          ) {
            matched.instances[name] = val
          }
        }
    
        // also register instance in prepatch hook
        // in case the same component instance is reused across different routes
        ;(data.hook || (data.hook = {})).prepatch = (_, vnode) => {
          matched.instances[name] = vnode.componentInstance
        }
    
        // register instance in init hook
        // in case kept-alive component be actived when routes changed
        data.hook.init = (vnode) => {
          if (vnode.data.keepAlive &&
            vnode.componentInstance &&
            vnode.componentInstance !== matched.instances[name]
          ) {
            matched.instances[name] = vnode.componentInstance
          }
    
          // if the route transition has already been confirmed then we weren't
          // able to call the cbs during confirmation as the component was not
          // registered yet, so we call it here.
          handleRouteEntered(route)
        }
    
        const configProps = matched.props && matched.props[name]
        // save route and configProps in cache
        if (configProps) {
          extend(cache[name], {
            route,
            configProps
          })
          fillPropsinData(component, data, route, configProps)
        }
        
        //开始加载组件
        return h(component, data, children)
      }
    }
\`\`\``,v=`\`\`\`js
export default {
    name: 'RouterLink',
    props: {
      to: {
        type: toTypes,
        required: true
      },
      tag: {
        type: String,
        default: 'a'
      },
      custom: Boolean,
      exact: Boolean,
      exactPath: Boolean,
      append: Boolean,
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      ariaCurrentValue: {
        type: String,
        default: 'page'
      },
      event: {
        type: eventTypes,
        default: 'click'
      }
    },
    render (h: Function) {
      const router = this.$router
      const current = this.$route
      const { location, route, href } = router.resolve(
        this.to,
        current,
        this.append
      )

      // ……
  
      return h(this.tag, data, this.$slots.default)
    }
  }
\`\`\``,j=`\`\`\`js
transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    let route
    // catch redirect option https://github.com/vuejs/vue-router/issues/3201
    try {
      route = this.router.match(location, this.current)
    } catch (e) {
      this.errorCbs.forEach(cb => {
        cb(e)
      })
      // Exception should still be thrown
      throw e
    }
    const prev = this.current
    this.confirmTransition(
      route,
      () => {
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
          hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          // Initial redirection should not mark the history as ready yet
          // because it's triggered by the redirection instead
          // https://github.com/vuejs/vue-router/issues/3225
          // https://github.com/vuejs/vue-router/issues/3331
          if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
            this.ready = true
            this.readyErrorCbs.forEach(cb => {
              cb(err)
            })
          }
        }
      }
    )
  }
\`\`\``,k=`\`\`\`js
confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    this.pending = route
    const abort = err => {
      // changed after adding errors with
      // https://github.com/vuejs/vue-router/pull/3047 before that change,
      // redirect and aborted navigation would produce an err == null
      if (!isNavigationFailure(err) && isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => {
            cb(err)
          })
        } else {
          if ("production" !== 'production') {
            warn(false, 'uncaught error during route navigation:')
          }
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    const lastRouteIndex = route.matched.length - 1
    const lastCurrentIndex = current.matched.length - 1
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      lastRouteIndex === lastCurrentIndex &&
      route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
    ) {
      this.ensureURL()
      if (route.hash) {
        handleScroll(this.router, current, route, false)
      }
      return abort(createNavigationDuplicatedError(current, route))
    }

    const { updated, deactivated, activated } = resolveQueue(
      this.current.matched,
      route.matched
    )

    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )

    const iterator = (hook: NavigationGuard, next) => {
      if (this.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false) {
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true)
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }

    runQueue(queue, iterator, () => {
      // wait until async components are resolved before
      // extracting in-component enter guards
      const enterGuards = extractEnterGuards(activated)
      const queue = enterGuards.concat(this.router.resolveHooks)
      runQueue(queue, iterator, () => {
        if (this.pending !== route) {
          return abort(createNavigationCancelledError(current, route))
        }
        this.pending = null
        onComplete(route)
        if (this.router.app) {
          this.router.app.$nextTick(() => {
            handleRouteEntered(route)
          })
        }
      })
    })
  }

  updateRoute (route: Route) {
    this.current = route
    this.cb && this.cb(route)
  }

  setupListeners () {
    // Default implementation is empty
  }

  teardown () {
    // clean up event listeners
    // https://github.com/vuejs/vue-router/issues/2341
    this.listeners.forEach(cleanupListener => {
      cleanupListener()
    })
    this.listeners = []

    // reset current history route
    // https://github.com/vuejs/vue-router/issues/3294
    this.current = START
    this.pending = null
  }
}
\`\`\``;function T(){const o=e.jsx(r,{markdown:m}),a=e.jsx(r,{markdown:f}),n=e.jsx(r,{markdown:R}),i=e.jsx(r,{markdown:y}),s=e.jsx(r,{markdown:g}),c=e.jsx(r,{markdown:b}),u=e.jsx(r,{markdown:x}),l=e.jsx(r,{markdown:v}),h=e.jsx(r,{markdown:j}),p=e.jsx(r,{markdown:k});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"Vue-Router"}),"Vue-Router是Vue2.x中使用的路由库，本文通过梳理源码简要说明下它的工作原理。 源码核心部分为以下内容",e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"install"}),": vue插件的通用函数，",e.jsx("div",{className:t.assist,children:"src\\install.js"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"router"}),": 核心构造类，包含所有属性和函数"," ",e.jsx("div",{className:t.assist,children:"src\\router.js"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"createRouteMap"}),": 创建路由map，保存路由映射"," ",e.jsx("div",{className:t.assist,children:"src\\create-route-map.js"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"createMatcher"}),": 匹配路由"," ",e.jsx("div",{className:t.assist,children:"src\\create-matcher.js"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Link，View"}),"：路由组件"," ",e.jsx("div",{className:t.assist,children:"src\\components\\link.js，src\\components\\view.js"})]})]}),e.jsx("h2",{id:"install",className:t.articleTitle,children:"install"}),"vue2插件都需要实现install函数，install函数的意义是将组件挂载到根实例上。",e.jsx("br",{}),"还记得引入Vue-Router的代码吗？use函数会判断传入参数是否包含install属性，并执行它。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"Vue.use(router)"}),o,e.jsx("br",{}),"接下来关注vue-router的install函数做了哪些事情，源码如下：",a,e.jsx("br",{}),"主要是使用mixin在beforeCreate生命周期里调用",e.jsx("code",{children:"init"}),"初始化函数，给",e.jsx("code",{children:"this._route"}),"定义响应式，然后在this上定义",e.jsx("code",{children:"$route,$router"}),"属性用于访问",e.jsx("code",{children:"_route和_router"}),"，最后全局注册",e.jsx("code",{children:"RouterView,RouterLink"}),"组件",e.jsx("h2",{id:"router",className:t.articleTitle,children:"router"}),"再看router，摘取部分关键代码：",n,"先看构造函数，构造函数内首先是调用",e.jsx("code",{children:"createMatcher"}),"，创建matcher，代码如下",e.jsx("br",{}),e.jsx("h3",{id:"createMatcher",className:t.articleSubTitle,children:"createMatcher"}),"createMatcher首先调用了",e.jsx("code",{children:"createRouteMap"}),"，并返回 match, addRoute, getRoutes, addRoutes四个函数。",i,e.jsx("h3",{id:"createRouteMap",className:t.articleSubTitle,children:"createRouteMap"}),"createRouteMap主要是遍历routes来填充pathList,pathMap,nameMap，变量名就代表了它们的含义，具体处理函数是",e.jsx("code",{children:"addRouteRecord"}),s,e.jsx("h3",{id:"addRouteRecord",className:t.articleSubTitle,children:"addRouteRecord"}),"函数构建record对象，合并route配置，包括components,path,name,props,各种钩子函数等。如果route存在children，那么需要遍历children递归调用自身",e.jsx("br",{}),"如果pathMap不存在record.path这个key，进行填充。",e.jsx("code",{children:"pathList.push(record.path);pathMap[record.path] = record"}),e.jsx("br",{}),"如果nameMap不存在route.name这个key，进行填充。",e.jsx("code",{children:"nameMap[name]=record"}),c,e.jsx("br",{}),e.jsx("h2",{id:"component",className:t.articleTitle,children:"路由组件"}),e.jsx("h3",{id:"View",className:t.articleSubTitle,children:"View"}),"View就是",e.jsx("code",{children:"RouterView"}),"组件。它本身是一个函数组件。在render函数中，首先设置",e.jsx("code",{children:"data.routerView = true"}),"，然后根据深度来匹配对应的路由，然后再加载该路由的component。",u,e.jsx("h3",{id:"link",className:t.articleSubTitle,children:"Link"}),"Link不是函数组件，更像是一个超链接。在render函数中，首先执行",e.jsx("code",{children:"router.resolve"}),"获取到要跳转的路由，然后加载该路由。",l,e.jsx("h2",{id:"mode",className:t.articleTitle,children:"路由操作"}),"VueRouter类中构造函数确定了路由的模式，根据模式来确定history对象。然后go,replace,back等函数实际上是调用history对象的路由操作。",e.jsx("h2",{id:"match",className:t.articleTitle,children:"路由匹配"}),"回到createMatcher返回的match函数，match如果匹配成功返回对应路由，否则返回空路由，代码就不重复贴了。",e.jsx("br",{}),"首先是获取location对象的name，nameMap[name]不为空就匹配成功",e.jsx("br",{}),"如果nameMap[name]为空，再看能否在pathList,pathMap中找到location.path",e.jsx("h2",{id:"hook",className:t.articleTitle,children:"路由守卫"}),"在init函数中，路由确定history后，会调用",e.jsxs("code",{children:[" ","history.transitionTo( history.getCurrentLocation(), setupListeners, setupListeners )"]}),"先过度到当前路由",h,"transitionTo主要调用了",e.jsx("code",{children:"confirmTransition"}),e.jsx("br",{}),"confirmTransition函数设置了",e.jsx("code",{children:"queue"}),"队列，并按这个顺序遍历执行，顺序如下：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 组件内的离开守卫：",e.jsx("code",{children:"extractLeaveGuards(deactivated)"})]}),e.jsxs("li",{children:["2. 全局的before hooks：",e.jsx("code",{children:"this.router.beforeHooks"})]}),e.jsxs("li",{children:["3. 组件内的update hooks：",e.jsx("code",{children:"extractUpdateHooks(updated)"})]}),e.jsxs("li",{children:["4. 路由设置的enter守卫：",e.jsx("code",{children:"activated.map(m => m.beforeEnter)"})]}),e.jsxs("li",{children:["5. 异步组件：",e.jsx("code",{children:"resolveAsyncComponents(activated)"})]})]}),p]}),e.jsx(d,{items:[{title:"Vue-Router",key:"pre",href:"#pre"},{title:"install",key:"install",href:"#install"},{title:"router",key:"router",href:"#router",children:[{title:"createMatcher",key:"createMatcher",href:"#createMatcher"},{title:"createRouteMap",key:"createRouteMap",href:"#createRouteMap"},{title:"addRouteRecord",key:"addRouteRecord",href:"#addRouteRecord"}]},{title:"路由组件",key:"component",href:"#component",children:[{title:"View",key:"view",href:"#view"},{title:"Link",key:"link",href:"#link"}]},{title:"路由操作",key:"mode",href:"#mode"},{title:"路由匹配",key:"match",href:"#match"},{title:"路由守卫",key:"hook",href:"#hook"}]})]})}export{T as default};
