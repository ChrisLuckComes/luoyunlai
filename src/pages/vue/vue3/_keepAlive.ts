export const KEEP_ALIVE = `\`\`\`ts
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
\`\`\``;
