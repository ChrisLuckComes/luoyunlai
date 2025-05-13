import{j as e,d as i}from"./index-52cacda3.js";import{U as s}from"./useMarkdown-2196212a.js";import{A as r}from"./Anchor-4d1d2fe9.js";const h=`\`\`\`nginx
# Nginx CDN配置示例

# HTML文件使用协商缓存
location ~* \\.html$ {
    etag on;
    if_modified_since exact;
    add_header Cache-Control "no-cache";
    add_header ETag $etag;
    add_header Last-Modified $date_gmt;
}

# 静态资源使用强缓存
location /static/ {
    proxy_cache my_cache;
    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    proxy_cache_valid 200 60m;
    proxy_cache_valid 404 1m;
    expires 1d;
    add_header Cache-Control "public, no-transform";
}
\`\`\``,d=`\`\`\`bash
# 从浏览器输入URL到DNS解析的完整过程

1. 浏览器输入URL后，首先检查浏览器缓存
   - 浏览器会缓存DNS记录一段时间
   - 可以通过 chrome://net-internals/#dns 查看浏览器DNS缓存

2. 检查系统缓存
   - Windows系统查看 C:\\Windows\\System32\\drivers\\etc\\hosts
   - Linux/Mac系统查看 /etc/hosts
   - 如果hosts文件中有对应记录，则直接使用

3. 检查路由器缓存
   - 路由器也会缓存DNS记录
   - 如果路由器有记录，则直接返回

4. 检查ISP DNS缓存
   - ISP（互联网服务提供商）的DNS服务器也会缓存记录
   - 如果ISP DNS服务器有记录，则直接返回

5. 开始递归查询
   a. 根域名服务器查询
      - 根域名服务器返回顶级域名服务器地址
      - 例如：.com、.org、.net等

   b. 顶级域名服务器查询
      - 顶级域名服务器返回权威域名服务器地址
      - 例如：google.com、baidu.com等

   c. 权威域名服务器查询
      - 权威域名服务器返回最终的IP地址
      - 例如：www.example.com的IP地址

6. 本地DNS服务器缓存结果
   - 将查询结果缓存到本地DNS服务器
   - 设置TTL（Time To Live）值
   - 下次查询相同域名时可以直接使用缓存

7. 返回IP地址给浏览器
   - 浏览器获得IP地址后开始建立TCP连接
   - 如果是CDN域名，此时会返回离用户最近的CDN节点IP
\`\`\``,n='```http\n# 缓存控制头\nCache-Control: max-age=31536000\nETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"\nLast-Modified: Wed, 21 Oct 2015 07:28:00 GMT\n```',o="```plaintext\n用户 -> 边缘节点 -> 源站\n     |-> 边缘节点 -> 源站\n     |-> 边缘节点 -> 源站\n```";function D(){const c=e.jsx(s,{markdown:h}),l=e.jsx(s,{markdown:d}),t=e.jsx(s,{markdown:n}),a=e.jsx(s,{markdown:o});return e.jsxs("article",{id:"rootArticle",className:i.article,children:[e.jsxs("main",{id:"main",className:i.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"深度了解CDN"}),"CDN（Content Delivery Network，内容分发网络）是一种通过在全球各地部署节点服务器，将网站内容分发到离用户最近的服务器上，从而提供更快、更稳定的访问体验的技术。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("h2",{id:"what",className:i.articleTitle,children:"CDN是什么"}),"CDN是一个分布式服务器系统，它通过在全球各地部署节点服务器，将网站内容分发到离用户最近的服务器上。当用户访问网站时，CDN会自动选择最近的节点服务器来提供内容，从而减少网络延迟，提高访问速度。",e.jsx("br",{}),e.jsx("br",{}),e.jsx("h2",{id:"how",className:i.articleTitle,children:"CDN的工作原理"}),e.jsx("h3",{id:"dns",className:i.articleSubTitle,children:"DNS解析过程"}),"当用户访问使用CDN的网站时，DNS解析过程如下：",l,e.jsx("h3",{id:"architecture",className:i.articleSubTitle,children:"CDN架构"}),"CDN的基本架构如下：",a,e.jsx("h2",{id:"features",className:i.articleTitle,children:"CDN的主要特性"}),e.jsxs("ul",{className:i.ul,children:[e.jsx("li",{children:"1. 内容分发：将网站内容分发到全球各地的节点服务器"}),e.jsx("li",{children:"2. 负载均衡：自动选择最优节点提供服务"}),e.jsx("li",{children:"3. 缓存加速：通过缓存减少源站压力"}),e.jsx("li",{children:"4. 安全防护：提供DDoS防护、WAF等安全服务"})]}),e.jsx("h2",{id:"cache",className:i.articleTitle,children:"缓存机制"}),"CDN的缓存机制主要通过HTTP缓存控制头来实现：",t,e.jsx("h3",{id:"cacheTypes",className:i.articleSubTitle,children:"缓存类型"}),e.jsxs("ul",{className:i.ul,children:[e.jsx("li",{children:"1. 浏览器缓存：存储在用户浏览器中的缓存"}),e.jsx("li",{children:"2. CDN缓存：存储在CDN节点服务器中的缓存"}),e.jsx("li",{children:"3. 源站缓存：存储在源站服务器中的缓存"})]}),e.jsx("h2",{id:"config",className:i.articleTitle,children:"CDN配置示例"}),"以下是一个Nginx CDN配置示例：",c,e.jsx("h2",{id:"benefits",className:i.articleTitle,children:"CDN的优势"}),e.jsxs("ul",{className:i.ul,children:[e.jsx("li",{children:"1. 提升访问速度：通过就近访问减少网络延迟"}),e.jsx("li",{children:"2. 减轻源站压力：通过缓存减少源站服务器负载"}),e.jsx("li",{children:"3. 提高可用性：多节点部署提供容灾能力"}),e.jsx("li",{children:"4. 节省带宽：通过缓存减少带宽消耗"}),e.jsx("li",{children:"5. 安全防护：提供多种安全服务"})]}),e.jsx("h2",{id:"usage",className:i.articleTitle,children:"使用场景"}),e.jsxs("ul",{className:i.ul,children:[e.jsx("li",{children:"1. 静态资源加速：图片、CSS、JavaScript等静态文件"}),e.jsx("li",{children:"2. 视频点播：视频文件的快速分发"}),e.jsx("li",{children:"3. 直播加速：实时视频流的快速传输"}),e.jsx("li",{children:"4. 下载加速：大文件的快速下载"}),e.jsx("li",{children:"5. 动态加速：API接口的快速响应"})]})]}),e.jsx(r,{items:[{title:"深度了解CDN",key:"pre",href:"#pre"},{title:"CDN是什么",key:"what",href:"#what"},{title:"CDN的工作原理",key:"how",href:"#how",children:[{title:"DNS解析过程",key:"dns",href:"#dns"},{title:"CDN架构",key:"architecture",href:"#architecture"}]},{title:"CDN的主要特性",key:"features",href:"#features"},{title:"缓存机制",key:"cache",href:"#cache",children:[{title:"缓存类型",key:"cacheTypes",href:"#cacheTypes"}]},{title:"CDN配置示例",key:"config",href:"#config"},{title:"CDN的优势",key:"benefits",href:"#benefits"},{title:"使用场景",key:"usage",href:"#usage"}]})]})}export{D as default};
