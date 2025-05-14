export const NGINX = `\`\`\`bash
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
\`\`\``; 