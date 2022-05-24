const { http } = require("@/utils")
const { makeAutoObservable } = require("mobx")

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async (phoneNumber) => {
    const res = await http.get(`/info?phoneNumber=${phoneNumber}`)
    this.setUser(res.data)
  }

  setUser = (data) => {
    this.userInfo = data
  }
}

export default UserStore