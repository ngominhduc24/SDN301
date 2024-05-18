import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import './result.scss'

const ForbiddenPage = () => {

  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" className=" fw-700" onClick={() => navigate('/')}>Back Home</Button>}
    />
  )
}
export default ForbiddenPage