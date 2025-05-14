import{j as s,d as e,e as t}from"./index-12c11ae8.js";import{U as l}from"./useMarkdown-141d10e7.js";import{A as i}from"./Anchor-cb8b8329.js";const r="/luoyunlai/assets/http-listen-4695cabe.png",n="/luoyunlai/assets/http-change-fba9f3c5.png",h="/luoyunlai/assets/http-fish-026031bb.png",c="/luoyunlai/assets/https-3dedc518.png",a="/luoyunlai/assets/https-instruction-1d8040e8.png",d="/luoyunlai/assets/http2-frame-1493733c.png",x="/luoyunlai/assets/http2-stream-0dd49fc4.jpg",j=`\`\`\`bash
# 1. 查看当前nginx版本和已安装的模块
nginx -V

# 2. 如果输出中没有 --with-http_v2_module，需要重新编译安装nginx
# 下载对应版本的nginx源码
wget http://nginx.org/download/nginx-1.24.0.tar.gz
tar -zxvf nginx-1.24.0.tar.gz
cd nginx-1.24.0

# 配置编译参数，添加http_v2_module
# 注意：需要保留原有的编译参数，可以通过 nginx -V 查看
./configure --prefix=/usr/local/nginx \\
    --with-http_ssl_module \\
    --with-http_v2_module \\
    --with-http_stub_status_module \\
    --with-pcre \\
    --with-stream \\
    --with-stream_ssl_module \\
    --with-stream_realip_module

# 编译安装
make
make install

# 3. 配置nginx支持http2
\`\`\`nginx
server {
    listen 443 ssl http2;  # 添加http2
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # SSL配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS配置
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
\`\`\`

\`\`\`bash
# 4. 验证配置是否正确
nginx -t

# 5. 重启nginx
nginx -s reload
\`\`\``;function T(){return s.jsxs("article",{id:"rootArticle",className:e.article,children:[s.jsxs("main",{className:e.content,children:[s.jsx("h1",{id:"http",className:"font-semibold text-h2 mb-2",children:"http=>https=>http2=>http3"}),s.jsxs("div",{children:[s.jsx("h2",{id:"httpDisAdv",className:e.articleTitle,children:"http的不足"}),s.jsxs("ul",{className:e.ul,children:[s.jsxs("li",{children:["1. ",s.jsx("strong",{className:"text-16",children:"明文"}),"传输,安全性低"]}),s.jsxs("li",{children:["2. 队头",s.jsx("strong",{className:"text-16",children:"阻塞"}),"，如果前面的请求未完成，后续的请求会被阻塞"]})]}),s.jsx("br",{}),"当然http还有其他的不足，例如首部信息冗余等。列举以上两点是为了引出下文的https,http2。",s.jsx("h2",{id:"https",className:e.articleTitle,children:"https"}),"明文传输安全性低主要体现在哪呢？主要是如下三点：",s.jsxs("ul",{className:e.ul,children:[s.jsxs("li",{id:"listen",children:["被",s.jsx("strong",{children:"窃听"}),s.jsx("br",{}),s.jsx(t,{src:r,alt:"listen"})]}),s.jsxs("li",{id:"change",children:["被",s.jsx("strong",{children:"篡改"}),s.jsx("br",{}),s.jsx(t,{src:n,alt:"change"})]}),s.jsxs("li",{id:"fish",children:[s.jsx("strong",{children:"冒充"}),s.jsx("br",{}),s.jsx(t,{src:h,alt:"fish"})]})]}),"https就是为了解决这些安全风险而在的。HTTPS = HTTP + SSL/TLS，通过 SSL证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密",s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:c,alt:"https"}),s.jsx("br",{}),s.jsx(t,{src:a,alt:"https_instruction"}),s.jsx("strong",{id:"legal",className:"text-16",children:"怎么验证证书合法性？"}),s.jsxs("ul",{className:e.ul,children:[s.jsxs("li",{children:["1. 客户端使用公钥解密签名",s.jsx("strong",{children:"（服务器对证书正文使用摘要算法生成摘要，并用私钥进行加密生成签名）"}),"，如果证书未被篡改才能解密成功得到摘要A，并使用同样的摘要算法对证书明文进行计算得到B，A跟B一致则验证成功。"]}),s.jsx("li",{children:"2. 比较证书中的域名和请求的域名是否一致"})]}),s.jsx("strong",{id:"disAdv",className:"text-16",children:"HTTPS缺点"}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:"1. 需要进行加解密算法，性能开销大"}),s.jsx("li",{children:"2. 一般需要收费 💸，越贵功能越强大"})]}),s.jsx("h2",{id:"http2",className:e.articleTitle,children:"http2"}),s.jsx("p",{children:"http2是http1.x的升级版，协议依然是http，加密依然是https"}),s.jsx("br",{}),s.jsx("strong",{id:"frame",className:"text-16",children:"帧结构"}),s.jsx("p",{children:"HTTP2相比于HTTP1.1（文本）使用了二进制进行数据传输，提高了HTTP的传输效率，同时也方便了使用位运算对HTTP数据进行解析。"}),s.jsx("br",{}),s.jsx(t,{src:d,alt:"frame"}),s.jsx("br",{}),s.jsx("strong",{id:"stream",className:"text-16",children:"并发传输"}),s.jsx("br",{}),s.jsx("p",{children:"并发传输解决了应用层队头阻塞的问题，通过多个Stream（由帧组成）复用一条TCP连接来实现，每个Stream都有ID，也避免了握手建立连接、冷启动的耗时"}),s.jsx("br",{}),s.jsx(t,{src:x,alt:"stream"}),s.jsx("br",{}),s.jsx("br",{}),s.jsx("strong",{id:"other",className:"text-16",children:"其他优点"}),s.jsx("p",{children:"头部压缩,服务器推送等"}),s.jsx("h3",{id:"headerCompression",className:e.articleTitle,children:"头部压缩"}),s.jsx("p",{children:"HTTP/2 使用 HPACK 算法进行头部压缩，主要包含以下机制："}),s.jsxs("ul",{className:e.ul,children:[s.jsxs("li",{children:[s.jsx("strong",{children:"静态表"}),"：",s.jsxs("ol",{className:"ml-8 mt-2",children:[s.jsx("li",{children:"预定义了61个常用的 HTTP 头部字段"}),s.jsx("li",{children:"如 :method: GET、:path: /、:status: 200 等"}),s.jsx("li",{children:"这些字段只需要用1个字节的索引号表示"})]})]}),s.jsxs("li",{children:[s.jsx("strong",{children:"动态表"}),"：",s.jsxs("ol",{className:"ml-8 mt-2",children:[s.jsx("li",{children:"存储本次连接中传输过的头部字段"}),s.jsx("li",{children:"可以动态添加新的头部字段"}),s.jsx("li",{children:"后续请求可以复用这些字段"})]})]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Huffman 编码"}),"：",s.jsxs("ol",{className:"ml-8 mt-2",children:[s.jsx("li",{children:"对头部字段的值进行压缩"}),s.jsx("li",{children:"使用变长编码，常用字符用更短的编码"}),s.jsx("li",{children:"可以进一步减少传输数据量"})]})]})]}),s.jsx("p",{children:"举个例子，一个典型的 HTTP/1.1 请求头："}),s.jsx("pre",{className:"bg-gray-100 p-4 rounded",children:"GET /index.html HTTP/1.1 Host: example.com User-Agent: Mozilla/5.0 Accept: text/html Accept-Language: en-US,en;q=0.9 Cookie: session=123456"}),s.jsx("p",{children:"在 HTTP/2 中，这些头部可能被压缩为："}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:":method: GET 和 :path: /index.html 使用静态表（1字节）"}),s.jsx("li",{children:"Host: example.com 可能使用动态表（如果之前传输过）"}),s.jsx("li",{children:"其他头部使用 Huffman 编码压缩"}),s.jsx("li",{children:"最终可能只需要原始大小的 20%-30%"})]}),s.jsx("p",{children:"这种压缩机制的优势："}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:"显著减少头部数据量，提高传输效率"}),s.jsx("li",{children:"避免重复传输相同的头部字段"}),s.jsx("li",{children:"特别适合移动网络等带宽受限的场景"})]}),s.jsx("h3",{id:"serverPush",className:e.articleTitle,children:"服务器推送"}),s.jsx("p",{children:"服务器推送允许服务器在客户端请求之前就发送资源，主要应用场景："}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:"推送 HTML 页面中引用的 CSS、JavaScript 文件"}),s.jsx("li",{children:"推送页面中需要的图片资源"}),s.jsx("li",{children:"推送 API 调用可能需要的相关数据"})]}),s.jsx("h2",{id:"http3",className:e.articleTitle,children:"http3"}),s.jsx("p",{children:"HTTP3是HTTP协议的第三个主要版本，它基于QUIC协议，是对HTTP2的进一步改进。"}),s.jsx("br",{}),s.jsx("strong",{id:"quic",className:"text-16",children:"QUIC协议"}),s.jsx("p",{children:"QUIC（Quick UDP Internet Connections）是一个基于UDP的传输层协议，由Google开发。它解决了TCP的一些固有问题："}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:"1. 基于UDP，避免了TCP的队头阻塞问题"}),s.jsx("li",{children:"2. 内置TLS 1.3，提供更好的安全性"}),s.jsx("li",{children:"3. 连接迁移：当网络切换时（如从WiFi切换到4G），不需要重新建立连接"}),s.jsx("li",{children:"4. 更快的连接建立：0-RTT（零往返时间）连接建立"})]}),s.jsx("br",{}),s.jsx("strong",{id:"http3Adv",className:"text-16",children:"HTTP3的优势"}),s.jsxs("ul",{className:e.ul,children:[s.jsx("li",{children:"1. 更低的延迟：通过QUIC协议减少了连接建立时间"}),s.jsx("li",{children:"2. 更好的移动网络支持：连接迁移特性使其在移动网络环境下表现更好"}),s.jsx("li",{children:"3. 更强的安全性：内置TLS 1.3"}),s.jsx("li",{children:"4. 更好的多路复用：完全解决了队头阻塞问题"})]}),s.jsx("h2",{id:"nginx",className:e.articleTitle,children:"nginx配置"}),"开启http2非常简单，在listen 443 ssl后面追加http2就行，需要有",s.jsx("code",{children:"http_v2_module"})," 模块，否则需要重新安装更高版本的nginx",s.jsx(l,{markdown:j})]})]}),s.jsx(i,{items:[{title:"http",key:"http",href:"#http"},{title:"http不足",key:"httpDisAdv",href:"#httpDisAdv"},{title:"https",key:"https",href:"#https",children:[{title:"被窃听",key:"listen",href:"#listen"},{title:"被篡改",key:"change",href:"#change"},{title:"冒充",key:"fish",href:"#fish"},{title:"验证证书合法性",key:"legal",href:"#legal"},{title:"缺点",key:"disAdv",href:"#disAdv"}]},{title:"http2",key:"http2",href:"#http2",children:[{title:"帧结构",key:"frame",href:"#frame"},{title:"并发传输",key:"stream",href:"#stream"},{title:"其他优点",key:"other",href:"#other",children:[{title:"头部压缩",key:"headerCompression",href:"#headerCompression"},{title:"服务器推送",key:"serverPush",href:"#serverPush"}]}]},{title:"http3",key:"http3",href:"#http3",children:[{title:"QUIC协议",key:"quic",href:"#quic"},{title:"HTTP3优势",key:"http3Adv",href:"#http3Adv"}]},{title:"nginx配置",key:"nginx",href:"#nginx"}]})]})}export{T as default};
