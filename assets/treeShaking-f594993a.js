import{j as e,d as r}from"./index-3ba01091.js";import{U as n}from"./useMarkdown-3db75fe1.js";import{A as c}from"./Anchor-918d3c78.js";import"./index-5b28342b.js";const o="```js\nexport function add(a,b){\n    return a+b;\n}\nexport const memorizedAdd = window.memorize(add);\n```",l=`\`\`\`js
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
\`\`\``,u=`\`\`\`js
// vue2.x
import Vue from "vue";

Vue.$nextTick(()=>{...});

// vue3.x
import { nextTick } from "Vue";

nextTick(()=>{...})
\`\`\``;function k(){const t=e.jsx(n,{markdown:o}),i=e.jsx(n,{markdown:l}),s=e.jsx(n,{markdown:m}),d=e.jsx(n,{markdown:p}),a=e.jsx(n,{markdown:u});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"Tree Shaking"}),"Tree Shaking翻译为摇树优化，它通常用于移除js上下文中未使用的代码，最先在",e.jsx("strong",{children:"Rollup"}),"社区流行，它的实现还需要依靠前端工程工具来实现。",e.jsx("h2",{id:"esm",className:r.articleTitle,children:"ESM规范"}),"Tree Shaking依赖ESM规范，原因如下：",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"import模块名只能是字符串常量"}),e.jsx("li",{children:"import一般只在模块顶层出现"}),e.jsx("li",{children:"import导入值是不可变的(引用类型除外)"})]}),"CommonJS模块在之前的文章有提到，它是动态的，执行代码后才知道引用了什么，所以没法tree shaking",e.jsx("h2",{id:"effect",className:r.articleTitle,children:"副作用"}),"有如下代码，如果",e.jsx("code",{children:"add"}),"函数没有被其他模块引用，那么add可以被tree shaking掉。",e.jsx("br",{}),"然后window.memorize调用了add函数，并触发某些副作用。那么像webpack这种工程化工具也要将add打包到最后的bundle中，即使没有其他模块依赖add函数",t,e.jsx("h3",{id:"webpack",className:r.articleSubTitle,children:"webpack的处理"}),"webpack提供了副作用的配置",e.jsx("strong",{children:"module.rule.sideEffects"}),"，允许声明哪些模块具有副作用。",e.jsx("br",{}),e.jsx("code",{children:"{ sideEffects:false }"}),"表示xxx没有副作用。",e.jsx("br",{}),"但是上述代码也可以对其进行优化使tree shaking生效，如下：",i,e.jsx("br",{}),"此外，webpack使用内置的",e.jsx("code",{children:"TerserPlugin"}),"来删除死代码，webpack负责对模块进行分析和标记，压缩插件根据结果进行代码删除，标记有如下三种：",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"harmony export"}),e.jsx("li",{children:"unused harmony export"}),e.jsx("li",{children:"harmony import"})]}),"webpack在compile时将每个模块加入",e.jsx("code",{children:"ModuleGraph"}),"，依靠",e.jsx("code",{children:"HarmonyExportSpecifierDependency"}),"和",e.jsx("code",{children:"HarmonyExportImportedSpecifierDependency"}),"分别识别处理import和export。 代码如下:",e.jsx("div",{className:r.assist,children:"lib\\dependencies\\HarmonyExportSpecifierDependency.js"}),d,e.jsx("h2",{id:"good",className:r.articleTitle,children:"友好的导出模式"}),"如下导出方式都",e.jsx("strong",{children:"不利于tree shaking"}),e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{children:"导出包含多项属性和方法的对象"}),e.jsx("li",{children:"导出多项属性和方法的class"}),e.jsx("li",{children:"export default"})]}),s,"友好的方式，就是原子化，颗粒化的单项导出。",e.jsx("h2",{id:"vue",className:r.articleTitle,children:"Vue中的tree shaking"}),"Vue将内置组件都改为了ESM的方式导入使用:",a,e.jsx("h2",{id:"design",className:r.articleTitle,children:"设计兼顾易用性和tree shaking的公共库"}),"普遍做法参考antd，构建出两个文件夹，并且配置package.json的main和module属性，同时支持cjs和esm模块化。"]}),e.jsx(c,{items:[{title:"Tree Shaking",key:"pre",href:"#pre"},{title:"ESM规范",key:"esm",href:"#esm"},{title:"副作用",key:"effect",href:"#effect",children:[{title:"webpack",key:"webpack",href:"#webpack"}]},{title:"友好的导出模式",key:"good",href:"#good"},{title:"Vue中的tree shaking",key:"vue",href:"#vue"},{title:"设计兼顾易用性和tree shaking的公共库",key:"design",href:"#design"}]})]})}export{k as default};
