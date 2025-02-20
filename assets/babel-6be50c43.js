import{j as e,d as r}from"./index-058c629c.js";import{A as a}from"./Anchor-75b3735e.js";import{U as t}from"./useMarkdown-8861a8d5.js";import"./index-a0d8c73b.js";const i=`\`\`\`js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
\`\`\``,o=`\`\`\`js
/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * FINALLY! We'll create our \`compiler\` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input); // 词法分析，将输入的代码转换为tokens
  let ast    = parser(tokens); // 语法分析，将tokens数组转换为ast
  let newAst = transformer(ast); // 语法转换，将ast转换为新的ast
  let output = codeGenerator(newAst); // 代码生成，返回结果

  // and simply return the output!
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!YOU MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// Now I'm just exporting everything...
module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};
\`\`\``,c=`\`\`\`js
// tokenizer  2 + 2

[
    { type:"number", value:'2' },
    { type:"add", value:"+" },
    { type:"number", value:'2' },
]


export function tokenizer(input: string) {
  let current = 0,
    tokens = [];

  while (current < input.length) {
    let char = input[current];

    //处理括号
    if (char === '(') {
      tokens.push({ tpye: 'paren', value: '(' });
      current++;
      continue;
    }
    //处理括号
    if (char === ')') {
      tokens.push({ name: 'paren', value: ')' });
      current++;
      continue;
    }
    //处理空格
    const WHITESPACE = /s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    //处理数字
    const NUMBERS = /d/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    //处理字符
    const LETTERS = /[a-z]/;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }

    throw new Error('未知字符：' + char);
  }

  return tokens;
}

\`\`\``;function d(){const n=e.jsx(t,{markdown:i}),s=e.jsx(t,{markdown:o}),l=e.jsx(t,{markdown:c});return e.jsxs("article",{id:"root",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h1",{id:"babel",className:"font-semibold text-h2 mb-2",children:"Babel"}),"Babel是一个JavaScript工具链，主要用于在当前或者更老的浏览器或环境中将ES2015+的代码转换为向下兼容的JavaScript版本. 它可以做什么？",e.jsxs("ul",{className:r.ul,children:[e.jsx("li",{id:"babel-transform",children:"转换语法"}),e.jsxs("li",{id:"babel-polyfill",children:["Polyfill(可翻译为补充)当前环境缺失的语法特性，例如通过",e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://github.com/zloirock/core-js",children:"core-js"}),"。 那么问题来了，什么是",e.jsx("strong",{children:"core-js"}),"?",e.jsx("br",{}),e.jsxs("div",{className:"pl-indent",children:[e.jsx("h3",{id:"core-js",className:r.articleSubTitle,children:"core-js"}),"它是最全面的js标准的polyfill库(说人话，一堆函数)，支持从最前沿的pre-stage 0阶段到最新的ECMAScript的feature，包括和ECMAScript有关的Web平台，例如",e.jsx("code",{children:"URL"}),"。它主要是为了",e.jsx("code",{children:"@babel/preset-env"}),"等基于",e.jsx("code",{children:"core-js"}),"的工具而设计，当然也可以直接导入使用.",e.jsx("br",{}),"它是开发者可以使用现代ECMAScript语法的一个主要原因，很多人都没感知到它的存在，因为有些框架已经将其包含在内了。"]})]}),e.jsxs("li",{children:["转换源代码，就像这样：",e.jsx("br",{}),n]})]}),"那么它是怎么实现的呢？",e.jsx("h2",{id:"compiler",className:r.articleTitle,children:"编译器"}),"一个最小的编译器代码结构如下：",e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://github.com/jamiebuilds/the-super-tiny-compiler",children:"the-super-tiny-compiler"}),s,e.jsx("h3",{id:"tokenizer",className:r.articleSubTitle,children:"词法分析"}),"词法分析就是接收原始代码，分割成tokens并返回的过程。tokens就是包含了很多描述独立的语法片段的对象数组，对象可能是数字，字符，标点符号，运算符等。",l]}),e.jsx(a,{items:[{title:"babel",key:"babel",href:"#babel",children:[{title:"转换语法",key:"babel-transform",href:"#babel-transform"},{title:"Polyfill",key:"babel-polyfill",href:"#babel-polyfill",children:[{title:"core-js",key:"core-js",href:"#core-js"}]}]},{title:"编译器",key:"compiler",href:"#compiler",children:[{title:"词法分析",key:"tokenizer",href:"#tokenizer"},{title:"语法分析",key:"parser",href:"#parser"},{title:"转换",key:"transformer",href:"#transformer"},{title:"生成代码",key:"codeGenerator",href:"#codeGenerator"}]},{title:"babel相关的库",key:"aboutBabel",href:"#aboutBabel"}]})]})}export{d as default};
