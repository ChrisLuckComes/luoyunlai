import{j as e,d as n}from"./index-12c11ae8.js";import{U as r}from"./useMarkdown-141d10e7.js";import{A as c}from"./Anchor-cb8b8329.js";const a="```js\nexport function add(a,b){\n    return a+b;\n}\nexport const memorizedAdd = window.memorize(add);\n```",l=`\`\`\`js
import { memorize } from "./util";

export function add(a,b){
    return a+b;
}

export const memorizedAdd = memorize(add);
\`\`\``,m=`\`\`\`js
export default {
    add(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    }
};

export class Number {
    constructor(num) {
      this.num = num;
    }
    add(num) {
      return this.num + num;
    }
    subtract(num) {
      return this.num - num;
    }
}
\`\`\``,p=`\`\`\`js
HarmonyExportSpecifierDependency.Template = class HarmonyExportSpecifierDependencyTemplate extends (
	NullDependency.Template
) {
	/**
	 * @param {Dependency} dependency the dependency for which the template should be applied
	 * @param {ReplaceSource} source the current replace source which can be modified
	 * @param {DependencyTemplateContext} templateContext the context object
	 * @returns {void}
	 */
	apply(
		dependency,
		source,
		{ module, moduleGraph, initFragments, runtime, concatenationScope }
	) {
		const dep = /** @type {HarmonyExportSpecifierDependency} */ (dependency);
		if (concatenationScope) {
			concatenationScope.registerExport(dep.name, dep.id);
			return;
		}
		const used = moduleGraph
			.getExportsInfo(module)
			.getUsedName(dep.name, runtime);
		if (!used) {
			const set = new Set();
			set.add(dep.name || "namespace");
			initFragments.push(
				new HarmonyExportInitFragment(module.exportsArgument, undefined, set)
			);
			return;
		}

		const map = new Map();
		map.set(used, \`/* binding */ \${dep.id}\`);
		initFragments.push(
			new HarmonyExportInitFragment(module.exportsArgument, map, undefined)
		);
	}
};

module.exports = HarmonyExportSpecifierDependency;
\`\`\``,h=`\`\`\`js
// vue2.x
import Vue from "vue";

Vue.$nextTick(()=>{...});

// vue3.x
import { nextTick } from "Vue";

nextTick(()=>{...})
\`\`\``,x=`\`\`\`js
// utils.js
export function method1() { /* ... */ }
export function method2() { /* ... */ }

// main.js
import { method1 } from './utils'; // 只导入需要的 method1
method1();
\`\`\``;function k(){const t=e.jsx(r,{markdown:a}),s=e.jsx(r,{markdown:l}),i=e.jsx(r,{markdown:m}),d=e.jsx(r,{markdown:h}),o=e.jsx(r,{markdown:x});return e.jsxs("article",{id:"rootArticle",className:n.article,children:[e.jsxs("main",{className:n.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"Tree Shaking"}),"Tree Shaking 翻译为摇树优化，它通常用于移除 JavaScript 上下文中未使用的代码，通过静态分析 ES Module 依赖关系来实现。这个概念最先在 ",e.jsx("strong",{children:"Rollup"})," 社区流行，现在已成为现代前端打包工具（如 Webpack, Rollup, Parcel）的标准优化功能。它的实现需要依赖前端工程工具。",e.jsx("h2",{id:"esm",className:n.articleTitle,children:"ESM规范"}),"Tree Shaking 依赖 ESM（ES Module）规范，因为 ESM 具有静态特性，可以在编译时确定模块的依赖关系。主要原因如下：",e.jsxs("ul",{className:n.ul,children:[e.jsx("li",{children:"import模块名只能是字符串常量"}),e.jsx("li",{children:"import一般只在模块顶层出现"}),e.jsx("li",{children:"import导入值是不可变的(引用类型除外)"})]}),"CommonJS模块在之前的文章有提到，它是动态的，执行代码后才知道引用了什么，所以没法tree shaking",e.jsx("h2",{id:"effect",className:n.articleTitle,children:"副作用 (Side Effects)"}),"副作用是指模块在导入时执行了某些影响全局或其他模块的操作，即使该模块的导出没有被直接使用。",e.jsx("br",{}),"例如以下代码，如果 ",e.jsx("code",{children:"add"})," 函数没有被其他模块显式导入和使用，理论上可以被 Tree Shaking 移除。",e.jsx("br",{}),"但如果 ",e.jsx("code",{children:"window.memorize(add)"})," 这行代码执行了某些操作（比如修改了全局状态或 DOM），那么即使 ",e.jsx("code",{children:"memorizedAdd"})," 常量未被导出或使用，",e.jsx("code",{children:"add"})," 函数及其相关的副作用代码也应该被保留。",t,"工程化工具需要知道哪些代码包含副作用，以避免错误地移除它们。",e.jsx("h3",{id:"webpack",className:n.articleSubTitle,children:"打包工具的处理"}),"现代打包工具通常提供机制来标记副作用：",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"package.json 中的 `sideEffects` 字段:"})," 这是最常用且推荐的方式。库作者可以在 `package.json` 中设置 `sideEffects: false` 来表明整个包没有副作用，打包工具可以安全地移除未使用的导出。也可以提供一个文件路径数组，例如 ",e.jsx("code",{children:'sideEffects: ["./src/polyfill.js", "*.css"]'})," 来指定哪些文件有副作用，不应被 Tree Shaking。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Webpack 的 `module.rule.sideEffects`:"})," Webpack 允许在构建配置中为特定模块或文件类型设置 `sideEffects` 规则，作为 `package.json` 的补充或覆盖。例如 ",e.jsx("code",{children:"{ module: { rules: [ { test: /.css$/, sideEffects: true } ] } }"})," 表示所有 CSS 文件都有副作用。设置为 `false` 则表示匹配的文件没有副作用。"]})]}),"对于上面的示例代码，可以通过显式导入来帮助 Tree Shaking 生效，减少隐式的全局依赖：",s,e.jsx("br",{}),"此外，打包工具通常会配合压缩工具（如 Webpack 内置的 ",e.jsx("code",{children:"TerserPlugin"}),'）来最终删除被标记为"未使用"的代码（Dead Code Elimination）。打包工具负责分析模块依赖和标记未使用的导出，压缩工具负责移除这些代码。',"Webpack 在 compile 阶段将每个模块及其依赖关系构建成一个 `ModuleGraph`。 它依靠 AST（抽象语法树）分析，使用如 ",e.jsx("code",{children:"HarmonyExportSpecifierDependency"})," （处理具名导出 `export ",name,"`）和 ",e.jsx("code",{children:"HarmonyImportSpecifierDependency"})," （处理具名导入 `import ",name,"`）等特定的依赖类来精确识别 ES Module 的 `import` 和 `export` 语句，标记哪些导出被实际使用了。 下面是简化版的 ",e.jsx("code",{children:"HarmonyExportSpecifierDependency.js"})," 相关代码，展示了其如何处理导出绑定和标记：",e.jsx("div",{className:n.assist,children:"部分源码：webpack/lib/dependencies/HarmonyExportSpecifierDependency.js"}),e.jsx(r,{markdown:p})," ",e.jsx("h2",{id:"good",className:n.articleTitle,children:"对 Tree Shaking 友好的导出模式"}),"以下导出方式可能会",e.jsx("strong",{children:"阻碍 Tree Shaking"}),"：",e.jsxs("ul",{className:n.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"导出一个包含多项属性和方法的对象："}),"当使用 ",e.jsx("code",{children:"export default {{ method1, method2 }}"})," 或 ",e.jsx("code",{children:"export const utils = {{ method1, method2 }}"})," 时，如果只导入并使用了 `method1`，打包工具很难确定 `method2` 是否可以安全移除，因为它们是同一个对象的一部分。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"导出一个包含多项属性和方法的类："}),"与导出对象类似，",e.jsx("code",{children:"export class MyClass {{ method1() {{}}, method2() {{}} }}"})," 使得工具难以单独移除未使用的方法。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"滥用 `export default`："}),"特别是当默认导出一个大对象或类时，如上所述，会影响 Tree Shaking 的效果。"]})]}),i,e.jsx("strong",{children:"推荐的方式："}),"采用原子化、颗粒化的单项导出。每个函数、常量或类都单独导出。",o,"这样打包工具可以清晰地知道 `method2` 没有被使用，从而将其移除。",e.jsx("h2",{id:"vue",className:n.articleTitle,children:"Vue 中的 Tree Shaking"}),"Vue将内置组件都改为了ESM的方式导入使用:",d,e.jsx("h2",{id:"design",className:n.articleTitle,children:"设计兼顾易用性和tree shaking的公共库"}),"普遍做法参考antd，构建出两个文件夹，并且配置package.json的main和module属性，同时支持cjs和esm模块化。"]}),e.jsx(c,{items:[{title:"Tree Shaking",key:"pre",href:"#pre"},{title:"ESM规范",key:"esm",href:"#esm"},{title:"副作用",key:"effect",href:"#effect",children:[{title:"webpack",key:"webpack",href:"#webpack"}]},{title:"友好的导出模式",key:"good",href:"#good"},{title:"Vue中的tree shaking",key:"vue",href:"#vue"},{title:"设计tree shaking友好的公共库",key:"design",href:"#design"}]})]})}export{k as default};
