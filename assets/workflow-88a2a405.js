import{j as s,d as e,e as t}from"./index-298bb257.js";import{U as o}from"./useMarkdown-3461f6cc.js";import{A as n}from"./Anchor-c8fc4162.js";import"./index-6c3c40ca.js";const l="/luoyunlai/assets/createSSH-5f0ab2d6.jpg",i="/luoyunlai/assets/settings-7dc404a0.png",a="/luoyunlai/assets/newSecret-c4475dc9.png",c="/luoyunlai/assets/newWorkflow-fe5ed134.png",u="/luoyunlai/assets/setUpYourself-fb661296.png",d="/luoyunlai/assets/commitWorkflow-75f4800e.png",j="/luoyunlai/assets/workflow-678b9352.png",x=`\`\`\`xml
# 一个workflow，名为deploy to tengxunyun
name: deploy to tencent cloud

on: # 此CI/CD触发时的事件
  push: # 在代码提交时自动触发
    branches:
      - main

# 一个 CI/CD 的工作流有许多 jobs 组成，比如最典型的 job 是 lint，test，build。
jobs: 
  build: # 构建job
    runs-on: ubuntu-latest # 跑workflow的服务器系统
    steps: # job的一系列动作
      # 切换分支获取源码
      - name: Checkout # step的名称，将会在 github action 的控制台中显示
        # 选择一个action，可以理解为若干 steps.run，有利于代码复用
        uses: actions/checkout@main
      # 安装使用 node:16
      - name: use Node.js 16
        uses: actions/setup-node@v1
        with:
          node-version: 16.13.1
      # 运行命令，npm install && npm run build
      - name: npm install and build
        run: |
          npm install
          npm run build
        env:
          CI: true
      # 部署到腾讯云服务器
      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@v2.0.7
        env:
            # 本地.ssh文件下的私钥id_rsa，存在secrets的TOKEN中
            SSH_PRIVATE_KEY: \${{ secrets.TOKEN }} 
            # 复制操作的参数。"-avzr --delete"意味部署时清空服务器目标目录下的文件
            ARGS: "-avzr --delete" 
            # 源目录，相对于$GITHUB_WORKSPACE根目录的路径
            SOURCE: "build/" 
            # 服务器域名
            REMOTE_HOST: "123.123.123.123" 
            # 腾讯云默认用户名为root
            REMOTE_USER: "root" 
            # 目标目录
            TARGET: "/usr/share/nginx/html" 
\`\`\``;function w(){const r=s.jsx(o,{markdown:x});return s.jsxs("article",{id:"rootArticle",className:e.article,children:[s.jsxs("main",{className:e.content,children:[s.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"不会还有人在手动发版吧？不会吧？手把手带你使用Github Actions完成CI/CD自动化部署"}),s.jsx("div",{className:e.assist,children:"以该repo为例子，部署在腾讯云"}),s.jsx("h2",{id:"ssh",className:e.articleTitle,children:"SSH密钥"}),"首先需要在云服务器创建密钥，用于后续SSH远程登录",s.jsx(t,{src:l}),s.jsx("br",{}),"然后进入github，路径：github/settings/Secrets，已存在的密钥会在这里展示，点击",s.jsx("strong",{children:"new repository secret"}),"新增，也可以创建环境变量区分不同环境。",s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:i}),s.jsx("br",{}),s.jsx("br",{}),"输入名称和上一步新增的密钥，新增成功",s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:a}),s.jsx("h2",{id:"workflow",className:e.articleTitle,children:"workflow"}),"然后进入到actions,点击",s.jsx("strong",{children:"New workflow"}),s.jsx(t,{src:c}),s.jsx("br",{}),s.jsx("br",{}),"有很多模板可供选择，这里我们选择自定义，点击",s.jsx("strong",{children:"set up a work yourself"}),s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:u}),s.jsx("br",{}),s.jsx("br",{}),"文件名按个人喜好来，示例代码在下节，创建完成后，每次对应分支有变动就会触发workflow，完成自动拉取代码打包发布",s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:d}),s.jsx("h2",{id:"code",className:e.articleTitle,children:"代码"}),r,s.jsx("h2",{id:"result",className:e.articleTitle,children:"Jobs"}),"点击工作流可以查看jobs执行情况，到此就大功告成了，从此无需再手动打包复制文件。",s.jsx("br",{}),s.jsx("br",{}),s.jsx(t,{src:j})]}),s.jsx(n,{items:[{title:"不要再手动发版了",key:"pre",href:"#pre"},{title:"SSH",key:"ssh",href:"#ssh"},{title:"workflow",key:"workflow",href:"#workflow"},{title:"代码",key:"code",href:"#code"},{title:"Jobs",key:"result",href:"#result"}]})]})}export{w as default};
