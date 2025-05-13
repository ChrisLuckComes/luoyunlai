export const CDN_CONFIG = `\`\`\`nginx
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
\`\`\``;

export const DNS_LOOKUP = `\`\`\`bash
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
\`\`\``;

export const CACHE_HEADERS = `\`\`\`http
# 缓存控制头
Cache-Control: max-age=31536000
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 21 Oct 2015 07:28:00 GMT
\`\`\``;

export const CDN_ARCHITECTURE = `\`\`\`plaintext
用户 -> 边缘节点 -> 源站
     |-> 边缘节点 -> 源站
     |-> 边缘节点 -> 源站
\`\`\``;

export const CSS_LOADING = `\`\`\`html
<!-- CSS加载示例 -->
<head>
  <!-- 阻塞渲染的CSS -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- 异步加载的CSS -->
  <link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
  
  <!-- 预加载CSS -->
  <link rel="preload" href="styles.css" as="style">
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\``;

export const CSS_LOADING_PROCESS = `\`\`\`plaintext
CSS加载过程：
1. 构建DOM树
2. 遇到<link>标签，暂停DOM构建
3. 下载CSS文件
4. 解析CSS，构建CSSOM树
5. 合并DOM树和CSSOM树，构建渲染树
6. 布局和绘制
\`\`\``; 