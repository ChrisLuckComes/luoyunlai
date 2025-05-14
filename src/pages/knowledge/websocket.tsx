import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { ADAPTER, CLIENT, GATEWAY, MAIN, sseExample, pollingExample } from './_websocket';
import { LazyImage } from "@/component/image";
import WS_TEST from "@images/js/ws1.png";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  const gateway = <UseMarkDown markdown={GATEWAY}></UseMarkDown>,
    adapter = <UseMarkDown markdown={ADAPTER}></UseMarkDown>,
    main = <UseMarkDown markdown={MAIN}></UseMarkDown>,
    client = <UseMarkDown markdown={CLIENT}></UseMarkDown>,
    sseContent = <UseMarkDown markdown={sseExample}></UseMarkDown>,
    pollingContent = <UseMarkDown markdown={pollingExample}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h1 id="websocket" className="font-semibold text-h2 mb-2">
          WebSocket、SSE和轮询
        </h1>
        <div>
          <h2 id="websocket" className={classMap.articleTitle}>
            WebSocket
          </h2>
          <p>
            <code>WebSocket</code>
            的目标是通过一个长连接实现全双工、双向通信。在JavaScript中创建WebSocket时，一个HTTP请求会发送到服务器以初始化连接。
            服务器响应后，连接使用HTTP的Upgrade头部切换到WebSocket协议，这意味着WebSocket不能通过标准HTTP服务器实现，需要使用专有服务器。
          </p>

          <h3 id="protocol" className={classMap.articleSubTitle}>
            自定义协议
          </h3>
          <p>
            因为使用了自定义协议，所以不能再使用http://或https://，而要使用ws和wss。使用自定义协议的好处是，客户端和服务器之间可以发送非常少的数据，不会对HTTP造成负担。缺点就是定义协议的时间比jsAPI要长。
          </p>

          <h3 id="server" className={classMap.articleSubTitle}>
            服务端实现
          </h3>
          <p>
            首先需要实现一个ws服务，这里使用Nest.js框架来提供比较方便。 先上我已经测试成功的
            <a
              className={classMap.href}
              target="_blank"
              rel="noreferrer"
              href="https://github.com/ChrisLuckComes/nest-websocket-demo"
            >
              demo
            </a>
            ，拉一下代码之后<code>pnpm install</code>之后就能跑了.
          </p>

          <h4 id="nest" className={classMap.articleSubTitle}>
            NestJS
          </h4>
          <p>
            Nest是一个基于<strong>Node.js</strong>
            的服务端框架，支持TypeScript，底层构建在<strong>Express</strong>
            之上。在全新项目模板上，需要增加三个文件：
          </p>
          <ul className={classMap.ul}>
            <li>Gateway 实现业务逻辑的地方</li>
            <li>WebSocketAdapter WebSocket适配器</li>
            <li>Module 定义模块</li>
          </ul>

          <strong id="gateway">Gateway</strong>
          <br />
          <p>
            Nest里的gateway只是一个用<code>@WebSocketGateway()</code>
            装饰器注释的类。主要实现业务逻辑，与平台无关。
          </p>
          <br />
          <p>
            新增<strong>ws.gateway.ts</strong>
            文件，端口指定为3002&nbsp;
            <span className={classMap.assist}>
              不能和http端口一样，否则启动会报错
              <code>Error: listen EADDRINUSE: address already in use :::3000</code>
            </span>
          </p>
          {gateway}
          <p>
            提供了<code>hello</code>方法，订阅的消息是&quot;Hello&quot;，把它放到
            <code>app.module.ts</code>的<code>providers</code>里。
          </p>
          <br />
          <code>providers: [AppService, EventsGateway]</code>
          <br />
          <br />
          <p>
            代码还包含了发送消息的方法<code>hello2</code>，参数接收
            <code>@ConnectedSocket() client: WebSocket</code>
            ，client就是与客户端连接的对象，可以用来给客户端发送消息。
          </p>

          <strong id="adapter">WebSocketAdapter</strong>
          <br />
          <p>
            新建文件<strong>ws.adapter.ts</strong>，实现
            <code>WebSocketAdapter</code>
            类。
          </p>
          {adapter}
          <p>
            在<code>bindMessageHandler</code>
            方法中，会将传来的JSON消息解析，然后发送到对应的处理器中，也就是gateway处理。根据
            <code>message.event</code>判断。
          </p>
          <br />
          <p>
            最后在<strong>main.ts</strong>使用adapter
          </p>
          {main}
          <p>
            <code>npm run start</code>启动项目，开始测试
          </p>
          <br />
          <LazyImage src={WS_TEST} />

          <h3 id="client" className={classMap.articleSubTitle}>
            客户端实现
          </h3>
          {client}

          <h2 id="sse" className={classMap.articleTitle}>
            Server-Sent Events (SSE)
          </h2>
          <p>
            SSE 是一种服务器推送技术，它允许服务器向客户端推送数据。与 WebSocket 不同，SSE
            是单向的，只能从服务器向客户端推送数据。
          </p>

          <h3 id="sseFeatures" className={classMap.articleSubTitle}>
            SSE 特点
          </h3>
          <ul className={classMap.ul}>
            <li>
              <strong>单向通信</strong>：
              <ol className="ml-8 mt-2">
                <li>只能从服务器向客户端推送数据</li>
                <li>基于 HTTP 协议，不需要特殊的服务器</li>
                <li>自动重连机制</li>
              </ol>
            </li>
            <li>
              <strong>简单易用</strong>：
              <ol className="ml-8 mt-2">
                <li>使用标准的 EventSource API</li>
                <li>不需要额外的协议或库</li>
                <li>天然支持断线重连</li>
              </ol>
            </li>
            <li>
              <strong>适用场景</strong>：
              <ol className="ml-8 mt-2">
                <li>实时数据更新（如股票价格）</li>
                <li>社交媒体动态</li>
                <li>新闻推送</li>
              </ol>
            </li>
          </ul>

          <h3 id="sseExample" className={classMap.articleSubTitle}>
            SSE 示例
          </h3>
          {sseContent}

          <h2 id="polling" className={classMap.articleTitle}>
            轮询（Polling）
          </h2>
          <p>轮询是最简单的实时通信方式，客户端定期向服务器发送请求以获取最新数据。</p>

          <h3 id="pollingTypes" className={classMap.articleSubTitle}>
            轮询类型
          </h3>
          <ul className={classMap.ul}>
            <li>
              <strong>传统轮询</strong>：
              <ol className="ml-8 mt-2">
                <li>客户端定期发送请求</li>
                <li>服务器立即响应</li>
                <li>即使没有新数据也会响应</li>
              </ol>
            </li>
            <li>
              <strong>长轮询</strong>：
              <ol className="ml-8 mt-2">
                <li>客户端发送请求</li>
                <li>服务器保持连接直到有新数据</li>
                <li>有数据时立即响应</li>
                <li>响应后客户端立即发送新请求</li>
              </ol>
            </li>
          </ul>

          <h3 id="pollingExample" className={classMap.articleSubTitle}>
            轮询示例
          </h3>
          {pollingContent}

          <h2 id="comparison" className={classMap.articleTitle}>
            技术对比
          </h2>
          <ul className={classMap.ul}>
            <li>
              <strong>WebSocket</strong>：
              <ol className="ml-8 mt-2">
                <li>全双工通信</li>
                <li>低延迟</li>
                <li>需要专门的服务器支持</li>
                <li>适合需要双向实时通信的场景</li>
              </ol>
            </li>
            <li>
              <strong>SSE</strong>：
              <ol className="ml-8 mt-2">
                <li>单向通信（服务器到客户端）</li>
                <li>基于 HTTP，实现简单</li>
                <li>自动重连</li>
                <li>适合服务器推送场景</li>
              </ol>
            </li>
            <li>
              <strong>轮询</strong>：
              <ol className="ml-8 mt-2">
                <li>实现最简单</li>
                <li>服务器压力大</li>
                <li>实时性较差</li>
                <li>适合更新频率不高的场景</li>
              </ol>
            </li>
          </ul>

          <h3 id="selection" className={classMap.articleSubTitle}>
            选择建议
          </h3>
          <ul className={classMap.ul}>
            <li>需要双向实时通信：选择 WebSocket</li>
            <li>只需要服务器推送：选择 SSE</li>
            <li>更新频率低，对实时性要求不高：选择轮询</li>
            <li>考虑浏览器兼容性：轮询兼容性最好，WebSocket 次之，SSE 最差</li>
          </ul>
        </div>
      </main>
      <ArticleAnchor
        items={[
          {
            title: 'WebSocket',
            key: 'websocket',
            href: '#websocket',
            children: [
              {
                title: '自定义协议',
                key: 'protocol',
                href: '#protocol'
              },
              {
                title: '服务端实现',
                key: 'server',
                href: '#server',
                children: [
                  {
                    title: 'NestJS',
                    key: 'nest',
                    href: '#nest',
                    children: [
                      {
                        title: 'Gateway',
                        key: 'gateway',
                        href: '#gateway'
                      },
                      {
                        title: 'WebSocketAdapter',
                        key: 'adapter',
                        href: '#adapter'
                      }
                    ]
                  }
                ]
              },
              {
                title: '客户端实现',
                key: 'client',
                href: '#client'
              }
            ]
          },
          {
            title: 'Server-Sent Events (SSE)',
            key: 'sse',
            href: '#sse',
            children: [
              {
                title: 'SSE特点',
                key: 'sseFeatures',
                href: '#sseFeatures'
              },
              {
                title: 'SSE示例',
                key: 'sseExample',
                href: '#sseExample'
              }
            ]
          },
          {
            title: '轮询（Polling）',
            key: 'polling',
            href: '#polling',
            children: [
              {
                title: '轮询类型',
                key: 'pollingTypes',
                href: '#pollingTypes'
              },
              {
                title: '轮询示例',
                key: 'pollingExample',
                href: '#pollingExample'
              }
            ]
          },
          {
            title: '技术对比',
            key: 'comparison',
            href: '#comparison',
            children: [
              {
                title: '选择建议',
                key: 'selection',
                href: '#selection'
              }
            ]
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
} 