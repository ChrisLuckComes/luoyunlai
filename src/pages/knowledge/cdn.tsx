import { classMap } from "@/constants/constant";
import { UseMarkDown } from "@/hooks/useMarkdown";
import { ArticleAnchor } from "@/component/Anchor";
import { CDN_CONFIG, DNS_LOOKUP, CACHE_HEADERS, CDN_ARCHITECTURE } from "./_cdn";

export default function Index() {
  const cdnConfig = <UseMarkDown markdown={CDN_CONFIG}></UseMarkDown>,
    dnsLookup = <UseMarkDown markdown={DNS_LOOKUP}></UseMarkDown>,
    cacheHeaders = <UseMarkDown markdown={CACHE_HEADERS}></UseMarkDown>,
    cdnArchitecture = <UseMarkDown markdown={CDN_ARCHITECTURE}></UseMarkDown>;

  return (
    <article id="rootArticle" className={classMap.article}>
      <main id="main" className={classMap.content}>
        <h2 id="pre" className="font-semibold text-h2 mb-2">
          深度了解CDN
        </h2>
        CDN（Content Delivery Network，内容分发网络）是一种通过在全球各地部署节点服务器，将网站内容分发到离用户最近的服务器上，从而提供更快、更稳定的访问体验的技术。
        <br />
        <br />
        <h2 id="what" className={classMap.articleTitle}>
          CDN是什么
        </h2>
        CDN是一个分布式服务器系统，它通过在全球各地部署节点服务器，将网站内容分发到离用户最近的服务器上。当用户访问网站时，CDN会自动选择最近的节点服务器来提供内容，从而减少网络延迟，提高访问速度。
        <br />
        <br />
        <h2 id="how" className={classMap.articleTitle}>
          CDN的工作原理
        </h2>
        <h3 id="dns" className={classMap.articleSubTitle}>
          DNS解析过程
        </h3>
        当用户访问使用CDN的网站时，DNS解析过程如下：
        {dnsLookup}
        <h3 id="architecture" className={classMap.articleSubTitle}>
          CDN架构
        </h3>
        CDN的基本架构如下：
        {cdnArchitecture}
        <h2 id="features" className={classMap.articleTitle}>
          CDN的主要特性
        </h2>
        <ul className={classMap.ul}>
          <li>1. 内容分发：将网站内容分发到全球各地的节点服务器</li>
          <li>2. 负载均衡：自动选择最优节点提供服务</li>
          <li>3. 缓存加速：通过缓存减少源站压力</li>
          <li>4. 安全防护：提供DDoS防护、WAF等安全服务</li>
        </ul>
        <h2 id="cache" className={classMap.articleTitle}>
          缓存机制
        </h2>
        CDN的缓存机制主要通过HTTP缓存控制头来实现：
        {cacheHeaders}
        <h3 id="cacheTypes" className={classMap.articleSubTitle}>
          缓存类型
        </h3>
        <ul className={classMap.ul}>
          <li>1. 浏览器缓存：存储在用户浏览器中的缓存</li>
          <li>2. CDN缓存：存储在CDN节点服务器中的缓存</li>
          <li>3. 源站缓存：存储在源站服务器中的缓存</li>
        </ul>
        <h2 id="config" className={classMap.articleTitle}>
          CDN配置示例
        </h2>
        以下是一个Nginx CDN配置示例：
        {cdnConfig}
        <h2 id="benefits" className={classMap.articleTitle}>
          CDN的优势
        </h2>
        <ul className={classMap.ul}>
          <li>1. 提升访问速度：通过就近访问减少网络延迟</li>
          <li>2. 减轻源站压力：通过缓存减少源站服务器负载</li>
          <li>3. 提高可用性：多节点部署提供容灾能力</li>
          <li>4. 节省带宽：通过缓存减少带宽消耗</li>
          <li>5. 安全防护：提供多种安全服务</li>
        </ul>
        <h2 id="usage" className={classMap.articleTitle}>
          使用场景
        </h2>
        <ul className={classMap.ul}>
          <li>1. 静态资源加速：图片、CSS、JavaScript等静态文件</li>
          <li>2. 视频点播：视频文件的快速分发</li>
          <li>3. 直播加速：实时视频流的快速传输</li>
          <li>4. 下载加速：大文件的快速下载</li>
          <li>5. 动态加速：API接口的快速响应</li>
        </ul>
      </main>
      <ArticleAnchor
        items={[
          {
            title: "深度了解CDN",
            key: "pre",
            href: "#pre"
          },
          {
            title: "CDN是什么",
            key: "what",
            href: "#what"
          },
          {
            title: "CDN的工作原理",
            key: "how",
            href: "#how",
            children: [
              {
                title: "DNS解析过程",
                key: "dns",
                href: "#dns"
              },
              {
                title: "CDN架构",
                key: "architecture",
                href: "#architecture"
              }
            ]
          },
          {
            title: "CDN的主要特性",
            key: "features",
            href: "#features"
          },
          {
            title: "缓存机制",
            key: "cache",
            href: "#cache",
            children: [
              {
                title: "缓存类型",
                key: "cacheTypes",
                href: "#cacheTypes"
              }
            ]
          },
          {
            title: "CDN配置示例",
            key: "config",
            href: "#config"
          },
          {
            title: "CDN的优势",
            key: "benefits",
            href: "#benefits"
          },
          {
            title: "使用场景",
            key: "usage",
            href: "#usage"
          }
        ]}
      ></ArticleAnchor>
    </article>
  );
} 