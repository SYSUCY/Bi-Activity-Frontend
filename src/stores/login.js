import {reactive} from 'vue'
import {defineStore} from 'pinia'

export const useLoginStore = defineStore('login', () =>{
  const data = reactive({
    token: "",
    role: "",
  })

  const loginIn = (token, role) => {
    data.token = token
    data.role = role
  }

  const loginOut = () => {
    data.token = ""
    role = ""
  }

  return {
    data,
    loginIn,
    loginOut,
  }
},
{
  persist: true //持久化存储到 localStorage 中
})
