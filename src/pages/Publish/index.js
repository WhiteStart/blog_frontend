import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'
import { v4 as uuid } from 'uuid'
// import { Editor } from 'react-draft-wysiwyg'
// import { EditorState } from 'draft-js'
// import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.scss'

const { Option } = Select
const { TextArea } = Input

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
)

// beforeUpload限制用户上传图片的大小和格式
function beforeUpload (file) {
  const isJpgOrPng =
    file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 10
  if (!isLt2M) {
    message.error('Image must smaller than 10MB!')
  }
  return isJpgOrPng && isLt2M
}

const Publish = () => {

  const { typeStore } = useStore()

  // 存放上传图片的列表
  const [imgList, setImgList] = useState([])
  const handleUpload = ({ fileList }) => {
    const res = fileList.map(file => {
      if (file.response) {
        return {
          url: file.response
        }
      }
      return file
    })
    setImgList(res)
  }

  // 按钮
  const [imgCount, setImgCount] = useState(1)
  const radioChange = (e) => {
    const count = e.target.value
    setImgCount(count)
  }

  // article页面点击编辑时跳转
  const [params] = useSearchParams()
  const articleId = params.get('articleId')

  // 表单提交
  const onFinish = async (values) => {
    const { content, title, type } = values
    const params = {
      content,
      title,
      type,
      cover: imgList.map(item => item.url),
      articleId: ""
    }
    // console.log(editorState.getCurrentContent())
    if (articleId) {
      params.articleId = articleId
      await http.post('/updateArticle', params)
    } else {
      await http.post('/insertArticle', params)
    }
  }

  const form = useRef(null)
  useEffect(() => {
    const getArticle = async () => {
      const res = await http.get(`/getArticle?articleId=${articleId}`)
      const { cover, ...formValue } = res.data
      form.current.setFieldsValue({ ...formValue })
      const imgs = cover.map(url => ({ url }))
      setImgList(imgs)
    }
    if (articleId) {
      getArticle()
    }
  }, [articleId])

  // const [editorState, setEditorState] = useState(EditorState.createEmpty())

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {articleId ? '修改文章' : '发布文章'}
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="分类"
            name="type"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                typeStore.type.map(item => {
                  return (<Option key={uuid()} value={item}>{item}</Option>)
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (<Upload
              // *** 这里的name与后端需要对应 ***
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://127.0.0.1:8081/uploadImage"
              fileList={imgList}
              onChange={handleUpload}
              beforeUpload={beforeUpload}
            >
              {imgList.length < imgCount ? uploadButton : null}
            </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="编辑区"
            name="content">
            {/* <Editor
              editorState={editorState}
              // toolbarClassName="editor-toolbar"
              wrapperClassName="editor-wrapper"
              editorClassName="editor"
              onEditorStateChange={setEditorState}
            /> */}
            <TextArea rows={4} style={{ height: '300px' }} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '修改文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish