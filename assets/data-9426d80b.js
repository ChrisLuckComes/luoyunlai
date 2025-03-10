import{j as a,d as t,e as l}from"./index-3ba01091.js";import{U as c}from"./useMarkdown-3db75fe1.js";import{A as s}from"./index-5b28342b.js";const n="/luoyunlai/assets/heapMemory-4cc55c58.png",r=`\`\`\`js
function initData (vm: Component) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {}

    // 以下省略添加响应式的过程 
  }

export function getData (data: Function, vm: Component): any {
    try {
        //使用call传入vm，这样对于每个vm都创建了一份数据
        return data.call(vm, vm)
    } catch (e) {
        handleError(e, vm, data())
        return {}
    } finally {
        popTarget()
    }
}
\`\`\``,{Link:e}=s;function h(){const i=a.jsx(c,{markdown:r});return a.jsx("article",{id:"rootArticle",className:t.article,children:a.jsxs("main",{className:t.content,children:[a.jsx("h2",{id:"title",className:t.articleTitle,children:"为什么data必须是函数"}),"根本原因如下：",a.jsx("h2",{id:"heap",className:t.articleTitle,children:"根本原因：堆内存"}),a.jsx(l,{src:n}),"javaScript将对象放在堆内存中，对象的复制或者传递都只是它的引用，实际上还是指向同一个对象的内存地址。 所以在vue中data如果是对象的话，在多次被复用的情况下，任意一个地方修改了属性会影响其他所有地方，那么vue是怎么处理的呢？",a.jsx("h2",{id:"closure",className:t.articleTitle,children:"函数执行"}),a.jsx("div",{className:t.assist,children:"src\\core\\instance\\state.js"}),"答案是使用函数，",a.jsx("code",{children:"data.call(vm, vm)"}),a.jsx("br",{}),a.jsx("br",{}),"执行函数时两个重要的步骤就是确定变量对象和this。",a.jsx("br",{}),"this判断也不复杂，就那么几种情况",a.jsx("h3",{id:"diff",className:t.articleSubTitle,children:"this"}),a.jsxs("ul",{className:t.ul,children:[a.jsx("li",{children:"全局作用域：this就是宿主环境，在浏览器中是window，在node.js环境是global"}),a.jsxs("li",{children:["函数执行：",a.jsxs("ul",{className:t.ul,children:[a.jsx("li",{children:"xxx.call(xxxThis,xxx): 使用call和apply传入的第一个参数就是this"}),a.jsx("li",{children:"xxx.func(...): 谁调用的就是this就是谁，此时就是xxx"}),a.jsx("li",{children:"箭头函数：自身没有this，所在环境的this"})]})]})]}),a.jsx("br",{}),"vue就是使用",a.jsx("code",{children:"call"}),"给每个组件当组件被复用时执行data函数时传入各自的this。 data函数内",a.jsxs("code",{children:["return ","{...}"]}),"相当于",a.jsxs("code",{children:["let xxx = ","{...}","; return xxx;"]}),"，xxx是单独的变量声明，会开辟独立的内存地址，也就实现了给每个组件单独维护一份data的目的",i,a.jsxs(s,{className:"anchor",getContainer:()=>document.getElementById("content"),children:[a.jsx(e,{href:"#heap",title:"堆内存"}),a.jsx(e,{href:"#func",title:"函数执行",children:a.jsx(e,{href:"#this",title:"this"})})]})]})})}export{h as default};
