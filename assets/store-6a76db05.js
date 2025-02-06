import{j as e,d as t}from"./index-a233d2e0.js";import{U as r}from"./useMarkdown-30fc6593.js";import{A as h}from"./Anchor-31b59515.js";import"./index-de0c2df5.js";const f="```js\nimport { configureStore } from '@reduxjs/toolkit'\n\nexport default configureStore({\n  reducer: {},\n})\n```",m=`\`\`\`jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
\`\`\``,p=`\`\`\`js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
\`\`\``,S=`\`\`\`js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
\`\`\``,b=`\`\`\`js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
\`\`\``,j=`\`\`\`js
export default function createStore<
  S,
  A extends Action,
  Ext = {},
  StateExt = never
>(
  reducer: Reducer<S, A>,
  preloadedState?: PreloadedState<S> | StoreEnhancer<Ext, StateExt>,
  enhancer?: StoreEnhancer<Ext, StateExt>
): Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext {
    // ... 
    const store = {
        dispatch: dispatch as Dispatch<A>,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    } as unknown as Store<ExtendState<S, StateExt>, A, StateExt, Ext> & Ext
    return store
}
\`\`\``,E=`\`\`\`js
/**
 * A friendly abstraction over the standard Redux createStore() function.
 *
 * @param store设置
 * @returns Redux store
 *
 * @public
 */
export function configureStore<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = [ThunkMiddlewareFor<S>],
  E extends Enhancers = [StoreEnhancer]
>(options: ConfigureStoreOptions<S, A, M, E>): EnhancedStore<S, A, M, E> {
  const curriedGetDefaultMiddleware = curryGetDefaultMiddleware<S>()

  const {
    reducer = undefined,
    middleware = curriedGetDefaultMiddleware(),
    devTools = true,
    preloadedState = undefined,
    enhancers = undefined,
  } = options || {}

  let rootReducer: Reducer<S, A>

  if (typeof reducer === 'function') {
    rootReducer = reducer
  } else if (isPlainObject(reducer)) {
    rootReducer = combineReducers(reducer) as unknown as Reducer<S, A>
  } else {
    throw new Error(
      '"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers'
    )
  }

  let finalMiddleware = middleware
  if (typeof finalMiddleware === 'function') {
    finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware)

    if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
      throw new Error(
        'when using a middleware builder function, an array of middleware must be returned'
      )
    }
  }
  if (
    !IS_PRODUCTION &&
    finalMiddleware.some((item: any) => typeof item !== 'function')
  ) {
    throw new Error(
      'each middleware provided to configureStore must be a function'
    )
  }

  const middlewareEnhancer: StoreEnhancer = applyMiddleware(...finalMiddleware)

  let finalCompose = compose

  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: !IS_PRODUCTION,
      ...(typeof devTools === 'object' && devTools),
    })
  }

  let storeEnhancers: Enhancers = [middlewareEnhancer]

  if (Array.isArray(enhancers)) {
    storeEnhancers = [middlewareEnhancer, ...enhancers]
  } else if (typeof enhancers === 'function') {
    storeEnhancers = enhancers(storeEnhancers)
  }

  const composedEnhancer = finalCompose(...storeEnhancers) as StoreEnhancer<any>

  return createStore(rootReducer, preloadedState, composedEnhancer)
}
\`\`\``,R=`\`\`\`js
function subscribe(listener: () => void) {

  let isSubscribed = true

  ensureCanMutateNextListeners()
  // 将listener添加到nextListeners
  nextListeners.push(listener)

  return function unsubscribe() {
    if (!isSubscribed) {
      return
    }

    isSubscribed = false

    ensureCanMutateNextListeners()
    const index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
    currentListeners = null
  }
}
\`\`\``,v=`\`\`\`js
function dispatch(action: A) {
  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }

  return action
}
\`\`\``,w=`\`\`\`jsx
function Provider<A extends Action = AnyAction, S = unknown>({
  store,
  context,
  children,
  serverState,
}: ProviderProps<A, S>) {
  const contextValue = useMemo(() => {
    const subscription = createSubscription(store)
    return {
      store,
      subscription,
      getServerState: serverState ? () => serverState : undefined,
    }
  }, [store, serverState])

  const previousState = useMemo(() => store.getState(), [store])

  // useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue
    subscription.onStateChange = subscription.notifyNestedSubs
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = undefined
    }
  }, [contextValue, previousState])

  const Context = context || ReactReduxContext

  // @ts-ignore 'AnyAction' is assignable to the constraint of type 'A', but 'A' could be instantiated with a different subtype
  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
\`\`\``;function T(){const s=e.jsx(r,{markdown:f}),n=e.jsx(r,{markdown:m}),o=e.jsx(r,{markdown:p}),i=e.jsx(r,{markdown:S}),c=e.jsx(r,{markdown:b}),a=e.jsx(r,{markdown:j}),d=e.jsx(r,{markdown:E}),u=e.jsx(r,{markdown:w}),l=e.jsx(r,{markdown:R}),x=e.jsx(r,{markdown:v});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"redux",className:"font-semibold text-h2 mb-2",children:"还在用Redux吗？你out了。"}),e.jsx("h2",{className:t.articleSubTitle,children:"React-Redux"}),"Redux是一个可预见状态的管理容器，在react生态中中广泛使用，然而我本人使用它的频率却不多。因为不是什么东西都需要放进redux的，常规场景url传参就够用了。",e.jsx("br",{}),"想把它在React工程中跑起来，需要这样一些步骤：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 首先当然是安装了 ",e.jsx("code",{children:"pnpm add react-redux"})]}),e.jsxs("li",{children:["2. 预先配置store(包括name,state,reducers等)",s]}),e.jsxs("li",{children:["3.然后用",e.jsx("code",{children:"Provider"}),"将",e.jsx("code",{children:"App"}),"包裹起来",n]}),e.jsxs("li",{children:["4.创建state切片",o]}),e.jsxs("li",{children:["5. 将slice加到store中",i]}),e.jsxs("li",{children:["6. 最后就可以在组件中引入state并使用了",c]})]}),e.jsx("embed",{width:"100%",height:500,src:"https://codesandbox.io/embed/github/reduxjs/redux-essentials-counter-example/tree/master/?fontsize=14&hidenavigation=1&theme=dark"}),e.jsx("h2",{id:"source",className:t.articleTitle,children:"源码解析"}),e.jsx("h2",{id:"#init",className:t.articleTitle,children:"初始化"}),e.jsx("h3",{id:"configureStore",className:t.articleSubTitle,children:"配置store"}),"按照使用步骤，第一步就是配置store",e.jsx("br",{}),e.jsx("strong",{children:"repo: redux-toolkit"}),e.jsx("div",{className:t.assist,children:"packages\\toolkit\\src\\configureStore.ts"}),d,e.jsx("p",{children:"对options中的参数进行处理，最后调用标准Redux createStore()函数"}),e.jsx("h3",{id:"createStore",className:t.articleSubTitle,children:"createStore"}),e.jsx("div",{className:t.assist,children:"src\\createStore.ts"}),a,e.jsxs("p",{children:["函数接收reducer、preloadedState、enhancer参数创建一个包括",e.jsx("code",{children:"dispatch"}),",",e.jsx("code",{children:"subscribe"}),"等属性的store对象。"]}),e.jsx("br",{}),e.jsx("br",{}),"Redux采用了发布订阅模式，工作流程:",e.jsx("br",{}),e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{id:"subscribe",children:["1. ",e.jsx("code",{children:"subscribe"}),"接收参数listener，将其添加到nextListener数组中",l]}),e.jsxs("li",{id:"dispatch",children:["2. ",e.jsx("code",{children:"dispatch"}),"调用执行完reducer修改state，最后遍历执行nextListener",x]})]}),e.jsx("h2",{id:"diff",className:t.articleTitle,children:"在react中的实现"}),e.jsx("h3",{id:"provider",className:t.articleSubTitle,children:"Provider"}),"react-redux这个repo中的",e.jsx("code",{children:"Provider"}),"组件是实现state变化刷新页面的核心，它帮我们做了订阅，并且使用",e.jsx("code",{children:"Context"}),"将state传递给了子组件，所以state有变化时能刷新页面。",e.jsx("div",{className:t.assist,children:"src\\components\\Provider.tsx"}),u,e.jsx("h2",{id:"#reduxInReact",className:t.articleTitle,children:"当前主流方案"}),"按现在的眼光来看Redux，确实略微繁琐了。使用",e.jsx("code",{children:"useContext"}),"就能实现类似的功能，还不需要额外引入库。"]}),e.jsx(h,{items:[{title:"Redux",key:"redux",href:"#redux"},{title:"源码解析",key:"source",href:"#source",children:[{title:"初始化",key:"init",href:"#init",children:[{title:"configureStore",key:"configureStore",href:"#configureStore"},{title:"createStore",key:"createStore",href:"#createStore",children:[{title:"subscribe",key:"subscribe",href:"#subscribe"},{title:"dispatch",key:"dispatch",href:"#dispatch"}]}]}]},{title:"在react中的实现",key:"reduxInReact",href:"#reduxInReact",children:[{title:"Provider",key:"provider",href:"#provider"}]},{title:"当前主流方案",key:"replace",href:"#replace"}]})]})}export{T as default};
