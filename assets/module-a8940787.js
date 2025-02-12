import{j as e,d as r}from"./index-4347705d.js";import{U as o}from"./useMarkdown-4eab8b7c.js";import{A as d}from"./Anchor-e18f0208.js";import"./index-a0fabbc0.js";const a=`\`\`\`js
 (function (modules) {
    // webpackBootstrap
     // 模块缓存
     var installedModules = {};
     // 辅助函数，实现require
     function __webpack_require__(moduleId) {
       // 判断模块是否在缓存中
       if (installedModules[moduleId]) {
         return installedModules[moduleId].exports;
      }
       // 创建新模块，并添加到缓存中
       var module = (installedModules[moduleId] = {
         i: moduleId,
         l: false,
         exports: {},
      });
      
       // 执行模块函数
       modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      
       // 标记模块已加载
       module.l = true;
       // 返回module.exports，其中包含了导出的对象
       return module.exports;
    }
     // 暴露modules对象  (__webpack_modules__)
     __webpack_require__.m = modules;
    
     // 暴露installedModules模块缓存对象
     __webpack_require__.c = installedModules;
    
     // 定义函数，支持exports的导出
     __webpack_require__.d = function (exports, name, getter) {
       if (!__webpack_require__.o(exports, name)) {
         Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };
    
     // 在exports上定义__esModule属性
     __webpack_require__.r = function (exports) {
       if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
         Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
       Object.defineProperty(exports, "__esModule", { value: true });
    };
    
     // 创建虚拟命名空间
     // mode & 1: value is a module id, require it
     // mode & 2: merge all properties of value into the ns
     // mode & 4: return value when already ns object
     // mode & 8|1: behave like require
     __webpack_require__.t = function (value, mode) {
       if (mode & 1) value = __webpack_require__(value);
       if (mode & 8) return value;
       if (
        mode & 4 &&
        typeof value === "object" &&
        value &&
        value.__esModule
      )
        return value;
       var ns = Object.create(null);
       __webpack_require__.r(ns);
       Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
       if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
       return ns;
    };
    
     // 同时支持export default 和 export
     __webpack_require__.n = function (module) {
       var getter =
        module && module.__esModule
          ?  function getDefault() {
              return module["default"];
            }
          :  function getModuleExports() {
              return module;
            };
       __webpack_require__.d(getter, "a", getter);
       return getter;
    };
    
     // 调用hasOwnProperty检查对象是否存在该属性
     __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
     // __webpack_public_path__
     __webpack_require__.p = "";
    
     // 加载入口模块，返回exports
     return __webpack_require__((__webpack_require__.s = "./app.js"));
  })({
    "./app.js": function (module, exports, __webpack_require__) {
      var m = __webpack_require__("./module1.js");
      console.log(m);
    }, 
    "./module1.js": function (module, exports) {
      var m = 1;
      module.exports = m;
    },
  });
  //# sourceMappingURL=bundle.js.map
\`\`\``,i=`\`\`\`js
// module1.js
const m = 1;
module.exports = m;

// app.js
const m = require("./module1.js");
console.log(m);
\`\`\``,c=`\`\`\`js
const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    hashFunction: "sha256",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  devServer: {
    open: true,
  },
  devtool: "source-map",
};

\`\`\``,n=`\`\`\`js
// app.js
import m, { a } from "./module2";
console.log(m, a);

// module2.js
export const a = 1;
export default obj = {
  b: 2,
};
\`\`\``,p=`\`\`\`js
(function (modules) {
    // webpackBootstrap
    // The module cache
    var installedModules = {};
  
    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
      });
  
      // Execute the module function
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
  
      // Flag the module as loaded
      module.l = true;
  
      // Return the exports of the module
      return module.exports;
    }
  
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
  
    // expose the module cache
    __webpack_require__.c = installedModules;
  
    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };
  
    // define __esModule on exports
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  
    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      return ns;
    };
  
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module["default"];
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
  
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
  
    // __webpack_public_path__
    __webpack_require__.p = "";
  
    // Load entry module and return exports
    return __webpack_require__((__webpack_require__.s = "./app.js"));
  })({
    "./app.js": function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _module2__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__("./module2.js");
      console.log(
        _module2__WEBPACK_IMPORTED_MODULE_0__["default"],
        _module2__WEBPACK_IMPORTED_MODULE_0__["a"]
      );
    },
    "./module2.js": function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, "a", function () {
        return a;
      });
      var a = 1;
      __webpack_exports__["default"] = obj = {
        b: 2,
      };
    },
  });
  //# sourceMappingURL=bundle.js.map
\`\`\``;function h(){const l=e.jsx(o,{markdown:i}),t=e.jsx(o,{markdown:c}),_=e.jsx(o,{markdown:a}),u=e.jsx(o,{markdown:p}),s=e.jsx(o,{markdown:n});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"CommonJS和ES module"}),"CommonJS和ES Module是模块化的两种规范，语法类似但略有不同，本文主要是细说它们的实现方式，这样异同点自然就显现出来了。",e.jsx("br",{}),"接下来我们使用webpack@4.x+babel来打包代码，看输出后的js来分析。 webpack.config.js简单配置如下",t,e.jsx("h2",{id:"webpack",className:r.articleTitle,children:"借助Webpack分析"}),"CommonJS(下文简称cjs)是",e.jsx("strong",{children:"Node.js"}),"的模块化标准，npm就是建立在该标准之上的。它以同步加载的方式将模块一次性加载完成，想必大家都知道怎么使用，此处就不举栗子了。 准备如下代码:",l,"输出代码如下， 可以看到webpack将所有js处理成了一个立即执行函数，参数是所有模块组成的对象。每个文件作为一个键值对， 对象的key是文件路径，value是该js内容包括在内的函数，函数的参数就是",e.jsx("code",{children:"module"}),",",e.jsx("code",{children:"exports"}),",",e.jsx("code",{children:"__webpack_require__"}),"(app.js中使用的",e.jsx("code",{children:"require"}),"函数)。",_,e.jsx("h3",{id:"require",className:r.articleSubTitle,children:"__webpack_require__"}),"webpack定义该辅助函数实现引入模块的功能，它的入参是",e.jsx("code",{children:"moduleId"}),"，也就是路径字符串。",e.jsx("br",{}),e.jsx("br",{}),"首先判断该模块是否在",e.jsx("code",{children:"installedModules"}),"缓存中，",e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:["存在： ",e.jsx("code",{children:"return installedModules[moduleId].exports"})]}),e.jsxs("li",{children:["不存在：",e.jsxs("ul",{className:"pl-60",children:[e.jsxs("li",{children:["1. 创建module对象(包含l,exports等属性)，moduleId作为key添加到",e.jsx("code",{children:"installedModules"}),"中"]}),e.jsxs("li",{children:["2. 执行该模块",e.jsx("code",{children:"modules[moduleId].call( module.exports, module, module.exports, __webpack_require__ )"})]}),e.jsxs("li",{children:["3. ",e.jsx("code",{children:"module.l = true"}),"标记模块已加载。"]}),e.jsxs("li",{children:["4. 最后返回",e.jsx("code",{children:"module.exports"})]})]})]})]}),e.jsx("h3",{id:"cjs",className:r.articleSubTitle,children:"CommonJS"}),"所以只要搞清楚了",e.jsx("code",{children:"require"}),"是怎么实现的，CommonJS模块化的工作原理也就懂了，同步执行引入的模块，返回module.exports或exports对象。",e.jsx("h3",{id:"diff",className:r.articleSubTitle,children:"ES Module"}),"那么ES Module的处理有什么不同呢？以如下代码为例：",s,e.jsx("br",{}),"cjs输出的代码还有好些辅助函数并没有提到，有一些就是支持ESM的，来看下ESM模块化的文件打包结果。",u,e.jsx("br",{}),"可以看到为了同时支持cjs/esm两种模块化规范，辅助函数部分一模一样。",e.jsx("br",{}),"除了基本的",e.jsx("code",{children:"__webpack_require__"}),"以外，esm需要借助的辅助函数多一些，所以这块也是一个优化点，现代浏览器是原生支持esm的，不需要辅助函数，可以跳过它们的打包过程。",e.jsx("br",{}),"从输出代码的不同之处来入手：",e.jsx("h3",{id:"r",className:r.articleSubTitle,children:"__webpack_require__.r"}),e.jsx("code",{children:"__webpack_require__.r"}),"在exports对象上添加",e.jsx("code",{children:"Symbol.toStringTag"}),"属性，这样对于exports对象使用",e.jsx("code",{children:"toString"}),"方法会返回",e.jsx("code",{children:"[Object Module]"}),"。",e.jsx("br",{}),"并且添加了",e.jsx("code",{children:"__esModule"}),"标识。",e.jsx("h3",{id:"d",className:r.articleSubTitle,children:"__webpack_require__.d"}),e.jsx("code",{children:"__webpack_require__.d"}),"在exports对象上对每个key添加了getter属性。",e.jsx("h3",{id:"esmSummary",className:r.articleSubTitle,children:"Es Module的实现"}),"ESM和CJS主要区别在于传入参数的代码部分",e.jsxs("ul",{className:r.ul,children:[e.jsxs("li",{children:["1. ESM新增了临时对象",e.jsx("code",{children:"_module2__WEBPACK_IMPORTED_MODULE_0__ "}),"来创建引用，代码实际上访问的还是exports对象"]}),e.jsxs("li",{children:["2. 对于",e.jsx("code",{children:"export default"}),"的导出，在exports对象上添加",e.jsx("code",{children:"default"}),"属性。对于",e.jsx("code",{children:"export"}),"的导出，在exports对象上添加属性",e.jsx("code",{children:"getter"}),"，返回的是实际变量值。"]})]}),e.jsx("h2",{id:"summary",className:r.articleTitle,children:"总结"}),"CommonJS导出的是对象本身，如果是值类型的即使修改了改变量也不会影响其他地方，当然引用类型的还是会影响。",e.jsx("br",{}),e.jsx("br",{}),"因为导出的是对象，编译阶段时不会读取对象的内容，不知道导出了哪些变量和从哪里导入进来的。只有运行时才能访问对象的属性，确定依赖关系，所以说CommonJS是动态加载的。",e.jsx("br",{}),e.jsx("br",{}),"对于ES Module而言，对于每个变量都定义了getter，导入该模块访问变量时触发getter，返回的是模块中的同名变量，如果该值发生变化，会影响所有的引用。",e.jsx("br",{}),e.jsx("br",{}),"ES Module导出的并不是对象，在编译时，就可以确定模块之间的依赖关系，所以可以认为ES Module是静态加载的，",e.jsx("code",{children:"tree shaking"}),"就是由此而来。"]}),e.jsx(d,{items:[{key:"1",title:"前言",href:"#pre"},{key:"2",title:"借助Webpack分析",href:"#webpack",children:[{key:"3",title:"__webpack_require__",href:"#require"},{key:"4",title:"CommonJS",href:"#cjs"},{key:"5",title:"ES Module",href:"#esm",children:[{key:"6",title:"__webpack_require__.r",href:"#r"},{key:"7",title:"__webpack_require__.d",href:"#d"},{key:"8",title:"Es Module的实现",href:"#esmSummary"}]},{key:"9",title:"总结",href:"#summary"}]}]})]})}export{h as default};
