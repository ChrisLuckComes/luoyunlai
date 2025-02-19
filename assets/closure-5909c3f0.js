import{j as e,d as s,e as c}from"./index-06d0604c.js";import{U as r}from"./useMarkdown-7879de16.js";import{N as i}from"./NickYoung-79abff95.js";import{A as l}from"./Anchor-98b0e2a3.js";import"./index-69c83c67.js";const o=`\`\`\`js
function func(str) {
    return function () {
      return str;
    };
  }
  
  let nameFunc = func();
  
  console.log(nameFunc);
\`\`\``,a=`\`\`\`js
function func() {
  let a = 1;

  function setA(val) {
    a = val;
  }

  function getA() {
    return a;
  }

  return { getA, setA };
}

let { getA, setA } = func();

console.log(getA()); //1
setA(2);
console.log(getA()); //2

\`\`\``,d="/luoyunlai/assets/closureDebug-86b559a3.png";function m(){const t=e.jsx(r,{markdown:o}),n=e.jsx(r,{markdown:a});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"closure",className:"font-semibold text-h2 mb-2",children:"10分钟内搞懂什么是闭包"}),"你是不是像我一样，经常被灵魂一问，什么是闭包？",e.jsx(c,{src:i}),"答案先说一半，闭包是一个函数，它可以访问另一个函数作用域内的变量。即使这个函数已经执行完毕，其作用域内的变量也不会被销毁，而是会被保留在内存中。",e.jsx("br",{}),"文中主要涉及",e.jsx("strong",{children:"执行上下文"}),"、",e.jsx("strong",{children:"作用域链"}),"等概念。",e.jsx("br",{}),e.jsx("h2",{id:"debug",className:s.articleTitle,children:"debug分析"}),"首先给出如下示例代码产生一个闭包，函数套函数就可以：",t,e.jsx("br",{}),"在",e.jsx("code",{children:"log"}),"出断点，local变量如下：",e.jsx("br",{}),e.jsx("br",{}),e.jsx(c,{src:d}),e.jsx("br",{}),"看到",e.jsx("strong",{children:"Closure"}),"关键字了吧，它就是之前func函数活动对象的引用，相当于",e.jsx("code",{children:"[[Scopes]][0] = func[activationObject]"}),e.jsx("br",{}),"为什么会给函数加上",e.jsx("code",{children:"[[Scopes]]"}),"呢，这里就要讲到js函数的执行了。",e.jsx("h2",{id:"function",className:s.articleTitle,children:"执行上下文"}),"执行上下文(Execution Context)在JavaScript中是很重要的概念。变量或函数的上下文决定了它们可以访问哪些数据，每个上下文都有关联的变量对象(variable object)，上下文定义的所有变量和函数都在VO上，虽然代码无法访问，但是后台处理数据时会用到，这个在debug的时候就可以观察到。",e.jsx("br",{}),e.jsx("br",{}),"上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数。",e.jsx("br",{}),e.jsx("br",{}),"每个函数都有自己的上下文。当代码执行流进入函数时，函数的上下文入栈，函数执行完后，上下文出栈。ECMAScript就是这样控制程序执行流的。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("h3",{id:"scopeChain",className:s.articleSubTitle,children:"作用域链"}),"上下文代码执行时，会创建VO的一个",e.jsx("strong",{children:"作用域链"})," ，也就是debug看到的",e.jsx("code",{children:"[[Scopes]]"}),"。它决定了上下文代码在访问变量时的顺序，代码正在执行的的上下文的VO始终位于作用域链的最前端。如果上下文是函数，则活动对象(activation object)作为VO，活动对象最初只有一个变量",e.jsx("code",{children:"arguments"}),"。下一个VO来自包含的上下文，下一个VO再来自下一个包含上下文，以此类推直到全局上下文。全局上下文始终是作用域链的最后一个VO。",e.jsx("br",{}),e.jsx("br",{}),"结合debug数据，作用域链可以理解为对象数组。代码执行时的标识符解析是通过作用域链逐级搜索标识符完成的。搜索过程始终从最前端开始，然后逐级往后，直到找到标识符，如果没有找到通常会报错。",e.jsx("h2",{id:"closureDiff",className:s.articleTitle,children:"闭包的不同之处"}),"在一个函数内部定义的函数会把其包含函数的AO加入到自己的作用域链中。因此，匿名函数包含",e.jsx("code",{children:"func(str)"}),"的AO，也就是可以访问到",e.jsx("code",{children:"str"}),"。",e.jsx("code",{children:"func()"}),"返回匿名函数后，它的作用域链被初始化为",e.jsx("code",{children:"func()"}),"的AO和全局VO，这样匿名函数就可以访问到",e.jsx("code",{children:"func()"}),"可以访问的所有变量。 func()的AO并不能在它执行完毕后销毁，因为匿名函数的作用域链还有对它的引用。",e.jsx("br",{}),"闭包的",e.jsx("strong",{children:"不同之处"}),"在于：在",e.jsx("code",{children:"func()"}),"执行完毕后，它执行上下文的作用域链会销毁，但是它的AO仍然保留在内存中，直到匿名函数被销毁后才会被销毁，因为匿名函数的作用域链还有对AO的引用。",e.jsx("h2",{id:"use",className:s.articleTitle,children:"用途"}),"既然闭包可以保存父级的活动对象，那可以利用它实现私有属性，只对外暴露函数来读写该值，代码如下:",n,e.jsx("h2",{id:"summary",className:s.articleTitle,children:"应用场景"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"1.实现私有成员，避免被外部修改或者污染"}),e.jsx("li",{children:"2.保存状态"}),e.jsx("li",{children:"3.实现函数柯里化"})]})]}),e.jsx(l,{items:[{key:"closure",title:"10分钟内搞懂什么是闭包",href:"#closure"},{key:"debug",title:"debug分析",href:"#debug"},{key:"function",title:"执行上下文",href:"#function",children:[{key:"scopeChain",title:"作用域链",href:"#scopeChain"}]},{key:"closureDiff",title:"闭包的不同之处",href:"#closureDiff"},{key:"use",title:"用途",href:"#use"},{key:"summary",title:"应用场景",href:"#summary"}]})]})}export{m as default};
