import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { ArticleAnchor } from '@/component/Anchor';
import { SKELETON_PRINCIPLE, SKELETON_CODE } from "./_skeleton";
import Skeleton from "@/component/Skeleton";
import { useState } from "react";
import { Button } from "antd";

export default function SkeletonDemo() {
  const principle = <UseMarkDown markdown={SKELETON_PRINCIPLE}></UseMarkDown>;
  const code = <UseMarkDown markdown={SKELETON_CODE}></UseMarkDown>;
  const [loading, setLoading] = useState(true);

  return (
    <article className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="什么是骨架屏" className={classMap.articleTitle}>什么是骨架屏</h2>
        <p>骨架屏（Skeleton Screen）是一种在页面加载过程中显示的占位图，它能够模拟页面内容的基本结构，为用户提供更好的加载体验。相比传统的加载动画，骨架屏能够减少用户等待时的焦虑感，并让用户对即将加载的内容有更好的预期。</p>

        <h2 id="基础用法" className={classMap.articleTitle}>基础用法</h2>
        <p>最简单的骨架屏实现方式如下：</p>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Skeleton width="200px" height="20px" />
        </div>

        <h2 id="模拟文章列表" className={classMap.articleTitle}>模拟文章列表</h2>
        <p>下面是一个模拟文章列表的骨架屏示例：</p>
        <div className="flex flex-col gap-8 my-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex gap-6 p-4 bg-gray-50 rounded-lg">
              <Skeleton width="200px" height="120px" />
              <div className="flex-1 flex flex-col gap-3">
                <Skeleton width="60%" height="24px" />
                <Skeleton width="100%" height="16px" />
                <Skeleton width="100%" height="16px" />
                <Skeleton width="40%" height="16px" />
              </div>
            </div>
          ))}
        </div>

        <h2 id="无动画效果" className={classMap.articleTitle}>无动画效果</h2>
        <p>可以通过设置 animated 属性为 false 来禁用动画效果：</p>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Skeleton width="200px" height="20px" animated={false} />
        </div>

        <h2 id="内容插槽" className={classMap.articleTitle}>内容插槽</h2>
        <p>可以通过 loading 属性控制骨架屏的显示和隐藏，同时使用 children 插槽来放置实际内容：</p>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-4 mb-4">
            <Button 
              type="primary"
              onClick={() => setLoading(!loading)}
            >
              {loading ? '关闭骨架屏' : '打开骨架屏'}
            </Button>
          </div>
          <div className="flex gap-6">
            <Skeleton width="200px" height="120px" loading={loading}>
              <img 
                src="https://picsum.photos/200/120" 
                alt="示例图片" 
                className="w-[200px] h-[120px] object-cover rounded"
              />
            </Skeleton>
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton width="60%" height="24px" loading={loading}>
                <h3 className="text-xl font-semibold">文章标题</h3>
              </Skeleton>
              <Skeleton width="100%" height="16px" loading={loading}>
                <p className="text-gray-600">这是文章的第一段内容，描述了文章的主要观点和内容概要。</p>
              </Skeleton>
              <Skeleton width="100%" height="16px" loading={loading}>
                <p className="text-gray-600">这是文章的第二段内容，进一步展开讨论和说明。</p>
              </Skeleton>
              <Skeleton width="40%" height="16px" loading={loading}>
                <p className="text-gray-500">2024-03-21</p>
              </Skeleton>
            </div>
          </div>
        </div>

        <h2 id="实现原理" className={classMap.articleTitle}>实现原理</h2>
        <p>骨架屏的核心实现原理包括：</p>
        {principle}
        <p>最小实现代码如下：</p>
        {code}
      </main>
      <ArticleAnchor
        items={[
          { title: "什么是骨架屏", href: "#什么是骨架屏", key: "intro" },
          { title: "基础用法", href: "#基础用法", key: "basic" },
          { title: "模拟文章列表", href: "#模拟文章列表", key: "article" },
          { title: "无动画效果", href: "#无动画效果", key: "no-animation" },
          { title: "内容插槽", href: "#内容插槽", key: "slot" },
          { title: "实现原理", href: "#实现原理", key: "principle" }
        ]}
      />
    </article>
  );
} 