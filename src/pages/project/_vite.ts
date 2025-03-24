export const SERVER_WEBSOCKET = `\`\`\`ts
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
\`\`\``;

export const WATCH_FILE = `\`\`\`ts
const chokidar = require('chokidar');
const watcher = chokidar.watch('src', {
    ignored: /(^|[/\\])\../, // 忽略隐藏文件
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
\`\`\``;

export const CLIENT_WEBSOCKET = `\`\`\`ts
// 伪代码，模拟浏览器建立 WebSocket 连接
const socket = new WebSocket('ws://localhost:24678');

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
        // 处理更新消息
        handleUpdate(data.path);
    }
});
\`\`\``;

export const REPLACE_MODULE = `\`\`\`ts
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
\`\`\``;

export const HOT = `\`\`\`html
<template>
    <div>
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello, Vite!');

if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        // 更新组件状态
        message.value = newModule.message.value;
    });
}
</script>
\`\`\``;
