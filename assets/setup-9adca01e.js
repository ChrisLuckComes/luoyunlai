import{j as e,d as s}from"./index-12c11ae8.js";import{U as t}from"./useMarkdown-141d10e7.js";import{A as n}from"./Anchor-cb8b8329.js";const l=`\`\`\`ts
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
    const variableRegex = /const (w+) = (ref|reactive)(.+?);/g;
    let variables = '';
    let match;
    while ((match = variableRegex.exec(code))) {
        variables += match[0] + '
';
    }

    // 示例：提取生命周期钩子
    const lifecycleHookRegex = /(onMounted|onUnmounted)(.+?);/g;
    let lifecycleHooks = '';
    while ((match = lifecycleHookRegex.exec(code))) {
        lifecycleHooks += match[0] + '
';
    }

    // 示例：提取依赖注入和提供
    const provideInjectRegex = /(provide|inject)(.+?);/g;
    let provideInject = '';
    while ((match = provideInjectRegex.exec(code))) {
        provideInject += match[0] + '
';
    }

    // 示例：确定需要返回的数据和方法
    const returnValues = variables.match(/const (w+) = /g).map(m => m.replace('const ', '').replace(' = ', '')).join(', ');

    return {
        variables,
        lifecycleHooks,
        provideInject,
        returnValues
    };
}
\`\`\``,d=`\`\`\`ts
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

\`\`\``,p=`\`\`\`ts
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
\`\`\``,a=`\`\`\`ts
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
\`\`\``;function j(){const r=e.jsx(t,{markdown:l}),c=e.jsx(t,{markdown:d}),o=e.jsx(t,{markdown:p}),i=e.jsx(t,{markdown:a});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"setup",className:"font-semibold text-h2 mb-2",children:"script setup"}),e.jsx("code",{children:"script setup"}),"是一种语法糖，在构建阶段，Vue的编译器将",e.jsx("code",{children:"script setup"}),"转换为普通的",e.jsx("code",{children:"script"}),"代码",e.jsx("h2",{id:"theory",className:s.articleTitle,children:"实现原理"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("strong",{children:"1.编译转换"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"自动注册组件和指令："}),"在",e.jsx("code",{children:"script setup"}),"中，不需要显式地注册组件和指令，导入的组件和指令会被编译器在转换时自动注册"]}),e.jsxs("li",{children:[e.jsxs("strong",{children:["自动创建",e.jsx("code",{children:"setup"}),"函数："]}),"编译器会将",e.jsx("code",{children:"script setup"}),"中的代码包装到一个",e.jsx("code",{children:"setup"}),"函数中，这个函数是Vue3组合式API的入口。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"响应式数据和方法暴露："}),"在",e.jsx("code",{children:"script setup"}),"中定义的响应式数据和方法会自动暴露给模板使用，编译器会处理导出逻辑，相当于之前的setup函数return操作。"]})]}),e.jsx("br",{}),e.jsx("strong",{children:"2.响应式系统："}),e.jsx("code",{children:"script setup"}),"借助Vue3的响应式系统来实现数据的响应式更新。通过",e.jsx("code",{children:"ref"}),"、",e.jsx("code",{children:"reactive"}),"等函数创建的响应式数据会自动跟踪依赖，并在数据发生变化时更新相关的DOM。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"3.生命周期钩子和依赖注入"}),e.jsx("br",{}),e.jsx("code",{children:"script setup"}),"中可以直接使用Vue3的生命周期钩子和依赖注入函数，例如",e.jsx("code",{children:"onMounted"}),"、",e.jsx("code",{children:"provide"}),"、",e.jsx("code",{children:"inject"}),"等。编译器会将这些函数调用转换为相应的内部逻辑。",e.jsx("h2",{id:"code",className:s.articleTitle,children:"代码解析"}),e.jsx("h3",{id:"judge",className:s.articleSubTitle,children:"判断条件"}),e.jsx("code",{children:"@vue/compiler-sfc"}),"读取并解析.vue文件，判断是否存在",e.jsx("code",{children:"script setup"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{children:"解析单文件组件"}),e.jsx("br",{}),c,e.jsx("br",{}),e.jsx("strong",{children:"判断过程"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"词法分析：将代码字符串拆分成Token，例如关键字、标识符、运算符等"}),e.jsxs("li",{children:["语法分析：根据词法单元构建AST，这个过程根据js和vue的语法规则来确定代码结构",o]}),e.jsxs("li",{children:["语义分析：对AST进行遍历和分析，提取有用的信息，例如判断是否有",e.jsx("code",{children:"script setup"}),i]})]}),e.jsx("h3",{id:"transform",className:s.articleSubTitle,children:"转换过程"}),"在Vue3的源码中，单文件组件（SFC）的编译主要在",e.jsx("code",{children:"@vue/compiler-sfc"}),"包中进行。当解析包含",e.jsx("code",{children:"script setup"}),"的SFC时，编译器会对其特殊处理",r]})]}),e.jsx(n,{items:[{title:"script setup",key:"setup",href:"#setup"},{title:"实现原理",key:"theory",href:"#theory"},{title:"代码解析",key:"code",href:"#code",children:[{title:"判断条件",key:"judge",href:"#judge"},{title:"转换过程",key:"transform",href:"#transform"}]},{title:"总结",key:"summary",href:"#summary"}]})]})}export{j as default};
