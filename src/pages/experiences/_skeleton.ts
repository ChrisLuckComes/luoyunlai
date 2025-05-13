export const SKELETON_INTRO = `
# 骨架屏（Skeleton）实现指南

骨架屏是一种在页面加载过程中展示的占位图，它能够减少用户等待的焦虑感，提升用户体验。当内容加载完成后，骨架屏会被实际内容替换。
`;

export const SKELETON_BASIC = `
## 基础用法

最简单的骨架屏使用方式：

\`\`\`tsx
<Skeleton width="200px" height="20px" />
\`\`\`
`;

export const SKELETON_ARTICLE = `
## 模拟文章列表

在实际应用中，我们经常需要为文章列表添加骨架屏效果：

\`\`\`tsx
<div className="articleList">
  {[1, 2, 3].map((item) => (
    <div key={item} className="articleItem">
      <Skeleton width="100%" height="120px" className="cover" />
      <div className="content">
        <Skeleton width="60%" height="24px" className="title" />
        <Skeleton width="100%" height="16px" className="text" />
        <Skeleton width="100%" height="16px" className="text" />
        <Skeleton width="40%" height="16px" className="text" />
      </div>
    </div>
  ))}
</div>
\`\`\`
`;

export const SKELETON_PRINCIPLE = `
骨架屏的核心实现原理包括：

1. CSS 动画：使用 \`@keyframes\` 和 \`animation\` 属性创建闪光动画效果
2. 伪元素：使用 \`::after\` 伪元素实现渐变效果
3. CSS Modules：使用 CSS Modules 实现样式隔离
`;

export const SKELETON_CODE = `
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
`; 