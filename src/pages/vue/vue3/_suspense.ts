export const CODE = `\`\`\`html
<template>
  <suspense>
    <template #default>
      <async-component></async-component>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'));
</script>
\`\`\``;

export const SUSPENSE = `\`\`\`ts
import {
  defineComponent,
  h,
  isVNode,
  nextTick,
  onMounted,
  onUpdated,
  ref,
  watchEffect
} from 'vue';

export default defineComponent({
  name: 'Suspense',
  setup(props, { slots }) {
    const isResolved = ref(false);
    const hasFallback = ref(!!slots.fallback);

    const setResolved = () => {
      isResolved.value = true;
    };

    const setPending = () => {
      isResolved.value = false;
    };

    const render = () => {
      if (isResolved.value) {
        return slots.default?.();
      } else if (hasFallback.value) {
        return slots.fallback?.();
      }
      return null;
    };

    const handleSuspense = (promise: Promise<any>) => {
      setPending();
      promise.then(setResolved).catch((err) => {
        // 错误处理逻辑
        console.error('Suspense error:', err);
      });
    };

    watchEffect(() => {
      const defaultSlot = slots.default?.();
      if (defaultSlot) {
        const promises = [];
        const collectPromises = (node: any) => {
          if (isVNode(node)) {
            if (node.type.__asyncLoader) {
              const loader = node.type.__asyncLoader;
              const promise = loader();
              promises.push(promise);
            }
            if (node.children) {
              if (Array.isArray(node.children)) {
                node.children.forEach(collectPromises);
              } else if (typeof node.children === 'object') {
                Object.values(node.children).forEach(collectPromises);
              }
            }
          }
        };
        if (Array.isArray(defaultSlot)) {
          defaultSlot.forEach(collectPromises);
        } else {
          collectPromises(defaultSlot);
        }
        if (promises.length > 0) {
          const allPromises = Promise.all(promises);
          handleSuspense(allPromises);
        } else {
          setResolved();
        }
      }
    });

    return render;
  }
});
\`\`\``;
