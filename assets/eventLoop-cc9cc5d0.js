import{j as e,d as s,e as t}from"./index-058c629c.js";import{U as r}from"./useMarkdown-8861a8d5.js";import{A as i}from"./Anchor-75b3735e.js";import"./index-a0d8c73b.js";const o="/luoyunlai/assets/eventloop-15022bd6.webp",a="/luoyunlai/assets/eventloop2-29b6e1ba.webp",n="/luoyunlai/assets/result-6f70e6cf.png",c="/luoyunlai/assets/timer2-e0f5a881.png",m=`\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function example() {
        setTimeout(() => {
          console.log(1);
        }, 0);
      }

      function secondExample() {
        Promise.resolve().then(() => {
          console.log(2);
        });
      }
      console.log(0);
      example();
      secondExample();
      console.log(4);
    <\/script>
  </head>
  <body></body>
</html>

\`\`\``;function j(){const l=e.jsx(r,{markdown:m});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"事件循环(Event Loop)"}),"网上看过很多文章写事件循环、主线程、任务、微任务，还是有些疑问没有解答，总是没有搞的特别清楚，本文将这些碎片知识收集并记录下来。",e.jsx("br",{}),e.jsx("h2",{id:"mainThread",className:s.articleTitle,children:"主线程"}),"主线程是浏览器执行JS，重绘，处理事件，完成其他任务的线地方。它也被称为JS引擎，集成到了浏览器中。",e.jsx("h2",{id:"eventloop",className:s.articleTitle,children:"Event Loop"}),"如下是事件循环的架构图。",e.jsx(t,{src:o}),e.jsx("br",{}),"如图所示，事件循环是唯一可以让任务进入调用栈的方式。任务可能有两种类型：",e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"页面的主要的js代码执行"}),e.jsx("li",{children:"渲染，微任务等"})]}),"这些任务就按下图所示运转",e.jsx(t,{src:a}),"一旦执行了任意js，script任务就会进入Tasks队列。随着代码运行，会遇到不同来源的任务。在script task执行完后，",e.jsx("strong",{children:"事件循环"}),"开始执行",e.jsx("strong",{children:"微任务(Microtasks)"}),"，这个过程一直持续到任务都执行完成。",e.jsx("br",{}),"如果一个来源没有任务了，事件循环就会移动到下一个。相反的，如果某个来源的任务执行时间很长，其他的任务只能等着，如果无止境的执行，那么执行栈会溢出，浏览器报错。",e.jsx("h2",{id:"code",className:s.articleTitle,children:"例子"}),"来看看浏览器是怎么执行的，如下示例html代码：",l,"首先执行同步代码，然后",e.jsx("code",{children:"example"}),"函数添加一个",e.jsx("code",{children:"timer"}),"，timer会在下一个tasks队列执行，secondExample添加了一个微任务。然后这一轮的task执行完了，就执行微任务。最后执行timer",e.jsx("br",{}),"输出为 0 4 2 1",e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{src:n}),e.jsx("br",{}),e.jsx("br",{}),"那么问题来了，如果连续",e.jsx("code",{children:"setTimeout"}),"会是怎样呢？如下图所示，它们会在分开在两次循环中执行。",e.jsx(t,{src:c}),e.jsx("h2",{id:"summary",className:s.articleTitle,children:"总结"}),"事件循环就是：task => Microtasks的循环",e.jsx("br",{}),"先执行同步代码，包括新增timer,然后执行所有的微任务。只不过timer会等本次微任务执行完成后下次循环再执行，而且timer和timer之间会在不同的循环中执行。"]}),e.jsx(i,{items:[{title:"事件循环(Event Loop)",key:"pre",href:"#pre"},{title:"主线程",key:"mainThread",href:"#mainThread"},{title:"Event Loop",key:"eventloop",href:"#eventloop"},{title:"例子",key:"code",href:"#code"},{title:"总结",key:"summary",href:"#summary"}]})]})}export{j as default};
