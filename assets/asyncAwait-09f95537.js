import{j as e,d as t}from"./index-829bfc52.js";import{U as r}from"./useMarkdown-aabb00ed.js";import{A as h}from"./Anchor-23ca89a7.js";const m=`\`\`\`js
let promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  
  async function a() {
    let a = await promise;
    console.log(a);
  }
  
  a();
\`\`\``,x=`\`\`\`js
(function (modules) {
    // …… 省略模块化相关辅助函数
})({
    "./app.js": function (module, exports) {
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function () {
          var self = this,
            args = arguments;
          return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "next",
                value
              );
            }
            function _throw(err) {
              asyncGeneratorStep(
                gen,
                resolve,
                reject,
                _next,
                _throw,
                "throw",
                err
              );
            }
            _next(undefined);
          });
        };
      }
      var promise = new Promise(function (resolve) {
        setTimeout(function () {
          resolve(1);
        }, 1000);
      });
      function a() {
        return _a.apply(this, arguments);
      }
      // 根据await语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next分别执行每个case
      function _a() {
        _a = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            var a;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return promise;
                  case 2:
                    a = _context.sent;
                    console.log(a);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })
        );
        return _a.apply(this, arguments);
      }
      a();
    },
  });
  //# sourceMappingURL=bundle.js.map  
\`\`\``,p=`\`\`\`js
exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype); // 该prototype上拥有["next", "throw", "return"]这些属性用于执行
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };
\`\`\``,f=`\`\`\`js
function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator =
      outerFn && outerFn.prototype instanceof Generator
        ? outerFn
        : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // context有prev,next.done,sent,method,arg等属性，也有stop,complete,abrupt等方法。

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
\`\`\``,v=`\`\`\`js
function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
}

function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          // 如果record.arg===ContinueSentinel，继续执行循环，直到状态变化。
          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done,
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }
\`\`\``,g=`\`\`\`js
function sleep(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let sec = seconds / 1000;
      console.log(sec);
      resolve(sec);
    }, seconds);
  });
}

function* a() {
  yield sleep(1000);
  yield sleep(2000);
}

function asyncAutomation(genFn) {
  const generator = genFn();

  const _automation = (result) => {
    let nextData = generator.next(result);
    if (nextData.done) {
      return;
    }
    Promise.resolve(nextData.value).then((res) => _automation(res)); //防止yield非promise
  };

  _automation();
}

asyncAutomation(a);
\`\`\``,y="```js\nexports.awrap = function(arg) {\n  return { __await: arg };\n};\n```",j=`\`\`\`js
exports.async = function(innerFn, outerFn, self, tryLocsList) {
  var iter = new AsyncIterator(
    wrap(innerFn, outerFn, self, tryLocsList)
  );

  return exports.isGeneratorFunction(outerFn)
    ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
};
\`\`\``,w=`\`\`\`js
function AsyncIterator(generator) {
  function invoke(method, arg, resolve, reject) {
    var record = tryCatch(generator[method], generator, arg);
    if (record.type === "throw") {
      reject(record.arg);
    } else {
      var result = record.arg;
      var value = result.value;
      if (value &&
          typeof value === "object" &&
          hasOwn.call(value, "__await")) {
        return Promise.resolve(value.__await).then(function(value) {
          invoke("next", value, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        });
      }

      return Promise.resolve(value).then(function(unwrapped) {
        // When a yielded Promise is resolved, its final value becomes
        // the .value of the Promise<{value,done}> result for the
        // current iteration.
        result.value = unwrapped;
        resolve(result);
      }, function(error) {
        // If a rejected Promise was yielded, throw the rejection back
        // into the async generator function so it can be handled there.
        return invoke("throw", error, resolve, reject);
      });
    }
  }

  var previousPromise;

  function enqueue(method, arg) {
    function callInvokeWithMethodAndArg() {
      return new Promise(function(resolve, reject) {
        invoke(method, arg, resolve, reject);
      });
    }

    return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(
        callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg
      ) : callInvokeWithMethodAndArg();
  }

  // Define the unified helper method that is used to implement .next,
  // .throw, and .return (see defineIteratorMethods).
  this._invoke = enqueue;
}
\`\`\``;function S(){const n=e.jsx(r,{markdown:m}),o=e.jsx(r,{markdown:x}),a=e.jsx(r,{markdown:p}),i=e.jsx(r,{markdown:f}),s=e.jsx(r,{markdown:v}),c=e.jsx(r,{markdown:g}),l=e.jsx(r,{markdown:j}),d=e.jsx(r,{markdown:y}),u=e.jsx(r,{markdown:w});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"async await"}),"async函数是使用",e.jsx("code",{children:"async"}),"关键字的函数，是",e.jsx("code",{children:"AysncFunction"}),"的实例，并且其中允许使用",e.jsx("code",{children:"await"}),"关键字。它们提供了一种更简洁的基于",e.jsx("code",{children:"Promise"}),"的代码编写方式，可以把链式调用改为同步写法。",e.jsx("h2",{id:"webpack",className:t.articleTitle,children:"打包分析"}),"那么它是如何实现的呢？此处我们依然是借助webpack+babel打包，通过输出后的代码分析，准备源码如下：",n,"输出：",o,e.jsx("br",{}),"可以看到代码添加了",e.jsx("code",{children:"asyncGeneratorStep"}),",",e.jsx("code",{children:"_asyncToGenerator"}),"辅助函数。",e.jsx("br",{}),"执行过程中调用",e.jsx("code",{children:"_asyncToGenerator"}),"，将函数a转换为执行函数_a,内部是一个用Promise包装的无限循环，当函数完成或抛出异常时结束循环。",e.jsx("br",{}),"接下来看一下",e.jsx("code",{children:"regeneratorRuntime"}),"的",e.jsx("code",{children:"mark,wrap"}),"函数都干了什么。",e.jsx("h3",{id:"diff",className:t.articleSubTitle,children:"regeneratorRuntime"}),"如果直接用输出的代码起个服务，就会看到控制台报错：",e.jsx("code",{children:"regeneratorRuntime is not defined"}),"。使用async await语法时，如果要在不支持的targets上使用，需要引入",e.jsx("code",{children:"@babel/plugin-transform-runtime"}),"获取完整支持。",e.jsx("br",{}),"由于整个runtime代码行数过多，下文只讨论涉及到的内容",e.jsx("h3",{id:"mark",className:t.articleSubTitle,children:"mark"}),e.jsx("code",{children:"mark"}),"方法将传入的fn的原型设为",e.jsx("code",{children:"GeneratorFunctionPrototype"}),"，也就是将函数转为迭代器函数。",a,e.jsx("h3",{id:"wrap",className:t.articleSubTitle,children:"wrap"}),"主要是调用了",e.jsx("code",{children:"makeInvokeMethod"}),i,"函数首先设置state为",e.jsx("code",{children:"GenStateSuspendedStart"}),"，并调用",e.jsx("code",{children:"makeInvokeMethod"}),"设置了invoke函数用于执行innerFn",e.jsx("br",{}),e.jsx("h3",{id:"makeInvokeMethod",className:t.articleSubTitle,children:"makeInvokeMethod"}),"内部主要通过",e.jsx("code",{children:"tryCatch"}),"来执行",e.jsx("code",{children:"innerFn"}),"，也就是wrap包裹的函数。",s,"分析调用流程：",e.jsx("br",{}),e.jsxs("ul",{className:t.ul,children:[e.jsx("li",{children:"首先函数被转换为上面的代码"}),e.jsx("li",{children:e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 通过",e.jsx("code",{children:"await"}),"分割生成器函数代码生成",e.jsx("code",{children:"_callee$"}),"函数"]}),e.jsx("li",{children:"2. context对象用于储存函数执行上下文，包括各种属性和方法"}),e.jsxs("li",{children:["3. invoke()定义next()，用于执行",e.jsx("code",{children:"_callee$"}),"跳到下一步"]})]})}),e.jsx("li",{children:"调用next，进入switch语句，根据context的标识执行对应的case块，return对应结果。"}),e.jsxs("li",{children:["运行到结尾，switch匹配不到返回空值，next的返回值为",e.jsx("code",{children:"{value:undefined,done:true}"})]})]}),e.jsx("h2",{id:"generator",className:t.articleTitle,children:"自行实现"}),"可以发现把函数名换成async函数，把yield替换成await就实现了异步代码同步写法了。",c,e.jsx("h2",{id:"summary",className:t.articleTitle,children:"总结"}),"所以Async await也被称为是语法糖，增加了新的关键字。它们是在generator基础上实现。",e.jsx("h3",{id:"async",className:t.articleSubTitle,children:"async"}),e.jsx("code",{children:"async"}),"关键字用于包裹函数，然后调用",e.jsx("code",{children:"next"}),"方法。",l,e.jsx("h3",{id:"await",className:t.articleSubTitle,children:"await"}),"await就是",e.jsx("code",{children:"yield"}),"，实际上调用了",e.jsx("code",{children:"regeneratorRuntime.awrap(x)"}),"加上了",e.jsx("code",{children:"__await"}),"属性用于标识状态",d,e.jsx("h3",{id:"invoke",className:t.articleSubTitle,children:"AsyncIterator"}),"AsyncIterator部分完整代码:",u]}),e.jsx(h,{items:[{title:"Async await",key:"1",href:"#pre"},{title:"打包分析",key:"2",href:"#webpack",children:[{title:"regeneratorRuntime",key:"3",href:"#regeneratorRuntime"},{title:"mark",key:"4",href:"#mark"},{title:"makeInvokeMethod",key:"5",href:"#makeInvokeMethod"}]},{title:"generator",key:"6",href:"#generator"},{title:"summary",key:"7",href:"#summary",children:[{title:"async",key:"8",href:"#async"},{title:"await",key:"9",href:"#await"},{title:"invoke",key:"10",href:"#invoke"}]}]})]})}export{S as default};
