export const ENTRY = `\`\`\`ts
// webpack.config.js
module.exports = {
  entry: './src/index.js'
};
\`\`\``;

export const OUTPUT = `\`\`\`ts
// webpack.config.js
const path = require('path');
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
\`\`\``;

export const LOADER = `\`\`\`ts
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
\`\`\``;

export const PLUGIN = `\`\`\`ts
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
\`\`\``;

export const MODE = `\`\`\`ts
module.exports = {
  mode: 'production'
};
\`\`\``;

export const RESOLVE = `\`\`\`ts
module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};
\`\`\``;

export const COMPILER = `\`\`\`ts
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
\`\`\``;

export const COMPILATION = `\`\`\`ts
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
\`\`\``;

export const RESOLVER = `\`\`\`ts
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
\`\`\``;

export const LOADER_1 = `\`\`\`ts
// 示例：babel-loader 核心逻辑
module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  return babel.transform(source, options).code;
};
\`\`\``;

export const TAPABLE = `\`\`\`ts
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
\`\`\``;

export const CACHE = `\`\`\`ts
// webpack.config.js
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
};
\`\`\``;

export const MODULE_FEDERATION = `\`\`\`ts
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
\`\`\``;

export const TREE_SHAKING = `\`\`\`ts
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
\`\`\``;
