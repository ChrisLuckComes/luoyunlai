import{j as e,d as s,e as t}from"./index-52cacda3.js";import{V as d}from"./index-44434083.js";import{U as r}from"./useMarkdown-2196212a.js";import{A as o}from"./Anchor-4d1d2fe9.js";const h="/luoyunlai/assets/vite-51249ca9.png",x="/luoyunlai/assets/vite-adv-1-a81c93b3.png",p="/luoyunlai/assets/vite-adv-2-26360cd6.png",j="/luoyunlai/assets/vite-adv-3-fe78130a.png",m="/luoyunlai/assets/max-age-1cf213af.png",u="/luoyunlai/assets/vite-deps-998aaf74.png",b="/luoyunlai/assets/vite-resource-85e66b4b.png",k=`\`\`\`ts
// 伪代码，模拟 Vite 启动 WebSocket 服务
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 24678 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    // 监听客户端消息
    ws.on('message', (message) => {
        console.log(\`Received: \${message}\`);
    });
});
\`\`\``,g=`\`\`\`ts
const chokidar = require('chokidar');
const watcher = chokidar.watch('src', {
    ignored: /(^|[/\\])../, // 忽略隐藏文件
    persistent: true
});

watcher.on('change', (path) => {
    // 文件变化处理逻辑
    handleFileChange(path);
});

function handleFileChange(path) {
    // 向客户端发送更新消息
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'update',
                path
            }));
        }
    });
}
\`\`\``,v=`\`\`\`ts
// 伪代码，模拟浏览器建立 WebSocket 连接
const socket = new WebSocket('ws://localhost:24678');

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        // 处理更新消息
        handleUpdate(data.path);
    }
});
\`\`\``,f=`\`\`\`ts
function handleUpdate(path) {
    const moduleId = getModuleIdByPath(path);
    if (moduleId) {
        // 替换模块
        import(\`\${path}?t=${Date.now()}\`).then((newModule) => {
            const oldModule = window.__vite_hmr_cache[moduleId];
            if (oldModule) {
                // 执行模块的 HMR 处理函数
                if (oldModule.hmr && oldModule.hmr.accept) {
                    oldModule.hmr.accept(newModule);
                }
                // 更新缓存
                window.__vite_hmr_cache[moduleId] = newModule;
            }
        });
    }
}

function getModuleIdByPath(path) {
    // 根据路径查找模块 ID 的逻辑
    // ...
    return moduleId;
}
\`\`\``,S=`\`\`\`html
<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vite!');

if (undefined) {
    undefined.accept((newModule) => {
        // 更新组件状态
        message.value = newModule.message.value;
    });
}
<\/script>
\`\`\``,w=[{key:"h1",href:"#h1",title:"Vite"},{key:"1",href:"#front",title:"前言"},{key:"2",href:"#begin",title:"优点",children:[{key:"3",href:"#no-build",title:"无需打包"},{key:"4",href:"#hmr",title:"热重载(HMR)"},{key:"2-5",href:"#ts",title:"原生支持TypeScript"}]},{key:"5",href:"#move",title:"迁移流程"},{key:"6",href:"#end",title:"技术选型",children:[]},{key:"7",href:"#hmr-principle",title:"热重载实现原理",children:[{title:"服务器端",key:"hmr-principle-server",href:"#hmr-principle-server",children:[{key:"hmr-principle-server-websocket",href:"#hmr-principle-server-websocket",title:"启动WebSocket服务"},{key:"watch",href:"watch",title:"文件监听"}]},{title:"客户端",key:"hmr-principle-client",href:"#hmr-principle-client",children:[{key:"hmr-principle-client-websocket",href:"#hmr-principle-client-websocket",title:"建立WebSocket连接"},{key:"moduleReplacement",href:"#moduleReplacement",title:"模块替换逻辑"},{key:"moduleHmr",href:"#moduleHmr",title:"模块 HMR 处理函数"}]},{title:"总结",key:"summary",href:"#summary",children:[]}]}];function T(){const i=e.jsx(r,{markdown:k}),l=e.jsx(r,{markdown:g}),c=e.jsx(r,{markdown:v}),n=e.jsx(r,{markdown:f}),a=e.jsx(r,{markdown:S});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h1",{id:"h1",className:s.pageTitle,children:e.jsx("a",{className:"text-blue",target:"_blank",rel:"noreferrer",href:"https://cn.vitejs.dev/",children:"Vite"})}),"Vite基于ES Modules实现，在开发环境中无需打包，直接利用浏览器的ES模块支持加载文件，从而实现快速的冷启动和热更新。在生产环境中，Vite会使用Rollup打包，生成优化的静态资源。",e.jsx("br",{}),e.jsx(t,{src:h,alt:"VITE",width:320,height:320}),e.jsx("h2",{id:"front",className:s.articleTitle,children:"前言"}),e.jsxs("p",{children:["本仓库最开始是由 ",e.jsx("code",{children:"create-react-app"})," 创建，其中使用了webpack，关于webpack我有几点想吐槽"]}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"1.热替换速度慢，写完几行代码随手保存想看看效果，需要等个几秒才能看到。"}),e.jsx("li",{children:"2.工程规模变大后，启动速度显著变慢。"}),e.jsx("li",{children:"3.配置大而复杂，不用vue-cli/umi/creatReactApp这种集大成者高低也得来个几十行代码才能达到最佳状态"})]}),e.jsx("h2",{id:"begin",className:s.articleTitle,children:"优点"}),e.jsx("p",{children:"所以至少在本地开发阶段或者仅面向现代浏览器的工程，可以大胆使用vite来加速。那么它为什么这么快呢？主要有以下两方面原因"}),e.jsxs("ul",{className:`${s.ul} list-none`,children:[e.jsxs("li",{children:[e.jsx(t,{src:x,alt:"adv1"}),e.jsxs("div",{className:"pl-10",children:[e.jsx("br",{}),e.jsx("strong",{id:"no-build",children:"无需打包"}),"：准确的说是不用js写的打包器全量打包🤪 ",e.jsx("br",{}),e.jsx("br",{}),"1. vite会直接启动服务，并且进行预构建依赖。具体表现为对代码进行导入分析，使用",e.jsx("strong",{children:"esbuild"}),"将CJS或UMD依赖全部转换为ESM缓存到node_modules/.vite/deps目录下，后续直接从缓存获取。",e.jsx(t,{src:u,alt:"deps"}),e.jsx("br",{}),"esbuild是用go编写的，速度比js快10-100倍，因为go对多线程的支持比js好，支持共享内存（尽量复用AST），而且esbuild所有代码都是自行编写。js设计存在多线程/编译方面的缺陷。",e.jsx("br",{}),"vite提供的是ESM的源码，利用了浏览器对ESM的支持，将部分打包程序的工作交给了浏览器，对于ESM不需要类似于webpack的胶水代码。并且vite给不常变化的依赖请求加上了长期强缓存。",e.jsx(t,{src:m,alt:"max-age"}),e.jsx("br",{}),e.jsx("br",{}),"而webpack需要全量打包，并且在构建依赖时需要经过多个loader进行字符串的处理，尤其是babel-loader涉及到多次字符串AST互转的操作。Webpack 打包时间 = parse string * n + transform * n + parse to AST + compress",e.jsx("br",{})," ",e.jsx("br",{})," 2. 启动服务后，根据路由，通过http请求来获取文件和加载所需模块。（如果模块过多会受浏览器http最大并行数限制,vite首次启动慢其中之一是这个原因）下图是本路由的资源列表",e.jsx("br",{}),"可以看出vite对于资源处理的大体逻辑， index.html => 入口ESM index.tsx => index.tsx中导入的其他模块",e.jsx(t,{src:b,alt:"resource"})]})]}),e.jsxs("li",{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{src:p,alt:"adv2"}),e.jsx("br",{}),e.jsx("strong",{id:"hmr",children:"热重载(HMR)"}),"  vite明显快于webpack，这个跟它们各自的实现方式有关。",e.jsx("br",{}),e.jsx("br",{}),"Webpack-dev-server实现hmr的方式是监听到变化后，通过websocket服务主动推送，页面需要刷新。而vite只需要重新请求变化的资源即可"]}),e.jsxs("li",{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{src:j,alt:"adv3"}),e.jsx("br",{}),"vite build使用",e.jsx("strong",{children:"rollup"}),",rollup产出的包体积天然比webpack的要小，原生支持ESM非常适合组件库的开发，而webpack需要注入额外胶水代码，天然有体积上的劣势。"]}),e.jsxs("li",{children:[e.jsx("br",{}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{id:"ts",children:"原生支持TypeScript"}),": Vite原生支持TypeScript，安装完TypeScript后直接使用。"]})]}),e.jsx("h2",{id:"move",className:s.articleTitle,children:"迁移流程"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:["从create-react-app迁移",e.jsx("br",{}),e.jsx("br",{}),e.jsxs("p",{children:[e.jsx("code",{children:"pnpm add -D vite vite-tsconfig-paths"}),e.jsx("br",{}),e.jsx("br",{}),"然后将public/index.html移动到根目录下，去掉%PUBLIC_URL%，修改script ",e.jsx("code",{children:'<script type="module" src="/src/index.tsx"><\/script>'}),e.jsx("br",{}),e.jsx("br",{}),"修改package.json的start和build命令",e.jsx("br",{}),e.jsx("br",{}),e.jsxs("code",{children:['"start": "vite",',e.jsx("br",{}),'"build": "vite build"']}),e.jsx("br",{}),e.jsx("br",{}),"新增 ",e.jsx("code",{children:"vite.config.ts"}),e.jsx(r,{markdown:d}),e.jsx("br",{}),"大功告成，可以pnpm start启动了，最后移除react-scripts ",e.jsx("code",{children:"pnpm remove react-scripts"})]})]}),e.jsx("li",{children:"umi4天然支持"})]}),e.jsx("h2",{id:"end",className:s.articleTitle,children:"技术选型"}),"可以看出本文重复最多的单词就是ESM，vite的核心理念就在于此，充分的利用现代浏览器原生支持ESM。",e.jsx("br",{}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Rollup："}),"更适合打包组件库/插件(library)。它基于ESM打包，生成的文件更小，支持tree-shaking，但是不支持代码分割。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Webpack："}),"更适合打包项目，它支持代码分割，devServer的热更新，以及各种loader和plugin来处理各种文件。但是它的产物会注入很多胶水代码，导致体积增加。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Vite："}),"更适合现代Web应用的开发(支持ESM)，追求开发效率和性能优化的可以选择Vite。如果项目需要一定兼容性，不太适合用于生产打包，当然也有插件支持。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Rspack："}),"很新，很快，使用Rust编写，未来等稳定了再考虑。"]})]}),e.jsx("h2",{id:"hmr-principle",className:s.articleTitle,children:"热重载实现原理"}),e.jsx("p",{children:"Vite的热更新(Hot Module Replacement)是一大核心特性，显著提升开发效率。它主要基于WebSocket实现服务端和浏览器的实时通信。当文件发生变化时，服务器会检测到变化，通过WebSocket向浏览器发送更新消息，浏览器收到消息后根据更新内容进行相应的模块替换操作"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"服务器端："}),e.jsxs("ul",{className:s.subUl,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"启动WebSocket服务："}),"在Vite服务器启动时，会创建一个WebSocket服务器，用于与浏览器建立实时连接。",i]}),e.jsxs("li",{children:[e.jsx("strong",{children:"监听文件变化："}),"Vite使用",e.jsx("code",{children:"chokidar"}),"库监听文件系统的变化，当文件变化时触发对应的处理逻辑。",l]})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"客户端(浏览器)："}),e.jsxs("ul",{className:s.subUl,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"建立WebSocket连接："}),"在浏览器重，Vite会自动注入一段代码，用于建立与服务器之间的WebSocket连接。",c]}),e.jsxs("li",{children:[e.jsx("strong",{children:"模块替换逻辑："}),"当浏览器收到更新消息，会根据文件路径找到对应的模块，并替换掉旧的模块。Vite会为每个模块生成唯一的ID，通过ID来定位和替换模块。",n]}),e.jsxs("li",{children:[e.jsx("strong",{children:"模块HMR处理函数："}),"每个模块可以定义自己的HMR处理函数，用于处理模块的更新逻辑。Vue内部的处理是执行",e.jsx("code",{children:"forceUpdate"}),"更新组件。",a]})]})]})]})]}),e.jsx(o,{items:w})]})}export{T as default};
