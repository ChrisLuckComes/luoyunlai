export const SAME_OBJECT = `\`\`\`ts
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
\`\`\``;

export const SAME_FUNCTION = `\`\`\`ts
// 使用 interface 定义函数类型
interface AddInterface {
    (a: number, b: number): number;
}

// 使用 type 定义函数类型
type AddType = (a: number, b: number) => number;

const add1: AddInterface = (a, b) => a + b;
const add2: AddType = (a, b) => a + b;
\`\`\``;

export const INTERFACE = `\`\`\`ts
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
\`\`\``;

export const TYPE = `\`\`\`ts
// 基本类型别名
type Name = string;

// 元组类型
type Point = [number, number];

// 联合类型
type ID = number | string;

// 交叉类型
type Person = { name: string } & { age: number };
\`\`\``;

export const TYPE2 = `\`\`\`ts
type NumberOrString = number | string;
type AdminUser = { role: 'admin' } & UserType;
\`\`\``;

export const INTERFACE1 = `\`\`\`ts
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
\`\`\``;

export const ABSTRACT = `\`\`\`ts
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
\`\`\``;
