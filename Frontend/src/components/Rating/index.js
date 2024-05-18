import { Col, Row, Tabs } from "antd"
import { useEffect, useState } from "react"
import { PageStyles } from "./style"
import HotComics from "./components/HotComics"
import ComicService from "src/services/ComicService"

const Rating = () => {

  const [loading, setLoading] = useState(false)
  const [topComics, setTopComics] = useState([])
  const [activeKey, setActiveKey] = useState(0)

  const getListHotComics = async () => {
    try {
      setLoading(true)
      const res = await ComicService.getAllHotComics(activeKey)
      if (res?.isError) return
      setTopComics(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListHotComics()
  }, [activeKey])

  const items = [
    {
      key: 0,
      label: `Tất Cả`,
      children: <HotComics topComics={topComics} loading={loading} />,
    },
    {
      key: 30,
      label: `Top Tháng`,
      children: <HotComics topComics={topComics} loading={loading} />,
    },
    {
      key: 7,
      label: `Top Tuần`,
      children: <HotComics topComics={topComics} loading={loading} />,
    },
  ]

  return (
    <>
      <Row >
        <Col span={24} className="d-flex">
          <PageStyles>
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key) => {
                setActiveKey(key)
              }}
            />
          </PageStyles>
        </Col>
      </Row>
    </>
  )
}

export default Rating
