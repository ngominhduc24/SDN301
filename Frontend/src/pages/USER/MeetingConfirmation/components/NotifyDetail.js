import { Divider } from "antd"
import moment from "moment"
import React from "react"

const NotifyDetail = ({ data }) => {
  return (
    <div>
      <Divider className="m-5 mb-12" />
      <div className="d-flex-start mb-8">
        <div className="fw-600 mr-8">Thông báo: </div>
        <div className="">{data?.Title}</div>
      </div>
      <div className="d-flex-start mb-8">
        <div className="fw-600 mr-8">Thời gian: </div>
        <div className="">
          {data?.CreateDate
            ? moment(data?.CreateDate)?.format("HH:mm DD/MM/YYYY")
            : ""}
          {data?.TimeAgo ? ` (${data?.TimeAgo})` : ""}
        </div>
      </div>

      <div className="fw-600 mb-8">Nội dùng: </div>
      <div style={{}}>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.Content,
          }}
        />
      </div>
    </div>
  )
}

export default NotifyDetail
