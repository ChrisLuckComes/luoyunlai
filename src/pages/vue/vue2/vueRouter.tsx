import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import {
  VUE_USE,
  VUE_ROUTER_INSTALL,
  VUE_ROUTER,
  CREATE_MATCHER,
  CREATE_MAP,
  ADD_ROUTE_RECORD,
  ROUTER_VIEW,
  ROUTER_LINK,
  TRANSITION_TO,
  CONFIRM_TRANSITION
} from "./router";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const use = <UseMarkDown markdown={VUE_USE}></UseMarkDown>,
    install = <UseMarkDown markdown={VUE_ROUTER_INSTALL}></UseMarkDown>,
    router = <UseMarkDown markdown={VUE_ROUTER}></UseMarkDown>,
    createMatcher = <UseMarkDown markdown={CREATE_MATCHER}></UseMarkDown>,
    createRouteMap = <UseMarkDown markdown={CREATE_MAP}></UseMarkDown>,
    addRouteRecord = <UseMarkDown markdown={ADD_ROUTE_RECORD}></UseMarkDown>,
    routerView = <UseMarkDown markdown={ROUTER_VIEW}></UseMarkDown>,
    routerLink = <UseMarkDown markdown={ROUTER_LINK}></UseMarkDown>,
    transitionTo = <UseMarkDown markdown={TRANSITION_TO}></UseMarkDown>,
    confirmTransition = (
      <UseMarkDown markdown={CONFIRM_TRANSITION}></UseMarkDown>
    );

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          Vue-Router
        </h2>
        Vue-Router是Vue2.x中使用的路由库，本文通过梳理源码简要说明下它的工作原理。 源码核心部分为以下内容
        <ul className={classMap.ul}>
          <li>
            <strong>install</strong>: vue插件的通用函数，
            <div className={classMap.assist}>src\install.js</div>
          </li>
          <li>
            <strong>router</strong>: 核心构造类，包含所有属性和函数 <div className={classMap.assist}>src\router.js</div>
          </li>
          <li>
            <strong>createRouteMap</strong>: 创建路由map，保存路由映射{' '}
            <div className={classMap.assist}>src\create-route-map.js</div>
          </li>
          <li>
            <strong>createMatcher</strong>: 匹配路由 <div className={classMap.assist}>src\create-matcher.js</div>
          </li>
          <li>
            <strong>Link，View</strong>：路由组件{' '}
            <div className={classMap.assist}>src\components\link.js，src\components\view.js</div>
          </li>
        </ul>
        <h2 id="install" className={classMap.articleTitle}>
          install
        </h2>
        vue2插件都需要实现install函数，install函数的意义是将组件挂载到根实例上。
        <br />
        还记得引入Vue-Router的代码吗？use函数会判断传入参数是否包含install属性，并执行它。
        <br />
        <br />
        <code>Vue.use(router)</code>
        {use}
        <br />
        接下来关注vue-router的install函数做了哪些事情，源码如下：
        {install}
        <br />
        主要是使用mixin在beforeCreate生命周期里调用<code>init</code>
        初始化函数，给<code>this._route</code>
        定义响应式，然后在this上定义
        <code>$route,$router</code>属性用于访问<code>_route和_router</code>
        ，最后全局注册
        <code>RouterView,RouterLink</code>
        组件
        <br />
        <span className="text-sky-600 font-bold">补充：</span>将 <code>_route</code>{' '}
        定义为响应式至关重要，这样当路由发生变化时，依赖 <code>$route</code> 的组件就会自动更新视图。
        <h2 id="router" className={classMap.articleTitle}>
          router
        </h2>
        再看router，摘取部分关键代码：
        {router}
        先看构造函数，构造函数内首先是调用<code>createMatcher</code>
        ，创建matcher，代码如下
        <br />
        构造函数还会根据传入的 <code>mode</code> (默认为 &lsquo;hash&lsquo;) 来确定使用哪种 <code>history</code> 对象
        (&lsquo;hash&lsquo; 对应 <code>HashHistory</code>, &lsquo;history&lsquo; 对应 <code>HTML5History</code>,
        &lsquo;abstract&lsquo; 对应 <code>AbstractHistory</code>)。<code>HashHistory</code> 使用 URL hash 值，
        <code>HTML5History</code> 使用 H5 History API (<code>pushState</code>, <code>replaceState</code>)，而{' '}
        <code>AbstractHistory</code> 则不依赖浏览器环境（例如 Node.js 或 NativeScript）。后续的路由跳转操作 (
        <code>push</code>, <code>replace</code>, <code>go</code> 等) 都会委托给这个 <code>history</code> 对象处理。
        <br />
        <h3 id="createMatcher" className={classMap.articleSubTitle}>
          createMatcher
        </h3>
        createMatcher首先调用了<code>createRouteMap</code>，并返回 match, addRoute, getRoutes, addRoutes四个函数。
        {createMatcher}
        <h3 id="createRouteMap" className={classMap.articleSubTitle}>
          createRouteMap
        </h3>
        createRouteMap主要是遍历routes来填充pathList,pathMap,nameMap，变量名就代表了它们的含义，具体处理函数是
        <code>addRouteRecord</code>
        {createRouteMap}
        <h3 id="addRouteRecord" className={classMap.articleSubTitle}>
          addRouteRecord
        </h3>
        函数构建record对象，合并route配置，包括components,path,name,props,各种钩子函数等。如果route存在children，那么需要遍历children递归调用自身
        <br />
        如果pathMap不存在record.path这个key，进行填充。
        <code>pathList.push(record.path);pathMap[record.path] = record</code>
        <br />
        如果nameMap不存在route.name这个key，进行填充。
        <code>nameMap[name]=record</code>
        {addRouteRecord}
        <br />
        <h2 id="component" className={classMap.articleTitle}>
          路由组件
        </h2>
        <h3 id="View" className={classMap.articleSubTitle}>
          View
        </h3>
        View就是<code>RouterView</code>
        组件。它本身是一个函数组件。在render函数中，首先设置
        <code>data.routerView = true</code>
        ，然后根据深度来匹配对应的路由，然后再加载该路由的component。
        {routerView}
        <h3 id="link" className={classMap.articleSubTitle}>
          Link
        </h3>
        Link不是函数组件，更像是一个超链接。在render函数中，首先执行
        <code>router.resolve</code>
        获取到要跳转的路由，然后加载该路由。
        {routerLink}
        <h2 id="mode" className={classMap.articleTitle}>
          路由操作
        </h2>
        VueRouter类中构造函数确定了路由的模式，根据模式来确定history对象。然后go,replace,back等函数实际上是调用history对象的路由操作。
        <h2 id="match" className={classMap.articleTitle}>
          路由匹配
        </h2>
        回到createMatcher返回的match函数，match如果匹配成功返回对应路由，否则返回空路由，代码就不重复贴了。
        <br />
        首先是获取location对象的name，nameMap[name]不为空就匹配成功
        <br />
        如果nameMap[name]为空，再看能否在pathList,pathMap中找到location.path
        <h2 id="hook" className={classMap.articleTitle}>
          路由守卫
        </h2>
        在init函数中，路由确定history后，会调用
        <code> history.transitionTo( history.getCurrentLocation(), setupListeners, setupListeners )</code>
        先过度到当前路由
        {transitionTo}
        transitionTo主要调用了<code>confirmTransition</code>
        <br />
        <span className="text-sky-600 font-bold">补充：</span>
        在执行导航守卫之前，<code>confirmTransition</code> 会先调用 <code>resolveQueue</code> 函数。该函数比较当前路由 (
        <code>this.current.matched</code>) 和目标路由 (<code>route.matched</code>) 的记录，找出需要更新 (updated)、失活
        (deactivated) 和激活 (activated) 的路由记录（组件）。这些信息将用于提取对应组件内的导航守卫。
        <br />
        confirmTransition函数设置了<code>queue</code>
        队列，并按这个顺序遍历执行，顺序如下：
        <ul>
          <li>
            1. 组件内的离开守卫：<code>extractLeaveGuards(deactivated)</code>
          </li>
          <li>
            2. 全局的before hooks：<code>this.router.beforeHooks</code>
          </li>
          <li>
            3. 组件内的update hooks：<code>extractUpdateHooks(updated)</code>
          </li>
          <li>
            4. 路由设置的enter守卫：
            <code>activated.map(m =&gt; m.beforeEnter)</code>
          </li>
          <li>
            5. 异步组件：<code>resolveAsyncComponents(activated)</code>
          </li>
        </ul>
        {confirmTransition}
        <br />
        <span className="text-sky-600 font-bold">补充：</span>
        当所有守卫成功执行并通过 <code>next()</code> 后，会执行 <code>runQueue</code>{' '}
        的最终回调。在这个回调里，会执行传入 <code>confirmTransition</code> 的 <code>onComplete</code> 回调。
        <code>onComplete</code> 主要做了以下几件事：
        <ul>
          <li>
            调用 <code>updateRoute(route)</code> 更新当前的路由状态 <code>this.current</code>。
          </li>
          <li>
            调用 <code>ensureURL()</code> 来确保浏览器地址栏与当前路由同步 (hash 模式下改变 hash，history 模式下调用
            pushState/replaceState)。
          </li>
          <li>
            执行全局的 <code>afterHooks</code>。
          </li>
          <li>
            如果是首次导航，设置 <code>this.ready = true</code> 并执行 <code>readyCbs</code> 队列中的回调。
          </li>
          <li>
            通过 <code>app.$nextTick</code> 调用 <code>handleRouteEntered(route)</code>。<code>handleRouteEntered</code>{' '}
            函数负责执行那些在组件内 <code>beforeRouteEnter</code> 守卫中通过 <code>{'next(vm => { ... })'}</code>{' '}
            传递的回调函数，因为此时组件实例已经创建完毕。
          </li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'Vue-Router',
            key: 'pre',
            href: '#pre'
          },
          {
            title: 'install',
            key: 'install',
            href: '#install'
          },
          {
            title: 'router',
            key: 'router',
            href: '#router',
            children: [
              {
                title: 'createMatcher',
                key: 'createMatcher',
                href: '#createMatcher'
              },
              {
                title: 'createRouteMap',
                key: 'createRouteMap',
                href: '#createRouteMap'
              },
              {
                title: 'addRouteRecord',
                key: 'addRouteRecord',
                href: '#addRouteRecord'
              }
            ]
          },
          {
            title: '路由组件',
            key: 'component',
            href: '#component',
            children: [
              {
                title: 'View',
                key: 'view',
                href: '#view'
              },
              {
                title: 'Link',
                key: 'link',
                href: '#link'
              }
            ]
          },
          {
            title: '路由操作',
            key: 'mode',
            href: '#mode'
          },
          {
            title: '路由匹配',
            key: 'match',
            href: '#match'
          },
          {
            title: '路由守卫',
            key: 'hook',
            href: '#hook'
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
}
