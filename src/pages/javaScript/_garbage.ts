export const LOOP = `\`\`\`js 
function problem() {
  let a = {},
    b = {};

  a.a = b;
  b.b = a;
};
\`\`\``;

export const DOM_LOOP = `\`\`\`js
let element = document.getElementById('element'),
    object = {};

object.element = element;
element.xxx = object;
\`\`\``;

export const HIDDEN_CLASS = `\`\`\`js
function Article(){
  this.title = 'Article';
}

let a1 = new Article();
let a2 = new Article();
\`\`\``;

export const NO_DEF = `\`\`\`js
function setName(){
  name = 'lyl';
}
\`\`\``;

export const CLOSURE_TIMER = `\`\`\`js
let name = 'lyl';
setInterval(() =>{
  console.log(name);
}, 100)
\`\`\``;

export const CLOSURE = `\`\`\`js
let outer = function(){
  let name = 'lyl';
  return function(){
    return name;
  }
}
\`\`\``;

export const V8_STATS = `\`\`\`js
// V8的典型内存分配
- 新生代空间：1-8MB
- 老生代空间：700MB-1.4GB
- 代码空间：约1GB
- 大对象空间：约1GB
\`\`\``;

export const MEMORY_OPTIMIZATION = `\`\`\`js
// 1. 使用WeakMap/WeakSet
const cache = new WeakMap();

// 2. 使用ArrayBuffer和TypedArray
const buffer = new ArrayBuffer(1024);
const view = new Uint8Array(buffer);

// 3. 使用requestAnimationFrame代替setInterval
requestAnimationFrame(() => {
  // 动画逻辑
});
\`\`\``;

export const V8_LIMITS = `\`\`\`js
// V8引擎的内存限制
- 64位系统：约1.4GB
- 32位系统：约0.7GB
- 移动设备：通常更小，约512MB
\`\`\``;

export const GC_TRIGGERS = `\`\`\`js
// 垃圾回收触发条件
1. 内存使用达到阈值
2. 代码执行暂停时
3. 系统内存不足时
4. 手动触发（不推荐）
\`\`\``;

export const V8_MEMORY = `\`\`\`js
// V8内存分配
- 新生代：1-8MB
- 老生代：700MB-1.4GB
- 代码空间：约1GB
- 大对象空间：约1GB

// 系统限制
- 64位：约1.4GB
- 32位：约0.7GB
- 移动端：约512MB
\`\`\``;

export const OPTIMIZATION = `\`\`\`js
// 内存优化技巧
1. 使用WeakMap/WeakSet
const cache = new WeakMap();

2. 使用ArrayBuffer
const buffer = new ArrayBuffer(1024);

3. 使用requestAnimationFrame
requestAnimationFrame(() => {
  // 动画逻辑
});
\`\`\``;

export const GC_CONDITIONS = `\`\`\`js
// 垃圾回收触发条件
1. 内存使用达到阈值
2. 代码执行暂停时
3. 系统内存不足时
4. 手动触发（不推荐）
\`\`\``;

export const REACHABILITY = `\`\`\`js
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
\`\`\``;

export const V8_MARKING = `\`\`\`js
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
\`\`\``;

export const V8_SWEEP_COMPACT = `\`\`\`js
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
\`\`\``;
