import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import Home from '@/pages/Home'
import { AuthComponent } from './components/AuthComponent'
import './App.css'
import Relic from './pages/Relic'

function App () {
  return (

    <>
      <Routes>
        { /* layout需要鉴权处理 */}
        <Route path='/' element={
          <AuthComponent>
            <Layout />
          </AuthComponent>
        } >
          <Route index element={<Home />}></Route>
          <Route path='article' element={<Article />}></Route>
          <Route path='publish' element={<Publish />}></Route>
          <Route path='relic' element={<Relic />}></Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
