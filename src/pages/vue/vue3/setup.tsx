import { classMap } from '@/constants/constant';
import { TRANSFORM, READ_FILE, DESCRIPTOR, PARSE } from './_setup';

import { UseMarkDown } from '@/hooks/useMarkdown';
import { ArticleAnchor } from '@/component/Anchor';

export default function Index() {
  const transform = <UseMarkDown markdown={TRANSFORM}></UseMarkDown>,
    readFile = <UseMarkDown markdown={READ_FILE}></UseMarkDown>,
    descriptor = <UseMarkDown markdown={DESCRIPTOR}></UseMarkDown>,
    parse = <UseMarkDown markdown={PARSE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="setup" className="font-semibold text-h2 mb-2">
          script setup
        </h2>
        <code>script setup</code>是一种语法糖，在构建阶段，Vue的编译器将<code>script setup</code>转换为普通的
        <code>script</code>代码
        <h2 id="theory" className={classMap.articleTitle}>
          实现原理
        </h2>
        <ul className={classMap.ul}>
          <strong>1.编译转换</strong>
          <ul className={classMap.ul}>
            <li>
              <strong>自动注册组件和指令：</strong>在<code>script setup</code>
              中，不需要显式地注册组件和指令，导入的组件和指令会被编译器在转换时自动注册
            </li>
            <li>
              <strong>
                自动创建<code>setup</code>函数：
              </strong>
              编译器会将<code>script setup</code>中的代码包装到一个<code>setup</code>
              函数中，这个函数是Vue3组合式API的入口。
            </li>
            <li>
              <strong>响应式数据和方法暴露：</strong>在<code>script setup</code>
              中定义的响应式数据和方法会自动暴露给模板使用，编译器会处理导出逻辑，相当于之前的setup函数return操作。
            </li>
          </ul>
          <br />
          <strong>2.响应式系统：</strong>
          <code>script setup</code>借助Vue3的响应式系统来实现数据的响应式更新。通过<code>ref</code>、
          <code>reactive</code>等函数创建的响应式数据会自动跟踪依赖，并在数据发生变化时更新相关的DOM。
          <br />
          <br />
          <strong>3.生命周期钩子和依赖注入</strong>
          <br />
          <code>script setup</code>中可以直接使用Vue3的生命周期钩子和依赖注入函数，例如<code>onMounted</code>、
          <code>provide</code>、<code>inject</code>等。编译器会将这些函数调用转换为相应的内部逻辑。
          <h2 id="code" className={classMap.articleTitle}>
            代码解析
          </h2>
          <h3 id="judge" className={classMap.articleSubTitle}>
            判断条件
          </h3>
          <code>@vue/compiler-sfc</code>读取并解析.vue文件，判断是否存在<code>script setup</code>
          <br />
          <br />
          <strong>解析单文件组件</strong>
          <br />
          {readFile}
          <br />
          <strong>判断过程</strong>
          <ul className={classMap.ul}>
            <li>词法分析：将代码字符串拆分成Token，例如关键字、标识符、运算符等</li>
            <li>
              语法分析：根据词法单元构建AST，这个过程根据js和vue的语法规则来确定代码结构
              {descriptor}
            </li>
            <li>
              语义分析：对AST进行遍历和分析，提取有用的信息，例如判断是否有<code>script setup</code>
              {parse}
            </li>
          </ul>
          <h3 id="transform" className={classMap.articleSubTitle}>
            转换过程
          </h3>
          在Vue3的源码中，单文件组件（SFC）的编译主要在<code>@vue/compiler-sfc</code>包中进行。当解析包含
          <code>script setup</code>的SFC时，编译器会对其特殊处理
          {transform}
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'script setup',
            key: 'setup',
            href: '#setup'
          },
          {
            title: '实现原理',
            key: 'theory',
            href: '#theory'
          },
          {
            title: '代码解析',
            key: 'code',
            href: '#code',
            children: [
              {
                title: '判断条件',
                key: 'judge',
                href: '#judge'
              },
              {
                title: '转换过程',
                key: 'transform',
                href: '#transform'
              }
            ]
          },
          {
            title: '总结',
            key: 'summary',
            href: '#summary'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
