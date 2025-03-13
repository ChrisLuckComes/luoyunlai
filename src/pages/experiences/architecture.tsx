import { classMap } from '@/constants/constant';

import LEVEL_ARCHITECTURE from '@images/experience/levelArchitecture.png';
// import EXPRESS_LAYER from '@images/experience/expressLayer.png';
import DEPENDENCY from '@images/experience/dependency.png';
import MODULE_COMMUNICATION from '@images/experience/moduleCommunication.png';
import HORIZONTAL_COMMUNICATION from '@images/experience/moduleCommunicationHorizon.png';
import DATA_FLOW from '@images/experience/dataFlow.png';
import MICRO_FRONTEND from '@images/experience/micro.png';
import PLUGIN from '@images/experience/plugin.png';
import COMPLETE_EXAMPLE from '@images/experience/example.png';
import { LazyImage } from '@/component/image';
import { ArticleAnchor } from '@/component/Anchor';
import { UseMarkDown } from '@/hooks/useMarkdown';

export default function Architecture() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="architecture" className="font-semibold text-h2 mb-2">
          架构设计
        </h2>
        <p>以电商系统为例，介绍如何进行架构设计，从业务抽象到技术实现进行分层拆解。</p>
        <br />
        <h2 className="font-semibold text-h2 mb-2">核心思路</h2>
        <ul className={classMap.ul}>
          <li>
            <strong>分层解耦：</strong>将系统拆分为独立职责层
          </li>
          <li>
            <strong>模块化设计：</strong>按业务/功能划分可复用模块
          </li>
          <li>
            <strong>数据流管理：</strong>明确数据流动方向与处理逻辑
          </li>
          <li>
            <strong>技术选型：</strong>根据场景选择最合适的工具链
          </li>
          <li>
            <strong>拓展性设计：</strong>预留未来功能拓展接口
          </li>
        </ul>
        <h2 id="levelArchitecture" className={classMap.articleTitle}>
          分层架构
        </h2>
        标准四层架构（表现层、业务层、数据层、基础设施层）是通用参考模型，但非强制要求
        <h3 id="responsibilitySeparation" className={classMap.articleSubTitle}>
          职责分离原则
        </h3>
        每层仅处理单一维度的职责，表现层专注UI渲染、业务层处理业务逻辑、数据层负责数据交互、通过垂直切分避免循环依赖。
        <br />
        <h3 id="dependency" className={classMap.articleSubTitle}>
          依赖关系
        </h3>
        上层只能依赖下层，下层不能反向依赖上层
        <LazyImage src={DEPENDENCY} />
        <br />
        <h3 id="separationOfConcerns" className={classMap.articleSubTitle}>
          关注点分离
        </h3>
        每层仅处理单一维度的职责，表现层专注UI渲染、业务层处理业务逻辑、数据层负责数据交互、通过垂直切分避免循环依赖。
        <br />
        <h3 id="levelAdjustment" className={classMap.articleSubTitle}>
          分层架构动态调整
        </h3>
        根据项目类型，按如下表格调整分层架构。
        <table className="border">
          <thead>
            <tr>
              <th className="bg-gray border font-bold">项目类型</th>
              <th className="border font-bold">分层调整方式</th>
              <th className="border font-bold">示例架构</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-10 border">管理后台</td>
              <td className="px-10 border">合并表现层与业务层</td>
              <td className="px-10 border">视图层 -&gt; 服务层 -&gt; 数据层</td>
            </tr>
            <tr>
              <td className="px-10 border">复杂中后台系统</td>
              <td className="px-10 border">增加领域层 (DDD)</td>
              <td className="px-10 border">表现层 -&gt; 领域层 -&gt; 基础设施层</td>
            </tr>
            <tr>
              <td className="px-10 border">微前端架构</td>
              <td className="px-10 border">引入容器层与微应用层</td>
              <td className="px-10 border">容器层 -&gt; 微应用层 -&gt; 共享服务层</td>
            </tr>
          </tbody>
        </table>
        <h2 id="moduleCommunication" className={classMap.articleTitle}>
          模块间通信机制
        </h2>
        <h3 id="vertical" className={classMap.articleSubTitle}>
          纵向通信
        </h3>
        通过约定的接口进行层间调用
        <LazyImage src={MODULE_COMMUNICATION} />
        <h3 id="horizontal" className={classMap.articleSubTitle}>
          横向通信
        </h3>
        通过事件总线或者状态管理实现
        <LazyImage src={HORIZONTAL_COMMUNICATION} />
        <h2 id="dataFlow" className={classMap.articleTitle}>
          数据流示例
        </h2>
        <LazyImage src={DATA_FLOW} />
        <h2 id="technologyStackSelection" className={classMap.articleTitle}>
          技术栈选择策略
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>框架选型: </strong>Vue3/React(组件化支持)
          </li>
          <li>
            <strong>状态管理: </strong>Vuex/Pinia/Redux(复杂状态管理)
          </li>
          <li>
            <strong>构建工具: </strong>Vite/Webpack/Rspack(构建工具支持)
          </li>
          <li>
            <strong>样式方案: </strong>Sass/PostCSS/Tailwind(原子化设计)
          </li>
          <li>
            <strong>跨端方案: </strong>H5/Taro/Flutter/React Native(多端适配)
          </li>
        </ul>
        <h2 id="extensibilityDesignPoints" className={classMap.articleTitle}>
          拓展性设计要点
        </h2>
        <h3 id="micro" className={classMap.articleSubTitle}>
          微前端架构
        </h3>
        <LazyImage src={MICRO_FRONTEND} />
        <h3 id="plugin" className={classMap.articleSubTitle}>
          插件化机制
        </h3>
        <LazyImage src={PLUGIN} />
        <h2 id="completeExample" className={classMap.articleTitle}>
          完整示例(电商平台架构)
        </h2>
        <LazyImage src={LEVEL_ARCHITECTURE} />
        <h2 id="verificationChecklist" className={classMap.articleTitle}>
          验证清单
        </h2>
        <p>1.模块间是否高内聚低耦合?</p>
        <p>2.数据流是否单向且可追溯?</p>
        <p>3.关键路径响应时间是否达标?</p>
        <p>4.是否具备容灾和降级方案?</p>
        <p>5.技术栈是否符合团队能力?</p>
        <p>6.是否预留监控埋点?</p>
      </main>
      <ArticleAnchor
        items={[
          {
            title: '核心思路',
            key: 'architecture',
            href: '#architecture',
            children: []
          },
          {
            title: '分层架构',
            key: 'levelArchitecture',
            href: '#levelArchitecture',
            children: [
              {
                title: '职责分离原则',
                key: 'responsibilitySeparation',
                href: '#responsibilitySeparation',
                children: []
              },
              {
                title: '依赖关系',
                key: 'dependency',
                href: '#dependency',
                children: []
              },
              {
                title: '关注点分离',
                key: 'separationOfConcerns',
                href: '#separationOfConcerns',
                children: []
              },
              {
                title: '分层架构动态调整',
                key: 'levelAdjustment',
                href: '#levelAdjustment',
                children: []
              }
            ]
          },
          {
            title: '模块间通信机制',
            key: 'moduleCommunication',
            href: '#moduleCommunication',
            children: [
              {
                title: '纵向通信',
                key: 'vertical',
                href: '#vertical',
                children: []
              },
              {
                title: '横向通信',
                key: 'horizontal',
                href: '#horizontal',
                children: []
              }
            ]
          },
          {
            title: '数据流示例',
            key: 'dataFlow',
            href: '#dataFlow',
            children: []
          },
          {
            title: '技术栈选择策略',
            key: 'technologyStackSelection',
            href: '#technologyStackSelection',
            children: []
          },
          {
            title: '拓展性设计要点',
            key: 'extensibilityDesignPoints',
            href: '#extensibilityDesignPoints',
            children: [
              {
                title: '微前端架构',
                key: 'micro',
                href: '#micro',
                children: []
              },
              {
                title: '插件化机制',
                key: 'plugin',
                href: '#plugin',
                children: []
              }
            ]
          },
          {
            title: '完整示例',
            key: 'completeExample',
            href: '#completeExample',
            children: []
          },
          {
            title: '验证清单',
            key: 'verificationChecklist',
            href: '#verificationChecklist',
            children: []
          }
        ]}
      />
    </article>
  );
}
