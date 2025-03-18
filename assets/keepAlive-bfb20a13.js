import{j as e,d as n}from"./index-ad5eedbe.js";import{U as t}from"./useMarkdown-b33dbcc0.js";import{A as s}from"./Anchor-c966fdc9.js";import"./index-47679770.js";const o=`\`\`\`ts
// packages/runtime-core/src/components/KeepAlive.ts
import {
  createVNode,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  shallowReactive,
  watchEffect
} from 'vue';

export default defineComponent({
  name: 'KeepAlive',
  // 接收 include、exclude、max 等 props
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    // 创建一个浅响应式的缓存对象
    const cache = shallowReactive(new Map());
    // 创建一个浅响应式的键集合，用于存储缓存的键
    const keys = shallowReactive(new Set());
    // 当前实例
    const instance = getCurrentInstance();

    // 缓存实例的方法
    const cacheVNode = (vnode, key) => {
      cache.set(key, vnode);
      keys.add(key);
      // 如果缓存数量超过 max，移除最早缓存的组件
      if (props.max && keys.size > parseInt(props.max as string, 10)) {
        pruneCacheEntry(keys.values().next().value);
      }
    };

    // 移除缓存实例的方法
    const pruneCacheEntry = (key) => {
      const cached = cache.get(key);
      if (cached) {
        cache.delete(key);
        keys.delete(key);
        // 执行组件的卸载逻辑
        unmount(cached);
      }
    };

    // 监听 include 和 exclude 的变化，根据条件更新缓存
    watchEffect(() => {
      if (props.include || props.exclude) {
        for (const [key, vnode] of cache) {
          const name = getComponentName(vnode.type);
          if (
            (props.include && (!name || !matches(props.include, name))) ||
            (props.exclude && name && matches(props.exclude, name))
          ) {
            pruneCacheEntry(key);
          }
        }
      }
    });

    // 组件卸载时清空缓存
    onBeforeUnmount(() => {
      cache.forEach((vnode) => {
        pruneCacheEntry(vnode.key);
      });
    });

    return () => {
      const vnode = slots.default ? slots.default()[0] : null;
      if (vnode) {
        const comp = vnode.type;
        if (isKeepAlive(comp)) {
          return vnode;
        }

        const key = vnode.key == null ? comp : vnode.key;
        const cachedVNode = cache.get(key);

        if (cachedVNode) {
          // 如果缓存中存在该组件，直接使用缓存的 vnode
          vnode.component = cachedVNode.component;
          // 标记为已缓存
          vnode.shapeFlag |= 1 << 5;
        } else {
          // 如果缓存中不存在，将其缓存起来
          cacheVNode(vnode, key);
        }

        // 标记 keep-alive 上下文
        vnode.keepAliveInstance = instance;
      }
      return vnode;
    };
  }
});

// 判断组件名是否匹配规则的辅助函数
function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.some((p) => matches(p, name));
  } else if (typeof pattern === 'string') {
    return pattern.split(',').includes(name);
  } else if (pattern instanceof RegExp) {
    return pattern.test(name);
  }
  return false;
}

// 获取组件名的辅助函数
function getComponentName(Component) {
  return Component.name || (Component.__name as string);
}
\`\`\``;function l(){const c=e.jsx(t,{markdown:o});return e.jsxs("article",{id:"rootArticle",className:n.article,children:[e.jsxs("main",{className:n.content,children:[e.jsx("h2",{id:"keepAlive",className:"font-semibold text-h2 mb-2",children:"keep-alive"}),e.jsx("code",{children:"keep-alive"}),"是vue中的一个内置组件，它的主要作用的缓存动态组件，避免这些组件在切换时被频繁销毁和重新创建，从而提高应用性能。",e.jsx("h2",{id:"theory",className:n.articleTitle,children:"实现原理"}),e.jsx("code",{children:"keep-alive"}),"组件的核心原理是在组件切换时，不直接销毁组件实例，而是将其缓存起来，当再次需要使用该组件时直接从缓存中取出并挂载。",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsxs("strong",{children:[e.jsx("code",{children:"keep-alive"}),"组件的定义"]}),c]}),e.jsx("strong",{children:"2.渲染逻辑："}),e.jsxs("li",{children:["首先获取默认插槽的第一个",e.jsx("code",{children:"vnode"})]}),e.jsxs("li",{children:["检查该",e.jsx("code",{children:"vnode"}),"是否缓存，如果缓存存在直接使用缓存的",e.jsx("code",{children:"vnode"}),"，并标记为已缓存"]}),e.jsx("li",{children:"如果缓存中不存在，缓存它"}),e.jsxs("li",{children:["最后设置",e.jsx("code",{children:"vnode"}),"的",e.jsx("code",{children:"keepAliveInstance"}),"属性为当前",e.jsx("code",{children:"keep-alive"}),"实例"]}),e.jsx("strong",{children:"3.组件的激活和失活："}),e.jsxs("li",{children:["当一个",e.jsx("code",{children:"keep-alive"}),"缓存的组件再次被激活时，会触发",e.jsx("code",{children:"activated"}),"钩子函数，当一个",e.jsx("code",{children:"keep-alive"}),"缓存的组件再次被失活时，会触发",e.jsx("code",{children:"deactivated"}),"钩子函数。 这两个钩子是",e.jsx("code",{children:"keep-alive"}),"组件特有的，用于处理组件缓存和激活状态的变化。"]}),e.jsx("br",{})]}),e.jsx("h2",{id:"summary",className:n.articleTitle,children:"总结"}),e.jsx("code",{children:"keep-alive"}),"组件通过缓存组件的",e.jsx("code",{children:"vnode"}),"来避免组件的频繁创建和销毁，利用",e.jsx("code",{children:"Map"}),"和",e.jsx("code",{children:"Set"}),"数据结构管理缓存，通过",e.jsx("code",{children:"include"}),"、",e.jsx("code",{children:"exclude"}),"、",e.jsx("code",{children:"max"}),"属性来控制缓存的范围和数量。 同时提供了",e.jsx("code",{children:"activated"}),"和",e.jsx("code",{children:"deactivated"}),"钩子函数，用于处理组件的激活和失活状态。这样在频繁切换组件的场景下显著提高了性能。"]}),e.jsx(s,{items:[{title:"keep-alive",key:"keepAlive",href:"#keepAlive"},{title:"实现原理",key:"theory",href:"#theory"},{title:"总结",key:"summary",href:"#summary"}]})]})}export{l as default};
