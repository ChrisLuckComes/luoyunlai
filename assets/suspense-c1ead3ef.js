import{j as e,d as s}from"./index-829bfc52.js";import{U as l}from"./useMarkdown-aabb00ed.js";import{A as n}from"./Anchor-23ca89a7.js";const t=`\`\`\`html
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
<\/script>
\`\`\``,r=`\`\`\`ts
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
\`\`\``;function h(){const o=e.jsx(l,{markdown:t}),c=e.jsx(l,{markdown:r});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"suspense",className:"font-semibold text-h2 mb-2",children:"Suspense"}),e.jsx("code",{children:"Suspense"}),"是vue中的一个内置组件，它用于处理异步依赖的加载状态，允许组件再异步操作完成之前显示一个加载状态，一旦异步操作完成，就渲染实际的内容。",e.jsx("h2",{id:"use",className:s.articleTitle,children:"使用场景"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"异步组件加载："}),"当引入异步组件时，组件加载完成之前可以显示加载动画或占位内容，提高用户体验。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"数据获取："}),"在从服务器获取到数据之前，可以显示加载状态，获取成功后再显示数据。"]})]}),o,e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:"default："}),"默认插槽，用于防止需要异步加载的组件或内容。"]}),e.jsxs("li",{children:[e.jsx("code",{children:"fallback："}),"后备插槽，在异步操作未完成之前显示的内容，例如加载动画，占位组件等。"]})]}),e.jsx("h2",{id:"code",className:s.articleTitle,children:"源码解析"}),e.jsx("code",{children:"Suspense"}),"组件定义位于",e.jsx("code",{children:"packages/runtime-core/src/components/Suspense.ts"}),"，以下是简化后的核心代码。",c,"代码主要通过",e.jsx("code",{children:"watchEffect"}),"监听",e.jsx("code",{children:"default"}),"插槽中的异步组件加载状态，利用",e.jsx("code",{children:"isResolved"}),"标记异步操作的完成情况。 根据这个标记决定渲染",e.jsx("code",{children:"fallback"}),"还是实际内容。",e.jsx("h3",{id:"watchEffect",className:s.articleSubTitle,children:"watchEffect逻辑"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:["监听",e.jsx("code",{children:"slots.default"}),"中的插槽内容变化"]}),e.jsxs("li",{children:["遍历",e.jsx("code",{children:"default"}),"插槽中所有的",e.jsx("code",{children:"VNode"}),"，如果发现异步组件（通过",e.jsx("code",{children:"__asyncLoader"}),"属性判断），则获取并收集它的",e.jsx("code",{children:"promise"}),"到",e.jsx("code",{children:"promises"}),"数组中"]}),e.jsxs("li",{children:["如果",e.jsx("code",{children:"promises"}),"数组不为空，将所有的",e.jsx("code",{children:"promise"}),"合并为一个",e.jsx("code",{children:"Promise.all"}),"，调用",e.jsx("code",{children:"handleSuspense"}),"处理。如果为空说明没有异步操作， 直接调用",e.jsx("code",{children:"setResolved"})]})]})]}),e.jsx(n,{items:[{title:"Suspense",key:"suspense",href:"#suspense"},{title:"使用场景",key:"use",href:"#use"},{title:"源码解析",key:"code",href:"#code",children:[{title:"watchEffect逻辑",key:"watchEffect",href:"#watchEffect"}]}]})]})}export{h as default};
