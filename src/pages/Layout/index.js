import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { getToken } from '@/utils'
import { Layout, Menu, message, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const menuItems = [
  {
    label: '数据概览',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '内容管理',
    key: '/article',
    icon: <DiffOutlined />,
  },
  {
    label: '发布文章',
    key: '/publish',
    icon: <EditOutlined />,
  },
  {
    label: '导入圣遗物',
    key: '/relic',
    icon: <VerticalAlignBottomOutlined />
  }
]

const GeekLayout = () => {

  // 立即渲染article中的分类，防止未渲染导致列表为空
  const { typeStore } = useStore()
  useEffect(() => {
    typeStore.fetchTypeList()
  }, [typeStore])

  const { userStore, loginStore } = useStore()
  const token = getToken()
  useEffect(() => {
    try {
      userStore.getUserInfo(token)
    } catch {

    }
  }, [userStore, token])

  const location = useLocation()
  const selectedKey = location.pathname

  const nav = useNavigate()
  const test = (value) => {
    const { key } = value
    switch (key) {
      case ('/'):
        nav('/')
        break
      case ('/article'):
        nav('/article')
        break
      case ('/publish'):
        nav('/publish')
        break
      case ('/relic'):
        nav('/relic')
        break
      default:
        console.log("index nav error")
    }
  }

  const navigate = useNavigate()
  const logout = async () => {
    try {
      await loginStore.logout()
      navigate('/login')
      message.success('退出成功')
    } catch (e) {

    }
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">
            {userStore.userInfo.name}
          </span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={logout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={selectedKey}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={test}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)