import{j as e,d as s}from"./index-ad5eedbe.js";import{U as r}from"./useMarkdown-b33dbcc0.js";import{A as o}from"./Anchor-c966fdc9.js";import"./index-47679770.js";const n=`\`\`\`ts
type Status = 'fulfilled' | 'rejected' | 'pending';
type HandleFunc = (value: unknown) => any;
type Func = (value: unknown) => void;
type Executor = (resolve: Func, reject: Func) => MyPromise;

class MyPromise {
  status:Status;
  constructor() {
    this.status = 'pending';
  }
}
\`\`\``,c=`\`\`\`ts
type Status = 'fulfilled' | 'rejected' | 'pending';

class MyPromise {
  status:Status;
  value: unknown;
  reason: unknown;
  onResolvedCallbacks: Function[] = [];
  onRejectedCallbacks: Function[] = [];
  
  constructor() {
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve: Func = value => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(func => func());
      }
    };

    let reject: Func = reason => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(func => func());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullfilled?: HandleFunc, onRejected?: HandleFunc) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : y => y;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };

    let promise2;
    if (this.status === 'fulfilled') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFullfilled?.(this.value);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected?.(this.reason);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfilled?.(this.value);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected?.(this.reason);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }
}
\`\`\``,d=`\`\`\`ts
type HandleFunc = (value: unknown) => any;

type Func = (value: unknown) => void;

type Executor = (resolve: Func, reject: Func) => void;

type Status = 'fulfilled' | 'rejected' | 'pending';

class MyPromise {
  status: Status;
  value: unknown;
  reason: unknown;
  onResolvedCallbacks: Function[] = [];
  onRejectedCallbacks: Function[] = [];

  constructor(executor: Executor) {
    this.status = 'pending';
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve: Func = value => {
      if (this.status === 'pending') {
        this.value = value;
        this.status = 'fulfilled';
        this.onResolvedCallbacks.forEach(func => func());
      }
    };

    let reject: Func = reason => {
      if (this.status === 'pending') {
        this.reason = reason;
        this.status = 'rejected';
        this.onRejectedCallbacks.forEach(func => func());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFullfilled?: HandleFunc, onRejected?: HandleFunc) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : y => y;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : err => {
            throw err;
          };

    let promise2: MyPromise | null = null;
    if (this.status === 'fulfilled') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFullfilled?.(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'rejected') {
      promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let reason = onRejected?.(this.reason);
            resolvePromise(promise2, reason, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }

    if (this.status === 'pending') {
      promise2 = new MyPromise((resolve, reject) => {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFullfilled?.(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let reason = onRejected?.(this.reason);
              resolvePromise(promise2, reason, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });
    }

    return promise2;
  }
}

function resolvePromise(promise2: MyPromise | null, x: any, resolve: Func, reject: Func) {
  if (promise2 === x) {
    // 防止循环引用
    reject(new TypeError());
  }
  let called = false; //标记是否调用过resolve或者reject
  if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y: unknown) => {
            if (called) {
              return;
            }
            called = true;
            //递归调用自身，支持链式调用
            resolvePromise(promise2, y, resolve, reject);
          },
          (reason: unknown) => {
            if (called) {
              return;
            }
            called = true;
            reject(reason);
          }
        );
      } else {
        // then只是普通对象
        resolve(x);
      }
    } catch (error) {
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    if (called) {
      return;
    }
    called = true;
    resolve(x);
  }
}
\`\`\``;function m(){const l=e.jsx(r,{markdown:n}),t=e.jsx(r,{markdown:c}),i=e.jsx(r,{markdown:d});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"promise",className:"font-semibold text-h2 mb-2",children:"Promise"}),"Promise代表一个未完成的操作，它能够简化异步的操作，增强代码可读性，promise最主要的交互方式就是我们熟悉的",e.jsx("code",{children:"then"}),"方法。本文会按照",e.jsx("a",{className:s.href,target:"_blank",rel:"noreferrer",href:"https://promisesaplus.com/",children:"Promises/A+规范"}),"来一步步实现它。",e.jsx("br",{}),e.jsx("h2",{id:"status",className:s.articleTitle,children:"Promise状态"}),e.jsx("h3",{id:"standard1",className:s.articleSubTitle,children:"规范"}),"promise必须是以下三种状态之一：",e.jsx("code",{children:"pending"}),",",e.jsx("code",{children:"fulfilled"}),",",e.jsx("code",{children:"rejected"}),e.jsxs("ul",{children:[e.jsx("li",{children:"1. pending: promise可以变成fulfilled或者rejected"}),e.jsx("li",{children:"2. fulfilled: promise不能再变成其他状态，必须有一个不可变的值"}),e.jsx("li",{children:"3. rejected: promise不能再变成其他状态，必须有一个不可变的理由"})]}),e.jsx("h3",{id:"code1",className:s.articleSubTitle,children:"实现"}),"所以先给我们的类加上status属性，在构造函数内给status默认设为pending状态",l,e.jsx("h2",{id:"then",className:s.articleTitle,children:"then"}),e.jsx("h3",{id:"standard2",className:s.articleSubTitle,children:"规范"}),"promise必须提供",e.jsx("code",{children:"then"}),"方法来访问它当前或最终的值或者失败理由，所以需要给Promise类加上value和reason属性来保存值，提供then方法来访问。",e.jsx("br",{}),e.jsx("code",{children:"then"}),"方法接收两个参数:",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"promise.then(onFulfilled, onRejected)"}),e.jsx("br",{}),e.jsx("br",{}),"onFulfilled, onRejected都是可选参数，如果它们不是函数，那就必须被忽略。",e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:["如果onFulfilled是函数：在promise变为fulfilled状态之后，onFulfilled才能执行，",e.jsx("code",{children:"value"}),"作为第一个参数，并且只能调用一次。"]}),e.jsxs("li",{children:["如果onRejected是函数：在promise变为rejected状态之后，onRejected才能执行，",e.jsx("code",{children:"reason"}),"作为第一个参数，并且只能调用一次。"]})]}),"onFulfilled和onRejected不能在当前执行上下文调用。",e.jsx("br",{}),e.jsx("br",{}),"onFulfilled和onRejected必须以函数的方式调用(不要涉及到this，在严格模式下this是undefined,松散模式下是global)",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"then"}),"可能在同一个promise中被调用多次，当promise状态变为fulfilled/rejected之后，onFulfilled/onRejected回调函数分别按then开始调用的顺序执行",e.jsx("br",{}),e.jsx("br",{}),e.jsx("code",{children:"then"}),"必须返回promise",e.jsx("br",{}),e.jsx("code",{children:"promise2 = promise1.then(onFulfilled,onRejected)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["1. 如果onFulfilled或者onRejected返回了一个值",e.jsx("code",{children:"x"}),"，执行Promise消除程序",e.jsx("code",{children:"[[Resolve]](promise2, x)"})]}),e.jsx("li",{children:"2. 如果onFulfilled或者onRejected抛出了异常，promise2必须被rejected，reason就是e"}),e.jsx("li",{children:"3. 如果onFulfilled不是函数且promise1已经是fulfilled状态了,promise2也必须变为fulfilled，且value和promise1一样"}),e.jsx("li",{children:"4. 如果onRejected不是函数且promise1已经rejected了，promise2也必须变为rejected，且reason和promise1一样"})]}),e.jsx("h3",{id:"code2",className:s.articleSubTitle,children:"实现"}),"通过上述规范，需要给MyPromise新增value,reason属性，then()方法。",e.jsx("br",{}),"then()方法传入onFulfilled,onRejected参数，并且判断它们是否是函数，如果不是则赋值为函数。",e.jsx("br",{}),"then函数必须返回promise2，所以声明promise2变量，然后根据不同的状态进行处理，最后返回promise2.",e.jsx("br",{}),t,e.jsx("h2",{id:"promiseResolutionProcedure",className:s.articleTitle,children:"Promise解决程序(Promise Resolution Procedure)"}),"可以看到then方法执行了onFullfiled或者onRejected获得返回值之后就没有继续了，此处缺少了promise解决程序。这一部分我们根据规范将它补上，整个Promise实现就完成了。",e.jsx("h3",{id:"standard3",className:s.articleSubTitle,children:"规范"}),"Promise解决程序接收promise和value作为参数，标记为",e.jsx("code",{children:"[[resolve]](promise,x)"}),"。如果x有then属性，它会尝试让promise接收x的状态，假设x跟promise行为一样。否则就将promise变为fulfilled状态，value就是x。",e.jsx("br",{}),e.jsx("br",{}),"这种处理方式支持链式调用，步骤如下：",e.jsxs("ul",{children:[e.jsx("li",{children:"1. 如果promise和x指向同一个对象，那么reject promise。"}),e.jsxs("li",{children:["2. 如果x是promise，接收它的状态。",e.jsxs("ul",{className:"pl-60",children:[e.jsx("li",{children:"2.1. 如果x是pending状态，promise必须保持pending直到变为fulfilled或者rejected"}),e.jsx("li",{children:"2.2. 如果x是fulfilled状态，将promise变为相同的状态和value"}),e.jsx("li",{children:"2.3. 如果x是rejected状态，将promise变为相同的状态和reason"})]})]}),e.jsxs("li",{children:["3. 如果x是对象或者函数",e.jsxs("ul",{className:"pl-60",children:[e.jsx("li",{children:"3.1. then设为x.then"}),e.jsx("li",{children:"3.2. 如果获取x.then报错，该异常作为reason，reject promise"}),e.jsxs("li",{children:["3.3. 如果then是函数，用x作为this来调用它，第一个参数是resolvePromise,第二个参数是rejectPromise，具体如下：",e.jsxs("ul",{className:"pl-60",children:[e.jsxs("li",{children:["3.3.1. 如果resolvePromise被调用了，值为y，执行",e.jsx("code",{children:"[[resolve]](promise,y)"})]}),e.jsxs("li",{children:["3.3.2 如果rejectPromise被调用了，reason为r，执行",e.jsx("code",{children:"reject(r)"})]}),e.jsx("li",{children:"3.3.3 如果两个都被调用了，或者多次用相同的参数调用。第一次调用优先，后续的忽略。"}),e.jsxs("li",{children:["3.3.4 如果调用then时抛出异常e，判断resolvePromise或者rejectPromise是否已执行，如果执行了就忽略，否则",e.jsx("code",{children:"reject(e)"})]})]})]}),e.jsx("li",{children:"3.4 如果then不是函数，promise状态设为fulfill,值为x"})]})]}),e.jsx("li",{children:"4. 如果x不是对象也不是函数，promise状态设为fulfill,值为x"})]}),e.jsx("h3",{id:"code3",className:s.articleSubTitle,children:"实现"}),"所以这里需要定义一个函数来解决promise，并且在then函数中调用该解决函数，按照规范得出完整代码如下。",i]}),e.jsx(o,{items:[{title:"Promise",key:"promise",href:"#promise"},{title:"Promise状态",key:"status",href:"#status",children:[{title:"规范",key:"standard1",href:"#standard1"},{title:"实现",key:"code1",href:"#code1"}]},{title:"then",href:"#then",key:"then",children:[{title:"规范",href:"#standard2",key:"standard2"},{title:"实现",href:"#code2",key:"code2"}]},{title:"Promise解决程序",key:"promiseResolutionProcedure",href:"#promiseResolutionProcedure",children:[{title:"规范",href:"#standard3",key:"standard3"},{title:"实现",href:"#code3",key:"code3"}]}]})]})}export{m as default};
