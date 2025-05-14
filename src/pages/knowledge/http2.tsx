import { classMap } from "@/constants/constant";

import HTTP_LISTEN from "@/images/http-listen.png";
import HTTP_CHANGE from "@/images/http-change.png";
import HTTP_FISH from "@/images/http-fish.png";
import HTTPS from "@/images/https.png";
import HTTPS_INSTRUCTION from "@/images/https-instruction.png";
import HTTP2_FRAME from "@/images/http2-frame.png";
import HTTP2_STREAM from "@/images/http2-stream.jpg";
import { NGINX } from "./_http2";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { LazyImage } from "@/component/image";
import { ArticleAnchor } from "@/component/Anchor";

export default function Index() {
  return (
    <article id="rootArticle" className={classMap.article}>
      <main className={classMap.content}>
        <h1 id="http" className="font-semibold text-h2 mb-2">
          http=&gt;https=&gt;http2=&gt;http3
        </h1>
        <div>
          <h2 id="httpDisAdv" className={classMap.articleTitle}>
            http的不足
          </h2>
          <ul className={classMap.ul}>
            <li>
              1.&nbsp;<strong className="text-16">明文</strong>传输,安全性低
            </li>
            <li>
              2.&nbsp;队头<strong className="text-16">阻塞</strong>
              ，如果前面的请求未完成，后续的请求会被阻塞
            </li>
          </ul>
          <br />
          当然http还有其他的不足，例如首部信息冗余等。列举以上两点是为了引出下文的https,http2。
          <h2 id="https" className={classMap.articleTitle}>
            https
          </h2>
          明文传输安全性低主要体现在哪呢？主要是如下三点：
          <ul className={classMap.ul}>
            <li id="listen">
              被<strong>窃听</strong>
              <br />
              <LazyImage src={HTTP_LISTEN} alt="listen" />
            </li>
            <li id="change">
              被<strong>篡改</strong>
              <br />
              <LazyImage src={HTTP_CHANGE} alt="change" />
            </li>
            <li id="fish">
              <strong>冒充</strong>
              <br />
              <LazyImage src={HTTP_FISH} alt="fish" />
            </li>
          </ul>
          https就是为了解决这些安全风险而在的。HTTPS = HTTP + SSL/TLS，通过
          SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密
          <br />
          <br />
          <LazyImage src={HTTPS} alt="https" />
          <br />
          <LazyImage src={HTTPS_INSTRUCTION} alt="https_instruction" />
          <strong id="legal" className="text-16">
            怎么验证证书合法性？
          </strong>
          <ul className={classMap.ul}>
            <li>
              1. 客户端使用公钥解密签名
              <strong>
                （服务器对证书正文使用摘要算法生成摘要，并用私钥进行加密生成签名）
              </strong>
              ，如果证书未被篡改才能解密成功得到摘要A，并使用同样的摘要算法对证书明文进行计算得到B，A跟B一致则验证成功。
            </li>
            <li>2. 比较证书中的域名和请求的域名是否一致</li>
          </ul>
          <strong id="disAdv" className="text-16">
            HTTPS缺点
          </strong>
          <ul className={classMap.ul}>
            <li>1. 需要进行加解密算法，性能开销大</li>
            <li>2. 一般需要收费 💸，越贵功能越强大</li>
          </ul>
          <h2 id="http2" className={classMap.articleTitle}>
            http2
          </h2>
          <p>http2是http1.x的升级版，协议依然是http，加密依然是https</p>
          <br />
          <strong id="frame" className="text-16">
            帧结构
          </strong>
          <p>
            HTTP2相比于HTTP1.1（文本）使用了二进制进行数据传输，提高了HTTP的传输效率，同时也方便了使用位运算对HTTP数据进行解析。
          </p>
          <br />
          <LazyImage src={HTTP2_FRAME} alt="frame" />
          <br />
          <strong id="stream" className="text-16">
            并发传输
          </strong>
          <br />
          <p>
            并发传输解决了应用层队头阻塞的问题，通过多个Stream（由帧组成）复用一条TCP连接来实现，每个Stream都有ID，也避免了握手建立连接、冷启动的耗时
          </p>
          <br />
          <LazyImage src={HTTP2_STREAM} alt="stream" />
          <br />
          <br />
          <strong id="other" className="text-16">
            其他优点
          </strong>
          <p>头部压缩,服务器推送等</p>

          <h3 id="headerCompression" className={classMap.articleTitle}>
            头部压缩
          </h3>
          <p>
            HTTP/2 使用 HPACK 算法进行头部压缩，主要包含以下机制：
          </p>
          <ul className={classMap.ul}>
            <li>
              <strong>静态表</strong>：
              <ol className="ml-8 mt-2">
                <li>预定义了61个常用的 HTTP 头部字段</li>
                <li>如 :method: GET、:path: /、:status: 200 等</li>
                <li>这些字段只需要用1个字节的索引号表示</li>
              </ol>
            </li>
            <li>
              <strong>动态表</strong>：
              <ol className="ml-8 mt-2">
                <li>存储本次连接中传输过的头部字段</li>
                <li>可以动态添加新的头部字段</li>
                <li>后续请求可以复用这些字段</li>
              </ol>
            </li>
            <li>
              <strong>Huffman 编码</strong>：
              <ol className="ml-8 mt-2">
                <li>对头部字段的值进行压缩</li>
                <li>使用变长编码，常用字符用更短的编码</li>
                <li>可以进一步减少传输数据量</li>
              </ol>
            </li>
          </ul>

          <p>
            举个例子，一个典型的 HTTP/1.1 请求头：
          </p>
          <pre className="bg-gray-100 p-4 rounded">
GET /index.html HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Accept: text/html
Accept-Language: en-US,en;q=0.9
Cookie: session=123456
          </pre>

          <p>
            在 HTTP/2 中，这些头部可能被压缩为：
          </p>
          <ul className={classMap.ul}>
            <li>:method: GET 和 :path: /index.html 使用静态表（1字节）</li>
            <li>Host: example.com 可能使用动态表（如果之前传输过）</li>
            <li>其他头部使用 Huffman 编码压缩</li>
            <li>最终可能只需要原始大小的 20%-30%</li>
          </ul>

          <p>
            这种压缩机制的优势：
          </p>
          <ul className={classMap.ul}>
            <li>显著减少头部数据量，提高传输效率</li>
            <li>避免重复传输相同的头部字段</li>
            <li>特别适合移动网络等带宽受限的场景</li>
          </ul>

          <h3 id="serverPush" className={classMap.articleTitle}>
            服务器推送
          </h3>
          <p>
            服务器推送允许服务器在客户端请求之前就发送资源，主要应用场景：
          </p>
          <ul className={classMap.ul}>
            <li>推送 HTML 页面中引用的 CSS、JavaScript 文件</li>
            <li>推送页面中需要的图片资源</li>
            <li>推送 API 调用可能需要的相关数据</li>
          </ul>

          <h2 id="http3" className={classMap.articleTitle}>
            http3
          </h2>
          <p>HTTP3是HTTP协议的第三个主要版本，它基于QUIC协议，是对HTTP2的进一步改进。</p>
          <br />
          <strong id="quic" className="text-16">
            QUIC协议
          </strong>
          <p>
            QUIC（Quick UDP Internet Connections）是一个基于UDP的传输层协议，由Google开发。它解决了TCP的一些固有问题：
          </p>
          <ul className={classMap.ul}>
            <li>1. 基于UDP，避免了TCP的队头阻塞问题</li>
            <li>2. 内置TLS 1.3，提供更好的安全性</li>
            <li>3. 连接迁移：当网络切换时（如从WiFi切换到4G），不需要重新建立连接</li>
            <li>4. 更快的连接建立：0-RTT（零往返时间）连接建立</li>
          </ul>
          <br />
          <strong id="http3Adv" className="text-16">
            HTTP3的优势
          </strong>
          <ul className={classMap.ul}>
            <li>1. 更低的延迟：通过QUIC协议减少了连接建立时间</li>
            <li>2. 更好的移动网络支持：连接迁移特性使其在移动网络环境下表现更好</li>
            <li>3. 更强的安全性：内置TLS 1.3</li>
            <li>4. 更好的多路复用：完全解决了队头阻塞问题</li>
          </ul>

          <h2 id="nginx" className={classMap.articleTitle}>
            nginx配置
          </h2>
          开启http2非常简单，在listen 443 ssl后面追加http2就行，需要有
          <code>http_v2_module</code> 模块，否则需要重新安装更高版本的nginx
          <UseMarkDown markdown={NGINX}></UseMarkDown>
        </div>
      </main>
      <ArticleAnchor
        items={[
          {
            title: "http",
            key: "http",
            href: "#http"
          },
          {
            title: "http不足",
            key: "httpDisAdv",
            href: "#httpDisAdv"
          },
          {
            title: "https",
            key: "https",
            href: "#https",
            children: [
              {
                title: "被窃听",
                key: "listen",
                href: "#listen"
              },
              {
                title: "被篡改",
                key: "change",
                href: "#change"
              },
              {
                title: "冒充",
                key: "fish",
                href: "#fish"
              },
              {
                title: "验证证书合法性",
                key: "legal",
                href: "#legal"
              },
              {
                title: "缺点",
                key: "disAdv",
                href: "#disAdv"
              }
            ]
          },
          {
            title: "http2",
            key: "http2",
            href: "#http2",
            children: [
              {
                title: "帧结构",
                key: "frame",
                href: "#frame"
              },
              {
                title: "并发传输",
                key: "stream",
                href: "#stream"
              },
              {
                title: "其他优点",
                key: "other",
                href: "#other",
                children: [
                  {
                    title: "头部压缩",
                    key: "headerCompression",
                    href: "#headerCompression"
                  },
                  {
                    title: "服务器推送",
                    key: "serverPush",
                    href: "#serverPush"
                  }
                ]
              }
            ]
          },
          {
            title: "http3",
            key: "http3",
            href: "#http3",
            children: [
              {
                title: "QUIC协议",
                key: "quic",
                href: "#quic"
              },
              {
                title: "HTTP3优势",
                key: "http3Adv",
                href: "#http3Adv"
              }
            ]
          },
          {
            title: "nginx配置",
            key: "nginx",
            href: "#nginx"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
} 