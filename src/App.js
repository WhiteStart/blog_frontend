import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthComponent } from './components/AuthComponent'
import Relic from './pages/Relic'
import './App.css'

// 按需导入路由组件
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))
const NotFound = lazy(() => import('./pages/NotFound'))


function App () {
  return (

    <>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
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
      </Suspense>
    </>
  )
}

export default App
