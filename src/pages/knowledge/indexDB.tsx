import { classMap } from '@/constants/constant';
import { UseMarkDown } from '@/hooks/useMarkdown';
import { CREATE, ADD, QUERY, UPDATE, DELETE, RESULT } from './_indexDB';
import { ArticleAnchor } from '@/component/Anchor';
import { LazyImage } from '@/component/image';

import IMG from '@images/knowledge/indexedDB.jpg';
export default function Index() {
  const create = <UseMarkDown markdown={CREATE}></UseMarkDown>,
    add = <UseMarkDown markdown={ADD}></UseMarkDown>,
    query = <UseMarkDown markdown={QUERY}></UseMarkDown>,
    update = <UseMarkDown markdown={UPDATE}></UseMarkDown>,
    del = <UseMarkDown markdown={DELETE}></UseMarkDown>,
    result = <UseMarkDown markdown={RESULT}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          IndexedDB
        </h2>
        IndexedDB是一个浏览器端的数据库，它是一个NoSQL数据库，存储的是键值对。它是一个持久化的、事务型的数据库，可以存储大量的数据。
        有些场景下我们需要在浏览器端存储大量的数据，这时候就可以使用IndexedDB。
        <h3 id="basic" className={classMap.articleSubTitle}>
          基本概念
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>数据库(Database):</strong> 一个浏览器可以创建多个数据库，每个数据库有唯一名称
          </li>
          <li>
            <strong>对象存储空间(Object Store)：</strong>
            类似于关系型数据库的表，用于存储对象。每个对象存储空间有唯一的名称，并且可以定义一个主键用作唯一标识。
          </li>
          <li>
            <strong>索引(Index): </strong>可以为对象存储空间中的某个属性创建索引，通过索引能快速定位符合特定条件的数据。
          </li>
          <li>
            <strong>事务(Transaction): </strong>
            所有对数据库的读写操作都必须在事务中进行。事务具有原子性，即要么全部操作成功，要么全部失败，保证了数据的一致性和完整性。
          </li>
        </ul>
        <h3 id="spec" className={classMap.articleSubTitle}>
          特点
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>异步操作：</strong>IndexedDB的操作是异步的，不会阻塞主线程，避免了在进行大量数据读写时导致页面卡顿。
          </li>
          <li>
            <strong>支持事务：</strong>IndexedDB支持事务，可以保证数据的一致性。复杂场景下可以保证数据正确
          </li>
          <li>
            <strong>存储容量大：</strong>没有localStorage的5MB限制，具体容量限制因浏览器而异。
          </li>
          <li>
            <strong>支持多种数据类型：</strong>
            IndexedDB支持存储对象，可以存储任意类型的数据，包括字符串、数组、对象等，方便存储复杂的数据结构。
          </li>
        </ul>
        <h3 id="use" className={classMap.articleSubTitle}>
          使用场景
        </h3>
        <ul className={classMap.ul}>
          <li>
            <strong>离线应用：</strong>在线文档编辑器，笔记等应用，即使没有网络用户依然可以进行读写操作。
          </li>
          <li>
            <strong>数据缓存：</strong>可以缓存一些请求数据，减少网络请求，提高页面加载速度。
          </li>
        </ul>
        <h2 id="example" className={classMap.articleTitle}>
          代码示例
        </h2>
        <h3 id="create" className={classMap.articleSubTitle}>
          打开数据库
        </h3>
        在进行任何数据操作之前，首先需要先打开数据库，如果数据库不存在，则会创建数据库。
        {create}
        <h3 id="add" className={classMap.articleSubTitle}>
          新增数据
        </h3>
        打开数据库之后，可以通过事务在对象存储空间中添加数据。
        {add}
        <h3 id="query" className={classMap.articleSubTitle}>
          查询数据
        </h3>
        通过对象存储空间的主键查询数据。
        {query}
        <h3 id="put" className={classMap.articleSubTitle}>
          修改数据
        </h3>
        通过对象存储空间的主键修改数据。
        {update}
        <h3 id="delete" className={classMap.articleSubTitle}>
          删除数据
        </h3>
        通过对象存储空间的主键删除数据。
        {del}
        <h3 id="result" className={classMap.articleSubTitle}>
          完整代码
        </h3>
        {result}
        <h3 id="img" className={classMap.articleSubTitle}>
          运行结果
        </h3>
        <LazyImage src={IMG} />
      </main>
      <ArticleAnchor
        items={[
          {
            key: '1',
            title: '前言',
            href: '#pre',
            children: [
              {
                key: '2',
                title: '基本概念',
                href: '#basic'
              },
              {
                key: '3',
                title: '特点',
                href: '#spec'
              },
              {
                key: '4',
                title: '使用场景',
                href: '#use'
              }
            ]
          },
          {
            key: '5',
            title: '代码示例',
            href: '#example',
            children: [
              {
                key: '6',
                title: '创建数据库',
                href: '#create'
              },
              {
                key: '7',
                title: '新增数据',
                href: '#add'
              },
              {
                key: '8',
                title: '查询数据',
                href: '#query'
              },
              {
                key: '9',
                title: '修改数据',
                href: '#put'
              },
              {
                key: '10',
                title: '删除数据',
                href: '#delete'
              },
              {
                key: '11',
                title: '完整代码',
                href: '#result'
              },
              {
                key: '12',
                title: '运行结果',
                href: '#img'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
