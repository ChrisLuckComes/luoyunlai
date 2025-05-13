import{j as e,d as r,e as t}from"./index-52cacda3.js";import{U as s}from"./useMarkdown-2196212a.js";import{A as j}from"./Anchor-4d1d2fe9.js";const d=`\`\`\`js 
function problem() {
  let a = {},
    b = {};

  a.a = b;
  b.b = a;
};
\`\`\``,x="```js\nlet element = document.getElementById('element'),\n    object = {};\n\nobject.element = element;\nelement.xxx = object;\n```",b=`\`\`\`js
function Article(){
  this.title = 'Article';
}

let a1 = new Article();
let a2 = new Article();
\`\`\``,h="```js\nfunction setName(){\n  name = 'lyl';\n}\n```",m="```js\nlet name = 'lyl';\nsetInterval(() =>{\n  console.log(name);\n}, 100)\n```",f=`\`\`\`js
let outer = function(){
  let name = 'lyl';
  return function(){
    return name;
  }
}
\`\`\``,p=`\`\`\`js
// V8内存分配
- 新生代：1-8MB
- 老生代：700MB-1.4GB
- 代码空间：约1GB
- 大对象空间：约1GB

// 系统限制
- 64位：约1.4GB
- 32位：约0.7GB
- 移动端：约512MB
\`\`\``,u=`\`\`\`js
// 内存优化技巧
1. 使用WeakMap/WeakSet
const cache = new WeakMap();

2. 使用ArrayBuffer
const buffer = new ArrayBuffer(1024);

3. 使用requestAnimationFrame
requestAnimationFrame(() => {
  // 动画逻辑
});
\`\`\``,g="```js\n// 垃圾回收触发条件\n1. 内存使用达到阈值\n2. 代码执行暂停时\n3. 系统内存不足时\n4. 手动触发（不推荐）\n```",S=`\`\`\`js
// 可达性判断的根节点（Root Set）
1. 全局对象（window/global）
2. 当前函数调用栈中的变量
3. DOM树中的引用
4. 闭包中的变量

// 可达性判断过程
function example() {
  let a = { name: 'test' };  // 可达：在调用栈中
  let b = { ref: a };        // 可达：通过a引用
  let c = { ref: b };        // 可达：通过b引用
  return c;                  // 返回c，使其在外部可达
}

// 不可达示例
function unreachable() {
  let x = { data: 'test' };  // 函数结束后不可达
  let y = { ref: x };        // 函数结束后不可达
}                            // 函数结束，x和y都不可达
\`\`\``,w=`\`\`\`js
// V8标记阶段的具体实现

// 1. 三色标记法
// 白色：未被标记的对象（初始状态）
// 灰色：已被标记但其子对象未被标记
// 黑色：已被标记且其子对象也已被标记

// 2. 标记过程
function markingProcess() {
  // 初始状态：所有对象都是白色
  let white = new Set([obj1, obj2, obj3]);
  let grey = new Set();
  let black = new Set();
  
  // 从根节点开始
  grey.add(root);
  
  // 标记过程
  while (grey.size > 0) {
    let current = grey.values().next().value;
    grey.delete(current);
    
    // 标记当前对象的所有子对象
    for (let child of current.children) {
      if (white.has(child)) {
        white.delete(child);
        grey.add(child);
      }
    }
    
    // 当前对象标记完成
    black.add(current);
  }
  
  // 剩余的白色对象就是垃圾
  return white;
}

// 3. 写屏障（Write Barrier）
// 在对象引用关系改变时触发
function writeBarrier(obj, field, newValue) {
  // 如果新值是黑色对象，将其变为灰色
  if (isBlack(newValue)) {
    newValue.color = 'grey';
  }
  obj[field] = newValue;
}

// 4. 增量标记
// 将标记过程分成多个小步骤执行
function incrementalMarking() {
  const BATCH_SIZE = 100;
  let marked = 0;
  
  while (grey.size > 0 && marked < BATCH_SIZE) {
    let current = grey.values().next().value;
    grey.delete(current);
    markObject(current);
    marked++;
  }
  
  // 如果还有未标记的对象，安排下一个标记周期
  if (grey.size > 0) {
    scheduleNextMarking();
  }
}
\`\`\``,C=`\`\`\`js
// V8清除和整理阶段的具体实现

// 1. 清除阶段（Sweep）
class Sweeper {
  constructor() {
    this.freeList = new Map(); // 按大小分类的空闲内存块
  }

  sweep(whiteObjects) {
    for (let obj of whiteObjects) {
      // 计算对象大小
      const size = this.getObjectSize(obj);
      
      // 将内存块添加到对应大小的freeList
      if (!this.freeList.has(size)) {
        this.freeList.set(size, []);
      }
      this.freeList.get(size).push(obj.memory);
      
      // 释放对象
      this.freeObject(obj);
    }
  }

  // 分配新对象
  allocate(size) {
    // 查找合适大小的空闲块
    const freeBlocks = this.freeList.get(size);
    if (freeBlocks && freeBlocks.length > 0) {
      return freeBlocks.pop();
    }
    // 如果没有合适大小的块，可能需要内存整理
    return null;
  }
}

// 2. 整理阶段（Compact）
class Compactor {
  constructor(heap) {
    this.heap = heap;
    this.forwardingAddresses = new Map();
  }

  compact() {
    // 1. 计算移动后的地址
    this.computeForwardingAddresses();
    
    // 2. 更新引用
    this.updateReferences();
    
    // 3. 移动对象
    this.moveObjects();
    
    // 4. 更新freeList
    this.updateFreeList();
  }

  computeForwardingAddresses() {
    let currentAddress = this.heap.start;
    
    // 遍历所有存活对象
    for (let obj of this.heap.liveObjects) {
      const size = this.getObjectSize(obj);
      
      // 记录对象的新地址
      this.forwardingAddresses.set(obj, currentAddress);
      currentAddress += size;
    }
  }

  updateReferences() {
    // 更新所有对象中的引用
    for (let obj of this.heap.liveObjects) {
      for (let field of obj.references) {
        if (this.forwardingAddresses.has(field)) {
          field = this.forwardingAddresses.get(field);
        }
      }
    }
  }

  moveObjects() {
    // 移动对象到新位置
    for (let [oldAddr, newAddr] of this.forwardingAddresses) {
      this.heap.copyObject(oldAddr, newAddr);
    }
  }

  updateFreeList() {
    // 更新空闲列表
    const lastObject = this.heap.liveObjects[this.heap.liveObjects.length - 1];
    const freeSpaceStart = this.forwardingAddresses.get(lastObject) + 
                          this.getObjectSize(lastObject);
    const freeSpaceSize = this.heap.end - freeSpaceStart;
    
    if (freeSpaceSize > 0) {
      this.heap.freeList.add(freeSpaceStart, freeSpaceSize);
    }
  }
}

// 3. 分代GC中的整理策略
class GenerationalCompactor {
  constructor() {
    this.youngGen = new Compactor(youngGenHeap);
    this.oldGen = new Compactor(oldGenHeap);
  }

  compact() {
    // 新生代使用复制式整理
    this.youngGen.copyCompact();
    
    // 老生代使用标记-整理
    this.oldGen.markCompact();
  }
}

// 4. 复制式整理（用于新生代）
function copyCompact(fromSpace, toSpace) {
  let toSpacePtr = toSpace.start;
  
  // 遍历fromSpace中的存活对象
  for (let obj of fromSpace.liveObjects) {
    // 复制对象到toSpace
    const size = getObjectSize(obj);
    copyObject(obj, toSpacePtr);
    
    // 更新转发地址
    forwardingAddresses.set(obj, toSpacePtr);
    toSpacePtr += size;
  }
  
  // 交换fromSpace和toSpace
  [fromSpace, toSpace] = [toSpace, fromSpace];
}
\`\`\``,k="/luoyunlai/assets/majorGC-44d4ac14.svg",y="/luoyunlai/assets/generation-17614e02.svg",G="/luoyunlai/assets/minorGC-eef37ba5.svg",O="/luoyunlai/assets/oldGen-e09e9ff8.svg";function V(){const a=e.jsx(s,{markdown:d}),n=e.jsx(s,{markdown:x}),i=e.jsx(s,{markdown:b}),c=e.jsx(s,{markdown:h}),o=e.jsx(s,{markdown:m}),l=e.jsx(s,{markdown:f});return e.jsxs("article",{id:"rootArticle",className:r.article,children:[e.jsxs("main",{className:r.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"垃圾回收"}),"在C/C++语言中，跟踪内存使用对开发者来说负担很大，也是很多问题的来源。在JavaScript中，内存分配和闲置资源回收都是自动的。 基本思路很简单：确定哪个变量不再使用，然后释放它占用的内存。这个过程是周期性的，每隔一段时间垃圾回收程序就会自动运行。它不是一个完美的方案，因为某块内存是否有用只靠算法是判定不了的。",e.jsx("br",{}),e.jsx("br",{}),"以局部变量为例，函数中的局部变量会在函数执行时存在。此时，栈/堆内存会分配空间以保存相应的值。函数内部使用了变量，然后退出，此时就不再需要那个局部变量，它占用的内存可以释放。",e.jsx("br",{}),e.jsx("br",{}),"但不是每次都这么明显，垃圾回收程序必须跟踪记录哪个变量还会使用，哪个变量不会使用。如何标记未使用的变量，在浏览器的发展史上，主要有以下两种标记策略：",e.jsx("h2",{id:"markSweep",className:r.articleTitle,children:"标记清除"}),"标记清除(mark-and-sweep)是JavaScript最常用的垃圾回收策略。当变量进入上下文，例如在函数内部声明一个变量时，变量会被加上存在于上下文的标记。在上下文中的变量，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。",e.jsx("br",{}),e.jsx("br",{}),"给变量加标记的方式有很多种，可以维护在上下文中和不在上下文中两个变量列表，也可以把一个列表转移到另一个列表。过程实现不重要，关键是策略。",e.jsx("br",{}),e.jsx("br",{}),"垃圾回收程序运行的时候，会标记内存中存储的所有变量，然后它会将所有上下文中的变量，以及被上下文中变量引用的变量的标记去掉。在此之后，还有标记的变量就是待删除的了，原因是任何上下文的变量都访问不到它们了。随后垃圾回收程序做一次",e.jsx("strong",{children:"内存清理"}),"，销毁带标记的所有值并回收内存。",e.jsx("br",{}),e.jsx("br",{}),"现在几乎所有浏览器都是采用标记清除或者变体，只是回收频率的差异。",e.jsx("h2",{id:"referenceCounting",className:r.articleTitle,children:"引用计数"}),"引用计数(reference counting)是一种不常用的策略。它的思路是对每个值都记录它被引用的次数，声明变量并给它赋一个引用值时，这个值的引用数为1。如果同一个值又被赋给另一个变量，那么引用数+1.类似的，如果保存对该值引用的变量被其他值给覆盖了，那么引用数-1。当一个值的引用数为0时，说明没办法访问到这个值，可以回收它的内存了。垃圾回收程序下次运行的时候就会释放引用数为0的值的内存。",e.jsx("br",{}),e.jsx("br",{}),"这种策略有严重的问题，循环引用，循环引用就是两个对象互相引用，有如下代码：",a,"这个栗子，a,b通过各自的属性互相引用，它们的引用数都是2.在标记清除状态下，这不是问题，因为函数结束后两个对象都不在作用域中。而且引用计数策略下，a和b函数结束后还存在，因为它们的引用数永远不会变成0。如果函数被多次调用，会造成大量内存永远不会被释放。",e.jsx("br",{}),e.jsx("br",{}),"引用计数还不止如上问题。在IE8及更早版本中，BOM和DOM中的对象都不是原生JavaScript对象，它们使用引用计数实现垃圾回收。就算这些版本IE使用标记清除，涉及到BOM/DOM对象依然无法避开循环引用的问题，如下代码：",n,"这种情况又形成了循环引用，DOM元素的内存永远不会被回收，除非在不使用的情况下手动处理。",e.jsx("br",{}),e.jsx("code",{children:"object.element = null;element.xxx = null"}),e.jsx("br",{}),"将值设置为null可以切断引用。为了补救这点，IE9就把BOM和DOM对象都改成了JavaScript对象。",e.jsx("h2",{id:"v8",className:r.articleTitle,children:"V8垃圾回收策略"}),"V8使用的垃圾回收策略是标记整理(mark-compact)",e.jsxs("h3",{id:"major",className:r.articleSubTitle,children:["主要GC"," ",e.jsx("span",{className:r.assist,children:"Major GC(Mark-Compact 标记-整理)"})]}),"主要GC回收整个堆内存的垃圾，过程如下图：",e.jsx("br",{}),e.jsx("embed",{src:k,type:"image/svg+xml"}),e.jsx("div",{className:r.assistCenter,children:"主要GC过程分为三个阶段:标记、清除和整理"}),e.jsx("strong",{id:"mark",children:"标记阶段"}),e.jsx("br",{}),"搞清楚哪些对象可以被回收是垃圾回收必不可少的过程。垃圾回收器使用可达性代表存活。任意对象在运行时可以访问必须被保留，访问不到的就可能被回收。",e.jsx("br",{}),e.jsx("br",{}),"GC从",e.jsx("code",{children:"root set"}),"开始，它是已知对象指针的集合，包括执行上下文和全局对象。它跟踪每个对象指针，标记对象为可达(reachable)。GC继续递归的执行这个过程，直到每个可达对象在运行时被找到和标记。",e.jsx("br",{}),e.jsx("br",{}),"V8引擎在标记阶段使用了三色标记法，并实现了增量标记和写屏障机制，具体实现如下：",e.jsx(s,{markdown:w}),e.jsx("br",{}),"V8的标记过程主要包含以下几个关键点：",e.jsx("br",{}),"1. 三色标记法：使用白色、灰色、黑色三种颜色来标记对象的状态，确保标记过程的准确性。",e.jsx("br",{}),"2. 写屏障：在对象引用关系改变时触发，防止黑色对象引用白色对象导致的对象丢失。",e.jsx("br",{}),"3. 增量标记：将标记过程分成多个小步骤执行，避免长时间的停顿。",e.jsx("br",{}),e.jsx("br",{}),"可达性判断的具体过程如下：",e.jsx(s,{markdown:S}),e.jsx("br",{}),e.jsx("strong",{id:"sweep",children:"清除阶段"}),e.jsx("br",{}),e.jsx("br",{}),'清除阶段会将要被回收的"死亡"对象添加到称为',e.jsx("code",{children:"free-list"}),"的数据结构中，这个过程会在内存中留下空白。当标记阶段完成后，GC找到不可达对象留下的相邻的空白，并且将它们加到合适的free-list。为了快速查找，free-lists根据内存块的大小来区别。未来如果想分配内存，只需要从free-list找到合适大小的内存块。",e.jsx("br",{}),e.jsx("br",{}),"V8引擎在清除和整理阶段的具体实现如下：",e.jsx(s,{markdown:C}),e.jsx("br",{}),"V8的清除和整理过程主要包含以下几个关键点：",e.jsx("br",{}),"1. 清除阶段（Sweep）：",e.jsx("br",{}),"- 使用freeList按大小分类管理空闲内存块",e.jsx("br",{}),"- 将死亡对象的内存块添加到对应大小的freeList",e.jsx("br",{}),"- 提供内存分配接口，从freeList中查找合适大小的内存块",e.jsx("br",{}),e.jsx("br",{}),"2. 整理阶段（Compact）：",e.jsx("br",{}),"- 计算对象移动后的新地址",e.jsx("br",{}),"- 更新所有对象中的引用关系",e.jsx("br",{}),"- 移动对象到新位置",e.jsx("br",{}),"- 更新freeList",e.jsx("br",{}),e.jsx("br",{}),"3. 分代GC中的整理策略：",e.jsx("br",{}),"- 新生代使用复制式整理（Copy Compact）",e.jsx("br",{}),"- 老生代使用标记-整理（Mark Compact）",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{id:"compact",children:"整理"}),e.jsx("br",{}),"主要GC选择性的清理/整理某些页，在碎片启发式算法基础上(fragmentation heuristic)，就像在老电脑的硬盘碎片整理一样。复制当前不会被整理的存活的对象到其他页，这样可以利用死亡对象留下的分散的内存空白。",e.jsx("h3",{id:"generationalLayout",className:r.articleSubTitle,children:"两代之间的设计"}),"V8的堆内存分为不同的区域称为代(",e.jsx("strong",{children:"generation"}),")。新生代(young generation 细分为婴儿室",e.jsx("strong",{children:"nursery"}),"和中级的",e.jsx("strong",{children:"intermediate"}),"子生代)和老生代(old generation)。对象最开始分配到婴儿室，如果在下一次GC中存活，它会保留新生代中且被认为是中级的。如果又活过了另一次GC，它们会被移动到老生代。",e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{src:y}),e.jsx("div",{className:r.assistCenter,children:"V8堆内存被分割成generations，在GC后存活的对象会在generation之间移动"}),e.jsx("br",{}),"垃圾回收有一个重要术语:",e.jsx("code",{children:"The Generational Hypothesis"}),"代的假设，大多数对象分配之后很快就不可达了，这不仅仅是V8或者JS的表现，大多数动态语言都是这样。",e.jsx("br",{}),"V8这种代的堆内存设计利用了对象生命周期的事实。这里GC主要是整理/移动，当对象在垃圾回收存活就复制它们。这有点反直觉，因为在GC的时候复制对象的代价很高，但是只有小部分的对象能实际存活，其他的分配变成了垃圾。 实际上只需要和存活的对象成比例的花费，而不是所有的分配。",e.jsxs("h3",{id:"minor",className:r.articleSubTitle,children:["次要GC"," ",e.jsx("span",{className:r.assist,children:"Minor GC(Scavenger 捡破烂的人/清道夫)"})]}),"V8有两个垃圾回收器。",e.jsx("a",{className:r.href,target:"_self",rel:"noreferrer",href:"#major",children:"Major GC(Mark-Compact)"}),"从整个堆内存收集垃圾。",e.jsx("strong",{children:"Minor GC(Scavenger)"}),"从新生代收集垃圾。",e.jsx("br",{}),e.jsx("br",{}),"Scavenger中，存活的对象总是转移到另一页。V8对于新生代使用二分空间(semi-space)设计。意思就是整个空间的一半始终是空的，留给转移对象的步骤。在垃圾回收过程中，初始化为空的空间称为",e.jsx("strong",{children:"To-Space"}),"，需要复制对象的目标区域称为",e.jsx("strong",{children:"From-Space"}),"。 最坏的情况就是，每个对象都可以在scavenge下存活，它们都需要复制。",e.jsx("br",{}),e.jsx("br",{}),"为了执行清理，我们有额外的根节点集合，它们是旧空间中的指针，指向新生代中的对象。比起在每次清理追踪整个堆内存，V8使用写入边界(write barrriers)来维持一个从旧到新引用的列表。当执行上下文和全局合在一起时，V8知道每一个新生代的引用，不需要追踪整个老生代。",e.jsx("br",{}),e.jsx("br",{}),"转移的步骤移动所有存活的对象到相邻的内存块(同一页内)，这样有利于移除死对象留下的碎片。然后切换两个空间，To-Space和From-Space交换。一旦GC完成，新的内存分配从From-Space开始。",e.jsx("br",{}),e.jsx(t,{src:G}),e.jsx("div",{className:r.assistCenter,children:"Scavenger将存活的对象移动到新页"}),e.jsx("br",{}),"如果仅仅只用这种策略，很快就会内存耗尽。对象活过第二次GC就移动到老生代，而不是To-Space",e.jsx("br",{}),"最后一步就是更新指向原对象指针，每个复制的对象都会留下转发地址用于更新原来的指针，指向新的位置。",e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{src:O}),e.jsx("div",{className:r.assistCenter,children:"Scavenger将中级对象移动到老生代，婴儿室里的对象移动到新页"}),"在这个过程中，实际上做了下面三步：标记，移动，指针更新，都是交叉进行，而不是确定的阶段",e.jsx("h2",{id:"manage",className:r.articleTitle,children:"内存管理"}),"虽然说大多数开发者通常无需关心内存管理，但是JavaScript运行在浏览器中，分配给浏览器的内存通常少于桌面软件，移动浏览器更少。这主要是出于安全考虑，避免网页大量运行JavaScript耗尽能存导致系统崩溃，这个内存限制影响内存分配和同一个线程中能执行的语句数量。",e.jsx("br",{}),e.jsx("br",{}),"V8引擎的内存分配情况如下：",e.jsx(s,{markdown:p}),e.jsx("br",{}),"将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用手段之一就是",e.jsx("strong",{children:"解除引用"}),"：当数据不再必要，那么把它设置为null，就可以释放引用，最适合全局变量及其属性，因为局部变量超出作用域后会自动接触引用。",e.jsx("br",{}),e.jsx("br",{}),"现代JavaScript提供了一些内存优化的技巧：",e.jsx(s,{markdown:u}),e.jsx("br",{}),"垃圾回收的触发条件：",e.jsx(s,{markdown:g}),e.jsx("br",{}),"解除引用不会自动导致内存被回收，而是保证相关的值不在上下文里，下次GC会回收。",e.jsx("br",{}),"有如下手段可以提升性能：",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"1. 通过const和let声明提升性能"}),e.jsx("br",{}),"ES6增加这两个关键字有助于改进垃圾回收过程，因为它们都是块级作用域，相比于使用var，使用这两个关键字可能会更早的让垃圾回收程序介入。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2. 隐藏类和删除操作"}),e.jsx("br",{}),"使用V8引擎，V8将在解释后的JavaScript代码编译为实际的机器码时会利用隐藏类。",e.jsx("br",{}),"运行期间，V8会将创建的对象与隐藏类关联起来，以跟踪它们的属性。能够共享隐藏类的对象性能会更好，但不一定总能做到。如下代码：",i,"V8会让a1和a2共享相同的隐藏类，因为它们共享同一个构造函数和原型，如果后续又添加下面这行代码：",e.jsx("br",{}),e.jsx("code",{children:'a2.author = "lyl"'}),e.jsx("br",{}),"此时两个实例就会对应不同的隐藏类。根据这样的操作频率和隐藏类的大小，有可能对性能产生明显影响。",e.jsx("br",{}),"对此，解决方案就是避免这种先创建再补充的动态属性赋值，在构造函数中一次性声明所有属性。",e.jsx("br",{}),e.jsx("br",{}),"使用",e.jsx("code",{children:"delete"}),"关键字也会导致生成相同的隐藏类片段，和动态添加属性的后果一样，最佳实践是把不想要的属性设置为null，这样可以保持隐藏类不变继续共享，也能删除引用值供垃圾回收。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"3. 内存泄露"}),e.jsx("br",{}),"写的不好的代码可能出现难以察觉的内存泄露问题，大部分的内存泄露都是不合理的引用导致的。",e.jsx("br",{}),"意外声明全局变量是最常见也最容易修复的内存泄漏问题，如下:",c,"此时，解释器会把变量name当作window的属性来创建，相当于",e.jsx("code",{children:'window.name = "lyl"'}),"。在windows对象上创建的属性，只要window本身还在就不会消失。这个问题很容易解决，加上变量声明关键字即可。",e.jsx("br",{}),e.jsx("br",{}),"定时器也可能悄悄地导致内存泄露，下面的代码中，定时器的回调引用了外部的变量，形成了闭包：",o,"只要定时器一直运行，name就会一直占用内存。",e.jsx("br",{}),"使用闭包很容易不知不觉造成内存泄露，如下：",l,"调用outer会导致分配name的内存被泄露。以上代码执行后创建了一个闭包，只要返回的函数存在就不能清理name。假如name的内容很大，那可能就是大问题。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"4. 静态分配和对象池"}),e.jsx("br",{}),"在初始化的时候，创建一个对象池，用来管理一组可回收的对象。程序可以向对象池请求对象，使用完成后再返回。因为没发生对象初始化，垃圾回收程序就不会频繁的运行。",e.jsx("br",{}),"这是一种极端的优化，如果GC严重影响了性能，那么可以考虑使用这种方式。这种情况很少见，属于过早优化，不用考虑。"]})]})]}),e.jsx(j,{items:[{title:"垃圾回收",key:"pre",href:"#pre"},{title:"标记清除",key:"markSweep",href:"#markSweep"},{title:"引用计数",key:"referenceCounting",href:"#referenceCounting"},{title:"V8垃圾回收策略",key:"v8",href:"#v8",children:[{title:"主要GC",key:"major",href:"#major",children:[{title:"标记",key:"mark",href:"#mark"},{title:"清除",key:"sweep",href:"#sweep"},{title:"整理",key:"compact",href:"#compact"}]},{title:"两代之间的设计",key:"generationalLayout",href:"#generationalLayout"},{title:"次要GC",key:"minor",href:"#minor"}]},{title:"内存管理",key:"manage",href:"#manage"}]})]})}export{V as default};
