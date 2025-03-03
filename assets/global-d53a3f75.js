import{j as e,d as s}from"./index-d995f4f1.js";import{U as r}from"./useMarkdown-9bb10794.js";import{B as k,C as b,c as N,d as T,e as C,f as A,g as R,E as w,h as F,F as g,H as y,N as v,Q as P,i as _,R as J,T as D}from"./index-e286e11f.js";import{A as V}from"./Anchor-4feb64ba.js";import"./index-fd3e1634.js";function B(){const c=e.jsx(r,{markdown:k}),i=e.jsx(r,{markdown:b}),d=e.jsx(r,{markdown:N}),l=e.jsx(r,{markdown:T}),n=e.jsx(r,{markdown:C}),a=e.jsx(r,{markdown:A}),t=e.jsx(r,{markdown:R}),o=e.jsx(r,{markdown:w}),h=e.jsx(r,{markdown:F}),x=e.jsx(r,{markdown:g}),j=e.jsx(r,{markdown:y}),u=e.jsx(r,{markdown:v}),m=e.jsx(r,{markdown:P}),p=e.jsx(r,{markdown:_}),E=e.jsx(r,{markdown:J}),f=e.jsx(r,{markdown:D});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"createApp",className:"font-semibold text-h2 mb-2",children:"createApp"}),e.jsx("code",{children:"createApp"}),"是vue3的启动函数，返回一个应用实例，它做了啥？",e.jsx("div",{className:s.assist,children:"packages\\runtime-dom\\src\\index.ts"}),c,"重点在于第一句",e.jsx("code",{children:"ensureRenderer"})," ",h,"调用",e.jsx("code",{children:"createRenderer"}),n,e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\renderer.ts"}),"调用",e.jsx("code",{children:"baseCreateRenderer"}),",",e.jsx("code",{children:"baseCreateRenderer"}),",diff,patch都在这个函数中实现，先看他最后返回值",c,e.jsx("code",{children:"baseCreateRenderer"}),"最终返回",e.jsx("code",{children:"render hydrate createApp"}),"3个函数，然后将",e.jsx("code",{children:"render hydrate"}),"传给",e.jsx("code",{children:"createAppAPI"}),",它是真正的createApp方法",e.jsx("br",{}),e.jsx("br",{}),e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\apiCreateApp.ts"}),"可以看到很多都是眼熟的方法",i,e.jsx("code",{children:"createAppContext"}),"实现",d,"到此整个",e.jsx("code",{children:"createApp"}),"流程就结束了",e.jsx("br",{}),e.jsx("br",{}),e.jsx("h2",{id:"defineComponent",className:s.articleTitle,children:"defineComponent"}),e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\apiDefineComponent.ts"}),"Vue3用它来定义组件，代码返回了传入的对象并人工加上了类型，主要是为了更好的TSX/IDE支持",t,e.jsx("br",{}),e.jsx("br",{}),e.jsx("h2",{id:"h",className:s.articleTitle,children:"h"}),"h代表hyperScript，它在vue的作用是返回一个虚拟节点(VNode)，它接受三个参数",e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"Type 元素类型"}),e.jsx("li",{children:"propsOrChildren 数据对象，这里主要表示props,attrs,class,style"}),e.jsx("li",{children:"Children 子节点"})]}),e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\h.ts"}),j,e.jsx("code",{children:"createVNode"}),"主要做的是props,class,style标准化",e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\vnode.ts"}),a,e.jsx("code",{children:"CreateBaseVNode"}),"创建",e.jsx("code",{children:"VNode"}),",并打上编码标记",l,e.jsx("br",{}),e.jsx("br",{}),e.jsx("h2",{id:"nextTick",className:s.articleTitle,children:"nextTick"}),"在下次DOM更新循环结束后执行延迟回调。修改数据后，使用这个方法可以获取到更新后的值。",e.jsx("h3",{id:"why",className:s.articleSubTitle,children:"为什么需要nextTick"}),"如果没有这个函数，那么每次数据更新都会触发视图更新，所以需要这个机制让数据更新完后只执行一次视图更新",e.jsx("br",{}),e.jsx("br",{}),e.jsx("h3",{id:"how",className:s.articleSubTitle,children:"nextTick实现"}),"它利用了js的EventLoop执行机制，在call stack执行完后检查task queue。Vue3中的实现是直接使用promise新增微任务",e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\scheduler.ts"}),"可以看到代码非常简单，它接受一个可选的回调函数",e.jsx("code",{children:"fn"}),"作为参数，",e.jsx("code",{children:"currentFlushPromise"}),"存储当前正在进行的刷新队列的Promise，如果存在则使用它，否则使用",e.jsx("code",{children:"resolvedPromise"}),u,"来看一下vue3是如何处理任务队列的",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"queueJob"}),e.jsx("br",{}),e.jsx("code",{children:"queueJob"}),"函数将任务添加到job队列中，每次调用执行",e.jsx("code",{children:"queueFlush"}),"函数触发队列刷新",p,e.jsx("strong",{children:"queueFlush"}),e.jsx("br",{}),"检查当前是否正在刷新队列或者等待刷新，如果没有则将",e.jsx("code",{children:"isFlushPending"}),"设为",e.jsx("code",{children:"true"}),"，并使用",e.jsx("code",{children:"Promise.then"}),"执行",e.jsx("code",{children:"flushJobs"}),"，把",e.jsx("code",{children:"flushJobs"}),"添加到微任务",m,e.jsx("br",{}),e.jsx("strong",{children:"flushJobs"}),e.jsx("br",{}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:["首先将",e.jsx("code",{children:"isFlushPending"}),"设为",e.jsx("code",{children:"false"}),"，",e.jsx("code",{children:"isFlushing"}),"设为",e.jsx("code",{children:"true"}),"，表示正在刷新队列。"]}),e.jsx("li",{children:"对队列排序"}),e.jsx("li",{children:"遍历执行每个任务"}),e.jsxs("li",{children:["清空队列，执行后刷新回调",e.jsx("code",{children:"flushPostFlushCbs"})]}),e.jsxs("li",{children:["最后将",e.jsx("code",{children:"isFlushing"}),"设为",e.jsx("code",{children:"false"}),"，并检查是否有新的任务添加到队列中，如果有则递归调用",e.jsx("code",{children:"flushJobs"}),"函数"]})]}),x,e.jsx("strong",{children:"flushPostFlushCbs"}),e.jsx("br",{}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"处理后刷新回调，避免重复执行相同的回调"}),e.jsx("li",{children:"对回调进行排序，遍历并执行每个回调"})]}),"这也没看出来哪儿调用了queueJob啊？不着急，接着往下看",e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\renderer.ts"}),"当响应式触发后，执行effect，如果有 ",e.jsx("code",{children:"scheduler"}),"属性，就执行",e.jsx("code",{children:"scheduler"}),"，",e.jsx("code",{children:"ReactiveEffect"}),"第二个参数就是scheduler，可以看到它传的就是",e.jsx("code",{children:"()=>queueJob(update)"}),o,e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\effect.ts"}),E,f,e.jsx("h3",{id:"summary",className:s.articleSubTitle,children:"总结"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"Vue在更新DOM时是异步执行的，当数据发生变化后，会将更新任务添加到队列中"}),e.jsxs("li",{children:[e.jsx("code",{children:"nextTick"}),"利用Promise的微任务机制，将回调函数添加到微任务队列中，确保在DOM更新循环结束后执行。"]}),e.jsxs("li",{children:["通过",e.jsx("code",{children:"queueJob"}),"、",e.jsx("code",{children:"queueFlush"}),"、",e.jsx("code",{children:"flushJobs"})," ","等函数的协作，保证了任务的正确调度和执行顺序。"]}),e.jsx("li",{children:"nextTick是在响应式触发后执行的"})," "]})]}),e.jsx(V,{items:[{title:"createApp",key:"createApp",href:"#createApp"},{title:"defineComponent",key:"defineComponent",href:"#defineComponent"},{title:"h",key:"h",href:"#h"},{title:"nextTick",key:"nextTick",href:"#nextTick",children:[{title:"为什么需要nextTick",key:"why",href:"#why"},{title:"nextTick实现",key:"how",href:"#how"},{title:"总结",key:"summary",href:"#summary"}]}]})]})}export{B as default};
