import {reactive} from 'vue'
import {defineStore} from 'pinia'

export default defineStore('college', () =>{
  const data = reactive({
    name: "软件工程学院",
    id: "1",
    token: "",
    expireDate: ""  //token过期时间
  })

  const save = (name, id, token, expireDate) => {
    data.name = name
    data.id = id
    data.token = token
    data.expireDate = expireDate
  }

  const clear = () => {
    data.name = ""
    data.id = ""
    data.token = ""
    data.expireDate = ""
  }

  return {
    data,
    save
  }
},
{
  persist: true //持久化存储到 localStorage 中
})