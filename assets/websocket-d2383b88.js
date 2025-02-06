import{j as e,d as s,e as c}from"./index-a233d2e0.js";import{U as t}from"./useMarkdown-30fc6593.js";import{A as l}from"./Anchor-31b59515.js";import"./index-de0c2df5.js";const i=`\`\`\`ts
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
  
\`\`\``,d=`\`\`\`ts
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

\`\`\``,b=`\`\`\`ts
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
\`\`\``,m="/luoyunlai/assets/ws1-8151ca41.png";function k(){const r=e.jsx(t,{markdown:i}),a=e.jsx(t,{markdown:d}),o=e.jsx(t,{markdown:p}),n=e.jsx(t,{markdown:b});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"WebSocket"}),e.jsx("code",{children:"WebSocket"}),"的目标是通过一个长连接实现全双工、双向通信。在JavaScript中创建WebSocket时，一个HTTP请求会发送到服务器以初始化连接。 服务器响应后，连接使用HTTP的Upgrade头部切换到WebSocket协议，这意味着WebSocket不能通过标准HTTP服务器实现，需要使用专有服务器。",e.jsx("br",{}),e.jsx("h3",{id:"protocol",className:s.articleSubTitle,children:"自定义协议"}),"因为使用了自定义协议，所以不能再使用http://或https://，而要使用ws和wss。使用自定义协议的好处是，客户端和服务器之间可以发送非常少的数据，不会对HTTP造成负担。缺点就是定义协议的时间比jsAPI要长。",e.jsx("h2",{id:"server",className:s.articleTitle,children:"服务端实现"}),"首先需要实现一个ws服务，这里使用Nest.js框架来提供比较方便。 先上我已经测试成功的",e.jsx("a",{className:s.href,target:"_blank",rel:"noreferrer",href:"https://github.com/ChrisLuckComes/nest-websocket-demo",children:"demo"}),"，拉一下代码之后",e.jsx("code",{children:"pnpm install"}),"之后就能跑了.",e.jsx("h3",{id:"nest",className:s.articleSubTitle,children:"NestJS"}),"Nest是一个基于",e.jsx("strong",{children:"Node.js"}),"的服务端框架，支持TypeScript，底层构建在",e.jsx("strong",{children:"Express"}),"之上。在全新项目模板上，需要增加三个文件：",e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"Gateway 实现业务逻辑的地方"}),e.jsx("li",{children:"WebSocketAdapter WebSocket适配器"}),e.jsx("li",{children:"Module 定义模块"})]}),e.jsx("strong",{id:"gateway",children:"Gateway"}),e.jsx("br",{}),"Nest里的gateway只是一个用",e.jsx("code",{children:"@WebSocketGateway()"}),"装饰器注释的类。主要实现业务逻辑，与平台无关。",e.jsx("br",{}),"新增",e.jsx("strong",{children:"ws.gateway.ts"}),"文件，端口指定为3002 ",e.jsxs("span",{className:s.assist,children:["不能和http端口一样，否则启动会报错",e.jsx("code",{children:"Error: listen EADDRINUSE: address already in use :::3000"})]}),r,"提供了",e.jsx("code",{children:"hello"}),'方法，订阅的消息是"Hello"，把它放到',e.jsx("code",{children:"app.module.ts"}),"的",e.jsx("code",{children:"providers"}),"里。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"providers: [AppService, EventsGateway]"}),e.jsx("br",{}),e.jsx("br",{}),"代码还包含了发送消息的方法",e.jsx("code",{children:"hello2"}),"，参数接收",e.jsx("code",{children:"@ConnectedSocket() client: WebSocket"}),"，client就是与客户端连接的对象，可以用来给客户端发送消息。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{id:"adapter",children:"WebSocketAdapter"}),e.jsx("br",{}),"新建文件",e.jsx("strong",{children:"ws.adapter.ts"}),"，实现",e.jsx("code",{children:"WebSocketAdapter"}),"类。",a,"在",e.jsx("code",{children:"bindMessageHandler"}),"方法中，会将传来的JSON消息解析，然后发送到对应的处理器中，也就是gateway处理。根据",e.jsx("code",{children:"message.event"}),"判断。",e.jsx("br",{}),"最后在",e.jsx("strong",{children:"main.ts"}),"使用adapter",o,e.jsx("code",{children:"npm run start"}),"启动项目，开始测试",e.jsx("br",{}),e.jsx("br",{}),e.jsx(c,{src:m}),e.jsx("h2",{id:"client",className:s.articleTitle,children:"客户端实现"}),n]}),e.jsx(l,{items:[{title:"WebSocket",key:"pre",href:"#pre",children:[{title:"自定义协议",key:"protocol",href:"#protocol"}]},{title:"服务端实现",key:"server",href:"#server",children:[{title:"NestJS",key:"nest",href:"#nest",children:[{title:"Gateway",key:"gateway",href:"#gateway"},{title:"WebSocketAdapter",key:"adapter",href:"#adapter"}]}]},{title:"客户端实现",key:"client",href:"#client"}]})]})}export{k as default};
