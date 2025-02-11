export const CREATE = `\`\`\`ts
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
\`\`\``;

export const ADD = `\`\`\`ts
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
\`\`\``;

export const QUERY = `\`\`\`ts
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
\`\`\``;

export const UPDATE = `\`\`\`ts
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
\`\`\``;

export const DELETE = `\`\`\`ts
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
\`\`\``;

export const RESULT = `\`\`\`ts
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
\`\`\``;
