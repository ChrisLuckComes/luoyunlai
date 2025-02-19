export const PROCESS_ELEMENT = `\`\`\`ts
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
\`\`\``;

export const TRANSFORM_STYLE = `\`\`\`ts
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
\`\`\``;

export const RENDER = `\`\`\`ts
// 为元素添加data-v-id属性，和css中的属性选择器匹配，实现了局部作用域
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", {"data-v-123456"},"Hello, Vue3");

}
\`\`\``;

export const DEEP = `\`\`\`ts
// 处理深度选择器
function handleDeepSelector(selector, scopedAttr) {
  const deepIndex = selector.indexOf('v-deep');
  if (deepIndex > -1) {
    const before = selector.slice(0, deepIndex)
    const after = selector.slice(deepIndex + 6)
  }
  return \`\${before} \${after}\${scopedAttr}\`
}
\`\`\``;
