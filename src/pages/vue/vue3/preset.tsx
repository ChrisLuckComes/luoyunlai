import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { DEFINE_PROPERTY, VUE2_2WAY_BIND, VUE_ARRAY_METHODS_TO_PATCH, VUE_SET } from '.';
import { ArticleAnchor } from '@/component/Anchor';

export default function Preset() {
  const defineProperty = <UseMarkDown markdown={DEFINE_PROPERTY}></UseMarkDown>,
    vue2Bind = <UseMarkDown markdown={VUE2_2WAY_BIND}></UseMarkDown>,
    vueArrayMethodsToPatch = <UseMarkDown markdown={VUE_ARRAY_METHODS_TO_PATCH}></UseMarkDown>,
    vueSet = <UseMarkDown markdown={VUE_SET}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="proxy" className="font-semibold text-h2 mb-2">
          Vue3为什么使用proxy
        </h2>
        <h3 id="defineProperty" className={classMap.articleSubTitle}>
          Object.defineProperty
        </h3>
        之前，vue使用的是<code>Object.defineProperty</code>
        拦截对象的get,set操作。
        <div className={classMap.assist}>
          Object.defineProperty()方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
        </div>
        <br />
        重点是<strong>对象上，属性</strong>
        ，可以理解是针对对象上的属性做处理的。 举个栗子
        <ul className={classMap.ul}>
          <li>obj 要定义属性的对象</li>
          <li>Prop 要定义或修改属性的名称</li>
          <li>Descriptor 要定义或修改的属性描述符</li>
        </ul>
        {defineProperty}
        vue2实现双向绑定的核心代码如下
        <div className={classMap.assist}>src\core\observer\index.ts</div>
        {vue2Bind}
        <h3 id="definePropertyProblem" className={classMap.articleSubTitle}>
          Object.defineProperty存在的问题
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>对象上新增属性不能触发更新</strong>
            <br />
            因为<code>observer</code>
            监听数据的时候，当时并没有这个属性，所以后续添加的属性不会触发更新，需要手动调用
            <code>vue.$set</code>来新增，本质上是手动调用
            <code>defineReactive</code>
            <div className={classMap.assist}>src\core\observer\index.ts</div>
            {vueSet}
          </li>
          <li>
            <strong>通过索引设置数组项时不能触发更新</strong>
            出于数组可能长度很长的考虑，不会对数组的每一个元素进行监听。同时defineProperty也没法新增索引，所以vue选择监听原生数组的方法，涉及到push,unshift,splice等会新增索引的方法，手动触发更新。
            <div className={classMap.assist}>src\core\observer\array.ts</div>
            {vueArrayMethodsToPatch}
          </li>
        </ul>
        <h3 id="proxySummary" className={classMap.articleSubTitle}>
          使用proxy的原因总结
        </h3>
        <ul className={classMap.ul}>
          <li>
            <code>proxy</code>能观察的类型更丰富
          </li>
          <li>
            <code>proxy</code>劫持的是整个对象，不需要特殊处理。
            <code>Object.defineProperty</code>
            监听的是属性，新增属性需要再次调用，并且当对象属性较多或者嵌套层级较深时，初始化和更新时性能上也有影响。
          </li>
          <li>
            使用<code>Object.defineProperty</code>，修改原对象触发；使用
            <code>proxy</code>必须修改代理对象触发
          </li>
        </ul>
        <h2 id="collection" className={classMap.articleTitle}>
          Set、Map、WeakSet、WeakMap
        </h2>
        <h3 id="set" className={classMap.articleSubTitle}>
          Set
        </h3>
        set存储任何类型的唯一值，可用于数组去重，求并集，交集，差集等场景
        <h3 id="weakSet" className={classMap.articleSubTitle}>
          WeakSet
        </h3>
        <div>
          它主要解决弱引用对象存储的场景，和set相比，它只能是对象的集合，不能是任意类型值。如果没有其他的对WeakSet中对象的引用，那么这些对象会被回收掉。WeakSet没有存储当前对象的列表，所以不可枚举，没有遍历方法。
        </div>
        <div className={classMap.assist}>
          弱引用是指不能确保引用的对象不回被垃圾回收期回收的引用。就是可能在任意时间被回收
        </div>
        <h3 id="map" className={classMap.articleSubTitle}>
          Map
        </h3>
        ES6之前，只有<code>Array,Object</code>
        两种集合，通常使用Object模拟Map，它有如下缺陷
        <ul className={classMap.ul}>
          <li>key必须是string,限制了key的数据类型</li>
          <li>object没有直接的方法获取size</li>
          <li>无序</li>
        </ul>
        <code>Map</code>会保留所有元素的顺序
        <h3 id="weakMap" className={classMap.articleSubTitle}>
          WeakMap
        </h3>
        跟<code>WeakSet</code>一样，没有遍历方法
        <br />
        <br />
        <h2 id="hooks" className={classMap.articleTitle}>
          hooks
        </h2>
        Hooks是一种复用逻辑和组织代码的方式，它更灵活高效，让react不再需要使用<code>class</code>，Vue不再需要options语法
        <h3 id="design" className={classMap.articleSubTitle}>
          设计理念
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>代数效应</strong>：<br />
            Hooks将状态变化和副作用处理进行分离，开发者只需专注于定义状态和状态变化后的副作用函数，无需关注框架内部如何管理状态变化、副作用的执行顺序等细节，大幅简化开发过程，提高代码可维护性。这种设计让开发者可以更专注于业务逻辑，而不是框架的实现细节。
          </li>
          <li>
            <strong>逻辑复用和组合</strong>：<br />
            Hooks使逻辑的复用变得更容易。在Vue2中，复用逻辑需要使用<code>mixin</code>
            等方式，存在命名冲突、难以追踪来源、逻辑分散等问题。而Hooks可以将逻辑封装在独立的函数中，还可以自由组合，这样开发起来更灵活。同时，Hooks的命名空间是独立的，避免了命名冲突的问题。
          </li>
          <li>
            <strong>函数式编程风格</strong>：<br />
            Hooks采用函数式编程范式，强调纯函数和不可变性，使代码更加清晰、可预测，更容易测试和维护。这种风格也促进了代码的可组合性和可重用性。
          </li>
          <li>
            <strong>与组件解耦</strong>：<br />
            Hooks将逻辑从组件中分离出来，使得逻辑可以独立于组件存在，这样代码结构更加清晰，耦合性低。这种解耦使得逻辑更容易被测试和复用，也使得组件的职责更加单一。
          </li>
          <li>
            <strong>更好的类型支持</strong>：<br />
            Hooks天然支持TypeScript，提供了更好的类型推导和类型检查，减少了运行时错误的可能性，提高了代码的可靠性。
          </li>
        </ul>
        <h2 id="vue2vs3" className={classMap.articleTitle}>
          Vue2和Vue3的核心差异
        </h2>
        <h3 id="coreDiff" className={classMap.articleSubTitle}>
          核心差异
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>响应式系统</strong>：<br />
            Vue2使用Object.defineProperty实现响应式，而Vue3使用Proxy。Proxy提供了更强大的拦截能力，可以监听整个对象的变化，包括新增和删除属性，不需要像Vue2那样使用$set方法。
          </li>
          <li>
            <strong>组合式API</strong>：<br />
            Vue3引入了组合式API（Composition API），相比Vue2的选项式API，它提供了更好的代码组织和逻辑复用能力。开发者可以将相关的逻辑组织在一起，而不是分散在不同的选项中。
          </li>
          <li>
            <strong>性能优化</strong>：<br />
            Vue3通过静态提升、树摇优化、编译器优化等方式大幅提升了性能。虚拟DOM的diff算法也进行了优化，减少了不必要的更新。
            <h4 id="diff" className={classMap.articleSubTitle}>
              虚拟DOM diff算法优化
            </h4>
            <div>
              <strong>Vue2的diff算法</strong>：
              <ul className={classMap.ul}>
                <li>
                  <strong>双端比较</strong>：<br />
                  从新旧节点的两端开始比较，通过四个指针（oldStartIdx、oldEndIdx、newStartIdx、newEndIdx）进行遍历。
                </li>
                <li>
                  <strong>四种比较情况</strong>：<br />
                  1. 新前与旧前比较<br />
                  2. 新后与旧后比较<br />
                  3. 新后与旧前比较<br />
                  4. 新前与旧后比较
                </li>
                <li>
                  <strong>存在的问题</strong>：<br />
                  1. 需要遍历所有节点，即使某些节点没有变化<br />
                  2. 对于列表渲染，需要为每个节点设置key值<br />
                  3. 在处理大量节点时性能开销较大
                </li>
              </ul>
            </div>
            <div>
              <strong>Vue3的diff算法优化</strong>：
              <ul className={classMap.ul}>
                <li>
                  <strong>静态提升</strong>：<br />
                  将静态节点提升到渲染函数之外，避免在每次渲染时重新创建。
                </li>
                <li>
                  <strong>事件缓存</strong>：<br />
                  将事件处理函数缓存起来，避免重复创建。
                </li>
                <li>
                  <strong>Patch Flag</strong>：<br />
                  在编译阶段标记节点的动态属性，在diff时只比较有标记的节点。
                </li>
                <li>
                  <strong>Block Tree</strong>：<br />
                  将模板分割成多个块，只更新需要更新的块，而不是整个树。
                </li>
                <li>
                  <strong>最长递增子序列</strong>：<br />
                  在处理列表渲染时，使用最长递增子序列算法来最小化DOM操作。
                </li>
              </ul>
            </div>
            <div className={classMap.assist}>
              通过这些优化，Vue3的diff算法在处理大量节点时性能提升了2-3倍，特别是在列表渲染和静态内容较多的场景下。
            </div>
          </li>
          <li>
            <strong>TypeScript支持</strong>：<br />
            Vue3从底层开始就使用TypeScript重写，提供了更好的类型推导和类型检查支持。
          </li>
        </ul>
        <h3 id="optimization" className={classMap.articleSubTitle}>
          优化点
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>更小的包体积</strong>：<br />
            Vue3通过更好的代码分割和Tree-shaking，使得最终打包的体积更小。同时，一些不常用的功能被移到了单独的包中，可以按需引入。
          </li>
          <li>
            <strong>更好的性能</strong>：<br />
            Vue3的渲染性能比Vue2提升了2倍以上，内存占用减少了50%以上。这主要得益于新的响应式系统和虚拟DOM的优化。
          </li>
          <li>
            <strong>更好的开发体验</strong>：<br />
            组合式API让代码组织更灵活，TypeScript支持更完善，调试工具更强大，这些都大大提升了开发体验。
          </li>
          <li>
            <strong>更好的可维护性</strong>：<br />
            组合式API让代码更容易理解和维护，逻辑复用更方便，测试也更容易。
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'Vue3为什么改用proxy',
            key: 'proxy',
            href: '#proxy',
            children: [
              {
                title: 'Object.defineProperty',
                key: 'defineProperty',
                href: '#defineProperty'
              },
              {
                title: 'Object.defineProperty存在的问题',
                key: 'definePropertyProblem',
                href: '#definePropertyProblem'
              },
              {
                title: '使用proxy的原因总结',
                key: 'proxySummary',
                href: '#proxySummary'
              }
            ]
          },
          {
            title: 'Set、Map、WeakSet、WeakMap',
            key: 'collection',
            href: '#collection',
            children: [
              {
                title: 'Set',
                key: 'set',
                href: '#set'
              },
              {
                title: 'WeakSet',
                key: 'weakSet',
                href: '#weakSet'
              },
              {
                title: 'Map',
                key: 'map',
                href: '#map'
              },
              {
                title: 'WeakMap',
                key: 'weakMap',
                href: '#weakMap'
              }
            ]
          },
          {
            title: 'Hooks',
            key: 'hooks',
            href: '#hooks',
            children: [
              {
                title: 'Hooks的设计理念',
                key: 'design',
                href: '#design'
              }
            ]
          },
          {
            title: 'Vue2和Vue3的核心差异',
            key: 'vue2vs3',
            href: '#vue2vs3',
            children: [
              {
                title: '核心差异',
                key: 'coreDiff',
                href: '#coreDiff',
                children: [
                  {
                    title: '虚拟DOM diff算法优化',
                    key: 'diff',
                    href: '#diff'
                  }
                ]
              },
              {
                title: '优化点',
                key: 'optimization',
                href: '#optimization'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
