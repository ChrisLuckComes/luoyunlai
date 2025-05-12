import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { CODE, CODE_1, CODE_2, NEXTTICK, USED, CODE_GOOD_EXAMPLE } from "./_treeShaking";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const code = <UseMarkDown markdown={CODE}></UseMarkDown>,
    code1 = <UseMarkDown markdown={CODE_1}></UseMarkDown>,
    code2 = <UseMarkDown markdown={CODE_2}></UseMarkDown>,
    nextTick = <UseMarkDown markdown={NEXTTICK}></UseMarkDown>,
    codeGoodExample = <UseMarkDown markdown={CODE_GOOD_EXAMPLE}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          Tree Shaking
        </h2>
        Tree Shaking 翻译为摇树优化，它通常用于移除 JavaScript 上下文中未使用的代码，通过静态分析 ES Module 依赖关系来实现。这个概念最先在 <strong>Rollup</strong> 社区流行，现在已成为现代前端打包工具（如 Webpack, Rollup, Parcel）的标准优化功能。它的实现需要依赖前端工程工具。
        <h2 id="esm" className={classMap.articleTitle}>
          ESM规范
        </h2>
        Tree Shaking 依赖 ESM（ES Module）规范，因为 ESM 具有静态特性，可以在编译时确定模块的依赖关系。主要原因如下：
        <ul className={classMap.ul}>
          <li>import模块名只能是字符串常量</li>
          <li>import一般只在模块顶层出现</li>
          <li>import导入值是不可变的(引用类型除外)</li>
        </ul>
        CommonJS模块在之前的文章有提到，它是动态的，执行代码后才知道引用了什么，所以没法tree
        shaking
        <h2 id="effect" className={classMap.articleTitle}>
          副作用 (Side Effects)
        </h2>
        副作用是指模块在导入时执行了某些影响全局或其他模块的操作，即使该模块的导出没有被直接使用。
        <br />
        例如以下代码，如果 <code>add</code> 函数没有被其他模块显式导入和使用，理论上可以被 Tree Shaking 移除。
        <br />
        但如果 <code>window.memorize(add)</code> 这行代码执行了某些操作（比如修改了全局状态或 DOM），那么即使 <code>memorizedAdd</code> 常量未被导出或使用，<code>add</code> 函数及其相关的副作用代码也应该被保留。
        {code}
        工程化工具需要知道哪些代码包含副作用，以避免错误地移除它们。
        <h3 id="webpack" className={classMap.articleSubTitle}>
          打包工具的处理
        </h3>
        现代打包工具通常提供机制来标记副作用：
        <ul className={classMap.ul}>
          <li>
            <strong>package.json 中的 `sideEffects` 字段:</strong> 这是最常用且推荐的方式。库作者可以在 `package.json` 中设置 `sideEffects: false` 来表明整个包没有副作用，打包工具可以安全地移除未使用的导出。也可以提供一个文件路径数组，例如 <code>{`sideEffects: ["./src/polyfill.js", "*.css"]`}</code> 来指定哪些文件有副作用，不应被 Tree Shaking。
          </li>
          <li>
            <strong>Webpack 的 `module.rule.sideEffects`:</strong> Webpack 允许在构建配置中为特定模块或文件类型设置 `sideEffects` 规则，作为 `package.json` 的补充或覆盖。例如 <code>{'{ module: { rules: [ { test: /\.css$/, sideEffects: true } ] } }'}</code> 表示所有 CSS 文件都有副作用。设置为 `false` 则表示匹配的文件没有副作用。
          </li>
        </ul>
        对于上面的示例代码，可以通过显式导入来帮助 Tree Shaking 生效，减少隐式的全局依赖：
        {code1}
        <br />
        此外，打包工具通常会配合压缩工具（如 Webpack 内置的 <code>TerserPlugin</code>）来最终删除被标记为&quot;未使用&quot;的代码（Dead Code Elimination）。打包工具负责分析模块依赖和标记未使用的导出，压缩工具负责移除这些代码。
        {/* Webpack 内部标记逻辑，开始恢复 */}
        Webpack 在 compile 阶段将每个模块及其依赖关系构建成一个 `ModuleGraph`。
        它依靠 AST（抽象语法树）分析，使用如 <code>HarmonyExportSpecifierDependency</code> （处理具名导出 `export { name }`）和 <code>HarmonyImportSpecifierDependency</code> （处理具名导入 `import { name }`）等特定的依赖类来精确识别 ES Module 的 `import` 和 `export` 语句，标记哪些导出被实际使用了。
        下面是简化版的 <code>HarmonyExportSpecifierDependency.js</code> 相关代码，展示了其如何处理导出绑定和标记：
        <div className={classMap.assist}>
          部分源码：webpack/lib/dependencies/HarmonyExportSpecifierDependency.js
        </div>
        <UseMarkDown markdown={USED}></UseMarkDown> {/* 恢复 USED 代码片段展示 */}
        <h2 id="good" className={classMap.articleTitle}>
          对 Tree Shaking 友好的导出模式
        </h2>
        以下导出方式可能会<strong>阻碍 Tree Shaking</strong>：
        <ul className={classMap.ul}>
          <li><strong>导出一个包含多项属性和方法的对象：</strong>当使用 <code>{`export default {{ method1, method2 }}`}</code> 或 <code>{`export const utils = {{ method1, method2 }}`}</code> 时，如果只导入并使用了 `method1`，打包工具很难确定 `method2` 是否可以安全移除，因为它们是同一个对象的一部分。</li>
          <li><strong>导出一个包含多项属性和方法的类：</strong>与导出对象类似，<code>{`export class MyClass {{ method1() {{}}, method2() {{}} }}`}</code> 使得工具难以单独移除未使用的方法。</li>
          <li><strong>滥用 `export default`：</strong>特别是当默认导出一个大对象或类时，如上所述，会影响 Tree Shaking 的效果。</li>
        </ul>
        {code2}
        <strong>推荐的方式：</strong>采用原子化、颗粒化的单项导出。每个函数、常量或类都单独导出。
        {codeGoodExample}
        这样打包工具可以清晰地知道 `method2` 没有被使用，从而将其移除。
        <h2 id="vue" className={classMap.articleTitle}>
          Vue 中的 Tree Shaking
        </h2>
        Vue将内置组件都改为了ESM的方式导入使用:
        {nextTick}
        <h2 id="design" className={classMap.articleTitle}>
          设计兼顾易用性和tree shaking的公共库
        </h2>
        普遍做法参考antd，构建出两个文件夹，并且配置package.json的main和module属性，同时支持cjs和esm模块化。
      </main>
      <ArticleAnchor
        items={[
          {
            title: "Tree Shaking",
            key: "pre",
            href: "#pre"
          },
          {
            title: "ESM规范",
            key: "esm",
            href: "#esm"
          },
          {
            title: "副作用",
            key: "effect",
            href: "#effect",
            children: [
              {
                title: "webpack",
                key: "webpack",
                href: "#webpack"
              }
            ]
          },
          {
            title: "友好的导出模式",
            key: "good",
            href: "#good"
          },
          {
            title: "Vue中的tree shaking",
            key: "vue",
            href: "#vue"
          },
          {
            title: "设计tree shaking友好的公共库",
            key: "design",
            href: "#design"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
