import{j as e,r as o,d as i}from"./index-12c11ae8.js";import{U as c}from"./useMarkdown-141d10e7.js";import{A as x}from"./Anchor-cb8b8329.js";import{B as m}from"./button-3242753a.js";const p="\n骨架屏的核心实现原理包括：\n\n1. CSS 动画：使用 `@keyframes` 和 `animation` 属性创建闪光动画效果\n2. 伪元素：使用 `::after` 伪元素实现渐变效果\n3. CSS Modules：使用 CSS Modules 实现样式隔离\n",g=`
\`\`\`tsx
// Skeleton.tsx
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({ width = '100%', height = '20px', className = '' }: SkeletonProps) {
  return (
    <div 
      className={\`\${styles.skeleton} \${className}\`}
      style={{ width, height }}
    />
  );
}
\`\`\`

\`\`\`css
/* Skeleton.module.css */
.skeleton {
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
\`\`\`
`,j="_skeleton_2ivuf_1",f="_animated_2ivuf_8",u="_shimmer_2ivuf_1",h={skeleton:j,animated:f,shimmer:u};function s({width:l,height:a,className:t,animated:r=!0,loading:n=!0,children:d}){return n?e.jsx("div",{className:`${h.skeleton} ${r?h.animated:""} ${t||""}`,style:{width:l,height:a}}):e.jsx(e.Fragment,{children:d})}function S(){const l=e.jsx(c,{markdown:p}),a=e.jsx(c,{markdown:g}),[t,r]=o.useState(!0);return e.jsxs("article",{className:i.article,children:[e.jsxs("main",{className:i.content,children:[e.jsx("h2",{id:"什么是骨架屏",className:i.articleTitle,children:"什么是骨架屏"}),e.jsx("p",{children:"骨架屏（Skeleton Screen）是一种在页面加载过程中显示的占位图，它能够模拟页面内容的基本结构，为用户提供更好的加载体验。相比传统的加载动画，骨架屏能够减少用户等待时的焦虑感，并让用户对即将加载的内容有更好的预期。"}),e.jsx("h2",{id:"基础用法",className:i.articleTitle,children:"基础用法"}),e.jsx("p",{children:"最简单的骨架屏实现方式如下："}),e.jsx("div",{className:"p-4 bg-gray-50 rounded-lg",children:e.jsx(s,{width:"200px",height:"20px"})}),e.jsx("h2",{id:"模拟文章列表",className:i.articleTitle,children:"模拟文章列表"}),e.jsx("p",{children:"下面是一个模拟文章列表的骨架屏示例："}),e.jsx("div",{className:"flex flex-col gap-8 my-8",children:[1,2,3].map(n=>e.jsxs("div",{className:"flex gap-6 p-4 bg-gray-50 rounded-lg",children:[e.jsx(s,{width:"200px",height:"120px"}),e.jsxs("div",{className:"flex-1 flex flex-col gap-3",children:[e.jsx(s,{width:"60%",height:"24px"}),e.jsx(s,{width:"100%",height:"16px"}),e.jsx(s,{width:"100%",height:"16px"}),e.jsx(s,{width:"40%",height:"16px"})]})]},n))}),e.jsx("h2",{id:"无动画效果",className:i.articleTitle,children:"无动画效果"}),e.jsx("p",{children:"可以通过设置 animated 属性为 false 来禁用动画效果："}),e.jsx("div",{className:"p-4 bg-gray-50 rounded-lg",children:e.jsx(s,{width:"200px",height:"20px",animated:!1})}),e.jsx("h2",{id:"内容插槽",className:i.articleTitle,children:"内容插槽"}),e.jsx("p",{children:"可以通过 loading 属性控制骨架屏的显示和隐藏，同时使用 children 插槽来放置实际内容："}),e.jsxs("div",{className:"p-4 bg-gray-50 rounded-lg",children:[e.jsx("div",{className:"flex gap-4 mb-4",children:e.jsx(m,{type:"primary",onClick:()=>r(!t),children:t?"关闭骨架屏":"打开骨架屏"})}),e.jsxs("div",{className:"flex gap-6",children:[e.jsx(s,{width:"200px",height:"120px",loading:t,children:e.jsx("img",{src:"https://picsum.photos/200/120",alt:"示例图片",className:"w-[200px] h-[120px] object-cover rounded"})}),e.jsxs("div",{className:"flex-1 flex flex-col gap-3",children:[e.jsx(s,{width:"60%",height:"24px",loading:t,children:e.jsx("h3",{className:"text-xl font-semibold",children:"文章标题"})}),e.jsx(s,{width:"100%",height:"16px",loading:t,children:e.jsx("p",{className:"text-gray-600",children:"这是文章的第一段内容，描述了文章的主要观点和内容概要。"})}),e.jsx(s,{width:"100%",height:"16px",loading:t,children:e.jsx("p",{className:"text-gray-600",children:"这是文章的第二段内容，进一步展开讨论和说明。"})}),e.jsx(s,{width:"40%",height:"16px",loading:t,children:e.jsx("p",{className:"text-gray-500",children:"2024-03-21"})})]})]})]}),e.jsx("h2",{id:"实现原理",className:i.articleTitle,children:"实现原理"}),e.jsx("p",{children:"骨架屏的核心实现原理包括："}),l,e.jsx("p",{children:"最小实现代码如下："}),a]}),e.jsx(x,{items:[{title:"什么是骨架屏",href:"#什么是骨架屏",key:"intro"},{title:"基础用法",href:"#基础用法",key:"basic"},{title:"模拟文章列表",href:"#模拟文章列表",key:"article"},{title:"无动画效果",href:"#无动画效果",key:"no-animation"},{title:"内容插槽",href:"#内容插槽",key:"slot"},{title:"实现原理",href:"#实现原理",key:"principle"}]})]})}export{S as default};
