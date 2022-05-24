import React from 'react'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from '@/assets/logo.png'
import './index.scss'

const Login = () => {

  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async values => {
    const { phoneNumber, verificationCode } = values
    try {
      await loginStore.login({
        phoneNumber,
        verificationCode
      })
      message.success('登录成功')
      navigate('/')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img src={logo} alt="" className="login-logo" />
        { /* 
          子项要用到的触发事件 需要在Form中都声明一下才可以
          onBlur 失去焦点时
          onChange 改变时
        */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name='phoneNumber'
            rules={[{
              required: true,
              pattern: /^1[3-9]\d{9}$/,
              message: '请输入正确的手机号!',
              validateTrigger: 'onBlur'
            }]}
          >
            <Input size='large' placeholder='请输入手机号' />
          </Form.Item>

          <Form.Item
            name='verificationCode'
            rules={[
              {
                required: true,
                message: '请输入验证码!',
              },
              {
                len: 6,
                message: '请输入6位验证码',
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input.Password size='large' placeholder='请输入验证码' />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 19 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 18 }}>
            <Button type="primary" htmlType="submit">
              登录/注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login