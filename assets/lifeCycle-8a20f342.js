import{j as e,d as t}from"./index-298bb257.js";import{U as o}from"./useMarkdown-3461f6cc.js";import{A as a}from"./Anchor-c8fc4162.js";import"./index-6c3c40ca.js";const m=`\`\`\`js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if ("production" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the 'new' keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
\`\`\``,h=`\`\`\`js
export function initMixin (Vue: Class<Component>) {
    Vue.prototype._init = function (options?: Object) {
      const vm: Component = this
      // a uid
      vm._uid = uid++
  
      // a flag to avoid this being observed
      vm._isVue = true
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options)
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        )
      }

      // expose real self
      vm._self = vm
      initLifecycle(vm)
      initEvents(vm)
      initRender(vm)
      //调用beforeCreate钩子
      callHook(vm, 'beforeCreate')
      initInjections(vm) // resolve injections before data/props
      initState(vm)
      initProvide(vm) // resolve provide after data/props
      //调用created钩子
      callHook(vm, 'created')
  
      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      }
    }
  }
\`\`\``,u=`\`\`\`js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
\`\`\``,p=`\`\`\`js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el

  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if ("production" !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const vnode = vm._render()

      vm._update(vnode, hydrating)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before () {
      // 只有在首次mount完成之后的更新才能触发beforeUpdate
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  //$vnode为空，说明是首次mount，将_isMounted设为true
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
\`\`\``,f=`\`\`\`js
/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  flushing = true
  let watcher, id

  queue.sort((a, b) => a.id - b.id)


  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    watcher.run()
  }

  // 调用组件updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue) // 此处会遍历queue调用callHook(vm, 'updated')

  //……
}
\`\`\``,x=`\`\`\`js
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated')
    }
  }
}
\`\`\``,v=`\`\`\`js
Vue.prototype.$destroy = function () {
  const vm: Component = this
  if (vm._isBeingDestroyed) {
    return
  }
  callHook(vm, 'beforeDestroy')
  vm._isBeingDestroyed = true
  // remove self from parent
  const parent = vm.$parent
  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm)
  }
  // teardown watchers
  if (vm._watcher) {
    vm._watcher.teardown()
  }
  let i = vm._watchers.length
  while (i--) {
    vm._watchers[i].teardown()
  }
  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--
  }
  // call the last hook...
  vm._isDestroyed = true
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null)
  // fire destroyed hook
  callHook(vm, 'destroyed')
  // turn off all instance listeners.
  vm.$off()
  // remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null
  }
  // release circular reference (#6759)
  if (vm.$vnode) {
    vm.$vnode.parent = null
  }
}
\`\`\``;function k(){const n=e.jsx(o,{markdown:m}),i=e.jsx(o,{markdown:h}),r=e.jsx(o,{markdown:u}),s=e.jsx(o,{markdown:p}),d=e.jsx(o,{markdown:f}),c=e.jsx(o,{markdown:x}),l=e.jsx(o,{markdown:v});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"生命周期"}),"Vue有哪些生命周期大家肯定是门清的，这篇文章主要从源码出发来描述细节，这样就可以解答一些常见的问题了。生命周期钩子函数添加到vue实例上分为两个阶段： 首先从入口代码开始：",e.jsx("div",{className:t.assist,children:"src\\core\\instance\\index.js"}),n,"Vue构造函数执行了",e.jsx("code",{children:"_init"}),"方法，_init方法就是在",e.jsx("code",{children:"initMixin"}),"方法中添加到Vue原型上的",e.jsx("h2",{id:"initMixin",className:t.articleTitle,children:"initMixin"}),"从如下代码中可以看到熟悉的",e.jsx("code",{children:"beforeCreate"}),"和",e.jsx("code",{children:"created"}),"使用",e.jsx("code",{children:"callHook"}),"先后被调用。",e.jsx("h3",{id:"beforeCreate",className:t.articleSubTitle,children:"beforeCreate"}),e.jsx("code",{children:"beforeCreate"}),"之前，做了这么几件事",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 在实例上挂载合并后的",e.jsx("code",{children:"$options"}),"，即初始配置"]}),e.jsxs("li",{children:["2. ",e.jsx("code",{children:"initLifecycle(vm)"}),"，初始化实例生命周期"]}),e.jsxs("li",{children:["3. ",e.jsx("code",{children:"initEvents(vm)"}),"，初始化事件，例如",e.jsx("code",{children:"$on、$off、$emit"})]}),e.jsxs("li",{children:["4. ",e.jsx("code",{children:"initRender(vm)"}),"，解析前的准备工作，挂载",e.jsx("code",{children:"$createElement、$attrs、$listeners"}),"等属性"]})]}),e.jsx("br",{}),"代码执行顺序说明了一切，为什么在beforeCreate阶段获取不到data，因为",e.jsx("code",{children:'callHook(vm, "beforeCreate")'}),"先于",e.jsx("code",{children:"initState(vm)"}),"执行。",e.jsx("br",{}),"如果一定要获取数据，可以在",e.jsx("code",{children:"$options"}),"里获取",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"created"}),"之前，执行如下:",e.jsxs("ul",{children:[e.jsxs("li",{children:["1.",e.jsx("code",{children:"initInjections(vm)"}),"，在",e.jsx("code",{children:"data,props"}),"之前先初始化",e.jsx("code",{children:"injection"})]}),e.jsxs("li",{children:["2.",e.jsxs("code",{children:["initState(vm),从options中取出并初始化",e.jsx("code",{children:"props、methods、data、computed、watch"})]})]}),e.jsxs("li",{children:["3.",e.jsx("code",{children:"initProvide(vm)"}),"，在",e.jsx("code",{children:"data,props"}),"之后初始化",e.jsx("code",{children:"provide"})]})]}),e.jsx("br",{}),e.jsx("code",{children:"created"}),"执行完后，开始调用",e.jsx("code",{children:"$mount"}),"安装组件。",e.jsx("div",{className:t.assist,children:"src\\core\\instance\\init.js"}),i,e.jsx("h2",{id:"lifecycleMixin",className:t.articleTitle,children:"lifecycleMixin"}),"接下来看一下其他生命周期的细节。",e.jsx("h3",{id:"mountComponent",className:t.articleSubTitle,children:"mountComponent"}),"调用",e.jsx("code",{children:"$mount"}),"开始挂载组件",r,e.jsx("code",{children:"$mount"}),"调用了",e.jsx("code",{children:"mountComponent"}),e.jsx("h3",{id:"beforeMount",className:t.articleSubTitle,children:"beforeMount"}),e.jsx("code",{children:"beforeMount"}),"就是字面意思，在开始mount的准备工作前执行",e.jsx("br",{}),e.jsx("h3",{id:"beforeUpdate",className:t.articleSubTitle,children:"beforeUpdate"}),e.jsx("code",{children:'callHook(vm, "beforeMount")'}),"之后开始创建Watcher，传入更新函数等参数， 注意",e.jsx("code",{children:"new Watcher(vm, updateComponent,...)"}),"传入第四个参数的before属性，Watcher的构造函数会保存它。更新阶段遍历执行watcher队列的回调函数之前，如果before存在会执行before",e.jsx("div",{className:t.assist,children:"src\\core\\observer\\scheduler.js"}),d,e.jsx("br",{}),"这里before函数除首次mount以外每次更新前都调用",e.jsx("code",{children:'callHook(vm, "beforeUpdate")'}),e.jsx("h3",{id:"updated",className:t.articleSubTitle,children:"updated"}),"在watcher遍历执行回调完成后，更新完成，调用组件更新和激活的hooks，执行",e.jsx("code",{children:"callUpdatedHooks"}),"调用了",e.jsx("code",{children:"updated"}),"hook",c,e.jsx("br",{}),e.jsx("h3",{id:"mounted",className:t.articleSubTitle,children:"mounted"}),"判断",e.jsx("code",{children:"$vnode"}),"是否为空，为空才是首次mount，首次mount才会调用",e.jsx("code",{children:"mounted"}),"hook",s,e.jsx("h3",{id:"destroy",className:t.articleTitle,children:"destroy"}),e.jsx("code",{children:"beforeDestroy"}),"和",e.jsx("code",{children:"destroyed"}),"hook都在",e.jsx("code",{children:"destroy"}),"方法中被调用。",e.jsx("h3",{id:"beforeDestroy",className:t.articleSubTitle,children:"beforeDestroy"}),"和另外两个beforeXXX生命周期一样，在正式开始执行销毁之前会执行",e.jsx("code",{children:"beforeDestroy"}),"，此时还能获取到各种数据。",e.jsx("h3",{id:"destroyed",className:t.articleSubTitle,children:"destroyed"}),e.jsx("code",{children:"destroyed"}),"hook之前会进行如下操作：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 移除该节点: ",e.jsx("code",{children:"remove(parent.$children, vm)"})]}),e.jsxs("li",{children:["2. 调用",e.jsx("code",{children:"teardown()"}),"卸载Watcher"]}),e.jsxs("li",{children:["3. 解除",e.jsx("code",{children:"data"}),"的引用"]}),e.jsxs("li",{children:["4. 设置",e.jsx("code",{children:"_isDestroyed"}),"为true，调用",e.jsx("code",{children:"vm.__patch__(vm._vnode, null)"}),"，将该节点更新为null"]})]}),e.jsx("code",{children:"destroyed"}),"hook之后，还需要进行一些销毁操作，关闭所有监听器，销毁自身引用，和父级解绑。",l]}),e.jsx(a,{items:[{title:"生命周期",key:"pre",href:"#pre"},{title:"initMixin",key:"initMixin",href:"#initMixin",children:[{title:"beforeCreate",key:"beforeCreate",href:"#beforeCreate"},{title:"created",key:"created",href:"#created"}]},{title:"lifecycleMixin",key:"lifecycleMixin",href:"#lifecycleMixin",children:[{title:"mountComponent",key:"mountComponent",href:"#mountComponent",children:[{title:"beforeMount",key:"beforeMount",href:"#beforeMount"},{title:"beforeUpdate",key:"beforeUpdate",href:"#beforeUpdate"},{title:"updated",key:"updated",href:"#updated"},{title:"mounted",key:"mounted",href:"#mounted"}]}]},{title:"destroy",key:"destroy",href:"#destroy",children:[{title:"beforeDestroy",key:"beforeDestroy",href:"#beforeDestroy"},{title:"destroyed",key:"destroyed",href:"#destroyed"}]}]})]})}export{k as default};
