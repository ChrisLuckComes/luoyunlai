import{j as e,d as s,e as o}from"./index-12c11ae8.js";import{U as t}from"./useMarkdown-141d10e7.js";import{A as d}from"./Anchor-cb8b8329.js";const h=`\`\`\`ts
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket
  } from "@nestjs/websockets";
  
  import * as WebSocket from "ws";
  
  @WebSocketGateway(3002)
  export class EventsGateway {
    @SubscribeMessage("hello")
    hello(@MessageBody() data: any): any {
      console.log(data);
      return {
        event: "hello",
        data: \`data: \${data}\`,
        msg: "localhost"
      };
    }
  
    @SubscribeMessage("hello2")
    hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
      console.log(\`收到消息：\${data}\`);
  
      client.send(JSON.stringify({ event: "temp", data: "临时消息" }));
  
      return { event: "hello2", data: data };
    }
  }
  
\`\`\``,m=`\`\`\`ts
import { INestApplicationContext, WebSocketAdapter } from "@nestjs/common";
import { MessageMappingProperties } from "@nestjs/websockets";
import { Observable, fromEvent, EMPTY } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";
import * as WebSocket from "ws";

export class WsAdapter implements WebSocketAdapter {
  constructor(app: INestApplicationContext) {}
  create(port: number, options?: any) {
    console.log("ws create");
    return new WebSocket.Server({ port, ...options });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientConnect(server: any, callback: Function) {
    console.log(\`ws bindClientConnect: \${server}\`);
    server.on("connection", callback);
  }

  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ) {
    console.log("[waAdapter]有新的连接进来");
    fromEvent(client, "message")
      .pipe(
        mergeMap((data) =>
          this.bindMessageHandler(client, data, handlers, process)
        ),
        filter((result) => result)
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }

  bindMessageHandler(
    client: WebSocket,
    buffer,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>
  ): Observable<any> {
    let message = null;
    try {
      message = JSON.parse(buffer.data);
    } catch (error) {
      console.log("ws解析json出错", error);
      return EMPTY;
    }

    const messageHandler = handlers.find(
      (handler) => handler.message === message.event
    );
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }

  close(server) {
    console.log("ws server close");
    server.close();
  }
}
\`\`\``,p=`\`\`\`ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from "./adapters/ws.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

\`\`\``,x=`\`\`\`ts
let socket = new WebSocket("ws://localhost:3002");

socket.onopen = () => {
  console.log("opened");
  socket.send(JSON.stringify({ event: "hello", data: "test" }));
};

socket.onmessage = (event) => {
  console.log(event.data);
};

return () => {
  socket.close();
};
\`\`\``,j=`\`\`\`ts
  // 服务端（Node.js + Express）
  app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = () => {
      res.write(\`data: \${JSON.stringify({ time: new Date() })}

\`);
    };

    const interval = setInterval(sendEvent, 1000);
    req.on('close', () => clearInterval(interval));
  });

  // 客户端
  const eventSource = new EventSource('/events');
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
  };
\`\`\``,g=`\`\`\`ts
import { ref } from 'vue';

import { ElMessage } from 'element-plus';
// 轮询公共Hook
interface Params<T, K> {
  polling: (args: K) => Promise<T>;
  delay?: number;
  count?: number;
  timerName?: string; // 为避免同一api出现多次轮询，使用时尽量传入timerName
  finishStatus?: (arg0: T) => boolean;
  resolveStatus?: (args: T) => boolean;
  failedCallback?: (arg0: T) => void;
  args: K;
  overtimeMsg?: boolean;
}

interface hashTimer {
  [key: string]: number | null;
}
interface hashResolved {
  [key: string]: boolean;
}

// 使用动态名称
const timerHash = {} as hashTimer;

// 是否已经resolve
const resolvedHash = {} as hashResolved;

/**
 * @description 停止轮询
 */
export const commonStopPolling = (timerName = '') => {
  const timer = timerHash[timerName];
  if (timer) {
    clearTimeout(timer);
  } else {
    for (const key in timerHash) {
      clearTimeout(timerHash[key] as number);
    }
  }
};

// 单条清除轮询
const stopPolling = (timerName = '') => {
  const timer = timerHash[timerName];
  if (timer) {
    clearTimeout(timer);
  }
};

/**
 * @description 轮询公共Hook
 * @param params
 */
export const commonSetPolling = <T, K>(params: Params<T, K>) => {
  const {
    polling,
    delay = 1000,
    count = 60, // 默认执行次数，超过600次调用 则停止轮询
    timerName = 'timer', // 轮询名称
    finishStatus, // 自定义结束标识回调
    resolveStatus, // 自定义promise resolve标识
    failedCallback,
    args,
    overtimeMsg = true,
  } = params;

  return new Promise<T>((resolve, reject) => {
    const retryCount = ref(0);

    /**
     * @description 开始轮询
     */
    const startPolling = () => {
      if (timerHash[timerName] !== null) {
        reset();
      }
      fetchData();
    };

    /**
     * @description 取消轮询
     */
    const cancel = (reason = '轮询失败') => {
      reset();
      reject(reason);
    };

    /**
     * @description 判断重试次数，继续轮询
     */
    const process = () => {
      retryCount.value = +retryCount.value + 1;
      if (retryCount.value >= count) {
        if (overtimeMsg) {
          ElMessage.error('接口异常，请重试');
        }
        cancel(\`timerName:\${timerName}轮询次数超过\${count}次，停止轮询\`);
        return;
      }
      timerHash[timerName] = setTimeout(() => fetchData(), delay);
    };

    /**
     * @description 重置并停止
     */
    const reset = () => {
      retryCount.value = 0;
      resolvedHash[timerName] = false;
      stopPolling(timerName);
    };

    /**
     * @description 检查是否满足resolve
     * @param data
     */
    const checkResolved = (data: T) => {
      if (resolveStatus && !resolvedHash[timerName] && resolveStatus(data)) {
        resolvedHash[timerName] = true;
        resolve(data);
        const result = checkFinished(data);
        return result;
      }
      return false;
    };

    /**
     * @description 检查是否满足结束
     * @param data
     */
    const checkFinished = (data: T) => {
      if (finishStatus && finishStatus(data)) {
        reset();
        resolve(data);
        return true;
      }
      return false;
    };

    /**
     * @description 轮询主函数
     */
    const fetchData = async () => {
      try {
        const data = await polling(args);
        const resolveFinished = checkResolved(data);
        const finished = checkFinished(data);

        if (!resolveFinished && !finished) {
          process();
        }
      } catch (error) {
        if (failedCallback && typeof failedCallback === 'function') {
          failedCallback(error as T);
        }
        cancel();
      }
    };
    startPolling();
  });
};
\`\`\``,u="/luoyunlai/assets/ws1-8151ca41.png";function f(){const r=e.jsx(t,{markdown:h}),l=e.jsx(t,{markdown:m}),a=e.jsx(t,{markdown:p}),n=e.jsx(t,{markdown:x}),i=e.jsx(t,{markdown:j}),c=e.jsx(t,{markdown:g});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h1",{id:"websocket",className:"font-semibold text-h2 mb-2",children:"WebSocket、SSE和轮询"}),e.jsxs("div",{children:[e.jsx("h2",{id:"websocket",className:s.articleTitle,children:"WebSocket"}),e.jsxs("p",{children:[e.jsx("code",{children:"WebSocket"}),"的目标是通过一个长连接实现全双工、双向通信。在JavaScript中创建WebSocket时，一个HTTP请求会发送到服务器以初始化连接。 服务器响应后，连接使用HTTP的Upgrade头部切换到WebSocket协议，这意味着WebSocket不能通过标准HTTP服务器实现，需要使用专有服务器。"]}),e.jsx("h3",{id:"protocol",className:s.articleSubTitle,children:"自定义协议"}),e.jsx("p",{children:"因为使用了自定义协议，所以不能再使用http://或https://，而要使用ws和wss。使用自定义协议的好处是，客户端和服务器之间可以发送非常少的数据，不会对HTTP造成负担。缺点就是定义协议的时间比jsAPI要长。"}),e.jsx("h3",{id:"server",className:s.articleSubTitle,children:"服务端实现"}),e.jsxs("p",{children:["首先需要实现一个ws服务，这里使用Nest.js框架来提供比较方便。 先上我已经测试成功的",e.jsx("a",{className:s.href,target:"_blank",rel:"noreferrer",href:"https://github.com/ChrisLuckComes/nest-websocket-demo",children:"demo"}),"，拉一下代码之后",e.jsx("code",{children:"pnpm install"}),"之后就能跑了."]}),e.jsx("h4",{id:"nest",className:s.articleSubTitle,children:"NestJS"}),e.jsxs("p",{children:["Nest是一个基于",e.jsx("strong",{children:"Node.js"}),"的服务端框架，支持TypeScript，底层构建在",e.jsx("strong",{children:"Express"}),"之上。在全新项目模板上，需要增加三个文件："]}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"Gateway 实现业务逻辑的地方"}),e.jsx("li",{children:"WebSocketAdapter WebSocket适配器"}),e.jsx("li",{children:"Module 定义模块"})]}),e.jsx("strong",{id:"gateway",children:"Gateway"}),e.jsx("br",{}),e.jsxs("p",{children:["Nest里的gateway只是一个用",e.jsx("code",{children:"@WebSocketGateway()"}),"装饰器注释的类。主要实现业务逻辑，与平台无关。"]}),e.jsx("br",{}),e.jsxs("p",{children:["新增",e.jsx("strong",{children:"ws.gateway.ts"}),"文件，端口指定为3002 ",e.jsxs("span",{className:s.assist,children:["不能和http端口一样，否则启动会报错",e.jsx("code",{children:"Error: listen EADDRINUSE: address already in use :::3000"})]})]}),r,e.jsxs("p",{children:["提供了",e.jsx("code",{children:"hello"}),'方法，订阅的消息是"Hello"，把它放到',e.jsx("code",{children:"app.module.ts"}),"的",e.jsx("code",{children:"providers"}),"里。"]}),e.jsx("br",{}),e.jsx("code",{children:"providers: [AppService, EventsGateway]"}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("p",{children:["代码还包含了发送消息的方法",e.jsx("code",{children:"hello2"}),"，参数接收",e.jsx("code",{children:"@ConnectedSocket() client: WebSocket"}),"，client就是与客户端连接的对象，可以用来给客户端发送消息。"]}),e.jsx("strong",{id:"adapter",children:"WebSocketAdapter"}),e.jsx("br",{}),e.jsxs("p",{children:["新建文件",e.jsx("strong",{children:"ws.adapter.ts"}),"，实现",e.jsx("code",{children:"WebSocketAdapter"}),"类。"]}),l,e.jsxs("p",{children:["在",e.jsx("code",{children:"bindMessageHandler"}),"方法中，会将传来的JSON消息解析，然后发送到对应的处理器中，也就是gateway处理。根据",e.jsx("code",{children:"message.event"}),"判断。"]}),e.jsx("br",{}),e.jsxs("p",{children:["最后在",e.jsx("strong",{children:"main.ts"}),"使用adapter"]}),a,e.jsxs("p",{children:[e.jsx("code",{children:"npm run start"}),"启动项目，开始测试"]}),e.jsx("br",{}),e.jsx(o,{src:u}),e.jsx("h3",{id:"client",className:s.articleSubTitle,children:"客户端实现"}),n,e.jsx("h2",{id:"sse",className:s.articleTitle,children:"Server-Sent Events (SSE)"}),e.jsx("p",{children:"SSE 是一种服务器推送技术，它允许服务器向客户端推送数据。与 WebSocket 不同，SSE 是单向的，只能从服务器向客户端推送数据。"}),e.jsx("h3",{id:"sseFeatures",className:s.articleSubTitle,children:"SSE 特点"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"单向通信"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"只能从服务器向客户端推送数据"}),e.jsx("li",{children:"基于 HTTP 协议，不需要特殊的服务器"}),e.jsx("li",{children:"自动重连机制"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"简单易用"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"使用标准的 EventSource API"}),e.jsx("li",{children:"不需要额外的协议或库"}),e.jsx("li",{children:"天然支持断线重连"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"适用场景"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"实时数据更新（如股票价格）"}),e.jsx("li",{children:"社交媒体动态"}),e.jsx("li",{children:"新闻推送"})]})]})]}),e.jsx("h3",{id:"sseExample",className:s.articleSubTitle,children:"SSE 示例"}),i,e.jsx("h2",{id:"polling",className:s.articleTitle,children:"轮询（Polling）"}),e.jsx("p",{children:"轮询是最简单的实时通信方式，客户端定期向服务器发送请求以获取最新数据。"}),e.jsx("h3",{id:"pollingTypes",className:s.articleSubTitle,children:"轮询类型"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"传统轮询"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"客户端定期发送请求"}),e.jsx("li",{children:"服务器立即响应"}),e.jsx("li",{children:"即使没有新数据也会响应"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"长轮询"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"客户端发送请求"}),e.jsx("li",{children:"服务器保持连接直到有新数据"}),e.jsx("li",{children:"有数据时立即响应"}),e.jsx("li",{children:"响应后客户端立即发送新请求"})]})]})]}),e.jsx("h3",{id:"pollingExample",className:s.articleSubTitle,children:"轮询示例"}),c,e.jsx("h2",{id:"comparison",className:s.articleTitle,children:"技术对比"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"WebSocket"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"全双工通信"}),e.jsx("li",{children:"低延迟"}),e.jsx("li",{children:"需要专门的服务器支持"}),e.jsx("li",{children:"适合需要双向实时通信的场景"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"SSE"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"单向通信（服务器到客户端）"}),e.jsx("li",{children:"基于 HTTP，实现简单"}),e.jsx("li",{children:"自动重连"}),e.jsx("li",{children:"适合服务器推送场景"})]})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"轮询"}),"：",e.jsxs("ol",{className:"ml-8 mt-2",children:[e.jsx("li",{children:"实现最简单"}),e.jsx("li",{children:"服务器压力大"}),e.jsx("li",{children:"实时性较差"}),e.jsx("li",{children:"适合更新频率不高的场景"})]})]})]}),e.jsx("h3",{id:"selection",className:s.articleSubTitle,children:"选择建议"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"需要双向实时通信：选择 WebSocket"}),e.jsx("li",{children:"只需要服务器推送：选择 SSE"}),e.jsx("li",{children:"更新频率低，对实时性要求不高：选择轮询"}),e.jsx("li",{children:"考虑浏览器兼容性：轮询兼容性最好，WebSocket 次之，SSE 最差"})]})]})]}),e.jsx(d,{items:[{title:"WebSocket",key:"websocket",href:"#websocket",children:[{title:"自定义协议",key:"protocol",href:"#protocol"},{title:"服务端实现",key:"server",href:"#server",children:[{title:"NestJS",key:"nest",href:"#nest",children:[{title:"Gateway",key:"gateway",href:"#gateway"},{title:"WebSocketAdapter",key:"adapter",href:"#adapter"}]}]},{title:"客户端实现",key:"client",href:"#client"}]},{title:"Server-Sent Events (SSE)",key:"sse",href:"#sse",children:[{title:"SSE特点",key:"sseFeatures",href:"#sseFeatures"},{title:"SSE示例",key:"sseExample",href:"#sseExample"}]},{title:"轮询（Polling）",key:"polling",href:"#polling",children:[{title:"轮询类型",key:"pollingTypes",href:"#pollingTypes"},{title:"轮询示例",key:"pollingExample",href:"#pollingExample"}]},{title:"技术对比",key:"comparison",href:"#comparison",children:[{title:"选择建议",key:"selection",href:"#selection"}]}]})]})}export{f as default};
