import React from 'react'
import LoginStore from './login.Store'
import TypeStore from './type.Store'
import UserStore from './user.Store'

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.typeStore = new TypeStore()
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }

