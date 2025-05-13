import{j as e,d as s}from"./index-52cacda3.js";import{A as x}from"./Anchor-4d1d2fe9.js";import{U as t}from"./useMarkdown-2196212a.js";const j="```ts\nconst express = require('express');\nconst app = express();\nconst port = 3000;\n\napp.listen(port, () => {\n    console.log(`Server is running on port ${port}`);\n});\n```",f="```ts\nconst { createApp } = require('vue');\nconst { renderToString } = require('@vue/server-renderer');\n```",y=`\`\`\`ts
const { createRouter, createWebHistory } = require('vue-router');
const routes = [
    { path: '/', component: () => import('./Home.vue') },
    { path: '/about', component: () => import('./About.vue') }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

app.get('*', async (req, res) => {
    const app = createApp({});
    app.use(router);
    await router.push(req.url);
    await router.isReady();
    const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components));
    // 得到匹配的组件
});
\`\`\``,T=`\`\`\`ts
// Home.vue
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const data = ref(null);

        const fetchData = async () => {
            const response = await fetch(\`https://api.example.com/data/\${route.params.id}\`);
            data.value = await response.json();
        };

        onMounted(fetchData);

        return {
            data
        };
    }
};
\`\`\``,H=`\`\`\`ts
const prefetchPromises = matchedComponents.map(async (component) => {
    if (component.setup) {
        const setupResult = await component.setup({});
        if (setupResult && typeof setupResult.fetchData === 'function') {
            await setupResult.fetchData();
        }
    }
});
await Promise.all(prefetchPromises);
\`\`\``,v=`\`\`\`ts
const app = createApp(router.currentRoute.value.matched[0].components.default);
app.use(router);

// 如果有预取的数据，可以注入到应用的状态中
// 假设预取的数据存储在一个对象中
const prefetchData = { /* 预取的数据 */ };
app.config.globalProperties.$prefetchData = prefetchData;
\`\`\``,A="```ts\nconst html = await renderToString(app);\n```",R=`\`\`\`ts
const state = { /* 应用的状态 */ };
const stateJson = JSON.stringify(state);
const fullHtml = \`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue 3 SSR Example</title>
      </head>
      <body>
        <div id="app">\${html}</div>
        <script>
          window.__INITIAL_STATE__ = \${stateJson};
        <\/script>
        <script src="client.js"><\/script>
      </body>
    </html>
\`;
\`\`\``,S="```ts\nres.send(fullHtml);\n```",g="```ts\nconst initialState = window.__INITIAL_STATE__;\nconst app = createApp({});\napp.use(router);\napp.config.globalProperties.$prefetchData = initialState;\n```",M=`\`\`\`ts
import { createSSRApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const app = createSSRApp(App);
const router = createRouter({
    history: createWebHistory(),
    routes
});
app.use(router);

app.mount('#app', true); // 第二个参数为 true 表示进行 hydration
\`\`\``,N=`\`\`\`html
<template>
  <div>
    <!-- 检查数据是否加载完成 -->
    <div v-if="!post.isLoading">
      <h1>{{ post.data.title }}</h1>
      <p>{{ post.data.body }}</p>
    </div>
    <!-- 数据加载中显示加载提示 -->
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { useFetch } from '#app';

// 使用 useFetch 异步获取数据
const { data: post, pending: isLoading } = await useFetch('https://jsonplaceholder.typicode.com/posts/1');
<\/script>
\`\`\``;function E(){const r=e.jsx(t,{markdown:j}),n=e.jsx(t,{markdown:f}),i=e.jsx(t,{markdown:y}),o=e.jsx(t,{markdown:T}),a=e.jsx(t,{markdown:H}),c=e.jsx(t,{markdown:v}),l=e.jsx(t,{markdown:A}),d=e.jsx(t,{markdown:R}),h=e.jsx(t,{markdown:S}),p=e.jsx(t,{markdown:g}),u=e.jsx(t,{markdown:M}),m=e.jsx(t,{markdown:N});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"preset",className:"font-semibold text-h2 mb-2",children:"前置知识"}),e.jsx("strong",{children:"客户端渲染(CSR)与服务端渲染(SSR): "}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:e.jsxs("span",{children:[e.jsx("strong",{children:"客户端渲染(CSR)："}),"传统单页面应用(SPA)常采用此模式。浏览器先加载空白HTML页面，再下载js文件。js代码在浏览器执行，动态创建和填充DOM元素。缺点是首屏加载时间长，不利于SEO"]})}),e.jsx("li",{children:e.jsxs("span",{children:[e.jsx("strong",{children:"服务端渲染(SSR)："}),"服务器端直接生成完整HTML页面并发送给客户端，客户端接收后将其激活为可交互应用。优点是首屏加载速度快，有利于SEO。"]})})]}),e.jsx("h2",{id:"ssr",className:"font-semibold text-h2 mb-2",children:"服务器端渲染过程"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{id:"environmentSetup",children:[e.jsx("strong",{children:"环境搭建："}),e.jsxs("ul",{className:s.subUl,children:[e.jsx("li",{children:e.jsxs("span",{children:[e.jsx("strong",{children:"选择服务器框架："}),"常用Express、Koa等，以express为例创建服务：",r]})}),e.jsx("li",{children:e.jsxs("span",{children:[e.jsxs("strong",{children:["引入Vue3和",e.jsx("code",{children:"@vue/server-renderer"}),"："]}),n]})})]})]}),e.jsxs("li",{id:"routeMatching",children:[e.jsx("strong",{children:"路由匹配"}),e.jsx("br",{}),"服务器接收客户端HTTP请求，获取请求URL，使用",e.jsx("code",{children:"vue-router"}),"匹配路由。",i]}),e.jsxs("li",{id:"dataRequest",children:[e.jsx("strong",{children:"数据预取"}),e.jsx("br",{}),"在Vue3中，数据预获取可以使用组件的",e.jsx("code",{children:"setup"}),"函数中的异步操作。",o,"在服务器端，可以在组件实例化前手动调用数据预获取逻辑",a]}),e.jsxs("li",{id:"componentInstanceAndDataInjection",children:[e.jsx("strong",{children:"组件实例化和数据注入"}),e.jsx("br",{}),"服务器端创建组件实例，并注入数据。",c]}),e.jsxs("li",{id:"generateHtml",children:[e.jsx("strong",{children:"生成HTML"}),e.jsx("br",{}),"将组件实例和数据序列化到HTML中。",l]}),e.jsxs("li",{id:"stateSerialization",children:[e.jsx("strong",{children:"状态序列化拼接HTML"}),e.jsx("br",{}),"将序列化后的状态和HTML拼接成完整的HTML页面。",d]}),e.jsxs("li",{id:"sendHtml",children:[e.jsx("strong",{children:"发送HTML到客户端"}),e.jsx("br",{}),"将完整的HTML页面发送给客户端。",h]})]}),e.jsx("h2",{id:"clientActivation",className:"font-semibold text-h2 mb-2",children:"客户端激活过程"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{id:"receiveHtml",children:[e.jsx("strong",{children:"接收HTML"}),e.jsx("br",{}),"客户端接收服务器发送的完整HTML页面，浏览器解析HTML并构建DOM树，此时页面显示静态HTML内容。"]}),e.jsxs("li",{id:"stateRecovery",children:[e.jsx("strong",{children:"状态恢复"}),p]}),e.jsxs("li",{id:"hydration",children:[e.jsx("strong",{children:"Hydration(激活)过程"}),u,"在",e.jsx("code",{children:"hydration"}),"过程中，Vue会对比服务端渲染的HTML和客户端重新生成的虚拟DOM。对于相同部分，复用服务器端渲染的DOM节点，有差异的部分进行更新。 同时，重新绑定事件处理函数到对应DOM元素上，当Hydration完成后，触发客户端的生命周期钩子。"]})]}),e.jsx("h2",{id:"performanceOptimization",className:"font-semibold text-h2 mb-2",children:"性能优化"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"缓存策略："}),"对服务器端渲染结果进行缓存，减少重复渲染开销。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"代码分割："}),"将客户端代码分割，只加载当前页面需要的代码，减少初始加载时间。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"图片优化："}),"对页面图片进行压缩优化，减少加载时间"]})]}),e.jsx("h2",{id:"nuxt",className:"font-semibold text-h2 mb-2",children:"Nuxt.js"}),"业内通常直接使用Nuxt.js框架，它简化了Vue SSR的开发流程，提供了自动路由、数据预取、代码分割等功能，无需再手动实现。和CSR一样配置路由，正常开发即可。",e.jsx("h3",{id:"asyncData",className:s.articleSubTitle,children:"数据预取"}),"Nuxt.js 3提供了多种方式，可以使用",e.jsx("code",{children:"useAsyncData"}),"、",e.jsx("code",{children:"useFetch"}),"等。以下是使用",e.jsx("code",{children:"useFetch"}),"的示例，它更简洁。",m,"Nuxt.js实现原理跟前文提到的一样，在组件实例化之前调用setup函数。",e.jsx("h2",{id:"summary",className:s.articleTitle,children:"总结"}),"ssr的渲染过程是服务器端和客户端协同工作的过程，服务器端负责请求梳理、数据预取、组件渲染和状态序列化；客户端负责接收HTML、恢复状态和激活组件，使页面具备交互能力。 当然实战过程中我们可以直接使用Nuxt.js框架，它让开发变得更加简单高效，开发只需要专注业务逻辑"]}),e.jsx(x,{items:[{title:"前置知识",key:"preset",href:"#preset",children:[]},{title:"服务器端渲染过程",key:"ssr",href:"#ssr",children:[{title:"环境搭建",key:"environmentSetup",href:"#environmentSetup",children:[]},{title:"路由匹配",key:"routeMatching",href:"#routeMatching",children:[]},{title:"数据预取",key:"dataRequest",href:"#dataRequest",children:[]},{title:"组件实例化和数据注入",key:"componentInstanceAndDataInjection",href:"#componentInstanceAndDataInjection",children:[]},{title:"生成HTML",key:"generateHtml",href:"#generateHtml",children:[]},{title:"状态序列化拼接HTML",key:"stateSerialization",href:"#stateSerialization",children:[]},{title:"发送HTML到客户端",key:"sendHtml",href:"#sendHtml",children:[]}]},{title:"客户端激活过程",key:"clientActivation",href:"#clientActivation",children:[{title:"接收HTML",key:"receiveHtml",href:"#receiveHtml",children:[]},{title:"状态恢复",key:"stateRecovery",href:"#stateRecovery",children:[]},{title:"Hydration(激活)过程",key:"hydration",href:"#hydration",children:[]}]},{title:"性能优化",key:"performanceOptimization",href:"#performanceOptimization",children:[]},{title:"Nuxt.js",key:"nuxt",href:"#nuxt",children:[{title:"数据预取",key:"dataPrefetch",href:"#dataPrefetch",children:[]}]},{title:"总结",key:"summary",href:"#summary",children:[]}]})]})}export{E as default};
