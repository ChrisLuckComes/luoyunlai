export const TRANSFORM = `\`\`\`ts
// 模拟 @vue/compiler-sfc 中的部分逻辑
function compileScriptSetup(scriptSetupCode) {
    // 解析 script setup 代码，提取关键信息
    const parsedCode = parseScriptSetup(scriptSetupCode);

    // 生成 setup 函数框架
    let setupFunctionCode = \`
        export default {
            setup() {
                // 初始化响应式数据和方法
                \${parsedCode.variables}

                // 处理生命周期钩子
                \${parsedCode.lifecycleHooks}

                // 处理依赖注入和提供
                \${parsedCode.provideInject}

                // 返回需要暴露给模板的数据和方法
                return {
                    \${parsedCode.returnValues}
                };
            }
        };
    \`;

    return setupFunctionCode;
}

function parseScriptSetup(code) {
    // 这里可以使用正则表达式或更复杂的 AST（抽象语法树）解析工具来解析代码
    // 示例：提取响应式数据和方法
    const variableRegex = /const (\w+) = (ref|reactive)\(.+?\);/g;
    let variables = '';
    let match;
    while ((match = variableRegex.exec(code))) {
        variables += match[0] + '\n';
    }

    // 示例：提取生命周期钩子
    const lifecycleHookRegex = /(onMounted|onUnmounted)\(.+?\);/g;
    let lifecycleHooks = '';
    while ((match = lifecycleHookRegex.exec(code))) {
        lifecycleHooks += match[0] + '\n';
    }

    // 示例：提取依赖注入和提供
    const provideInjectRegex = /(provide|inject)\(.+?\);/g;
    let provideInject = '';
    while ((match = provideInjectRegex.exec(code))) {
        provideInject += match[0] + '\n';
    }

    // 示例：确定需要返回的数据和方法
    const returnValues = variables.match(/const (\w+) = /g).map(m => m.replace('const ', '').replace(' = ', '')).join(', ');

    return {
        variables,
        lifecycleHooks,
        provideInject,
        returnValues
    };
}
\`\`\``;

export const READ_FILE = `\`\`\`ts
const { parse } = require('@vue/compiler-sfc');
const fs = require('fs');

// 读取 .vue 文件内容
const source = fs.readFileSync('MyComponent.vue', 'utf-8');
// 解析单文件组件
const { descriptor } = parse(source);

// 判断是否存在 <script setup>
if (descriptor.scriptSetup) {
    // 执行 compileScriptSetup
    console.log('Found <script setup>, will compile it.');
} else {
    console.log('No <script setup> found.');
}

\`\`\``;

export const DESCRIPTOR = `\`\`\`ts
{
  type: 'SFCDescriptor',
  template: {
    type: 'SFCTemplateBlock',
    content: '<div>{{ message }}</div>',
    // 其他相关属性
  },
  script: {
    type: 'SFCScriptBlock',
    content: 'export default { data() { return { message: "Hello" } } }',
    // 其他相关属性
  },
  scriptSetup: {
    type: 'SFCScriptSetupBlock',
    content: 'import { ref } from "vue"; const message = ref("Hello");',
    // 其他相关属性
  },
  styles: [
    {
      type: 'SFCStyleBlock',
      content: 'div { color: red; }',
      // 其他相关属性
    }
  ]
}
\`\`\``;

export const PARSE = `\`\`\`ts
function tokenize(source) {
  // 实现词法分析，将 source 转换为 tokens 数组
  // 示例代码省略，实际会根据不同的字符和规则生成对应的 tokens
  return tokens;
}

function parseTokens(tokens) {
  // 实现语法分析，将 tokens 转换为 AST
  // 示例代码省略，实际会根据语法规则构建 AST 节点
  return ast;
}

function analyzeAST(ast) {
    let scriptSetup = null;
    // 遍历 AST 节点，查找 <script setup>
    ast.children.forEach(node => {
        if (node.type === 'SFCScriptBlock' && node.attrs.some(attr => attr.name === 'setup')) {
            // 标记为 <script setup> 块
            scriptSetup = {
                ...node,
                type: 'SFCScriptSetupBlock'
            };
        }
    });

    return {
        scriptSetup
    };
}

function parse(source) {
    // 词法分析
    const tokens = tokenize(source);
    // 语法分析
    const ast = parseTokens(tokens);
    // 语义分析
    const descriptor = analyzeAST(ast);
    return descriptor;
}
\`\`\``;
