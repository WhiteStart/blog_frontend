import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
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

// const menuItems = [
//   {
//     key: '1',
//     icon: <HomeOutlined />,
//     name: '数据概览'
//   },
//   {
//     key: '2',
//     icon: <DiffOutlined />,
//     name: '内容管理'
//   },
//   {
//     key: '3',
//     icon: <EditOutlined />,
//     name: '发布文章'
//   }
// ]

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
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to='/'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to='/article'>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to='/publish'>发布文章</Link>
            </Menu.Item>
            <Menu.Item icon={<VerticalAlignBottomOutlined />} key="/relic">
              <Link to='/relic'>导入圣遗物</Link>
            </Menu.Item>
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