import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';
import {
  ENTRY,
  OUTPUT,
  LOADER,
  PLUGIN,
  MODE,
  RESOLVE,
  COMPILER,
  COMPILATION,
  RESOLVER,
  LOADER_1,
  TAPABLE,
  CACHE,
  MODULE_FEDERATION,
  TREE_SHAKING
} from './_webpack1';
export default function Index() {
  const entry = <UseMarkDown markdown={ENTRY}></UseMarkDown>,
    output = <UseMarkDown markdown={OUTPUT}></UseMarkDown>,
    loader = <UseMarkDown markdown={LOADER}></UseMarkDown>,
    plugin = <UseMarkDown markdown={PLUGIN}></UseMarkDown>,
    mode = <UseMarkDown markdown={MODE}></UseMarkDown>,
    resolve = <UseMarkDown markdown={RESOLVE}></UseMarkDown>,
    compiler = <UseMarkDown markdown={COMPILER}></UseMarkDown>,
    compilation = <UseMarkDown markdown={COMPILATION}></UseMarkDown>,
    resolver = <UseMarkDown markdown={RESOLVER}></UseMarkDown>,
    loader1 = <UseMarkDown markdown={LOADER_1}></UseMarkDown>,
    tapable = <UseMarkDown markdown={TAPABLE}></UseMarkDown>,
    cache = <UseMarkDown markdown={CACHE}></UseMarkDown>,
    moduleFederation = <UseMarkDown markdown={MODULE_FEDERATION}></UseMarkDown>,
    treeShaking = <UseMarkDown markdown={TREE_SHAKING}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          Webpack
        </h2>
        Webpack是一个强大的模块打包工具，Webpack5在此前版本的基础上进行了诸多优化和功能拓展。
        <h2 id="webpack" className={classMap.articleTitle}>
          基本概念
        </h2>
        <ul className={classMap.ul}>
          <li id="entry">
            <strong>入口(Entry)</strong>
            ：Webpack构建的起点，告知Webpack从哪个文件开始分析依赖，可以指定单个入口，也可以设置多个入口。
            {entry}
          </li>
          <li id="output">
            <strong>输出(Output)</strong>
            ：定义了Webpack打包后的文件存放位置和文件名。
            {output}
          </li>
          <li id="loader">
            <strong>Loader</strong>
            ：用于处理不同类型的文件，将它们转换为Webpack能够处理的模块，比如<code>css-loader</code>可以处理CSS文件,
            <code>babel-loader</code>可以处理JavaScript代码。
            {loader}
          </li>
          <li id="plugin">
            <strong>Plugin</strong>：可在Webpack构建的各个阶段执行特定任务，如压缩代码、生成HTML文件等。
            {plugin}
          </li>
        </ul>
        <h2 id="commonConfig" className={classMap.articleTitle}>
          常用配置
        </h2>
        <ul className={classMap.ul}>
          <li id="mode">
            <strong>模式(Mode)</strong>
            ：指定Webpack的运行模式，有<code>development</code>、<code>production</code>和<code>none</code>三种模式。
            <code>development</code>模式会开启一些有助于开发的特性，
            <code>production</code>模式会进行代码压缩等优化。
            {mode}
          </li>
          <li id="resolve">
            <strong>解析(Resolve)</strong>
            ：配置Webpack如何解析模块路径。
            {resolve}
          </li>
        </ul>
        <h2 id="deep" className={classMap.articleTitle}>
          深入原理
        </h2>
        <ul className={classMap.ul}>
          <li id="core">
            <strong>核心架构</strong>：<code>Compiler</code>+<code>Compilation</code>
          </li>
          <ul className={classMap.subUl}>
            <li id="compiler">
              <strong>Compiler</strong>
              ：它是Webpack的核心类，负责管理整个构建流程。<code>Compiler</code>
              实例化时会初始化各种钩子，构建过程中会依次触发。
              {compiler}
            </li>
            <li id="compilation">
              <strong>Compilation</strong>
              ：Webpack的构建过程，负责模块的解析、优化和打包。
              {compilation}
            </li>
          </ul>
          <li id="module">
            <strong>模块解析(Resolver)</strong>
            ：负责解析模块路径，它会根据配置的规则查找模块文件，包括处理别名、路径解析和拓展名匹配等步骤。
            {resolver}
          </li>
          <li id="loader1">
            <strong>Loader机制</strong>
            ：Loader是一个函数，接收源文件内容作为参数，返回处理后的内容。Loader会按配置的顺序链式执行，从右到左依次处理文件。
            {loader1}
          </li>
          <li id="tapable">
            <strong>插件系统(Tapable)</strong>
            ：Webpack的插件系统基于Tapable库实现，它提供了一系列钩子，插件可以在构建的各个阶段插入自定义逻辑。
            {tapable}
          </li>
        </ul>
        <h2 id="new" className={classMap.articleTitle}>
          Webpack5新特性
        </h2>
        <ul className={classMap.ul}>
          <li id="cache">
            <strong>持久化缓存(Persistent Cache)</strong>
            ：Webpack5引入了持久化缓存机制，可以缓存构建结果到本地磁盘，下次构建时如模块未发生变化，可以直接使用缓存结果，提高构建速度。
            {cache}
          </li>
          <li id="moduleFederation">
            <strong>模块联邦(Module Federation)</strong>
            ：Webpack5引入了模块联邦机制，允许在不同的webpack构建之间共享模块，实现代码的动态加载和复用。
            {moduleFederation}
            核心类包括<code>RemoteModule</code>用于处理远程模块加载，<code>Container</code>
            用于管理远程容器状态。加载流程为：主应用动态加载远程<code>Entry</code>，解析远程模块清单，按需加载远程模块。
          </li>
          <li id="treeShaking">
            <strong>Tree Shaking优化</strong>
            ：Webpack5对Tree Shaking进行了优化，能够更精准的识别和删除未使用的代码，通过<code>sideEffect</code>
            标记无副作用的模块， 结合ES6模块的静态分析，使用<code>terser</code>进行死代码删除。
            {treeShaking}
          </li>
        </ul>
        <h2 id="summary" className={classMap.articleTitle}>
          构建流程总结
        </h2>
        <p>
          1.<strong>启动Webpack</strong>：初始化<code>Compiler</code>实例，加载配置文件，注册插件。
        </p>
        <p className="my-1">
          2.
          <strong>
            触发<code>run</code>钩子
          </strong>
          ：开启构建流程
        </p>
        <p className="my-1">
          3.
          <strong>
            创建<code>Compilation</code>实例
          </strong>
          ：代表一次具体的构建过程
        </p>
        <p className="my-1">
          4.<strong>解析入口模块</strong>：使用<code>Resolver</code>解析入口模块的路径
        </p>
        <p className="my-1">
          5.<strong>递归解析依赖</strong>：从入口模块开始，递归分析其依赖，构建模块依赖图
        </p>
        <p className="my-1">
          6.<strong>执行Loader链</strong>：按顺序执行<code>loader</code>，将源文件转换为模块代码
        </p>
        <p className="my-1">
          7.<strong>生成AST</strong>：使用<code>acorn</code>库解析模块代码，生成AST
        </p>
        <p className="my-1">
          8.<strong>模块依赖分析</strong>：遍历AST，查找<code>import/require</code>语句，收集模块依赖关系
        </p>
        <p className="my-1">
          9.<strong>优化阶段</strong>：进行<code>Tree Shaking</code>，代码压缩等优化操作
        </p>
        <p className="my-1">
          10.<strong>生成chunk</strong>：将模块打包成Chunk
        </p>
        <p className="my-1">
          11.
          <strong>
            触发<code>emit</code>钩子
          </strong>
          ：在生成资源到输出目录前可进行自定义操作
        </p>
        <p className="my-1">
          12.<strong>输出文件</strong>：把打包后的文件写入配置的<code>output</code>选项
        </p>
      </main>
      <ArticleAnchor
        items={[
          {
            title: '基本概念',
            key: 'webpack',
            href: '#webpack',
            children: [
              {
                title: '入口(Entry)',
                key: 'entry',
                href: '#entry'
              },
              {
                title: '输出(Output)',
                key: 'output',
                href: '#output'
              },
              {
                title: 'Loader',
                key: 'loader',
                href: '#loader'
              },
              {
                title: '插件(Plugin)',
                key: 'plugin',
                href: '#plugin'
              }
            ]
          },
          {
            title: '常用配置',
            key: 'commonConfig',
            href: '#commonConfig',
            children: [
              {
                title: '模式',
                key: 'mode',
                href: '#mode'
              },
              {
                title: '解析(resolve)',
                key: 'resolve',
                href: '#resolve'
              }
            ]
          },
          {
            title: '深入原理',
            key: 'deep',
            href: '#deep',
            children: [
              {
                title: '核心架构',
                key: 'core',
                href: '#core',
                children: [
                  {
                    title: 'Compiler',
                    key: 'compiler',
                    href: '#compiler'
                  },
                  {
                    title: 'Compilation',
                    key: 'compilation',
                    href: '#compilation'
                  }
                ]
              },
              {
                title: '模块解析(Resolver)',
                key: 'module',
                href: '#module',
                children: []
              },
              {
                title: 'Loader机制',
                key: 'loader1',
                href: '#loader1',
                children: []
              },
              {
                title: '插件系统(Tapable)',
                key: 'tapable',
                href: '#tapable',
                children: []
              }
            ]
          },
          {
            title: 'Webpack5新特性',
            key: 'new',
            href: '#new',
            children: [
              {
                title: '持久化缓存(Persistent Cache)',
                key: 'cache',
                href: '#cache',
                children: []
              },
              {
                title: '模块联邦(Module Federation)',
                key: 'moduleFederation',
                href: '#moduleFederation',
                children: []
              },
              {
                title: 'Tree Shaking优化',
                key: 'treeShaking',
                href: '#treeShaking',
                children: []
              }
            ]
          },
          {
            title: '构建流程总结',
            key: 'summary',
            href: '#summary',
            children: []
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
