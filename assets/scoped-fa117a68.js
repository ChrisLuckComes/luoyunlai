import{j as e,d as s}from"./index-d995f4f1.js";import{U as t}from"./useMarkdown-9bb10794.js";import{A as l}from"./Anchor-4feb64ba.js";import"./index-fd3e1634.js";const n=`\`\`\`ts
// @vue/compiler-dom 中处理模板编译的部分逻辑
function processElement(node, context) {
  if (context.scoped) {
    const id = context.id; // 获取唯一的 id
    node.props.push({
      type: NodeTypes.ATTRIBUTE,
      name: \`data-v-\${id}\`,
      value: null
    });
  }
  // 继续处理元素的子节点
  if (node.children) {
    node.children.forEach(child => {
      processElement(child, context);
    });
  }
}
\`\`\``,i=`\`\`\`ts
// @vue/compiler-sfc 中处理样式编译的部分逻辑
function transformStyle(styleBlock, context) {
  // 判断是否使用scoped
  if (styleBlock.scoped) {
    const id = context.id; // 获取唯一的 id
    const scopedAttr = \`[data-v-\${id}]\`;
    const css = styleBlock.content;
    const transformdCss = addScopedAttrToRules(css, scopedAttr);
    styleBlock.content = transformdCss;
  }
  return styleBlock;
}

// 遍历CSS规则的选择器，为每个选择器添加[data-v-\${id}]属性选择器，如果选择器包含:root，则替换为[data-v-\${id}]
function addScopedAttrToRules(css, scopedAttr) {
  const ast = parse(css);
  ast.stylesheet.rules.forEach(rule => {
    if(rule.type === 'rule'){
      rule.selectors = rule.selectors.map(selector => {
        if(selector.includes(':root')){
            return selector.replace(':root', scopedAttr);
        }
        // 处理深度选择器
        if (selector.includes('/deep/') || selector.includes('::v-deep')) {
            return handleDeepSelector(selector, scopedAttr);
        }
        return \`\${selector} \${scopedAttr}\`
      })
    }
  })
  return generate(ast);
})
\`\`\``,a='```ts\n// 为元素添加data-v-id属性，和css中的属性选择器匹配，实现了局部作用域\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (_openBlock(), _createBlock("div", {"data-v-123456"},"Hello, Vue3");\n\n}\n```',p="```ts\n// 处理深度选择器\nfunction handleDeepSelector(selector, scopedAttr) {\n  const deepIndex = selector.indexOf('v-deep');\n  if (deepIndex > -1) {\n    const before = selector.slice(0, deepIndex)\n    const after = selector.slice(deepIndex + 6)\n  }\n  return `${before} ${after}${scopedAttr}`\n}\n```";function f(){const c=e.jsx(t,{markdown:n}),o=e.jsx(t,{markdown:i}),r=e.jsx(t,{markdown:a}),d=e.jsx(t,{markdown:p});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"scoped",className:"font-semibold text-h2 mb-2",children:"style scoped"}),"scoped是Vue3中的一个特性，它可以让样式只在当前组件中生效，不会影响到其他组件。Vue3实现这个属性的核心思路是在编译阶段，为组件的模板元素和样式添加唯一的属性，然后通过这些属性来限定作用范围。 下面详细介绍",e.jsx("h2",{id:"theory",className:s.articleTitle,children:"实现原理"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("strong",{children:"1.源码编译阶段"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:["在",e.jsx("code",{children:"@vue/compiler-dom"}),"中，当编译组件模板时，如果",e.jsx("code",{children:"style"}),"标签带有",e.jsx("code",{children:"scoped"}),"属性，会为模板中的每一个元素添加唯一属性。",c]}),e.jsx("strong",{children:"2.样式编译阶段："}),e.jsxs("li",{children:["在",e.jsx("code",{children:"@vue/compiler-dom"}),"中，会为样式规则添加属性选择器。",o]}),e.jsx("strong",{children:"3.运行时渲染阶段："}),e.jsxs("li",{children:["在组件渲染时，之前添加的",e.jsx("code",{children:"data-v-id"}),"属性会被应用到实际的DOM元素上，同时样式中的属性选择器会确保样式只作用带有该属性的元素。",r]})]}),e.jsx("br",{})]}),e.jsx("h2",{id:"deep",className:s.articleTitle,children:"deep"}),"在",e.jsx("code",{children:"scoped"}),"样式中，可以使用",e.jsx("code",{children:"v-deep"}),"关键字来穿透作用域，应用样式到子组件。",e.jsx("br",{}),e.jsx("code",{children:"如下函数将深度选择器的前后分开，只在后面的选择器添加属性选择器，从而实现样式穿透"}),d]}),e.jsx(l,{items:[{title:"style scoped",key:"scoped",href:"#scoped"},{title:"实现原理",key:"theory",href:"#theory"},{title:"deep",key:"deep",href:"#deep"}]})]})}export{f as default};
