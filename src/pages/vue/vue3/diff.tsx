import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { GET_SEQUENCE, PATCH, PATCH_CHILDREN, PATCH_KEYED_CHILDREN_SEQUENCE } from '.';
import { ArticleAnchor } from '@/component/Anchor';

export default function Index() {
  const patch = <UseMarkDown markdown={PATCH}></UseMarkDown>,
    patchChildren = <UseMarkDown markdown={PATCH_CHILDREN}></UseMarkDown>,
    patchKeyedChildren = <UseMarkDown markdown={PATCH_KEYED_CHILDREN_SEQUENCE}></UseMarkDown>,
    getSequence = <UseMarkDown markdown={GET_SEQUENCE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h1 id="diff" className="font-semibold text-h2 mb-2">
          Diff
        </h1>
        在更新时，出于性能考虑，需要最大程度的利用已存在的节点。
        <br />
        所以需要递归比较同层级的新旧节点，只更新需要更新的真实DOM节点，这个比较函数就是
        <code>diff</code>算法，它是vue的响应式系统中很关键的一环。
        <h2 id="vdom" className={classMap.articleTitle}>
          虚拟DOM(Virtual DOM)
        </h2>
        虚拟DOM是一种轻量级的JavaScript对象，它是真实DOM的抽象表示。在Vue中，组件的模板会被编译成渲染函数，渲染函数会返回一个虚拟DOM树。当数据发生变化时，会生成新的虚拟DOM树，Diff算法就是用来比较新旧的差异。
        <h2 id="steps" className={classMap.articleTitle}>
          核心步骤
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>同级比较</strong>： Diff算法只比较同一层级的节点，不会跨级比较，大大减少了复杂度。
          </li>
          <li>
            <strong>双指针遍历</strong>：
            在比较新旧虚拟DOM节点时，会使用双指针的方法，分别指向新旧系欸按列表的起始位置，然后逐步向后遍历。
          </li>
          <li>
            <strong>节点复用</strong>：<code>Diff</code>算法会尽量复用旧节点，判断节点是否可复用的关键是<code>key</code>
            属性，key相同才会认为是同一节点并复用。
          </li>
        </ul>
        <h2 id="detail" className={classMap.articleTitle}>
          实现细节
        </h2>
        <ul className={classMap.ul}>
          <li>
            <strong>简单场景：新旧节点数量相同</strong>
            <br />
            当新旧节点数量相同时，会直接按顺序比较每个节点。如果节点的<code>key</code>和<code>type</code>
            都相同，则认为节点可复用，只更新节点的属性和内容，否则替换。
          </li>
          <li>
            <strong>复杂场景：新旧节点数量不同</strong>
          </li>
          <br />
          当新旧节点数量不同时，会使用<code>最长递增子序列</code>算法来优化节点的移动和插入操作
          <ul className={classMap.ul}>
            <li>
              <strong>建立映射表</strong>：遍历旧节点列表，建立以节点的<code>key</code>及其索引的映射表
            </li>
            <li>
              <strong>处理新增和删除节点</strong>：遍历新节点列表，根据映射表判断节点是新增、删除还是复用
            </li>
            <li>
              <strong>计算最长递增子序列</strong>
              ：对于需要移动的节点，计算其在旧节点列表中的索引的最长递增子序列，以确定最少的移动操作
            </li>
          </ul>
        </ul>
        <h3 id="patch" className={classMap.articleSubTitle}>
          patch
        </h3>
        <code>patch</code>是核心函数，入参主要关注n1,n2
        <ul className={classMap.ul}>
          <li>n1 旧节点</li>
          <li>n2 新节点</li>
        </ul>
        <strong>比较的基本流程</strong>
        <ul>
          <li>1. 是否完全一样，如果完全一样退出</li>
          <li>2. 是否类型不同，如果不同直接卸载旧节点</li>
          <li>
            <div>3. 根据新节点类型分类处理</div>
            <br />
            对于Text,Comment,Static的处理较为简单，旧节点为空就新增，否则修改即可
            <br />
            主要关注其他类型的处理 它们最后都会进入到<code>patchChildren</code>
          </li>
        </ul>
        <div className={classMap.assist}>packages\runtime-core\src\renderer.ts</div>
        {patch}
        <h2 id="patchChildren" className={classMap.articleTitle}>
          patchChildren
        </h2>
        处理逻辑如下，首先获取n2的<code>patchFlag</code>
        <ul className={classMap.ul}>
          <li>
            <code>patchFlag &gt; 0</code>，说明需要做diff操作，接下来关注
            <code>patchKeyedChildren</code>和<code>patchUnkeyedChildren</code>
            方法
          </li>
          <li>
            接下来再判断<code>shapeFlags</code>,有三种情况,text,array or no children
            <br />
            只有新旧节点都是ShapeFlags.ARRAY_CHILDREN才会进入diff
            <code>patchKeyedChildren</code>
            ，类型不一致基本都是卸载旧节点使用新节点
          </li>
        </ul>
        {patchChildren}
        <br />
        <h2 id="patchKeyedChildren" className={classMap.articleTitle}>
          patchKeyedChildren
        </h2>
        接下来就是最核心的算法<code>patchKeyedChildren</code>
        ，期间相同的节点都是直接patch 分步骤来看，第一步是找出相同节点
        <h3 className={classMap.articleSubTitle}>DIFF详细步骤</h3>
        <ul>
          <li>
            1.从头开始遍历，可以找出如下从头部开始的子序列
            <br />
            (a b) c <br />
            (a b) d e
          </li>
          <li>
            2. i走到e1或e2的位置从尾开始遍历，可以找到如下从尾开始的递增子序列
            <br />a (b c) <br />d e (b c)
          </li>
        </ul>
        接着判断i和e1 e2的关系
        <ul>
          <li>
            1.<code>i &gt; e1</code> 说明旧节点已遍历完，直接挂载剩余新节点
            <br />
            (a b)
            <br />
            (a b) c
          </li>
          <li>
            2. <code>i &gt; e2</code> 说明新节点已遍历完，卸载剩余旧节点
            <br />
            (a b) c <br />
            (a b)
          </li>
          <li>
            3. 新旧节点都没遍历完
            <br />
            <br />
            遍历剩余新节点构建<code>key:index keyToNewIndexMap</code>
            ,新增数组 <code>newIndexToOldIndexMap</code>{' '}
            数组长度为e2-s2+1,即未遍历完的新数组，初始值设为0，用于标记处理过的次数。
            <br />
            <br />
            遍历剩余旧节点 如果<code>patched &gt;= toBePatched</code>
            ，说明新节点已经被patch完了，剩余旧节点卸载
            <br />
            然后判断旧节点是否有key，则从keyToNewIndexMap中取出key对应的index;
            <br />
            否则只能顺序寻找是否有同类型节点，找到记录下标
            <br />
            <br />
            如果newIndex没有找到，直接卸载该节点
            <br />
            找到了就判断<code>newIndex &gt;=maxNewIndexSoFar</code>
            ,记录maxNewIndexSoFar和标记moved
            <div className={classMap.assist}>newIndex比maxIndex要小，节点肯定要移动</div>
            然后patch
            <br />
            <br />
            如果moved为true，那就需要移动节点，并挂载新增节点，到了这一步就要根据newIndexToOldIndexMap获取最长递增子序列
            <div className={classMap.assist}>对于序列[1,3,2,3,5,1,66,777]的最长递增子序列是[1,2,3,5,66,777]</div>
            然后倒序遍历newIndexToOldIndexMap，每次遍历取c2[nextIndex+1]的节点作为锚点
            <br />
            如果newIndexToOldIndexMap[i]为0说明是新增节点，直接patch 只有在{' '}
            <code>j &lt; 0 || i !== increasingNewIndexSequence[j]</code>
            才会真正移动节点 举个栗子
            <br />
            a b [c d e] f g <br />
            a b [e d c h] f g <br />
            newIndexToOldIndexMap=[4,3,2,0],increasingNewIndexSequence=[2],j=0 过程如下
            <ul>
              <li>
                i=3,j=0: <code>newIndexToOldIndexMap[i]===0</code> h节点是新节点 patch(h) 真实节点变为a b [c d e] h f g
              </li>
              <li>
                i=2,j=0: <code>i === increasingNewIndexSequence[j]</code>
                c节点不移动，j--
              </li>
              <li>
                i=1,j=-1: <code>j &lt; 0</code> d节点需要移动，以c为锚点move d节点，真实节点变为a b [d c e] h f g
              </li>
              <li>
                i=0,j=-1: <code>j &lt; 0</code> e节点需要移动，以d为锚点move e节点，真实节点变为a b [e d c] h f g
              </li>
            </ul>
          </li>
        </ul>
        {patchKeyedChildren}
        <h3 id="getSequence" className={classMap.articleSubTitle}>
          getSequence
        </h3>
        获取最长递增子序列算法
        {getSequence}
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'Diff',
            key: 'diff',
            href: '#diff'
          },
          {
            title: '虚拟DOM',
            key: 'vdom',
            href: '#vdom'
          },
          {
            title: '核心步骤',
            key: 'steps',
            href: '#steps'
          },
          {
            title: '实现细节',
            key: 'detail',
            href: '#detail'
          },
          {
            title: 'patch',
            key: 'patch',
            href: '#patch'
          },
          {
            title: 'patchChildren',
            key: 'patchChildren',
            href: '#patchChildren'
          },
          {
            title: 'patchKeyedChildren',
            key: 'patchKeyedChildren',
            href: '#patchKeyedChildren'
          },
          {
            title: 'getSequence',
            key: 'getSequence',
            href: '#getSequence'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
