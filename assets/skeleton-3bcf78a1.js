import{j as e,d as s}from"./index-52cacda3.js";import{U as n}from"./useMarkdown-2196212a.js";import{A as c}from"./Anchor-4d1d2fe9.js";const d="\n骨架屏的核心实现原理包括：\n\n1. CSS 动画：使用 `@keyframes` 和 `animation` 属性创建闪光动画效果\n2. 伪元素：使用 `::after` 伪元素实现渐变效果\n3. CSS Modules：使用 CSS Modules 实现样式隔离\n",h=`
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
`,m="_skeleton_2ivuf_1",x="_animated_2ivuf_8",p="_shimmer_2ivuf_1",r={skeleton:m,animated:x,shimmer:p};function t({width:i,height:l,className:a,animated:o=!0}){return e.jsx("div",{className:`${r.skeleton} ${o?r.animated:""} ${a||""}`,style:{width:i,height:l}})}function k(){const i=e.jsx(n,{markdown:d}),l=e.jsx(n,{markdown:h});return e.jsxs("article",{className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"什么是骨架屏",className:s.articleTitle,children:"什么是骨架屏"}),e.jsx("p",{children:"骨架屏（Skeleton Screen）是一种在页面加载过程中显示的占位图，它能够模拟页面内容的基本结构，为用户提供更好的加载体验。相比传统的加载动画，骨架屏能够减少用户等待时的焦虑感，并让用户对即将加载的内容有更好的预期。"}),e.jsx("h2",{id:"基础用法",className:s.articleTitle,children:"基础用法"}),e.jsx("p",{children:"最简单的骨架屏实现方式如下："}),e.jsx("div",{className:"p-4 bg-gray-50 rounded-lg",children:e.jsx(t,{width:"200px",height:"20px"})}),e.jsx("h2",{id:"模拟文章列表",className:s.articleTitle,children:"模拟文章列表"}),e.jsx("p",{children:"下面是一个模拟文章列表的骨架屏示例："}),e.jsx("div",{className:"flex flex-col gap-8 my-8",children:[1,2,3].map(a=>e.jsxs("div",{className:"flex gap-6 p-4 bg-gray-50 rounded-lg",children:[e.jsx(t,{width:"200px",height:"120px"}),e.jsxs("div",{className:"flex-1 flex flex-col gap-3",children:[e.jsx(t,{width:"60%",height:"24px"}),e.jsx(t,{width:"100%",height:"16px"}),e.jsx(t,{width:"100%",height:"16px"}),e.jsx(t,{width:"40%",height:"16px"})]})]},a))}),e.jsx("h2",{id:"无动画效果",className:s.articleTitle,children:"无动画效果"}),e.jsx("p",{children:"可以通过设置 animated 属性为 false 来禁用动画效果："}),e.jsx("div",{className:"p-4 bg-gray-50 rounded-lg",children:e.jsx(t,{width:"200px",height:"20px",animated:!1})}),e.jsx("h2",{id:"实现原理",className:s.articleTitle,children:"实现原理"}),e.jsx("p",{children:"骨架屏的核心实现原理包括："}),i,e.jsx("p",{children:"最小实现代码如下："}),l]}),e.jsx(c,{items:[{title:"什么是骨架屏",href:"#什么是骨架屏",key:"intro"},{title:"基础用法",href:"#基础用法",key:"basic"},{title:"模拟文章列表",href:"#模拟文章列表",key:"article"},{title:"无动画效果",href:"#无动画效果",key:"no-animation"},{title:"实现原理",href:"#实现原理",key:"principle"}]})]})}export{k as default};
