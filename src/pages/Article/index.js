import { useEffect, useState } from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Radio, Select, DatePicker, Button, Form, Table, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'

import img404 from '@/assets/logo.png'

const { Option } = Select
const { RangePicker } = DatePicker

let i = 0




const Article = () => {


  // 列名定义
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '文章分类',
      dataIndex: 'type'
    },
    {
      title: '作者',
      dataIndex: 'author',
      width: 120
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 120
    },
    {
      title: '阅读数',
      dataIndex: 'readCount'
    },
    {
      title: '赞',
      dataIndex: 'likes'
    },
    {
      title: '踩',
      dataIndex: 'dislikes'
    },
    {
      title: '发布时间',
      dataIndex: 'gmtCreate'
    },
    {
      title: '最后修改时间',
      dataIndex: 'gmtModified'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigateToPublish(data.articleId)} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => delArticle(data.articleId)}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  //分页参数管理
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10
  })
  const pageChange = page => {
    setParams({
      ...params,
      page
    })
  }
  // 删除一条记录
  const delArticle = async articleId => {
    await http.get(`/deleteArticle?articleId=${articleId}`)
    setParams({
      ...params
    })
  }
  // 跳转
  const nav = useNavigate()
  const navigateToPublish = (articleId) => {
    nav(`/publish?articleId=${articleId}`)
  }

  // 按钮对应值
  const [value, setValue] = useState(1)

  // 分类值渲染
  const { typeStore } = useStore()

  // 文章列表数据管理
  const [article, setArticleList] = useState({
    list: [],
    count: 0
  })

  // 请求文章列表
  useEffect(() => {
    const fetchArticleList = async () => {
      const res = await http.get(`/getArticleList`, { params })
      const { list, count } = res.data
      setArticleList({
        list: list,
        count: count
      })
    }
    fetchArticleList()
  }, [params])

  // 表单提交
  const onFinish = async values => {
    const { type, date } = values
    const _params = {}
    if (type) {
      _params.type = type
    }
    if (date) {
      _params.startTime = date[0].format('YYYY-MM-DD HH:mm:ss')
      _params.endTime = date[1].format('YYYY-MM-DD HH:mm:ss')
    }
    setParams({
      ...params,
      ..._params
    })
  }

  return (
    <div>
      <Card>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to='/home'>首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">内容管理</Breadcrumb.Item>
        </Breadcrumb>

        <Form
          initialValues={{ status: null }}
          onFinish={onFinish}>
          <Form.Item
            label="状态"
            name="status"
            style={{ margin: '20px 0' }}
          >
            <Radio.Group onChange={e => { setValue(e.target.value) }} value={value}>
              <Radio value={1}>全部</Radio>
              <Radio value={2}>草稿</Radio>
              <Radio value={3}>待审核</Radio>
              <Radio value={4}>审核通过</Radio>
              <Radio value={5}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="分类" name="type">
            <Select
              style={{ width: '150px' }}
              showSearch
              placeholder="请选择分类"
              optionFilterProp="children"
              // onChange={onChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                typeStore.type.map(item => {
                  return <Option key={i++} value={item}>{item}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>筛选</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${article.count} 条结果`}>
        <Table rowKey="articleId"
          columns={columns}
          dataSource={article.list}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.pageSize,
            onChange: pageChange
          }} />
      </Card>
    </div >
  )
}

export default Article