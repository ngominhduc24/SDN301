import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './result.scss'

const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" className="fw-700 greendBackground" onClick={() => navigate('/')}>Back Home</Button>}
    />
  )
}
export default NotFoundPage