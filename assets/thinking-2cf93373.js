import{j as e,d as r}from"./index-a233d2e0.js";import{U as c}from"./useMarkdown-30fc6593.js";import{W as n,F as i}from"./index-47083441.js";import{A as t}from"./Anchor-31b59515.js";import"./index-de0c2df5.js";function x(){const s=e.jsx(c,{markdown:n}),l=e.jsx(c,{markdown:i});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"thinking",className:"font-semibold text-h2 mb-2",children:"React理念"}),e.jsx("div",{className:r.assist,children:"我们认为，React是用JavaScript构建快速响应的大型Web应用程序的首选方式"}),"摘自",e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://zh-hans.reactjs.org/docs/thinking-in-react.html",children:"官网"}),e.jsx("br",{}),e.jsx("br",{}),"制约",e.jsx("strong",{children:"快速响应"}),"的场景如下:",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"CPU瓶颈：计算量大，设备性能不足"}),e.jsx("li",{children:"IO瓶颈：发送网络请求后，需要等待数据返回后才能操作"})]}),"为了解决这两个问题，React实现了时间切片，",e.jsx("code",{children:"Suspense"}),e.jsx("br",{}),"而两者都需要将同步的更新变为",e.jsx("strong",{children:"可中断的异步更新"}),e.jsx("h2",{id:"oldStructure",className:r.articleTitle,children:"React15架构"}),"React15架构可以分为两层",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"Reconciler（协调器） 负责找出变化的组件"}),e.jsx("li",{children:"Renderer（渲染器）负责将变化的组件渲染到页面上"})]}),e.jsx("h3",{id:"oldReconciler",className:r.articleSubTitle,children:"Reconciler（协调器）"}),"在",e.jsx("code",{children:"React"}),"中可以通过",e.jsx("code",{children:"this.setState"}),"、",e.jsx("code",{children:"this.forceUpdate"}),"、",e.jsx("code",{children:"ReactDOM.render"}),"等API触发更新",e.jsx("br",{}),e.jsx("br",{}),"每当有更新发生时,",e.jsx("strong",{children:"Reconciler"}),"会做如下工作",e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:["调用",e.jsx("code",{children:"render"}),"方法，将返回的jsx转化为vDom"]}),e.jsx("li",{children:"将vDom和上一次更新的vDom对比"}),e.jsx("li",{children:"通过对比找出本次更新中变化的vDom"}),e.jsxs("li",{children:["通知",e.jsx("strong",{children:"Renderer"}),"把新的vDom渲染到页面上"]})]}),"Reconciler",e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://zh-hans.reactjs.org/docs/codebase-overview.html#reconcilers",children:"官方解释"}),e.jsx("br",{}),e.jsx("h3",{id:"oldRenderer",className:r.articleSubTitle,children:"Renderer（渲染器）"}),e.jsx("code",{children:"React"}),"支持跨平台，前端最熟悉的是负责浏览器环境渲染的",e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://www.npmjs.com/package/react-dom",children:"ReactDOM"}),"， 还有",e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://www.npmjs.com/package/react-native",children:"ReactNative"}),"等渲染器",e.jsx("br",{}),"每次更新发生时，",e.jsx("strong",{children:"Renderer"}),"接到",e.jsx("strong",{children:"Reconciler"}),"通知，将变化的组件渲染在当前环境",e.jsx("br",{}),e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://zh-hans.reactjs.org/docs/codebase-overview.html#renderers",children:"官方解释"}),e.jsx("h3",{id:"oldWeakness",className:r.articleSubTitle,children:"缺点"}),"在",e.jsx("strong",{children:"Reconciler"}),"中，",e.jsx("code",{children:"mount"}),"的组件会调用",e.jsx("code",{children:"mountComponent"}),",",e.jsx("code",{children:"update"}),"组件会调用",e.jsx("code",{children:"updateComponent"}),"，它们都会递归更新子组件。 递归执行一旦开始就无法中断，当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。",e.jsx("br",{}),e.jsx("h2",{id:"newStructure",className:r.articleTitle,children:"React16架构"}),"React16架构可以分为三层",e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:["Scheduler（调度器） 调度任务的优先级，高优先级任务优先进入",e.jsx("strong",{children:"Reconciler"})]}),e.jsx("li",{children:"Reconciler（协调器） 负责找出变化的组件"}),e.jsx("li",{children:"Renderer（渲染器） 负责将变化的组件渲染到页面上"})]}),"React16新增了",e.jsx("strong",{children:"Scheduler（调度器）"}),e.jsx("h3",{id:"scheduler",className:r.articleSubTitle,children:"Scheduler（调度器）"}),"部分浏览器已经实现了",e.jsx("a",{className:r.href,rel:"noreferrer",target:"_blank",href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback",children:"requestIdleCallback"}),"，但是它的兼容性不好，且触发频率不稳定。",e.jsx("code",{children:"React"}),"选择了自行实现，这就是",e.jsx("strong",{children:"Scheduler"}),",可以在空闲时触发回调。",e.jsx("h3",{id:"newReconciler",className:r.articleSubTitle,children:"Reconciler（协调器）"}),"React15中",e.jsx("strong",{children:"Reconciler"}),"是递归处理vDom的，react16解决了这个问题。",e.jsx("br",{}),"更新工作改写成了可以中断的循环过程。每次循环都会调用",e.jsx("code",{children:"shouldYield"}),"判断是否有剩余时间",e.jsx("div",{className:r.assist,children:"packages\\react-reconciler\\src\\ReactFiberWorkLoop.new.js"}),s,"另外，",e.jsx("strong",{children:"Reconciler"}),"和",e.jsx("strong",{children:"Renderer"}),"不再是交替工作。当",e.jsx("strong",{children:"Scheduler"}),"将任务交给",e.jsx("strong",{children:"Reconciler"}),"后，",e.jsx("strong",{children:"Reconciler"}),"会为有变化的vDom打上effectTag,如下：",e.jsx("div",{className:r.assist,children:"packages\\react-reconciler\\src\\ReactFiberFlags.js"}),l,"整个",e.jsx("strong",{children:"Scheduler"}),"和",e.jsx("strong",{children:"Reconciler"}),"的工作都在内存中进行，所有组件都完成",e.jsx("strong",{children:"Reconciler"}),"的工作，才会统一交给renderer",e.jsx("h3",{id:"newRenderer",className:r.articleSubTitle,children:"Renderer（渲染器）"}),e.jsx("strong",{children:"Renderer"}),"根据",e.jsx("strong",{children:"Reconciler"}),"标记的effectTag，同步执行对应的DOM操作",e.jsx("h2",{id:"summary",className:r.articleTitle,children:"总结"}),e.jsx("code",{children:"React16"}),"采用了新的",e.jsx("code",{children:"Reconciler"}),",其内部采用了",e.jsx("code",{children:"Fiber"}),"架构"]}),e.jsx(t,{items:[{title:"理念",key:"thinking",href:"#thinking"},{title:"React15架构",key:"oldStructure",href:"#oldStructure",children:[{title:"Reconciler（协调器）",key:"oldReconciler",href:"#oldReconciler"},{title:"Renderer（渲染器）",key:"Renderer（渲染器）",href:"#oldRenderer"},{title:"缺点",key:"oldWeakness",href:"#oldWeakness"}]},{title:"React16架构",key:"newStructure",href:"#newStructure",children:[{title:"Scheduler（调度器）",key:"scheduler",href:"#scheduler"},{title:"Reconciler（协调器）",key:"newReconciler",href:"#newReconciler"},{title:"Renderer（渲染器）",key:"newRenderer",href:"#newRenderer"}]},{title:"总结",key:"summary",href:"#summary"}]})]})}export{x as default};
