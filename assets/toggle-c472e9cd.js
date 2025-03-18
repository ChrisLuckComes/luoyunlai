import{U as a}from"./useMarkdown-b33dbcc0.js";import{r,A as i,_ as p,j as o}from"./index-ad5eedbe.js";var c={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"}}]},name:"caret-right",theme:"outlined"};const l=c;var x=function(t,n){return r.createElement(i,p(p({},t),{},{ref:n,icon:l}))},u=r.forwardRef(x);const f=u;function e(s,t){return{title:a({markdown:s}),content:a({markdown:t})}}const j="```ts\nexport type If<C extends boolean, T, F> = C extends true ? T : F;\n```",w="```ts\nexport type MyPick<T, K extends keyof T> = { [P in K]: T[P] };\n```",X="```ts\nexport type MyReadonly<T> = { readonly [K in keyof T]: T[K] };\n```",z=`\`\`\`ts
传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
\`\`\``,B='```ts\nconst tuple = ["tesla", "model 3", "model x", "model y"] as const;\n\nexport type TupleObject<T extends readonly any[]> = { [K in T[number]]: K };\n\ntype result = TupleObject<typeof tuple>\n```',V=`\`\`\`ts
export type FirstOfArray<T extends any[]> = T extends [] ? never : T[0];

export type FirstOfArray<T extends any[]> = T extends [infer F, ...infer R]
  ? F
  : never;

type arr = ["a", "b", "c"];

type head1 = FirstOfArray<arr>; // 'a'
\`\`\``,J='```ts\nexport type Length<T extends any[]> = T["length"];\n```',q=`\`\`\`ts
export type MyAwaited<T extends Promise<any>> = T extends PromiseLike<infer R>
    ? R extends PromiseLike<any>
    ? MyAwaited<R>
    : R
  : never;

type example = Promise<string>;

type result = MyAwaited<example>; // string
\`\`\``,W=`\`\`\`ts
export type Concat<T extends any[], K extends any[]> = [...T, ...K];

type a = [1, 2];
type b = [3, "4"];

type c = Concat<a, b>; //[1,2,3,"4"]
\`\`\``,$="```ts\nexport type MyExclude<T, U> = T extends U ? never : T;\n\ntype a = string;\n\ntype result = MyExclude<string | number | symbol, string>; // number | symbol\n```",G=`\`\`\`ts
// export type Includes<T extends any[], U> = U extends T[number] ? true : false; // extends不是===，无法判断子类型

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Includes<T extends any[], U> = T extends [infer X, ...infer Rest]
  ? Equal<X, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

type arr = [1, 2, 3, 4];

type b = Includes<arr, 1>;
\`\`\``,b=`\`\`\`ts
不使用 ReturnType 实现 TypeScript 的 ReturnType<T> 泛型。

例如：
const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
  };
  
  type a = MyReturnType<typeof fn>; // 1 | 2
\`\`\``,m="```ts\nexport type MyReturnType<T extends (args: any) => any> = T extends (\n    args: any\n  ) => infer R\n    ? R\n    : any;\n```",Q=e(b,m),R=`\`\`\`ts
不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。

Omit 会创建一个省略 K 中字段的 T 对象。

例如：

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
\`\`\``,E="```ts\nexport type MyOmit<T, K extends keyof T> = {\n    [P in keyof T as P extends K? never : P]: T[P];\n};\n```",Z=e(R,E),P=`\`\`\`ts
实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。

K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

例如

interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
\`\`\``,h="```ts\nexport type MyReadonly2<T, K extends keyof T> = {\n    readonly [P in keyof T as P extends K ? P : never]: T[P];\n  } & { [P in keyof T as P extends K ? never : P]: T[P] };\n```",ee=e(P,h),L=`\`\`\`ts
实现一个通用的DeepReadonly<T>，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

type X = {
  x: {
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as \`Expected\`
\`\`\``,g="```ts\nexport type DeepReadonly<T> = {\n    readonly [K in keyof T]: T[K] extends Record<any, any>\n      ? DeepReadonly<T[K]>\n      : T[K];\n  };\n```",te=e(L,g),I=`\`\`\`ts
实现泛型TupleToUnion<T>，它返回元组所有值的合集。

例如

type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
\`\`\``,O="```ts\nexport type TupleToUnion<T extends any[]> = T extends [infer F, ...infer L]\n  ? F | TupleToUnion<L>\n  : never;\n```",ne=e(I,O),K=`\`\`\`ts
实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。

例如

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1

\`\`\``,v="```ts\ntype Last<T extends any[]> = T extends [...infer F, infer L] ? L : never;\n```",se=e(K,v),U=`\`\`\`ts
实现一个通用Pop<T>，它接受一个数组T，并返回一个由数组T的前length-1项以相同的顺序组成的数组。

例如

type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
额外：同样，您也可以实现Shift，Push和Unshift吗？
\`\`\``,_="```ts\ntype Pop<T extends any[]> = T extends [...infer F, infer L] ? F : T;\n```",oe=e(U,_),A=`\`\`\`ts
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type e = "e";
type zero = 0;

type re1 = Push<arr1, e>; // expected to be ['a', 'b', 'c','d', 'e']
type re2 = Push<arr2, zero>; // expected to be [3, 2, 1, 0]
\`\`\``,C="```ts\ntype Push<T extends any[], K> = [...T, K];\n```",re=e(A,C),M=`\`\`\`ts
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type re1 = Shift<arr1>; // expected to be ['b', 'c', 'd']
type re2 = Shift<arr2, zero>; // expected to be [2, 1]
\`\`\``,S="```ts\nexport type Shift<T extends any[], K = []> = T extends [infer F, ...infer R]\n  ? K extends F\n    ? never\n    : R\n  : T\n```",ae=e(M,S),F=`\`\`\`ts
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type e = "e";

type zero = 0;

type re1 = Unshift<arr1, e>; // expected to be ['e','a','b', 'c', 'd']
type re2 = Unshift<arr2, zero>; // expected to be [0, 3, 2, 1]
\`\`\``,N="```ts\nexport type Unshift<T extends any[], K> = [K, ...T];\n```",pe=e(F,N),k=`\`\`\`ts
在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。
在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

例如

declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。
\`\`\``,Y=`\`\`\`ts
export type Chainable<T = {}> = {
  option<K extends string, V extends any>(
    key: K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};
\`\`\``,ye=e(k,Y);function Te({content:s,message:t="查看答案"}){const[n,y]=r.useState(!1),T=r.useMemo(()=>n?90:0,[n]);return o.jsxs("div",{className:"transition-all my-10",children:[o.jsxs("div",{className:"cursor-pointer text-blue text-16",onClick:()=>y(d=>!d),children:[o.jsx(f,{rotate:T})," ",t,"："]}),o.jsx("div",{children:n&&s})]})}export{q as A,W as C,V as F,j as I,J as L,$ as M,w as P,X as R,Te as T,z as a,B as b,G as c,ee as d,te as e,re as f,ye as g,se as l,Z as o,oe as p,Q as r,ae as s,ne as t,pe as u};
