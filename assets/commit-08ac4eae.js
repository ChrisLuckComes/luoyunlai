import{j as e,d as t}from"./index-a233d2e0.js";import{i as O,j as y,L as F,k,l as C,m as N,n as _,o as L,P as U,S as R,I as D,p as A,q as I,r as S,s as w,t as B,u as g,v as H,w as P}from"./index-47083441.js";import{U as c}from"./useMarkdown-30fc6593.js";import{A as v}from"./Anchor-31b59515.js";import"./index-de0c2df5.js";function q(){const o=e.jsx(c,{markdown:O}),i=e.jsx(c,{markdown:y}),s=e.jsx(c,{markdown:F}),n=e.jsx(c,{markdown:k}),r=e.jsx(c,{markdown:C}),l=e.jsx(c,{markdown:N}),d=e.jsx(c,{markdown:_}),a=e.jsx(c,{markdown:L}),m=e.jsx(c,{markdown:U}),f=e.jsx(c,{markdown:R}),h=e.jsx(c,{markdown:D}),u=e.jsx(c,{markdown:A}),x=e.jsx(c,{markdown:I}),j=e.jsx(c,{markdown:S}),E=e.jsx(c,{markdown:w}),b=e.jsx(c,{markdown:B}),M=e.jsx(c,{markdown:g}),p=e.jsx(c,{markdown:H}),T=e.jsx(c,{markdown:P});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"process",className:"font-semibold text-h2 mb-2",children:"流程概览"}),e.jsx("code",{children:"commitRoot"}),"方法是",e.jsx("code",{children:"commit阶段"}),"工作的起点，",e.jsx("code",{children:"fiberRoot"}),"作为传参。",o,"节点的",e.jsx("code",{children:"updateQueue"}),"中保存了变化的props,这些副作用对应的DOM操作在",e.jsx("code",{children:"commit"}),"阶段执行。",e.jsx("br",{}),e.jsx("br",{}),"除此之外,一些生命周期钩子(",e.jsx("code",{children:"componentDidxxx"}),")、",e.jsx("code",{children:"useEffect"}),"等hook需要在commit阶段执行。 commit阶段主要工作分为三部分：",e.jsxs("ul",{className:t.ul,children:[e.jsx("li",{children:"before mutation阶段（执行DOM操作前）"}),e.jsx("li",{children:"mutation阶段（执行DOM操作）"}),e.jsx("li",{children:"layout阶段（执行DOM操作后）"})]}),e.jsx("div",{className:t.assist,children:"packages\\react-reconciler\\src\\ReactFiberWorkLoop.new.js"}),e.jsx("br",{}),e.jsx("h3",{id:"beforeMutation_before",className:t.articleSubTitle,children:"before mutation之前"}),n,"在",e.jsx("code",{children:"before mutation"}),"之前主要做一些变量赋值，状态重置的工作",e.jsx("h3",{id:"layout_after",className:t.articleSubTitle,children:"layout之后"}),s,"主要包括三点内容：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. ",e.jsx("code",{children:"useEffect"}),"相关处理"]}),e.jsx("li",{children:"2. 性能追踪相关"}),e.jsx("li",{children:"3. commit阶段会触发的一些生命周期钩子"})]}),e.jsx("h2",{id:"beforeMutation",className:t.articleTitle,children:"before mutation"}),i,"重点关注",e.jsx("code",{children:"commitBeforeMutationEffects"}),e.jsx("h3",{id:"commitBeforeMutationEffects",className:t.articleSubTitle,children:"commitBeforeMutationEffects"}),r,"执行",e.jsx("code",{children:"commitBeforeMutationEffectsOnFiber"}),"，会根据fiber.tag来执行不同的逻辑",e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:["FunctionComponent 处理",e.jsx("code",{children:"updateQueue.events"}),",其中包括useEffect等回调函数",l]}),e.jsxs("li",{children:["ClassComponent 执行getSnapshotBeforeUpdate",e.jsx("div",{className:t.assist,children:"getSnapshotBeforeUpdate可以获取最近一次更新前的值"}),d]})]}),e.jsx("h2",{id:"mutation",className:t.articleTitle,children:"mutation"}),e.jsx("h3",{id:"commitMutationEffects",className:t.articleSubTitle,children:"commitMutationEffects"}),"主要关注",e.jsx("code",{children:"commitMutationEffects"}),"函数，它调用了",e.jsx("code",{children:"commitMutationEffectsOnFiber"}),"，根据fiber节点的类型和flag(effectTag)类型来执行对应操作",a,e.jsx("h3",{id:"placementEffect",className:t.articleSubTitle,children:"Placement effect"}),"执行",e.jsx("code",{children:"commitReconciliationEffects"}),"，当",e.jsx("code",{children:"fiber节点"}),"含有",e.jsx("code",{children:"Placement effectTag"}),"，意味着对应的DOM节点需要插入到页面中，调用",e.jsx("code",{children:"commitPlacement"}),"，该方法分为三步：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 获取父级DOM节点",m]}),e.jsxs("li",{children:["2. 获取兄弟节点",f]}),e.jsxs("li",{children:["3. 根据兄弟节点是否存在调用",e.jsx("code",{children:"insertBefore"}),"或",e.jsx("code",{children:"appendChild"}),"执行DOM操作",h]})]}),e.jsx("h3",{id:"updateEffect",className:t.articleSubTitle,children:"Update effect"}),"当",e.jsx("code",{children:"Fiber节点"}),"含有",e.jsx("code",{children:"Update tag"}),"，说明需要更新。主要关注",e.jsx("code",{children:"FunctionComponent"}),"和",e.jsx("code",{children:"HostComponent"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"FunctionComponent mutation"}),e.jsx("br",{}),e.jsx("br",{}),"先调用",e.jsx("code",{children:"commitHookEffectListUnmount"}),"，遍历updateQueue，执行销毁函数",u,"所谓",e.jsx("b",{children:"销毁函数"}),"如下：",x,"再调用",e.jsx("code",{children:"commitHookEffectListMount"}),"，遍历updateQueue，执行effect.create并赋值给destroy",j,e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"HostComponent mutation"}),e.jsx("br",{}),e.jsx("br",{}),"当",e.jsx("code",{children:"fiber.tag"}),"为",e.jsx("code",{children:"HostComponent"}),"，会调用",e.jsx("code",{children:"commitUpdate"}),"。其中调用",e.jsx("code",{children:"updateProperties"}),"修改DOM节点，调用",e.jsx("code",{children:"updateFiberProps"}),"修改",e.jsx("code",{children:"fiber节点"}),E,e.jsx("h3",{id:"deletionEffect",className:t.articleSubTitle,children:"Deletion effect"}),"mutation阶段首先执行的就是",e.jsx("code",{children:"recursivelyTraverseMutationEffects"})," ","，遍历parentFiber.deletions并执行",e.jsx("code",{children:"commitDeletionEffects"}),"，内部调用",e.jsx("code",{children:"commitDeletionEffectsOnFiber"}),"完成如下操作：",e.jsxs("ul",{children:[e.jsxs("li",{children:["1. ",e.jsx("code",{children:"ClassComponent"}),"类型的节点，调用",e.jsx("code",{children:"componentWillUnmount"}),"生命周期钩子，移除对应DOM节点"]}),e.jsxs("li",{children:["2. 解绑",e.jsx("code",{children:"ref"})]}),e.jsxs("li",{children:["3. 对于",e.jsx("code",{children:"FunctionComponent"}),"等类型，执行safelyCallDestroy，调用销毁函数"]})]}),e.jsx("h2",{id:"layout",className:t.articleTitle,children:"layout"}),"该阶段的代码在DOM渲染完成后执行，该阶段触发的生命周期钩子和",e.jsx("code",{children:"hook"}),"可以访问到更新后的DOM。具体的执行函数是",e.jsx("code",{children:"commitLayoutEffects"}),e.jsx("h3",{id:"commitLayoutEffects",className:t.articleSubTitle,children:"commitLayoutEffects"}),e.jsx("code",{children:"commitLayoutEffects"}),"调用了",e.jsx("code",{children:"commitLayoutEffectOnFiber"}),b,e.jsx("h3",{id:"commitLayoutEffectOnFiber",className:t.articleSubTitle,children:"commitLayoutEffectOnFiber"}),e.jsx("code",{children:"commitLayoutEffectOnFiber"}),"根据",e.jsx("code",{children:"fiber.tag"}),"分类处理",e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:["对于",e.jsx("code",{children:"ClassComponent"}),"，根据",e.jsx("code",{children:"current===null"}),"区分是mount还是update，调用",e.jsx("code",{children:"componentDidMount"}),"或",e.jsx("code",{children:"componentDidUpdate"})]}),e.jsxs("li",{children:["对于",e.jsx("code",{children:"FunctionComponent"}),"等类型，调用",e.jsx("code",{children:"useLayoutEffect hook"}),"的回调函数，并且将结果赋值给destroy",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"mutation阶段"}),"会执行",e.jsx("code",{children:"useLayoutEffect hook"}),"的destroy函数，结合这里",e.jsx("code",{children:"useLayoutEffect hook"}),"从上一次更新的destroy到本次更新的create调用是同步执行的，但是",e.jsx("code",{children:"useEffect"}),"需要先调度，在",e.jsx("code",{children:"Layout阶段"}),"完成后再异步执行"]})]}),M,e.jsx("h3",{id:"commitAttachRef",className:t.articleSubTitle,children:"commitAttachRef"}),p,"主要就是获取DOM实例，更新ref",e.jsx("h3",{id:"changeCurrentFiber",className:t.articleSubTitle,children:"current Fiber树切换"}),T,"这段代码的位置在",e.jsx("code",{children:"mutation阶段"}),"结束后，",e.jsx("code",{children:"layout阶段"}),"开始前。因为mutation阶段会执行",e.jsx("code",{children:"componentWillUnmount"}),"钩子，此时",e.jsx("code",{children:"currentFiber"}),"还是前一次更新的",e.jsx("code",{children:"fiber树"}),"，生命周期内获取的DOM是更新前的。layout阶段会执行",e.jsx("code",{children:"componentDidMount"}),"和",e.jsx("code",{children:"componentDidUpdate"}),"，此时",e.jsx("code",{children:"current Fiber树"}),"已经是更新后的。"]}),e.jsx(v,{items:[{title:"流程概览",key:"process",href:"#process",children:[{title:"before mutation之前",key:"beforeMutation_before",href:"#beforeMutation_before"},{title:"layout之后",key:"layout_after",href:"#layout_after"}]},{title:"before mutation",key:"beforeMutation",href:"#beforeMutation",children:[{title:"commitBeforeMutationEffects",key:"commitBeforeMutationEffects",href:"#commitBeforeMutationEffects"}]},{title:"mutation",key:"mutation",href:"#mutation",children:[{title:"commitMutationEffects",key:"commitMutationEffects",href:"#commitMutationEffects"},{title:"Placement effect",key:"placementEffect",href:"#placementEffect"},{title:"Update effect",key:"updateEffect",href:"#updateEffect"},{title:"Deletion effect",key:"deletionEffect",href:"#deletionEffect"}]},{title:"layout",key:"layout",href:"#layout",children:[{title:"commitLayoutEffects",key:"commitLayoutEffects",href:"#commitLayoutEffects"}]},{title:"commitAttachRef",key:"commitAttachRef",href:"#commitAttachRef"},{title:"current Fiber树切换",key:"changeCurrentFiber",href:"#changeCurrentFiber"}]})]})}export{q as default};
