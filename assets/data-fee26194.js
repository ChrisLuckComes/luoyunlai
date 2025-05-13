import{j as e,d as a,e as s}from"./index-52cacda3.js";import{U as i}from"./useMarkdown-2196212a.js";import{A as l}from"./Anchor-4d1d2fe9.js";const c="/luoyunlai/assets/heapMemory-4cc55c58.png",r=`\`\`\`js
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
\`\`\``;function h(){const t=e.jsx(i,{markdown:r});return e.jsxs("article",{id:"rootArticle",className:a.article,children:[e.jsxs("main",{className:a.content,children:[e.jsx("h2",{id:"title",className:a.articleTitle,children:"为什么data必须是函数"}),"根本原因如下：",e.jsx("h2",{id:"heap",className:a.articleTitle,children:"根本原因：堆内存"}),e.jsx(s,{src:c}),"javaScript将对象放在堆内存中，对象的复制或者传递都只是它的引用，实际上还是指向同一个对象的内存地址。 所以在vue中data如果是对象的话，在多次被复用的情况下，任意一个地方修改了属性会影响其他所有地方，那么vue是怎么处理的呢？",e.jsx("h2",{id:"example",className:a.articleTitle,children:"实际例子"}),e.jsx("div",{className:a.assist,children:"错误示例"}),e.jsx("pre",{className:a.markdown,children:`// 错误示例
const sharedData = {
  count: 0
}

Vue.component('counter', {
  data: sharedData,
  template: '<button @click="count++">Count: {{ count }}</button>'
})`}),"这种情况下，所有counter组件会共享同一个count值，点击任何一个按钮都会影响所有组件。",e.jsx("h2",{id:"closure",className:a.articleTitle,children:"函数执行"}),e.jsx("div",{className:a.assist,children:"src\\core\\instance\\state.js"}),"答案是使用函数，",e.jsx("code",{children:"data.call(vm, vm)"}),e.jsx("br",{}),e.jsx("br",{}),"执行函数时两个重要的步骤就是确定变量对象和this。",e.jsx("br",{}),"this判断也不复杂，就那么几种情况",e.jsx("h3",{id:"diff",className:a.articleSubTitle,children:"this"}),e.jsxs("ul",{className:a.ul,children:[e.jsx("li",{children:"全局作用域：this就是宿主环境，在浏览器中是window，在node.js环境是global"}),e.jsxs("li",{children:["函数执行：",e.jsxs("ul",{className:a.ul,children:[e.jsx("li",{children:"xxx.call(xxxThis,xxx): 使用call和apply传入的第一个参数就是this"}),e.jsx("li",{children:"xxx.func(...): 谁调用的就是this就是谁，此时就是xxx"}),e.jsx("li",{children:"箭头函数：自身没有this，所在环境的this"})]})]})]}),e.jsx("br",{}),"vue就是使用",e.jsx("code",{children:"call"}),"给每个组件当组件被复用时执行data函数时传入各自的this。 data函数内",e.jsxs("code",{children:["return ","{...}"]}),"相当于",e.jsxs("code",{children:["let xxx = ","{...}","; return xxx;"]}),"，xxx是单独的变量声明，会开辟独立的内存地址，也就实现了给每个组件单独维护一份data的目的",e.jsx("h2",{id:"best-practice",className:a.articleTitle,children:"最佳实践"}),e.jsxs("ul",{className:a.ul,children:[e.jsx("li",{children:"始终使用函数返回data对象，即使是在单文件组件中"}),e.jsx("li",{children:"避免在data函数中返回复杂对象，应该只返回组件需要的数据"}),e.jsx("li",{children:"对于需要在多个组件间共享的数据，应该使用Vuex或provide/inject"}),e.jsx("li",{children:"在data函数中不要使用箭头函数，因为箭头函数会绑定父级作用域的this"})]}),t]}),e.jsx(l,{items:[{title:"堆内存",key:"heap",href:"#heap"},{title:"实际例子",key:"example",href:"#example"},{title:"函数执行",key:"func",href:"#func",children:[{title:"this",key:"this",href:"#this"}]},{title:"最佳实践",key:"best-practice",href:"#best-practice"}]})]})}export{h as default};
