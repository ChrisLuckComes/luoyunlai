export const GATEWAY = `\`\`\`ts
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
  
\`\`\``;

export const ADAPTER = `\`\`\`ts
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
\`\`\``;

export const MAIN = `\`\`\`ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from "./adapters/ws.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(3000);
}
bootstrap();

\`\`\``;

export const CLIENT = `\`\`\`ts
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
\`\`\``;


export const sseExample = `\`\`\`ts
  // 服务端（Node.js + Express）
  app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = () => {
      res.write(\`data: \${JSON.stringify({ time: new Date() })}\n\n\`);
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
\`\`\``;

export const pollingExample = `\`\`\`ts
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
\`\`\``;
