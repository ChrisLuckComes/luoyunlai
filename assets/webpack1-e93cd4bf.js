import{j as e,d as l}from"./index-57ee3021.js";import{U as s}from"./useMarkdown-858068ef.js";import{A as k}from"./Anchor-bf78e4bb.js";import"./index-1e12511c.js";const b="```ts\n// webpack.config.js\nmodule.exports = {\n  entry: './src/index.js'\n};\n```",g=`\`\`\`ts
// webpack.config.js
const path = require('path');
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
\`\`\``,y=`\`\`\`ts
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
\`\`\``,f=`\`\`\`ts
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
\`\`\``,w="```ts\nmodule.exports = {\n  mode: 'production'\n};\n```",C=`\`\`\`ts
module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
\`\`\``,N=`\`\`\`ts
// lib/Compiler.js
class Compiler {
  constructor(context) {
    this.hooks = {
      run: new SyncHook(['compiler']),
      compile: new SyncHook(['params']),
      // 其他钩子...
    };
  }

  run(callback) {
    this.hooks.run.call(this);
    this.compile((err, compilation) => {
      // 处理编译结果
    });
  }

  compile(callback) {
    const params = { /* 编译参数 */ };
    this.hooks.compile.call(params);
    const compilation = new Compilation(this);
    this.hooks.make.callAsync(compilation, (err) => {
      // 模块构建完成
    });
  }
}
\`\`\``,S=`\`\`\`ts
// lib/Compilation.js
class Compilation {
  constructor(compiler) {
    this.hooks = {
      buildModule: new SyncHook(['module']),
      // 其他钩子...
    };
  }

  buildModule(module, callback) {
    this.hooks.buildModule.call(module);
    // 执行 Loader 链
    const loaderContext = this.createLoaderContext();
    runLoaders({
      resource: module.resource,
      loaders: module.loaders,
      context: loaderContext,
    }, (err, result) => {
      // 解析模块 AST
      const ast = acorn.parse(result.resourceBuffer);
      // 分析依赖
      this.analyzeDependencies(module, ast);
      callback();
    });
  }
}
\`\`\``,v=`\`\`\`ts
// lib/resolver.js
class Resolver {
  resolveSync(context, request) {
    // 1. 处理别名
    if (this.alias[request]) {
      return this.resolveSync(context, this.alias[request]);
    }
    // 2. 处理路径解析
    const resolved = this.doResolveSync('resolve', context, request);
    // 3. 处理扩展名
    return this.doResolveSync('ext', resolved);
  }
}
\`\`\``,E="```ts\n// 示例：babel-loader 核心逻辑\nmodule.exports = function(source) {\n  const options = loaderUtils.getOptions(this);\n  return babel.transform(source, options).code;\n};\n```",T=`\`\`\`ts
class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      // 修改输出资源
      compilation.assets['custom.txt'] = {
        source: () => 'Hello Webpack',
        size: () => 12
      };
    });
  }
}
\`\`\``,W=`\`\`\`ts
// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
};
\`\`\``,L=`\`\`\`ts
// 主应用配置
new ModuleFederationPlugin({
  remotes: {
    app2: 'app2@http://localhost:3001/remoteEntry.js'
  }
});

// 远程应用配置
new ModuleFederationPlugin({
  name: 'app2',
  exposes: {
    './Button': './src/Button'
  }
});
\`\`\``,M=`\`\`\`ts
// package.json
{
  "sideEffects": false
}

// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    concatenateModules: true
  }
};
\`\`\``;function F(){const o=e.jsx(s,{markdown:b}),r=e.jsx(s,{markdown:g}),i=e.jsx(s,{markdown:y}),c=e.jsx(s,{markdown:f}),n=e.jsx(s,{markdown:w}),t=e.jsx(s,{markdown:C}),d=e.jsx(s,{markdown:N}),a=e.jsx(s,{markdown:S}),h=e.jsx(s,{markdown:v}),m=e.jsx(s,{markdown:E}),p=e.jsx(s,{markdown:T}),x=e.jsx(s,{markdown:W}),u=e.jsx(s,{markdown:L}),j=e.jsx(s,{markdown:M});return e.jsxs("article",{id:"rootArticle",className:l.article,children:[e.jsxs("main",{className:l.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"Webpack"}),"Webpack是一个强大的模块打包工具，Webpack5在此前版本的基础上进行了诸多优化和功能拓展。",e.jsx("h2",{id:"webpack",className:l.articleTitle,children:"基本概念"}),e.jsxs("ul",{className:l.ul,children:[e.jsxs("li",{id:"entry",children:[e.jsx("strong",{children:"入口(Entry)"}),"：Webpack构建的起点，告知Webpack从哪个文件开始分析依赖，可以指定单个入口，也可以设置多个入口。",o]}),e.jsxs("li",{id:"output",children:[e.jsx("strong",{children:"输出(Output)"}),"：定义了Webpack打包后的文件存放位置和文件名。",r]}),e.jsxs("li",{id:"loader",children:[e.jsx("strong",{children:"Loader"}),"：用于处理不同类型的文件，将它们转换为Webpack能够处理的模块，比如",e.jsx("code",{children:"css-loader"}),"可以处理CSS文件,",e.jsx("code",{children:"babel-loader"}),"可以处理JavaScript代码。",i]}),e.jsxs("li",{id:"plugin",children:[e.jsx("strong",{children:"Plugin"}),"：可在Webpack构建的各个阶段执行特定任务，如压缩代码、生成HTML文件等。",c]})]}),e.jsx("h2",{id:"commonConfig",className:l.articleTitle,children:"常用配置"}),e.jsxs("ul",{className:l.ul,children:[e.jsxs("li",{id:"mode",children:[e.jsx("strong",{children:"模式(Mode)"}),"：指定Webpack的运行模式，有",e.jsx("code",{children:"development"}),"、",e.jsx("code",{children:"production"}),"和",e.jsx("code",{children:"none"}),"三种模式。",e.jsx("code",{children:"development"}),"模式会开启一些有助于开发的特性，",e.jsx("code",{children:"production"}),"模式会进行代码压缩等优化。",n]}),e.jsxs("li",{id:"resolve",children:[e.jsx("strong",{children:"解析(Resolve)"}),"：配置Webpack如何解析模块路径。",t]})]}),e.jsx("h2",{id:"deep",className:l.articleTitle,children:"深入原理"}),e.jsxs("ul",{className:l.ul,children:[e.jsxs("li",{id:"core",children:[e.jsx("strong",{children:"核心架构"}),"：",e.jsx("code",{children:"Compiler"}),"+",e.jsx("code",{children:"Compilation"})]}),e.jsxs("ul",{className:l.subUl,children:[e.jsxs("li",{id:"compiler",children:[e.jsx("strong",{children:"Compiler"}),"：它是Webpack的核心类，负责管理整个构建流程。",e.jsx("code",{children:"Compiler"}),"实例化时会初始化各种钩子，构建过程中会依次触发。",d]}),e.jsxs("li",{id:"compilation",children:[e.jsx("strong",{children:"Compilation"}),"：Webpack的构建过程，负责模块的解析、优化和打包。",a]})]}),e.jsxs("li",{id:"module",children:[e.jsx("strong",{children:"模块解析(Resolver)"}),"：负责解析模块路径，它会根据配置的规则查找模块文件，包括处理别名、路径解析和拓展名匹配等步骤。",h]}),e.jsxs("li",{id:"loader1",children:[e.jsx("strong",{children:"Loader机制"}),"：Loader是一个函数，接收源文件内容作为参数，返回处理后的内容。Loader会按配置的顺序链式执行，从右到左依次处理文件。",m]}),e.jsxs("li",{id:"tapable",children:[e.jsx("strong",{children:"插件系统(Tapable)"}),"：Webpack的插件系统基于Tapable库实现，它提供了一系列钩子，插件可以在构建的各个阶段插入自定义逻辑。",p]})]}),e.jsx("h2",{id:"new",className:l.articleTitle,children:"Webpack5新特性"}),e.jsxs("ul",{className:l.ul,children:[e.jsxs("li",{id:"cache",children:[e.jsx("strong",{children:"持久化缓存(Persistent Cache)"}),"：Webpack5引入了持久化缓存机制，可以缓存构建结果到本地磁盘，下次构建时如模块未发生变化，可以直接使用缓存结果，提高构建速度。",x]}),e.jsxs("li",{id:"moduleFederation",children:[e.jsx("strong",{children:"模块联邦(Module Federation)"}),"：Webpack5引入了模块联邦机制，允许在不同的webpack构建之间共享模块，实现代码的动态加载和复用。",u,"核心类包括",e.jsx("code",{children:"RemoteModule"}),"用于处理远程模块加载，",e.jsx("code",{children:"Container"}),"用于管理远程容器状态。加载流程为：主应用动态加载远程",e.jsx("code",{children:"Entry"}),"，解析远程模块清单，按需加载远程模块。"]}),e.jsxs("li",{id:"treeShaking",children:[e.jsx("strong",{children:"Tree Shaking优化"}),"：Webpack5对Tree Shaking进行了优化，能够更精准的识别和删除未使用的代码，通过",e.jsx("code",{children:"sideEffect"}),"标记无副作用的模块， 结合ES6模块的静态分析，使用",e.jsx("code",{children:"terser"}),"进行死代码删除。",j]})]}),e.jsx("h2",{id:"summary",className:l.articleTitle,children:"构建流程总结"}),e.jsxs("p",{children:["1.",e.jsx("strong",{children:"启动Webpack"}),"：初始化",e.jsx("code",{children:"Compiler"}),"实例，加载配置文件，注册插件。"]}),e.jsxs("p",{className:"my-1",children:["2.",e.jsxs("strong",{children:["触发",e.jsx("code",{children:"run"}),"钩子"]}),"：开启构建流程"]}),e.jsxs("p",{className:"my-1",children:["3.",e.jsxs("strong",{children:["创建",e.jsx("code",{children:"Compilation"}),"实例"]}),"：代表一次具体的构建过程"]}),e.jsxs("p",{className:"my-1",children:["4.",e.jsx("strong",{children:"解析入口模块"}),"：使用",e.jsx("code",{children:"Resolver"}),"解析入口模块的路径"]}),e.jsxs("p",{className:"my-1",children:["5.",e.jsx("strong",{children:"递归解析依赖"}),"：从入口模块开始，递归分析其依赖，构建模块依赖图"]}),e.jsxs("p",{className:"my-1",children:["6.",e.jsx("strong",{children:"执行Loader链"}),"：按顺序执行",e.jsx("code",{children:"loader"}),"，将源文件转换为模块代码"]}),e.jsxs("p",{className:"my-1",children:["7.",e.jsx("strong",{children:"生成AST"}),"：使用",e.jsx("code",{children:"acorn"}),"库解析模块代码，生成AST"]}),e.jsxs("p",{className:"my-1",children:["8.",e.jsx("strong",{children:"模块依赖分析"}),"：遍历AST，查找",e.jsx("code",{children:"import/require"}),"语句，收集模块依赖关系"]}),e.jsxs("p",{className:"my-1",children:["9.",e.jsx("strong",{children:"优化阶段"}),"：进行",e.jsx("code",{children:"Tree Shaking"}),"，代码压缩等优化操作"]}),e.jsxs("p",{className:"my-1",children:["10.",e.jsx("strong",{children:"生成chunk"}),"：将模块打包成Chunk"]}),e.jsxs("p",{className:"my-1",children:["11.",e.jsxs("strong",{children:["触发",e.jsx("code",{children:"emit"}),"钩子"]}),"：在生成资源到输出目录前可进行自定义操作"]}),e.jsxs("p",{className:"my-1",children:["12.",e.jsx("strong",{children:"输出文件"}),"：把打包后的文件写入配置的",e.jsx("code",{children:"output"}),"选项"]})]}),e.jsx(k,{items:[{title:"基本概念",key:"webpack",href:"#webpack",children:[{title:"入口(Entry)",key:"entry",href:"#entry"},{title:"输出(Output)",key:"output",href:"#output"},{title:"Loader",key:"loader",href:"#loader"},{title:"插件(Plugin)",key:"plugin",href:"#plugin"}]},{title:"常用配置",key:"commonConfig",href:"#commonConfig",children:[{title:"模式",key:"mode",href:"#mode"},{title:"解析(resolve)",key:"resolve",href:"#resolve"}]},{title:"深入原理",key:"deep",href:"#deep",children:[{title:"核心架构",key:"core",href:"#core",children:[{title:"Compiler",key:"compiler",href:"#compiler"},{title:"Compilation",key:"compilation",href:"#compilation"}]},{title:"模块解析(Resolver)",key:"module",href:"#module",children:[]},{title:"Loader机制",key:"loader1",href:"#loader1",children:[]},{title:"插件系统(Tapable)",key:"tapable",href:"#tapable",children:[]}]},{title:"Webpack5新特性",key:"new",href:"#new",children:[{title:"持久化缓存(Persistent Cache)",key:"cache",href:"#cache",children:[]},{title:"模块联邦(Module Federation)",key:"moduleFederation",href:"#moduleFederation",children:[]},{title:"Tree Shaking优化",key:"treeShaking",href:"#treeShaking",children:[]}]},{title:"构建流程总结",key:"summary",href:"#summary",children:[]}]})]})}export{F as default};
