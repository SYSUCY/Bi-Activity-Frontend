import {reactive} from 'vue'
import {defineStore} from 'pinia'

export const useLoginStore = defineStore('login', () =>{
  const data = reactive({
    token: "",
  })

  const loginIn = (token) => {
    data.token = token
  }

  const loginOut = () => {
    data.token = ""
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
