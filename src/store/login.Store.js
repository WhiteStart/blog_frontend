import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken, removeToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }

  login = async ({ phoneNumber, verificationCode }) => {
    // res为post请求的返回值
    const res = await http.post('/login', {
      phoneNumber,
      verificationCode
    })
    this.token = res.data
    setToken(this.token)
  }

  logout = async () => {
    removeToken()
    this.token = ''
  }
}

export default LoginStore