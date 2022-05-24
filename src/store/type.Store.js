const { http } = require("@/utils")
const { makeAutoObservable } = require("mobx")

class TypeStore {
  type = []
  constructor() {
    makeAutoObservable(this)
  }

  fetchTypeList = async () => {
    const res = await http.get(`/getTypeList`)
    this.type = res.data
  }
}

export default TypeStore