import{j as e,d as r,e as m}from"./index-06d0604c.js";import{U as a}from"./useMarkdown-7879de16.js";import{A as p}from"./Anchor-98b0e2a3.js";import{A as s}from"./index-a06ddd25.js";import"./index-69c83c67.js";import"./pickAttrs-50f8811b.js";const h="express是一个快速、灵活的轻量级Node.js Web应用程序开发框架，github star数量为59k。",u="相比express，koa没有绑定任何中间件，更轻量，按需引用中间件。koa2支持async/await，控制执行顺序和异常处理变得更容易。基于它编写中间件也更简单。它的github star数量为33k。",x=`\`\`\` js
app.use("/", indexRouter);

app.use(function (req, res, next) {
  console.log("第一个中间件start");
  setTimeout(() => {
    next();
  }, 1000);
  console.log("第一个中间件end");
});
app.use(function (req, res, next) {
  console.log("第二个中间件start");
  setTimeout(() => {
    next();
  }, 1000);
  console.log("第二个中间件end");
});
app.use("/foo", function (req, res, next) {
  console.log("接口逻辑start");
  next();
  console.log("接口逻辑end");
});
\`\`\``,f=`\`\`\`js
app.use(function (req, res, next) {
    console.log('第一个中间件start');
    next()
    console.log('第一个中间件end');
});
app.use(function (req, res, next) {
    console.log('第二个中间件start');
    next()
    console.log('第二个中间件end');
});
app.use('/foo', function (req, res, next) {
    console.log('接口逻辑start');
    next();
    console.log('接口逻辑end');
});
\`\`\``,j=`\`\`\`js
proto.use = function use(fn) {
  var offset = 0;
  var path = '/';

  var callbacks = flatten(slice.call(arguments, offset));

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];

    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer); //重点，将layer push到stack中
  }

  return this;
};

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  this.handle = fn; //handle就是fn本身
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;

}
\`\`\``,k=`\`\`\`js
proto.handle = function handle(req, res, out) {
  var self = this;
  var idx = 0;

  // middlewre and routes
  var stack = self.stack;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;


    // find next matching layer
    var layer;
    var match;
    var route;

    // 循环stack，取出layer并执行
    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      var method = req.method;
      var has_method = route._handles_method(method);


      // Capture one-time layer values
      req.params = self.mergeParams
        ? mergeParams(layer.params, parentParams)
        : layer.params;
      var layerPath = layer.path;
  
      // 执行layer
      self.process_params(layer, paramcalled, req, res, function (err) {
        if (err) {
          next(layerError || err)
        } else if (route) {
          layer.handle_request(req, res, next)
        } else {
          trim_prefix(layer, layerError, layerPath, path)
        }
  
        sync = 0
      });
    }
  }
}
};
\`\`\``,y=`\`\`\`js
proto.process_params = function process_params(layer, called, req, res, done) {
  var params = this.params;

  // captured parameters from the layer, keys and values
  var keys = layer.keys;

  // fast track
  if (!keys || keys.length === 0) {
    return done();
  }

  var i = 0;
  var name;
  var paramIndex = 0;
  var key;
  var paramVal;
  var paramCallbacks;
  var paramCalled;

  // 按顺序执行，callbacks可能是异步的
  function param(err) {
    if (err) {
      return done(err);
    }

    if (i >= keys.length ) {
      return done();
    }

    paramIndex = 0;
    key = keys[i++];
    name = key.name;
    paramVal = req.params[name];
    paramCallbacks = params[name];
    paramCalled = called[name];

    if (paramVal === undefined || !paramCallbacks) {
      return param();
    }

    // param previously called with same value or error occurred
    if (paramCalled && (paramCalled.match === paramVal
      || (paramCalled.error && paramCalled.error !== 'route'))) {
      // restore value
      req.params[name] = paramCalled.value;

      // next param
      return param(paramCalled.error);
    }

    called[name] = paramCalled = {
      error: null,
      match: paramVal,
      value: paramVal
    };

    paramCallback();
  }

  // single param callbacks
  function paramCallback(err) {
    var fn = paramCallbacks[paramIndex++];

    // store updated value
    paramCalled.value = req.params[key.name];

    if (err) {
      // store error
      paramCalled.error = err;
      param(err);
      return;
    }

    if (!fn) return param();

    try {
      fn(req, res, paramCallback, paramVal, key.name);
    } catch (e) {
      paramCallback(e);
    }
  }

  param();
};
\`\`\``,v=`\`\`\`js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    // 递归返回一个函数，返回值为promise对象
    return dispatch(0)
    function dispatch (i) {
      // 防止next多次调用
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // 最后一个中间件
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      // Promise封装中间件，递归调用
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
\`\`\``,b=`\`\`\`js
use (fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
  debug('use %s', fn._name || fn.name || '-')
  this.middleware.push(fn)
  return this
}
callback () {
  const fn = this.compose(this.middleware)

  if (!this.listenerCount('error')) this.on('error', this.onerror)

  const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res)
    return this.handleRequest(ctx, fn)
  }

  return handleRequest
}
listen (...args) {
  debug('listen')
  const server = http.createServer(this.callback())
  return server.listen(...args)
}
\`\`\``,w="/luoyunlai/assets/koa-ba72733b.png";function N(){const t=e.jsx(a,{markdown:x}),n=e.jsx(a,{markdown:f}),l=e.jsx(a,{markdown:j}),o=e.jsx(a,{markdown:k}),i=e.jsx(a,{markdown:y}),c=e.jsx(a,{markdown:b}),d=e.jsx(a,{markdown:v});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"express",className:"font-semibold text-h2 mb-2",children:"express中间件"}),"提到Node.js，绕不开的框架就是express以及原班人马开发的koa",e.jsx("br",{}),e.jsx("br",{}),e.jsx(s,{type:"info",message:h}),e.jsx("br",{}),"如下是一段熟悉的中间件代码：",e.jsx("a",{className:r.href,target:"_blank",rel:"noreferrer",href:"https://codesandbox.io/s/modest-cray-s3t4o1",children:"codeSandbox"}),e.jsx("br",{}),t,"输出如下：",e.jsxs("div",{className:r.markdown,children:[e.jsx("div",{children:"第一个中间件start"}),e.jsx("div",{children:"第一个中间件end"}),e.jsx("div",{children:"第二个中间件start"}),e.jsx("div",{children:"第二个中间件end"}),e.jsx("div",{children:"接口逻辑start "}),e.jsx("div",{children:"接口逻辑end"})]}),e.jsx("br",{}),"但是，如果把setTimeout移除，直接调用next()：",n,"输出如下：",e.jsxs("div",{className:r.markdown,children:[e.jsx("div",{children:"第一个中间件start"}),e.jsx("div",{children:"第二个中间件start"}),e.jsx("div",{children:"接口逻辑start"}),e.jsx("div",{children:"接口逻辑end"}),e.jsx("div",{children:"第二个中间件end"}),e.jsx("div",{children:"第一个中间件end"})]}),"这种输出看着跟koa的输出没区别啊？确实是，但是它和洋葱模型不同，这种输出的结果其实是因为代码是同步运行导致的，express是线性的模型。",e.jsx("h3",{id:"expressSource",className:r.articleSubTitle,children:"源码解析"}),"我们来看一下源码(有删减，只看关键部分)。",e.jsx("div",{className:r.assist,children:"lib\\router\\index.js"}),"中间件的挂载主要通过",e.jsx("code",{children:"proto.use"}),"和",e.jsx("code",{children:"proto.handle"}),l,e.jsx("br",{}),e.jsx("code",{children:"proto.use"}),"主要将挂载的中间件存储在stack属性上，具体实现还要看",e.jsx("code",{children:"proto.handle"}),"的",e.jsx("code",{children:"next方法"}),e.jsx("br",{}),e.jsx("br",{}),o,e.jsx("br",{}),e.jsx("code",{children:"proto.handle"}),"中遍历stack，并取出layer并执行，具体执行逻辑在",e.jsx("code",{children:"process_params"}),e.jsx("br",{}),e.jsx("br",{}),i,"其实就是按stack顺序执行，比如第一个栗子，此时setTimeout这种异步代码会跳过，不会执行next，同步代码执行完后再执行。当没有异步代码时，就是按正常的层层嵌套顺序走下去，所以输出了跟洋葱模型类似的结果",e.jsx("h2",{id:"express",className:r.articleTitle,children:"koa中间件"}),e.jsx(s,{type:"info",message:u}),e.jsx("h3",{id:"onion",className:r.articleSubTitle,children:"洋葱模型"}),e.jsx(m,{src:w}),"一句话概括就是按中间件的顺序添加中间件形成嵌套的Promise,next函数就是下一个中间件，await需要等待内部promise执行，执行结果会呈现一个类似剥洋葱的模型。",e.jsx("br",{}),e.jsx("h3",{id:"koaSource",className:r.articleSubTitle,children:"源码解析"}),e.jsx("div",{className:r.assist,children:"lib\\application.js"}),c,e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 首先koa调用",e.jsx("code",{children:"use"}),"将回调函数push到",e.jsx("code",{children:"middleware"}),"数组"]}),e.jsxs("li",{children:["2. 调用",e.jsx("code",{children:"listen"}),"，启动httpServer的同时，调用",e.jsx("code",{children:"callback"})]}),e.jsxs("li",{children:["3. callback调用",e.jsx("code",{children:"compose"}),"执行中间件"]})]}),d,"在compose中，对",e.jsx("code",{children:"middleware"}),"中间件数组进行递归调用，返回一个Promise链。"]}),e.jsx(p,{items:[{title:"express中间件",key:"express",href:"#express",children:[{title:"源码解析",key:"expressSource",href:"#expressSource"}]},{title:"koa中间件",key:"koa",href:"#koa",children:[{title:"洋葱模型",key:"onion",href:"#onion"},{title:"源码解析",key:"koaSource",href:"#koaSource"}]}]})]})}export{N as default};
