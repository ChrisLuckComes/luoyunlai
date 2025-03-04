import { classMap } from '@/constants/constant';

import DEVELOPMENT from '@images/knowledge/development.png';
import { LazyImage } from '@/component/image';
import { ArticleAnchor } from '@/component/Anchor';

export default function Index() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          前端技术发展轨迹
        </h2>
        <LazyImage src={DEVELOPMENT} />
        <br />
        <h3 id="ajax" className={classMap.articleSubTitle}>
          ajax
        </h3>
        早期并没有前端工程师这个独立的职位，随着ajax技术出现，才开始有前后端分离模式的诞生和流行，主要就是前端通过ajax向后端发起请求，后端提供Restful接口的协作方式
        <h3 id="mvc" className={classMap.articleSubTitle}>
          MVC(Model View Controller)
        </h3>
        MVC是一种软件架构模式，将应用程序分为三个主要部分，模型（Model）、视图（View）和控制器（Controller），它改变了命令式的代码组织方式。用户通过视图触发操作，控制器接收操作并调用模型的方法进行处理，模型处理完数据后将结果返回给控制器，
        控制器再根据结果更新视图。
        <ul className={classMap.ul}>
          <li>
            <strong>模型（Model）:</strong>
            负责处理应用程序的数据和业务逻辑，与数据库或其他数据存储进行交互，通常用于存储和管理数据对象，以及执行数据操作和验证等任务。
          </li>
          <li>
            <strong>视图（View）:</strong>
            主要用于展示数据给用户，它是用户和应用程序交互的界面部分，通常由HTML、CSS、JavaScript等技术实现，负责将模型中的数据以特定的形式呈现给用户
          </li>
          <li>
            <strong>控制器（Controller）:</strong>
            作为中间桥梁，接受用户的输入和操作，根据请求调用相应的模型方法来处理数据，并根据处理结果选择合适的视图来展示给用户，起到了协调模型和试图的作用。
          </li>
        </ul>
        <h3 id="mvvm" className={classMap.articleSubTitle}>
          MVVM(Model View ViewModel)
        </h3>
        它由MVC架构演变而来，<code>Controller</code>变为<code>ViewModel</code>
        ，视图通过数据绑定与ViewModel建立关系，ViewModel监听视图的变化并更新模型，同时模型的变化也会通过ViewModel自动更新到视图上，实现了数据的双向绑定。
        <strong>和MVC的区别</strong>
        <br />
        <ul className={classMap.ul}>
          <strong>数据绑定方式：</strong>
          <br />
          <li>
            MVC需要在控制器中手动更新视图，数据流向相对单向。MVVM的数据变化自动同步，大幅减少了手动操作DOM更新视图的代码，提高了开发效率和可维护性。
          </li>
          <li>
            MVC中Controller职责较重，需要处理大量的业务逻辑、视图和模型之间的交互逻辑，导致代码复杂度过高。MVVM中ViewModel承担了更多与视图相关的数据转换工作，使得视图和模型之间的职责边界更加清晰，视图只关注展示，模型只关注数据和业务逻辑。
          </li>
        </ul>
        <h3 id="node" className={classMap.articleSubTitle}>
          Node.js
        </h3>
        随着Node.js的出现，各种前端工具如雨后春笋般出现：
        <ul className={classMap.ul}>
          <li>1. webpack等库，真正的实现了前端的工程化。</li>
          <li>2. bff层，前端可以自行编写后端服务或SSR</li>
        </ul>
        <h3 id="serverless" className={classMap.articleSubTitle}>
          Serverless
        </h3>
        实现bff层后，自然涉及到服务的管理，那么无形中增大了人力成本。Serverless是一个很好的解决方案，将服务器的运维等集中管理，研发可以专注于实现云函数。
        <h3 id="plan" className={classMap.articleSubTitle}>
          技术方案
        </h3>
        前端发展的过程中诞生了很多针对不同场景的技术方案：
        <ul className={classMap.ul}>
          <li>1. ui：组件化方案(antd)、配置化解决方案(低代码)</li>
          <li>2. 单体应用的工程方案：微前端</li>
          <li>3. 平台化方案：PWA、小程序</li>
          <li>4. 跨端方案：hybrid、ReactNative、Flutter</li>
        </ul>
        <h3 id="render" className={classMap.articleSubTitle}>
          渲染方案
        </h3>
        CSR =&gt; SSR =&gt; NSR =&gt;
        <strong>SSR</strong>
        <br />
        现在SSR有了hydration的方案，将html和数据同时通过请求返回。
        <strong>NSR</strong>
        <br />
        csr和ssr都知道，那么nsr又是啥？
        <br />
        nsr是hybrid的情况下的技术方案，借助native来渲染生成html数据，借助离线数据实现预渲染。
        <strong>ESR</strong>
        <br />
      </main>
      <ArticleAnchor
        items={[
          {
            title: '前端技术发展轨迹',
            key: 'pre',
            href: '#pre',
            children: [
              {
                title: 'ajax',
                key: 'ajax',
                href: '#ajax'
              },
              {
                title: 'MVC',
                key: 'mvc',
                href: '#mvc'
              },
              {
                title: 'MVVM',
                key: 'mvvm',
                href: '#mvvm'
              },
              {
                title: 'Node.js',
                key: 'node',
                href: '#node'
              },
              {
                title: 'Serverless',
                key: 'serverless',
                href: '#serverless'
              },
              {
                title: '技术方案',
                key: 'plan',
                href: '#plan'
              },
              {
                title: '渲染方案',
                key: 'render',
                href: '#render'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
