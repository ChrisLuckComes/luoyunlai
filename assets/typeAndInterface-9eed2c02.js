import{j as e,d as s}from"./index-3ba01091.js";import{U as n}from"./useMarkdown-3db75fe1.js";import{A as o}from"./Anchor-918d3c78.js";import"./index-5b28342b.js";const m=`\`\`\`ts
// 使用 interface 定义对象类型
interface UserInterface {
    name: string;
    age: number;
}

// 使用 type 定义对象类型
type UserType = {
    name: string;
    age: number;
};

const user1: UserInterface = { name: 'Alice', age: 25 };
const user2: UserType = { name: 'Bob', age: 30 };
\`\`\``,h=`\`\`\`ts
// 使用 interface 定义函数类型
interface AddInterface {
    (a: number, b: number): number;
}

// 使用 type 定义函数类型
type AddType = (a: number, b: number) => number;

const add1: AddInterface = (a, b) => a + b;
const add2: AddType = (a, b) => a + b;
\`\`\``,x=`\`\`\`ts
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

interface Animal {
    age: number;
}

const dog: Dog = { name: 'Buddy', breed: 'Golden Retriever', age: 3 };
\`\`\``,j=`\`\`\`ts
// 基本类型别名
type Name = string;

// 元组类型
type Point = [number, number];

// 联合类型
type ID = number | string;

// 交叉类型
type Person = { name: string } & { age: number };
\`\`\``,f="```ts\ntype NumberOrString = number | string;\ntype AdminUser = { role: 'admin' } & UserType;\n```",p=`\`\`\`ts
interface Animal {
    name: string;
    speak(): void;
}

class Dog implements Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak() {
        console.log(\`\${this.name} says woof!\`);
    } 
}
\`\`\``,g=`\`\`\`ts
abstract class Animal {
    constructor(public name: string) {}
    abstract speak(): void;
    eat() {
        console.log(\`\${this.name} is eating.\`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(\`\${this.name} says woof!\`);
    }
}
\`\`\``;function T(){const r=e.jsx(n,{markdown:m}),t=e.jsx(n,{markdown:h}),i=e.jsx(n,{markdown:x}),a=e.jsx(n,{markdown:j}),c=e.jsx(n,{markdown:f}),l=e.jsx(n,{markdown:g}),d=e.jsx(n,{markdown:p});return e.jsxs("article",{id:"rootArticle",className:s.article,children:[e.jsxs("main",{className:s.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"type和interface"}),e.jsx("h3",{id:"same",className:s.articleSubTitle,children:"相同点"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"定义对象类型："}),r]}),e.jsxs("li",{children:[e.jsx("strong",{children:"定义函数类型："}),t]})]}),e.jsx("h3",{id:"diff",className:s.articleSubTitle,children:"不同点"}),e.jsxs("ul",{className:s.ul,children:[e.jsx("strong",{children:"1.语法和拓展性"}),e.jsxs("li",{children:[e.jsx("strong",{children:"interface："}),"可以通过",e.jsx("code",{children:"extends"}),"关键字来继承已有的接口，同一个名称的",e.jsx("code",{children:"interface"}),"可以多次定义，ts会合并它们。",i]}),e.jsxs("li",{children:[e.jsx("strong",{children:"type："}),"它可以使用",e.jsx("code",{children:"typeof"}),"获取类型，并且可以定义",e.jsx("code",{children:"interface"}),"无法表达的类型，例如别名、元组、联合类型、交叉类型等。",a]}),e.jsx("strong",{children:"2.能否用于表达式"}),e.jsxs("li",{children:[e.jsx("strong",{children:"type："}),"可以用于表达式中，结合运算符创建新的类型",c,e.jsx("code",{children:"interface"}),"不能直接用于表达式中。"]}),e.jsx("strong",{children:"3.对基本类型的使用"}),e.jsxs("li",{children:[e.jsx("strong",{children:"type："}),"可以为基本类型创建别名，例如",e.jsx("code",{children:"type MyNumber = number"}),"，interface不可以。"]})]}),e.jsx("h2",{id:"interface",className:s.articleTitle,children:"接口和抽象类的区别"}),e.jsx("h3",{id:"define",className:s.articleSubTitle,children:"1.定义和实现方式"}),e.jsxs("ul",{className:s.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"接口："}),"接口是一种抽象类型，仅定义对象的属性和方法的签名（名称、参数和返回类型），不包含具体实现代码，类通过实现(",e.jsx("code",{children:"implements"}),")接口来遵循接口定义规范。",d]}),e.jsxs("li",{children:[e.jsx("strong",{children:"抽象类："}),"抽象类是一种不能被实例化的类，它可以包含抽象方法（只有方法签名无具体实现）和具体方法，子类通过继承(",e.jsx("code",{children:"extends"}),")抽象类来实现抽象方法并可以复用具体方法。主要用于基础结构和通用行为的设计，以及代码复用和拓展。",l]})]}),e.jsx("h3",{id:"limit",className:s.articleSubTitle,children:"继承限制"}),"一个类可以实现多个接口，实现多继承的效果。但一个类只能继承一个抽象类，不支持类的多重继承。",e.jsx("h3",{id:"person",className:s.articleSubTitle,children:"成员类型"}),"接口不能包含构造函数，访问修饰符（private、protected）和具体的实现代码，抽象类都可以。"]}),e.jsx(o,{items:[{key:"1",title:"type和interface",href:"#type",children:[{key:"2",title:"相同点",href:"#same"},{key:"3",title:"不同点",href:"#diff"}]},{key:"4",title:"接口和抽象类的区别",href:"#interface",children:[{key:"5",title:"定义和实现方式",href:"#define"},{key:"6",title:"继承限制",href:"#limit"},{key:"7",title:"成员类型",href:"#person"}]}]})]})}export{T as default};
