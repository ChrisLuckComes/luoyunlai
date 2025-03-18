export const SERVER = `\`\`\`ts
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(\`Server is running on port \${port}\`);
});
\`\`\``;

export const VUE = `\`\`\`ts
const { createApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');
\`\`\``;

export const ROUTER = `\`\`\`ts
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
\`\`\``;

export const DATA_REQUEST = `\`\`\`ts
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
\`\`\``;

export const DATA_PREFETCH = `\`\`\`ts
const prefetchPromises = matchedComponents.map(async (component) => {
    if (component.setup) {
        const setupResult = await component.setup({});
        if (setupResult && typeof setupResult.fetchData === 'function') {
            await setupResult.fetchData();
        }
    }
});
await Promise.all(prefetchPromises);
\`\`\``;

export const COMPONENT_INSTANCE_AND_DATA_INJECTION = `\`\`\`ts
const app = createApp(router.currentRoute.value.matched[0].components.default);
app.use(router);

// 如果有预取的数据，可以注入到应用的状态中
// 假设预取的数据存储在一个对象中
const prefetchData = { /* 预取的数据 */ };
app.config.globalProperties.$prefetchData = prefetchData;
\`\`\``;

export const GENERATE_HTML = `\`\`\`ts
const html = await renderToString(app);
\`\`\``;

export const STATE_SERIALIZATION = `\`\`\`ts
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
        </script>
        <script src="client.js"></script>
      </body>
    </html>
\`;
\`\`\``;

export const SEND_HTML = `\`\`\`ts
res.send(fullHtml);
\`\`\``;


export const STATE_RECOVERY = `\`\`\`ts
const initialState = window.__INITIAL_STATE__;
const app = createApp({});
app.use(router);
app.config.globalProperties.$prefetchData = initialState;
\`\`\``;

export const HYDRATION = `\`\`\`ts
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
\`\`\``;

export const ASYNC_DATA = `\`\`\`html
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
</script>
\`\`\``;
