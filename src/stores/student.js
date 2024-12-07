import {reactive} from 'vue'
import {defineStore} from 'pinia'

const useStudentStore = defineStore('student', () =>{
  const data = reactive({
    name: "",
    id: "",
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

export {useStudentStore}