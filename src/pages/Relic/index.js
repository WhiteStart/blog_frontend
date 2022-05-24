import React from 'react'
import axios from 'axios'
import { Upload, message, Button } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const size = 'large'

const props = {
  name: 'file',
  multiple: true,
  action: "http://127.0.0.1:8080/uploadFile",
  onChange (info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log("info.file", info.file, "info.fileList", info.fileList)
    }
    if (status === 'done') {
      console.log("message.success")
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      console.log("error")
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop (e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
  // onRemove: true
}

const insert = () => {
  axios.get('http://127.0.0.1:8080/insertRelic').then(
    response => {
      console.log(response)
    },
    error => {
      console.log(error)
    }
  )
}

const Relic = () => {
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      <Button
        style={{ float: 'right' }}
        type="primary"
        size={size}
        onClick={insert}>
        导入数据库
      </Button>
    </div>
  )
}

export default Relic
