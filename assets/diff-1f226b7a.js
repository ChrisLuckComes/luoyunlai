import{j as e,d as s}from"./index-a433b440.js";import{U as d}from"./useMarkdown-db0c3f25.js";import{P as n,x as h,y as x,G as a}from"./index-e286e11f.js";import{A as j}from"./Anchor-b9aeacb8.js";import"./index-b35002ab.js";function f(){const i=e.jsx(d,{markdown:n}),c=e.jsx(d,{markdown:h}),l=e.jsx(d,{markdown:x}),r=e.jsx(d,{markdown:a});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h1",{id:"diff",className:"font-semibold text-h2 mb-2",children:"Diff"}),"在更新时，出于性能考虑，需要最大程度的利用已存在的节点。",e.jsx("br",{}),"所以需要递归比较同层级的新旧节点，只更新需要更新的真实DOM节点，这个比较函数就是",e.jsx("code",{children:"diff"}),"算法，它是vue的响应式系统中很关键的一环。",e.jsx("h2",{id:"vdom",className:s.articleTitle,children:"虚拟DOM(Virtual DOM)"}),"虚拟DOM是一种轻量级的JavaScript对象，它是真实DOM的抽象表示。在Vue中，组件的模板会被编译成渲染函数，渲染函数会返回一个虚拟DOM树。当数据发生变化时，会生成新的虚拟DOM树，Diff算法就是用来比较新旧的差异。",e.jsx("h2",{id:"steps",className:s.articleTitle,children:"核心步骤"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"同级比较"}),"： Diff算法只比较同一层级的节点，不会跨级比较，大大减少了复杂度。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"双指针遍历"}),"： 在比较新旧虚拟DOM节点时，会使用双指针的方法，分别指向新旧系欸按列表的起始位置，然后逐步向后遍历。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"节点复用"}),"：",e.jsx("code",{children:"Diff"}),"算法会尽量复用旧节点，判断节点是否可复用的关键是",e.jsx("code",{children:"key"}),"属性，key相同才会认为是同一节点并复用。"]})]}),e.jsx("h2",{id:"detail",className:s.articleTitle,children:"实现细节"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"简单场景：新旧节点数量相同"}),e.jsx("br",{}),"当新旧节点数量相同时，会直接按顺序比较每个节点。如果节点的",e.jsx("code",{children:"key"}),"和",e.jsx("code",{children:"type"}),"都相同，则认为节点可复用，只更新节点的属性和内容，否则替换。"]}),e.jsx("li",{children:e.jsx("strong",{children:"复杂场景：新旧节点数量不同"})}),e.jsx("br",{}),"当新旧节点数量不同时，会使用",e.jsx("code",{children:"最长递增子序列"}),"算法来优化节点的移动和插入操作",e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"建立映射表"}),"：遍历旧节点列表，建立以节点的",e.jsx("code",{children:"key"}),"及其索引的映射表"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"处理新增和删除节点"}),"：遍历新节点列表，根据映射表判断节点是新增、删除还是复用"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"计算最长递增子序列"}),"：对于需要移动的节点，计算其在旧节点列表中的索引的最长递增子序列，以确定最少的移动操作"]})]})]}),e.jsx("h3",{id:"patch",className:s.articleSubTitle,children:"patch"}),e.jsx("code",{children:"patch"}),"是核心函数，入参主要关注n1,n2",e.jsxs("ul",{className:s.ul,children:[e.jsx("li",{children:"n1 旧节点"}),e.jsx("li",{children:"n2 新节点"})]}),e.jsx("strong",{children:"比较的基本流程"}),e.jsxs("ul",{children:[e.jsx("li",{children:"1. 是否完全一样，如果完全一样退出"}),e.jsx("li",{children:"2. 是否类型不同，如果不同直接卸载旧节点"}),e.jsxs("li",{children:[e.jsx("div",{children:"3. 根据新节点类型分类处理"}),e.jsx("br",{}),"对于Text,Comment,Static的处理较为简单，旧节点为空就新增，否则修改即可",e.jsx("br",{}),"主要关注其他类型的处理 它们最后都会进入到",e.jsx("code",{children:"patchChildren"})]})]}),e.jsx("div",{className:s.assist,children:"packages\\runtime-core\\src\\renderer.ts"}),i,e.jsx("h2",{id:"patchChildren",className:s.articleTitle,children:"patchChildren"}),"处理逻辑如下，首先获取n2的",e.jsx("code",{children:"patchFlag"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("code",{children:"patchFlag > 0"}),"，说明需要做diff操作，接下来关注",e.jsx("code",{children:"patchKeyedChildren"}),"和",e.jsx("code",{children:"patchUnkeyedChildren"}),"方法"]}),e.jsxs("li",{children:["接下来再判断",e.jsx("code",{children:"shapeFlags"}),",有三种情况,text,array or no children",e.jsx("br",{}),"只有新旧节点都是ShapeFlags.ARRAY_CHILDREN才会进入diff",e.jsx("code",{children:"patchKeyedChildren"}),"，类型不一致基本都是卸载旧节点使用新节点"]})]}),c,e.jsx("br",{}),e.jsx("h2",{id:"patchKeyedChildren",className:s.articleTitle,children:"patchKeyedChildren"}),"接下来就是最核心的算法",e.jsx("code",{children:"patchKeyedChildren"}),"，期间相同的节点都是直接patch 分步骤来看，第一步是找出相同节点",e.jsx("h3",{className:s.articleSubTitle,children:"DIFF详细步骤"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["1.从头开始遍历，可以找出如下从头部开始的子序列",e.jsx("br",{}),"(a b) c ",e.jsx("br",{}),"(a b) d e"]}),e.jsxs("li",{children:["2. i走到e1或e2的位置从尾开始遍历，可以找到如下从尾开始的递增子序列",e.jsx("br",{}),"a (b c) ",e.jsx("br",{}),"d e (b c)"]})]}),"接着判断i和e1 e2的关系",e.jsxs("ul",{children:[e.jsxs("li",{children:["1.",e.jsx("code",{children:"i > e1"})," 说明旧节点已遍历完，直接挂载剩余新节点",e.jsx("br",{}),"(a b)",e.jsx("br",{}),"(a b) c"]}),e.jsxs("li",{children:["2. ",e.jsx("code",{children:"i > e2"})," 说明新节点已遍历完，卸载剩余旧节点",e.jsx("br",{}),"(a b) c ",e.jsx("br",{}),"(a b)"]}),e.jsxs("li",{children:["3. 新旧节点都没遍历完",e.jsx("br",{}),e.jsx("br",{}),"遍历剩余新节点构建",e.jsx("code",{children:"key:index keyToNewIndexMap"}),",新增数组 ",e.jsx("code",{children:"newIndexToOldIndexMap"})," ","数组长度为e2-s2+1,即未遍历完的新数组，初始值设为0，用于标记处理过的次数。",e.jsx("br",{}),e.jsx("br",{}),"遍历剩余旧节点 如果",e.jsx("code",{children:"patched >= toBePatched"}),"，说明新节点已经被patch完了，剩余旧节点卸载",e.jsx("br",{}),"然后判断旧节点是否有key，则从keyToNewIndexMap中取出key对应的index;",e.jsx("br",{}),"否则只能顺序寻找是否有同类型节点，找到记录下标",e.jsx("br",{}),e.jsx("br",{}),"如果newIndex没有找到，直接卸载该节点",e.jsx("br",{}),"找到了就判断",e.jsx("code",{children:"newIndex >=maxNewIndexSoFar"}),",记录maxNewIndexSoFar和标记moved",e.jsx("div",{className:s.assist,children:"newIndex比maxIndex要小，节点肯定要移动"}),"然后patch",e.jsx("br",{}),e.jsx("br",{}),"如果moved为true，那就需要移动节点，并挂载新增节点，到了这一步就要根据newIndexToOldIndexMap获取最长递增子序列",e.jsx("div",{className:s.assist,children:"对于序列[1,3,2,3,5,1,66,777]的最长递增子序列是[1,2,3,5,66,777]"}),"然后倒序遍历newIndexToOldIndexMap，每次遍历取c2[nextIndex+1]的节点作为锚点",e.jsx("br",{}),"如果newIndexToOldIndexMap[i]为0说明是新增节点，直接patch 只有在"," ",e.jsx("code",{children:"j < 0 || i !== increasingNewIndexSequence[j]"}),"才会真正移动节点 举个栗子",e.jsx("br",{}),"a b [c d e] f g ",e.jsx("br",{}),"a b [e d c h] f g ",e.jsx("br",{}),"newIndexToOldIndexMap=[4,3,2,0],increasingNewIndexSequence=[2],j=0 过程如下",e.jsxs("ul",{children:[e.jsxs("li",{children:["i=3,j=0: ",e.jsx("code",{children:"newIndexToOldIndexMap[i]===0"})," h节点是新节点 patch(h) 真实节点变为a b [c d e] h f g"]}),e.jsxs("li",{children:["i=2,j=0: ",e.jsx("code",{children:"i === increasingNewIndexSequence[j]"}),"c节点不移动，j--"]}),e.jsxs("li",{children:["i=1,j=-1: ",e.jsx("code",{children:"j < 0"})," d节点需要移动，以c为锚点move d节点，真实节点变为a b [d c e] h f g"]}),e.jsxs("li",{children:["i=0,j=-1: ",e.jsx("code",{children:"j < 0"})," e节点需要移动，以d为锚点move e节点，真实节点变为a b [e d c] h f g"]})]})]})]}),l,e.jsx("h3",{id:"getSequence",className:s.articleSubTitle,children:"getSequence"}),"获取最长递增子序列算法",r]}),e.jsx(j,{items:[{title:"Diff",key:"diff",href:"#diff"},{title:"虚拟DOM",key:"vdom",href:"#vdom"},{title:"核心步骤",key:"steps",href:"#steps"},{title:"实现细节",key:"detail",href:"#detail"},{title:"patch",key:"patch",href:"#patch"},{title:"patchChildren",key:"patchChildren",href:"#patchChildren"},{title:"patchKeyedChildren",key:"patchKeyedChildren",href:"#patchKeyedChildren"},{title:"getSequence",key:"getSequence",href:"#getSequence"}]})]})}export{f as default};
