import{j as e,d as t,e as i}from"./index-298bb257.js";import{U as s}from"./useMarkdown-3461f6cc.js";import{A as l}from"./Anchor-c8fc4162.js";import"./index-6c3c40ca.js";const u=`\`\`\`ts
const version = ref(1)

const DB_NAME = 'myDatabase'
const STORE_NAME = 'users'
const openIndexDB = (dbName: string, storeName: string) => {
  const request = indexedDB.open(dbName, version.value)
  // 数据库版本升级时触发，创建对象存储空间
  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result

    const objectStore = db.createObjectStore(storeName, { keyPath: 'id' })
    objectStore.createIndex('nameIndex', 'name', { unique: false })
  }

  // 数据库打开成功
  request.onsuccess = (event) => {
    console.log('数据库打开成功')
  }
  // 数据库打开失败
  request.onerror = (event) => {
    console.error('数据库打开失败:', (event.target as IDBOpenDBRequest).error)
  }
}
\`\`\``,m=`\`\`\`ts
const saveData = <T,>(params: {
  dbName?: string
  storeName?: string
  data: T
  _version?: number
}) => {
  const { dbName = DB_NAME, storeName = STORE_NAME, data, _version = version.value } = params
  const request = indexedDB.open(dbName, _version)

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    console.log(\`db \${dbName} opened\`)

    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const addRequest = objectStore.add(data)

    addRequest.onerror = (event) => {
      console.log(\`db \${dbName} add error\`, (event.target as IDBOpenDBRequest).error)
    }

    addRequest.onsuccess = (event) => {
      console.log(\`db \${dbName} \${storeName} \${data} add success\`)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
}
\`\`\``,b=`\`\`\`ts
const getData = (params: {
  dbName?: string
  storeName?: string
  _version?: number
  id: number
}) => {
  return new Promise<User>((resolve, reject) => {
    const { dbName = DB_NAME, storeName = STORE_NAME, _version = version.value, id } = params
    const request = indexedDB.open(dbName, _version)

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      console.log(\`db \${dbName} opened\`)
      const transaction = db.transaction([storeName], 'readonly')
      const objectStore = transaction.objectStore(storeName)

      const getRequest = objectStore.get(id) // 获取id为key的数据

      getRequest.onsuccess = (event) => {
        const data = (event.target as IDBRequest).result
        resolve(data)
      }

      getRequest.onerror = (event) => {
        reject(new Error('数据库打开失败'))
        db.close()
      }
    }
  })
}
\`\`\``,N=`\`\`\`ts
const updateData = (params: {
  dbName?: string
  storeName?: string
  data: User
  _version?: number
}) => {
  const { dbName = DB_NAME, storeName = STORE_NAME, data, _version = version.value } = params
  const request = indexedDB.open(dbName, _version)

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    console.log(\`db \${dbName} opened\`)

    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const putRequest = objectStore.put(data)

    putRequest.onerror = (event) => {
      console.log(\`db \${dbName} put error\`, (event.target as IDBOpenDBRequest).error)
    }

    putRequest.onsuccess = (event) => {
      console.log(\`db \${dbName} \${storeName} \${JSON.stringify(data)} put success\`)
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
}
\`\`\``,x=`\`\`\`ts
const deleteData = (params: {
  dbName?: string
  storeName?: string
  id: number
  _version?: number
}) => {
  const { dbName = DB_NAME, storeName = STORE_NAME, id, _version = version.value } = params
  const request = indexedDB.open(dbName, _version)

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    console.log(\`db \${dbName} opened\`)
    const transaction = db.transaction([storeName], 'readwrite')
    const objectStore = transaction.objectStore(storeName)

    const deleteRequest = objectStore.delete(id)
    deleteRequest.onsuccess = (event) => {
      console.log(\`db \${dbName} \${storeName} \${id} delete success\`)
    }
    deleteRequest.onerror = (event) => {
      console.log(
        \`db \${dbName} \${storeName} \${id} delete error\`,
        (event.target as IDBOpenDBRequest).error,
      )
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
}
\`\`\``,h=`\`\`\`ts
import { onMounted, ref } from 'vue'

interface User {
  name: string
  age: number
  id: number
}

const user = ref('')

const version = ref(1)

const DB_NAME = 'myDatabase'
const STORE_NAME = 'users'

// 已经贴出的函数省略...

const updateLylName = (name: string) => {
  user.value = name
  updateData({ data: { name, age: 18, id: 1 } })
}

const deleteUser = (id: number) => {
  user.value = ''
  deleteData({ id })
}

onMounted(async () => {
  openIndexDB(DB_NAME, STORE_NAME)
  saveData({ data: { name: '柳云落', age: 18, id: 1 } })
  const lyl = await getData({ id: 1 })
  user.value = lyl.name
})
\`\`\``,j="/luoyunlai/assets/indexedDB-068cbb82.jpg";function B(){const r=e.jsx(s,{markdown:u}),n=e.jsx(s,{markdown:m}),a=e.jsx(s,{markdown:b}),o=e.jsx(s,{markdown:N}),c=e.jsx(s,{markdown:x}),d=e.jsx(s,{markdown:h});return e.jsxs("article",{id:"rootArticle",className:t.article,children:[e.jsxs("main",{className:t.content,children:[e.jsx("h2",{id:"pre",className:"font-semibold text-h2 mb-2",children:"IndexedDB"}),"IndexedDB是一个浏览器端的数据库，它是一个NoSQL数据库，存储的是键值对。它是一个持久化的、事务型的数据库，可以存储大量的数据。 有些场景下我们需要在浏览器端存储大量的数据，这时候就可以使用IndexedDB。",e.jsx("h3",{id:"basic",className:t.articleSubTitle,children:"基本概念"}),e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"数据库(Database):"})," 一个浏览器可以创建多个数据库，每个数据库有唯一名称"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"对象存储空间(Object Store)："}),"类似于关系型数据库的表，用于存储对象。每个对象存储空间有唯一的名称，并且可以定义一个主键用作唯一标识。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"索引(Index): "}),"可以为对象存储空间中的某个属性创建索引，通过索引能快速定位符合特定条件的数据。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"事务(Transaction): "}),"所有对数据库的读写操作都必须在事务中进行。事务具有原子性，即要么全部操作成功，要么全部失败，保证了数据的一致性和完整性。"]})]}),e.jsx("h3",{id:"spec",className:t.articleSubTitle,children:"特点"}),e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"异步操作："}),"IndexedDB的操作是异步的，不会阻塞主线程，避免了在进行大量数据读写时导致页面卡顿。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"支持事务："}),"IndexedDB支持事务，可以保证数据的一致性。复杂场景下可以保证数据正确"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"存储容量大："}),"没有localStorage的5MB限制，具体容量限制因浏览器而异。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"支持多种数据类型："}),"IndexedDB支持存储对象，可以存储任意类型的数据，包括字符串、数组、对象等，方便存储复杂的数据结构。"]})]}),e.jsx("h3",{id:"use",className:t.articleSubTitle,children:"使用场景"}),e.jsxs("ul",{className:t.ul,children:[e.jsxs("li",{children:[e.jsx("strong",{children:"离线应用："}),"在线文档编辑器，笔记等应用，即使没有网络用户依然可以进行读写操作。"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"数据缓存："}),"可以缓存一些请求数据，减少网络请求，提高页面加载速度。"]})]}),e.jsx("h2",{id:"example",className:t.articleTitle,children:"代码示例"}),e.jsx("h3",{id:"create",className:t.articleSubTitle,children:"打开数据库"}),"在进行任何数据操作之前，首先需要先打开数据库，如果数据库不存在，则会创建数据库。",r,e.jsx("h3",{id:"add",className:t.articleSubTitle,children:"新增数据"}),"打开数据库之后，可以通过事务在对象存储空间中添加数据。",n,e.jsx("h3",{id:"query",className:t.articleSubTitle,children:"查询数据"}),"通过对象存储空间的主键查询数据。",a,e.jsx("h3",{id:"put",className:t.articleSubTitle,children:"修改数据"}),"通过对象存储空间的主键修改数据。",o,e.jsx("h3",{id:"delete",className:t.articleSubTitle,children:"删除数据"}),"通过对象存储空间的主键删除数据。",c,e.jsx("h3",{id:"result",className:t.articleSubTitle,children:"完整代码"}),d,e.jsx("h3",{id:"img",className:t.articleSubTitle,children:"运行结果"}),e.jsx(i,{src:j})]}),e.jsx(l,{items:[{key:"1",title:"前言",href:"#pre",children:[{key:"2",title:"基本概念",href:"#basic"},{key:"3",title:"特点",href:"#spec"},{key:"4",title:"使用场景",href:"#use"}]},{key:"5",title:"代码示例",href:"#example",children:[{key:"6",title:"创建数据库",href:"#create"},{key:"7",title:"新增数据",href:"#add"},{key:"8",title:"查询数据",href:"#query"},{key:"9",title:"修改数据",href:"#put"},{key:"10",title:"删除数据",href:"#delete"},{key:"11",title:"完整代码",href:"#result"},{key:"12",title:"运行结果",href:"#img"}]}]})]})}export{B as default};
