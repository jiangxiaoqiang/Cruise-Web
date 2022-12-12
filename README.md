# Cruise-Web

启动项目：

```bash
git clone https://github.com/jiangxiaoqiang/cruise-web.git
cd cruise-web
yarn 
yarn start
```

macOS本机Nginx配置（/System/Volumes/Data/opt/homebrew/etc/nginx/conf.d/cruise-web.conf）：

```
server {
        listen 8084;
        server_name read.reddwarf.com;
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
        }
        location ^~ /service/ {
            proxy_pass  https://read.poemhub.top/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For;
            $proxy_add_x_forwarded_for;
        }
}
```

macOS启动重启nginx:

```bash
# 启动nginx
brew services start nginx
# 重启nginx
brew services restart nginx
# 重新加载配置
sudo /opt/homebrew/opt/nginx/bin/nginx -s reload
```

启动nginx后访问：http://127.0.0.1:8084。
