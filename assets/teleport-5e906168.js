import{j as e,d as t}from"./index-12c11ae8.js";import{U as n}from"./useMarkdown-141d10e7.js";import{A as r}from"./Anchor-cb8b8329.js";const i=`\`\`\`html
<template>
  <div>
    <h1>Parent Component</h1>
    <teleport to="#teleport-target">
      <div>
        <h2>Teleported Content</h2>
        <p>This content will be teleported to another location in the DOM.</p>
      </div>
    </teleport>
  </div>
</template>
\`\`\``,a=`\`\`\`ts
import {
  defineComponent,
  h,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref
} from 'vue';

export default defineComponent({
  name: 'Teleport',
  props: {
    to: {
      type: [String, HTMLElement],
      required: true
    },
    disabled: Boolean
  },
  setup(props, { slots }) {
    const target = ref<HTMLElement | null>(null);
    const mountTarget = ref<HTMLElement | null>(null);

    const getTarget = () => {
      if (typeof props.to === 'string') {
        return document.querySelector(props.to) as HTMLElement | null;
      }
      return props.to;
    };

    const mount = (container: HTMLElement) => {
      const children = slots.default?.();
      if (children) {
        if (isVNode(children)) {
          // 插入单个 VNode
          container.appendChild(children.el!);
        } else {
          // 插入多个 VNode
          children.forEach((child) => {
            if (isVNode(child)) {
              container.appendChild(child.el!);
            }
          });
        }
      }
    };

    const unmount = (container: HTMLElement) => {
      const children = slots.default?.();
      if (children) {
        if (isVNode(children)) {
          // 移除单个 VNode
          container.removeChild(children.el!);
        } else {
          // 移除多个 VNode
          children.forEach((child) => {
            if (isVNode(child)) {
              container.removeChild(child.el!);
            }
          });
        }
      }
    };

    onMounted(() => {
      target.value = getTarget();
      if (target.value &&!props.disabled) {
        mountTarget.value = target.value;
        mount(target.value);
      }
    });

    onUpdated(() => {
      const newTarget = getTarget();
      if (newTarget!== target.value) {
        if (target.value && mountTarget.value) {
          unmount(mountTarget.value);
        }
        target.value = newTarget;
        if (newTarget &&!props.disabled) {
          mountTarget.value = newTarget;
          mount(newTarget);
        }
      } else if (props.disabled) {
        if (mountTarget.value) {
          unmount(mountTarget.value);
          mountTarget.value = null;
        }
      } else if (!props.disabled &&!mountTarget.value) {
        if (target.value) {
          mountTarget.value = target.value;
          mount(target.value);
        }
      }
    });

    onBeforeUnmount(() => {
      if (mountTarget.value) {
        unmount(mountTarget.value);
      }
    });

    return () => {
      if (props.disabled) {
        return slots.default?.();
      }
      return null;
    };
  }
});
\`\`\``;function u(){const l=e.jsx(n,{markdown:i}),o=e.jsx(n,{markdown:a});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"teleport",className:"font-semibold text-h2 mb-2",children:"Teleport"}),e.jsx("code",{children:"Teleport"}),'是vue中的一个内置组件，它能将组件内部的一部分HTML元素"传送"到DOM树的其他位置进行渲染，而不是在原本的父组件渲染位置。',e.jsx("h2",{id:"use",className:t.articleTitle,children:"使用场景"}),e.jsxs("ul",{className:t.ul,children:[e.jsx("li",{children:e.jsx("strong",{children:"弹窗，对话框"})}),e.jsx("li",{children:e.jsx("strong",{children:"全局提示框"})})]}),l,e.jsx("code",{children:"to"}),"为必填属性，指定要将内容传送到目标元素的选择器或DOM节点。",e.jsx("h2",{id:"code",className:t.articleTitle,children:"源码解析"}),e.jsx("code",{children:"Teleport"}),"组件定义位于",e.jsx("code",{children:"packages/runtime-core/src/components/Teleport.ts"}),"，以下是简化后的核心代码。",o,"可以看到代码其实并不复杂",e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:"onMounted"}),"将内容挂载到目标元素上"]}),e.jsxs("li",{children:[e.jsx("code",{children:"onUpdated"}),"组件更新之后，如果目标元素有变化需要卸载再挂载"]}),e.jsxs("li",{children:[e.jsx("code",{children:"onBeforeUnmount"}),"生命周期中将内容从目标元素上卸载。"]})]})]}),e.jsx(r,{items:[{title:"Teleport",key:"teleport",href:"#teleport"},{title:"使用场景",key:"use",href:"#use"},{title:"源码解析",key:"code",href:"#code"}]})]})}export{u as default};
