export const TELEPORT = `\`\`\`html
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
\`\`\``;

export const TELEPORT_CODE = `\`\`\`ts
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
\`\`\``;
