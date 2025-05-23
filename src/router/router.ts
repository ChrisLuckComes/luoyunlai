import { lazy } from 'react';

const routers = [
  {
    key: '/',
    path: '/',
    name: '首页',
    element: lazy(() => import('@/home'))
  },
  {
    key: 'js',
    path: '/js',
    name: 'JavaScript',
    groups: ['JavaScript', 'TypeScript'],
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/js/module',
        path: 'module',
        name: 'CommonJS和ES Module',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/module'))
      },
      {
        key: '/js/promise',
        path: 'promise',
        name: '从0到1实现promise',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/promise'))
      },
      {
        key: '/js/closure',
        path: 'closure',
        name: '10分钟内搞懂什么是闭包',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/closure'))
      },
      {
        key: '/js/prototype',
        path: 'prototype',
        name: '10分钟内搞懂原型和原型链',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/prototype'))
      },
      {
        key: '/js/garbage',
        path: 'garbage',
        name: '垃圾回收',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/garbage'))
      },
      {
        key: '/js/asyncAwait',
        path: 'asyncAwait',
        name: 'Async Await',
        group: 'JavaScript',
        element: lazy(() => import('@/pages/javaScript/asyncAwait'))
      },
      {
        key: '/js/tsExercise',
        path: 'tsExercise',
        name: 'TypeScript类型体操(一)',
        group: 'TypeScript',
        element: lazy(() => import('@/pages/javaScript/tsExercise'))
      },
      {
        key: '/js/tsExercise2',
        path: 'tsExercise2',
        name: 'TypeScript类型体操(二)',
        group: 'TypeScript',
        element: lazy(() => import('@/pages/javaScript/tsExercise2'))
      },
      {
        key: '/js/typeAndInterface',
        path: 'typeAndInterface',
        name: 'type,interface和抽象类',
        group: 'TypeScript',
        element: lazy(() => import('@/pages/javaScript/typeAndInterface'))
      }
    ]
  },
  {
    key: 'react',
    path: '/react',
    name: 'React',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/react/thinking',
        path: 'thinking',
        name: '理念',
        element: lazy(() => import('@/pages/react/thinking'))
      },
      {
        key: '/react/fiber',
        path: 'fiber',
        name: 'Fiber',
        element: lazy(() => import('@/pages/react/fiber'))
      },
      {
        key: '/react/render',
        path: 'render',
        name: 'Render',
        element: lazy(() => import('@/pages/react/render'))
      },
      {
        key: '/react/commit',
        path: 'commit',
        name: 'Commit',
        element: lazy(() => import('@/pages/react/commit'))
      },
      {
        key: '/react/diff',
        path: 'diff',
        name: 'Diff',
        element: lazy(() => import('@/pages/react/diff'))
      },
      {
        key: '/react/hook',
        path: 'hook',
        name: 'Hook',
        element: lazy(() => import('@/pages/react/hook'))
      },
      {
        key: '/react/state',
        path: 'state',
        name: '还在用Redux吗？你已经out了',
        element: lazy(() => import('@/pages/react/store'))
      }
    ]
  },
  {
    key: 'vue',
    path: '/vue',
    name: 'Vue',
    groups: ['vue2', 'vue3'],
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/vue/vue3/preset',
        path: 'vue3/preset',
        name: '前置知识',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/preset'))
      },
      {
        key: '/vue/vue3/global',
        path: 'vue3/global',
        name: '全局概览',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/global'))
      },
      {
        key: '/vue/vue3/reactive',
        path: 'vue3/reactive',
        name: '响应式系统',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/reactive'))
      },
      {
        key: '/vue/vue3/diff',
        path: 'vue3/diff',
        name: 'Diff',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/diff'))
      },
      {
        key: '/vue/vue3/setup',
        path: 'vue3/setup',
        name: 'script setup',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/setup'))
      },
      {
        key: '/vue/vue3/scoped',
        path: 'vue3/scoped',
        name: 'style scoped',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/scoped'))
      },
      {
        key: '/vue/vue3/keepAlive',
        path: 'vue3/keepAlive',
        name: 'keep-alive',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/keepAlive'))
      },
      {
        key: '/vue/vue3/lifeCycle',
        path: 'vue3/lifeCycle',
        name: '生命周期',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/lifeCycle'))
      },
      {
        key: '/vue/vue3/teleport',
        path: 'vue3/teleport',
        name: 'Teleport',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/teleport'))
      },
      {
        key: '/vue/vue3/suspense',
        path: 'vue3/suspense',
        name: 'Suspense',
        group: 'vue3',
        element: lazy(() => import('@/pages/vue/vue3/suspense'))
      },
      {
        key: '/vue/vue2/router',
        path: '/vue2/router',
        name: 'Vue-Router',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/vueRouter'))
      },
      {
        key: '/vue/vue2/vForWithIf',
        path: 'vue2/vForWithIf',
        name: 'v-for和v-if混用',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/vForWithIf'))
      },
      {
        key: '/vue/vue2/lifeCycle',
        path: 'vue2/lifeCycle',
        name: '生命周期',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/lifeCycle'))
      },
      {
        key: '/vue/vue2/watchComputed',
        path: 'vue2/watchComputed',
        name: 'computed和watch',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/watchComputed'))
      },
      {
        key: '/vue/vue2/data',
        path: 'vue2/data',
        name: '为什么data必须是函数',
        group: 'vue2',
        element: lazy(() => import('@/pages/vue/vue2/data'))
      }
    ]
  },
  {
    key: '/node',
    path: 'node',
    name: 'Node',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/node/changeVersion',
        path: 'changeVersion',
        name: '光速切换node版本',
        element: lazy(() => import('@/pages/node/changeVersion'))
      },
      {
        key: '/node/nodeJs',
        path: 'nodeJs',
        name: 'Node.js',
        element: lazy(() => import('@/pages/node/node'))
      },
      {
        key: '/node/middleware',
        path: 'middleware',
        name: 'express和koa的中间件模型',
        element: lazy(() => import('@/pages/node/middleware'))
      }
    ]
  },
  {
    key: 'project',
    path: '/project',
    name: '工程化',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/project/tailwindcss',
        path: 'tailwindcss',
        name: '来不及了，快上车tailwindcss🚘',
        element: lazy(() => import('@/pages/project/tailwindcss'))
      },
      {
        key: '/project/vite',
        path: 'vite',
        name: 'Vite',
        element: lazy(() => import('@/pages/project/vite'))
      },
      {
        key: '/project/workflow',
        path: 'workflow',
        name: '不会还有人在手动发版吧？',
        element: lazy(() => import('@/pages/project/workflow'))
      },
      {
        key: '/project/webpack',
        path: 'webpack',
        name: 'Webpack',
        element: lazy(() => import('@/pages/project/webpack1'))
      },
      {
        key: '/project/babel',
        path: 'babel',
        name: 'babel',
        element: lazy(() => import('@/pages/project/babel'))
      },
      {
        key: '/project/micro',
        path: 'micro',
        name: '微前端',
        element: lazy(() => import('@/pages/project/micro'))
      },
      {
        key: '/project/ssr',
        path: 'ssr',
        name: '服务端渲染',
        element: lazy(() => import('@/pages/project/ssr'))
      }
    ]
  },
  {
    key: 'experience',
    path: '/experience',
    name: '经验分享',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/experience/skeleton',
        path: 'skeleton',
        name: '骨架屏实现指南',
        element: lazy(() => import('@/pages/experiences/skeleton'))
      },
      {
        key: '/experience/npm',
        path: 'npm',
        name: '第一个npm包',
        element: lazy(() => import('@/pages/experiences/npm'))
      },
      {
        key: '/experience/vsCodeExtenion',
        path: 'vsCodeExtenion',
        name: '第一个VSCode插件',
        element: lazy(() => import('@/pages/experiences/vsCodeExtenion.mdx'))
      },
      {
        key: '/experience/cloud',
        path: 'cloud',
        name: '作为一个前端好意思说没有个人网站？',
        element: lazy(() => import('@/pages/experiences/cloud'))
      },
      {
        key: '/experience/architecture',
        path: 'architecture',
        name: '架构设计',
        element: lazy(() => import('@/pages/experiences/architecture'))
      },
      {
        key: '/experience/improve',
        path: 'improve',
        name: '性能优化策略',
        element: lazy(() => import('@/pages/experiences/improve'))
      }
    ]
  },
  {
    key: 'knowledge',
    path: '/knowledge',
    name: '知识库',
    element: lazy(() => import('@/pages/index')),
    children: [
      {
        key: '/knowledge/browser',
        path: 'browser',
        name: '浏览器如何工作',
        element: lazy(() => import('@/pages/knowledge/browser'))
      },
      {
        key: '/knowledge/safety',
        path: 'safety',
        name: '常见Web应用安全漏洞及应对手段',
        element: lazy(() => import('@/pages/knowledge/safety'))
      },
      {
        key: '/knowledge/eventLoop',
        path: 'eventLoop',
        name: '浏览器的事件循环机制',
        element: lazy(() => import('@/pages/knowledge/eventLoop'))
      },
      {
        key: '/knowledge/html',
        path: 'html',
        name: '回顾三剑客html,css,javascript',
        element: lazy(() => import('@/pages/knowledge/html'))
      },
      {
        key: '/knowledge/development',
        path: 'development',
        name: '前端技术发展和架构升级',
        element: lazy(() => import('@/pages/knowledge/development'))
      },
      {
        key: '/knowledge/treeShaking',
        path: 'treeShaking',
        name: 'Tree Shaking',
        element: lazy(() => import('@/pages/knowledge/treeShaking'))
      },
      {
        key: '/knowledge/indexedDB',
        path: 'indexedDB',
        name: 'IndexedDB',
        element: lazy(() => import('@/pages/knowledge/indexDB'))
      },
      {
        key: '/knowledge/performance',
        path: 'performance',
        name: '连指标都不知道还敢说懂性能优化？',
        element: lazy(() => import('@/pages/knowledge/performance'))
      },
      {
        key: '/knowledge/cdn',
        path: 'cdn',
        name: '深度了解CDN',
        element: lazy(() => import('@/pages/knowledge/cdn'))
      },
      {
        key: '/knowledge/http2',
        path: 'http2',
        name: 'HTTP协议演进',
        element: lazy(() => import('@/pages/knowledge/http2'))
      },
      {
        key: '/knowledge/websocket',
        path: 'websocket',
        name: 'WebSocket、SSE和轮询',
        element: lazy(() => import('@/pages/knowledge/websocket'))
      }
    ]
  }
];

export default routers;
