import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { SAME_OBJECT, SAME_FUNCTION, INTERFACE, TYPE, TYPE2, ABSTRACT, INTERFACE1 } from './_typeAndInterface';
import { ArticleAnchor } from '@/component/Anchor';

export default function Ts() {
  const sameObject = <UseMarkDown markdown={SAME_OBJECT}></UseMarkDown>,
    sameFunction = <UseMarkDown markdown={SAME_FUNCTION}></UseMarkDown>,
    _interface = <UseMarkDown markdown={INTERFACE}></UseMarkDown>,
    _type = <UseMarkDown markdown={TYPE}></UseMarkDown>,
    _type2 = <UseMarkDown markdown={TYPE2}></UseMarkDown>,
    abstract = <UseMarkDown markdown={ABSTRACT}></UseMarkDown>,
    interface1 = <UseMarkDown markdown={INTERFACE1}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          type和interface
        </h2>
        <h3 id="same" className={classMap.articleSubTitle}>
          相同点
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>定义对象类型：</strong>
            {sameObject}
          </li>
          <li>
            <strong>定义函数类型：</strong>
            {sameFunction}
          </li>
        </ul>
        <h3 id="diff" className={classMap.articleSubTitle}>
          不同点
        </h3>
        <ul className={classMap.ul}>
          <strong>1.语法和拓展性</strong>
          <li>
            <strong>interface：</strong>可以通过<code>extends</code>关键字来继承已有的接口，同一个名称的
            <code>interface</code>可以多次定义，ts会合并它们。
            {_interface}
          </li>
          <li>
            <strong>type：</strong>它可以使用<code>typeof</code>获取类型，并且可以定义<code>interface</code>
            无法表达的类型，例如别名、元组、联合类型、交叉类型等。
            {_type}
          </li>
          <strong>2.能否用于表达式</strong>
          <li>
            <strong>type：</strong>可以用于表达式中，结合运算符创建新的类型
            {_type2}
            <code>interface</code>不能直接用于表达式中。
          </li>
          <strong>3.对基本类型的使用</strong>
          <li>
            <strong>type：</strong>可以为基本类型创建别名，例如<code>type MyNumber = number</code>，interface不可以。
          </li>
        </ul>
        <h2 id="interface" className={classMap.articleTitle}>
          接口和抽象类的区别
        </h2>
        <h3 id="define" className={classMap.articleSubTitle}>
          1.定义和实现方式
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>接口：</strong>
            接口是一种抽象类型，仅定义对象的属性和方法的签名（名称、参数和返回类型），不包含具体实现代码，类通过实现(
            <code>implements</code>)接口来遵循接口定义规范。
            {interface1}
          </li>
          <li>
            <strong>抽象类：</strong>
            抽象类是一种不能被实例化的类，它可以包含抽象方法（只有方法签名无具体实现）和具体方法，子类通过继承(
            <code>extends</code>
            )抽象类来实现抽象方法并可以复用具体方法。主要用于基础结构和通用行为的设计，以及代码复用和拓展。
            {abstract}
          </li>
        </ul>
        <h3 id="limit" className={classMap.articleSubTitle}>
          继承限制
        </h3>
        一个类可以实现多个接口，实现多继承的效果。但一个类只能继承一个抽象类，不支持类的多重继承。
        <h3 id="person" className={classMap.articleSubTitle}>
          成员类型
        </h3>
        接口不能包含构造函数，访问修饰符（private、protected）和具体的实现代码，抽象类都可以。
      </main>
      <ArticleAnchor
        items={[
          {
            key: '1',
            title: 'type和interface',
            href: '#type',
            children: [
              {
                key: '2',
                title: '相同点',
                href: '#same'
              },
              {
                key: '3',
                title: '不同点',
                href: '#diff'
              }
            ]
          },
          {
            key: '4',
            title: '接口和抽象类的区别',
            href: '#interface',
            children: [
              {
                key: '5',
                title: '定义和实现方式',
                href: '#define'
              },
              {
                key: '6',
                title: '继承限制',
                href: '#limit'
              },
              {
                key: '7',
                title: '成员类型',
                href: '#person'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
