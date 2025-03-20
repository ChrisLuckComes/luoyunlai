import{r as i,j as e,d as r,e as c}from"./index-efdda179.js";import{U as a}from"./useMarkdown-77fc54f3.js";import{A as P}from"./Anchor-0e5acf0c.js";import"./index-b85a3ae0.js";const C="/luoyunlai/assets/indexMap-ffa7903c.png",L="/luoyunlai/assets/lighthouse-0693b6d3.png",F="/luoyunlai/assets/sentry-3626f19c.png",I="/luoyunlai/assets/lcp-0cf4c69b.svg",O="/luoyunlai/assets/fid-40d8170f.svg",_="/luoyunlai/assets/cls-5f7546f5.svg",D=`\`\`\`js
{
    "connectStart": 1667977895145, // http请求向服务器发送链接请求时的时间戳。如果使用了持久连接，和fetchStart相同
    "navigationStart": 1667977895137, // 同一个浏览器上下文中，上一个文档结束时的时间戳。如果没有上一个文档，和fetchStart相同。
    "secureConnectionStart": 0, // 浏览器和服务器开始安全链接握手时的时间戳。如果当前网页不要求安全链接，返回0
    "fetchStart": 1667977895145, // 浏览器准备好使用http请求来获取文档的时间戳。这个时间点会在检查任何缓存之前。
    "domContentLoadedEventStart": 1667977896318, // DomContentLoaded事件触发时的时间戳，所有需要执行的脚本执行完毕。
    "responseStart": 1667977895541, // 浏览器从服务器接受到第一个字节时的时间戳
    "domInteractive": 1667977896149, // dom解析结束，开始加载内嵌资源的时间戳，document.readyState的状态为interactive
    "domainLookupEnd": 1667977895145, // 域名查询结束的时间戳。如果使用了持久链接或本地有缓存，和fetchStart相同
    "responseEnd": 1667977895599, // 浏览器从服务器接受到最后一个字节时的时间戳
    "redirectStart": 0, // 表示第一个http重定向开始时的时间戳。如果没有重定向或者有非同源的重定向，为0
    "requestStart": 1667977895161, // 浏览器向服务器发起http请求或者读取本地缓存时的时间戳，即获取html文档
    "unloadEventEnd": 0, // 上一个文档unload事件结束时的时间戳。如果没有上一个文档，为0
    "unloadEventStart": 0, // 上一个文档unload事件开始时的时间戳。如果没有上一个文档，为0
    "domLoading": 1667977895567, // dom开始解析的时间戳，document.readyState的值为loading
    "domComplete": 1667977897362, // dom解析完成的时间戳，document.readyState的值为complete
    "domainLookupStart": 1667977895145, // 域名查询开始时的时间戳。如果使用了持久连接或本地有缓存，与fetchStart相同
    "loadEventStart": 1667977897362, // load事件触发时的时间戳
    "domContentLoadedEventEnd": 1667977896320, // DOMContentLoaded 事件结束时的时间戳
    "loadEventEnd": 1667977897363, // load事件结束时间戳
    "redirectEnd": 0, // 最后一个http重定向结束时的时间戳。如果没有重定向或者有一个非同源的重定向，为0
    "connectEnd": 1667977895145 // 浏览器和服务器建立连接结束时的时间戳，所有握手和认证过程全部结束。如果使用了持久连接，这个值会和fetchStart相同
}
\`\`\``,B=`\`\`\`js
performance.getEntries().filter(item => item.name === 'first-paint')[0];  // 获取 FP 时间

performance.getEntries().filter(item => item.name === 'first-contentful-paint')[0];  // 获取 FCP 时间

performance.getEntriesByName('first-paint'); // 获取 FP 时间

performance.getEntriesByName('first-contentful-paint');  // 获取 FCP 时间

// 也可以通过 performanceObserver 的方式获取
var observer = new PerformanceObserver(function(list, obj) {
    var entries = list.getEntries();
    entries.forEach(item => {
        if (item.name === 'first-paint') {
           // ...
        }
        if (item.name === 'first-contentful-paint') {
           // ...
        }
    })
});
observer.observe({type: 'paint'});
\`\`\``,A="```js\nnew PerformanceObserver((entryList) => {\n    for (const entry of entryList.getEntries()) {\n        console.log('LCP candidate:', entry.startTime, entry);\n    }\n}).observe({type: 'largest-contentful-paint', buffered: true});\n```",M="```js\nnew PerformanceObserver((entryList) => {\n    for (const entry of entryList.getEntries()) {\n        console.log('FID candidate:', entry.startTime, entry);\n    }\n}).observe({type: 'first-paint', buffered: true});\n```",R=`\`\`\`js
new PerformanceObserver(function(list) {
    let perfEntries = list.getEntries();
    for (let i = 0; i < perfEntries.length; i++) {
        //...
    }
}).observe({ type: 'longtask'});
\`\`\``,G=`\`\`\`js
new PerformanceObserver(function(list) {
    let perfEntries = list.getEntries();
    for (let i = 0; i < perfEntries.length; i++) {
        //...
    }
})observe({type: 'layout-shift', buffered: true});
\`\`\``,J=`\`\`\`ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
    dsn: 'https://test123456@0o.ingest.sentry.io/666',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        )
      })
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.7
  });
\`\`\``;function W(){const l=e.jsx(a,{markdown:D}),o=e.jsx(a,{markdown:B}),d=e.jsx(a,{markdown:A}),h=e.jsx(a,{markdown:M}),f=e.jsx(a,{markdown:R}),m=e.jsx(a,{markdown:G}),x=e.jsx(a,{markdown:J}),[j,p]=i.useState(""),[g,u]=i.useState(""),[y,b]=i.useState(""),[v,S]=i.useState(""),[N,k]=i.useState([]),[w,E]=i.useState([]);return i.useEffect(()=>{let t=performance.getEntriesByName("first-paint"),T=performance.getEntriesByName("first-contentful-paint");p(JSON.stringify(t[0])),u(JSON.stringify(T[0])),new PerformanceObserver(s=>{for(const n of s.getEntries())b(JSON.stringify(n))}).observe({type:"largest-contentful-paint",buffered:!0}),new PerformanceObserver(s=>{for(const n of s.getEntries())S(JSON.stringify(n))}).observe({type:"first-input",buffered:!0}),new PerformanceObserver(function(s){let n=s.getEntries();k(n)}).observe({type:"longtask"}),new PerformanceObserver(function(s){let n=s.getEntries();E(n)}).observe({type:"layout-shift"})},[]),e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"header",className:"font-semibold text-h2 mb-2",children:"连指标都不知道还敢说懂性能优化？"}),"web性能通常分为两方面：",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"首屏性能"}),e.jsx("li",{children:"交互性能"})]}),"首先需要分析并定位问题，然后针对性的优化。",e.jsx("br",{}),"常见手段是打开谷歌浏览器F12，使用",e.jsx("code",{children:"performance"}),"、",e.jsx("code",{children:"network"}),"、",e.jsx("code",{children:"lighthouse"}),"、",e.jsx("code",{children:"memory"}),"面板，对页面加载，执行过程进行分析。",e.jsx("h2",{id:"indexMap",className:r.articleTitle,children:"常见的性能优化指标及获取方式"}),"页面加载过程模型图如下：",e.jsx(c,{src:C}),e.jsx("br",{}),"这个模型是",e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://www.w3.org/webperf/",children:"w3c"}),"制定的，定义了从上一个页面结束到下一个页面加载完成的过程。基于这个模型可以获取到页面加载过程中各个阶段的耗时情况，分析页面性能。",e.jsx("br",{}),e.jsx("br",{}),"可以通过",e.jsx("code",{children:"window.performance.timing"}),"获取加载过程模型中的各阶段耗时数据",l,"后来该属性被标记为废弃，改用",e.jsx("code",{children:'window.performance.getEntriesByType("navigation")'}),"，旧API返回的都是时间戳，而新API返回的是相对时间，可以直接用来分析，很方便。不过实际开发之中更推荐使用谷歌官方的js库",e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://github.com/GoogleChrome/web-vitals#api",children:"web-vitals"}),"来获取指标，避免再去处理各种特殊情况。",e.jsx("h3",{id:"fp",className:r.articleSubTitle,children:"页面何时开始渲染 - FP & FCP"}),"衡量页面何时开始渲染，有两个指标：",e.jsx("code",{children:"FP"}),"和",e.jsx("code",{children:"FCP"}),e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:"FP(first paint)"}),"，表示页面开始首次绘制的时间点，值越小越好。在",e.jsx("code",{children:"FP"}),"之前，用户看到的是导航之前的页面。"]}),e.jsxs("li",{children:[e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/fcp/",children:"FCP(first content paint)"})}),"，",e.jsx("code",{children:"lighthouse"}),"六大指标之一，表示首次绘制任何文本、图像、非空白",e.jsx("code",{children:"canvas"}),"或",e.jsx("code",{children:"SVG"}),"的时间点，值越小越好。"]})]}),"这两个指标，可以通过",e.jsx("code",{children:"performance.getEntry"}),"、",e.jsx("code",{children:"performance.getEntriesByName"}),"、",e.jsx("code",{children:"performanceObserver"}),"来获取。",e.jsx("br",{}),e.jsx("br",{}),o,e.jsx("strong",{children:"FP:"}),e.jsx("div",{className:r.markdown,children:j}),e.jsx("strong",{children:"FCP:"}),e.jsx("div",{className:r.markdown,children:g}),e.jsx("br",{}),e.jsx("h3",{id:"fmp",className:r.articleSubTitle,children:"页面何时渲染主要内容 - LCP"}),e.jsx("br",{}),e.jsxs("ul",{className:r.ul,children:[e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/lcp/",children:"LCP(largest contentful paint)"})}),"，最大元素的绘制时间点，值越小越好"]}),e.jsx("embed",{src:I,type:"image/svg+xml"}),d,e.jsx("strong",{children:"LCP:"}),e.jsx("div",{className:r.markdown,children:y}),e.jsx("h3",{id:"tti",className:r.articleSubTitle,children:"何时可以交互 - TTI & TBT"}),e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/i18n/zh/tti/",children:"TTI(time to interactive)"})}),"，可交互时间，",e.jsx("code",{children:"lighthouse"}),"面板指标之一，用于测量页面开始加载到主要资源完成渲染，并能够快速、可靠响应用户输入所需的时间，值越小越好。",e.jsx("br",{}),"官方没有提供接口获取，而是给出了计算公式，并且不建议手动测量该指标，而是建议获取",e.jsx("code",{children:"FID"}),"，具体点击上面的链接查看。"]}),e.jsxs("li",{children:[e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/lighthouse-total-blocking-time/",children:"TBT(total blocking time)"})}),"，总的阻塞时间，",e.jsx("code",{children:"lighthouse"}),"六大指标之一，用于测量",e.jsx("code",{children:"FCP"}),"到",e.jsx("code",{children:"TTI"}),"之间的总阻塞时间，值越小越好。",e.jsx("br",{}),"同样是需要手动计算的时间，在计算",e.jsx("code",{children:"TTI"}),"遍历收集",e.jsx("code",{children:"longTask"}),"的同时，计算阻塞时间的总和。"]})]}),e.jsx("h3",{id:"fid",className:r.articleSubTitle,children:"交互是否有延迟 - FID & Long Task"}),"衡量交互是否有延迟有2个指标：",e.jsx("code",{children:"FID"}),"、",e.jsx("code",{children:"Long Task"}),"。其中",e.jsx("code",{children:"FID"}),"用来衡量用户首次交互延迟的情况，",e.jsx("code",{children:"Long Task"}),"用于衡量用户在使用应用的过程中遇到的延迟、阻塞情况。",e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/fid/",children:"FID(first input delay)"})}),"，首次输入延迟，测量用户第一次与页面交互（点击事件等）直到浏览器做出响应，并实际能够开始处理事件所经过的事件。",e.jsx("embed",{src:O,type:"image/svg+xml"}),h,e.jsx("strong",{children:"FID："}),e.jsx("div",{className:r.markdown,children:v})]}),e.jsxs("li",{children:[e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceLongTaskTiming",children:"Long task"}),"，这个指标可以告诉我们哪些任务执行耗费了50ms以上的时间。",e.jsxs("ul",{className:r.ul,children:["任何连续不间断且主UI线程繁忙50ms及以上的时间区间。例如下面的场景：",e.jsx("li",{children:"长耗时的事件回调"}),e.jsx("li",{children:"代价高昂的回流和其他重绘"}),e.jsx("li",{children:"浏览器在超过50ms的事件循环相邻循环之间所做的工作"})]}),f,e.jsx("strong",{children:"Long Task："}),e.jsx("div",{className:r.markdown,children:N.map(t=>e.jsx("div",{children:JSON.stringify(t)},t.name))})]})]}),e.jsx("h3",{id:"cls",className:r.articleSubTitle,children:"页面视觉是否稳定 - CLS"}),e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://web.dev/cls/",children:"CLS"})}),"，累积布局偏移，测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移值。",e.jsx("embed",{src:_,type:"image/svg+xml"}),m,e.jsx("strong",{children:"CLS:"}),e.jsx("div",{className:r.markdown,children:w.map(t=>e.jsx("div",{children:JSON.stringify(t)},t.name))}),e.jsx("h3",{id:"key",className:r.articleSubTitle,children:"性能分析关键指标"}),"如果使用",e.jsx("code",{children:"lighthouse"}),"进行分析，会使用6个指标。以下是我的网站分数",e.jsx(c,{src:L}),e.jsx("br",{}),"如果用",e.jsx("code",{children:e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"http://sentry.io/",children:"Sentry"})}),"等工具进行分析，会使用4个指标",e.jsx(c,{src:F}),e.jsx("h2",{id:"sentry",className:r.articleTitle,children:"使用Sentry做性能监控"}),e.jsx("h3",{id:"install",className:r.articleSubTitle,children:"安装"}),e.jsx("div",{className:r.markdown,children:"pnpm add @sentry/react @sentry/tracing"}),x,"其中",e.jsx("code",{children:"dsn"}),"需要在sentry新增project之后才能获取到，",e.jsx("code",{children:"tracesSampleRate"}),"决定了上报的频率，配置为0则不上报。",e.jsx("h3",{id:"how",className:r.articleSubTitle,children:"原理"}),"原理就是如前文所述，通过",e.jsx("code",{children:"window.performance.getEntries"}),"和",e.jsx("code",{children:"performanceObserver"}),"获取指标数据，然后通过接口上报。看板通过可视化图表的方式展示性能指标数据供分析"]}),e.jsx(P,{items:[{title:"连指标都不知道还敢说懂性能优化？",key:"header",href:"#header"},{title:"常见的性能优化指标及获取方式",key:"indexMap",href:"#indexMap",children:[{title:"页面何时开始渲染 - FP & FCP",key:"fp",href:"#fp"},{title:"页面何时渲染主要内容 - LCP",key:"fmp",href:"#fmp"},{title:"何时可以交互 - TTI & TBT",key:"tti",href:"#tti"},{title:"页面视觉是否稳定 - CLS",key:"cls",href:"#cls"},{title:"性能分析关键指标",key:"key",href:"#key"}]},{title:"使用Sentry做性能监控",key:"sentry",href:"#sentry",children:[{title:"配置",key:"install",href:"#install"},{title:"原理",key:"how",href:"#how"}]}]})]})}export{W as default};
