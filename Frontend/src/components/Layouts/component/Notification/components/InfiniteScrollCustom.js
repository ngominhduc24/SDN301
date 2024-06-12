import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const InfiniteScrollCustom = props => {
  const { children } = props
  return (
    <InfiniteScroll
      {...props}
      loader={
        <div className="d-flex-center pt-15 ">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
        </div>
      }
      endMessage={<h4 className="d-flex-center pt-15 ">Không còn thông báo</h4>}
      height={"400px"}
    >
      {children}
    </InfiniteScroll>
  )
}

export default InfiniteScrollCustom
