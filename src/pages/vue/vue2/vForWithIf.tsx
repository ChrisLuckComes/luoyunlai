import { classMap } from '@/constants/constant';
import { Anchor } from 'antd';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { GEN_ELEMENT, GEN_FOR, V_FOR_IF } from './ForWithIf';
const { Link } = Anchor;

export default function Index() {
  const vFor = <UseMarkDown markdown={V_FOR_IF}></UseMarkDown>,
    genElement = <UseMarkDown markdown={GEN_ELEMENT}></UseMarkDown>,
    genFor = <UseMarkDown markdown={GEN_FOR}></UseMarkDown>;
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 className={classMap.articleTitle}>为什么 Vue 2 中 v-for 和 v-if 不建议一起使用</h2>
        例如模板如下代码：
        {vFor}
        它不会按设想中工作，而是照常执行 v-for，并且对每个 li 都执行了 v-if。
        <br />
        原因很简单，在 Vue 2 中，`v-for` 的优先级高于 `v-if`，代码一看便知，解析模板的源码如下：
        <div className={classMap.assist}>packages\\vue-template-compiler\\browser.js 中的 `genElement` 函数</div>
        {genElement}
        <br />
        可见源码的判断顺序就是 `el.for` 先于 `el.if`
        <br />
        <br />
        查看 `genFor` 函数的实现：
        {genFor}
        所以如果混用，就会在每个元素上都判断一次 `v-if`，带来不必要的性能开销。
        <br />
        <br />
        <span className="text-orange-500">
          注意：在 Vue 3 中，`v-if` 的优先级高于 `v-for`。因此，如果在同一个元素上同时使用，`v-if` 会先执行，如果 `v-if`
          的条件为假，`v-for` 根本不会执行。
        </span>
        <br />
        <br />
        因此，在 Vue 2 中，最佳实践是使用计算属性预先过滤掉不需要显示的数据，这样既能清晰地分离逻辑，又能避免不必要的性能损耗。
      </main>
    </article>
  );
}
