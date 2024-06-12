import { Divider } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import BookingService from "src/services/BookingService"
const StatusColor = ["", "#ff9800", "#4CAF50", "#ff4d4f", "#4096ff"]
const Result = ({ setLoading, BookingID }) => {
  const [result, setResult] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)
  useEffect(() => {
    if (!!BookingID) {
      getData()
    }
  }, [BookingID])

  const getData = async () => {
    try {
      setLoading(true)
      const res = await BookingService.getListResultBooking({
        BookingID: BookingID,
      })
      if (res.isError) return
      setResult(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 50,

      render: (text, row, idx) => <div className="text-center">{idx + 1}</div>,
    },
    {
      title: "Tài khoản",
      dataIndex: "FullName",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      width: 80,
      align: "center",

      render: (_, record) => (
        <>
          <span style={{ color: StatusColor[record?.Status], fontWeight: 600 }}>
            {
              getListComboByKey(
                SYSTEM_KEY?.STATUS_CONFIRM_CTH,
                listSystemKey,
              )?.find(item => item?.CodeValue === record?.Status)?.Description
            }
          </span>
        </>
      ),
    },
    {
      title: "Lý do",
      dataIndex: "Reason",
      width: 100,
      align: "center",
    },
    {
      title: "Người ủy quyền",
      dataIndex: "AuthorizedPersonName",
      width: 100,
      align: "center",
    },
  ]
  return (
    <div>
      <div>
        {/* <div>
          <span className="fw-600">Nội dung:</span>{" "}
          <span>Kiểm thử hệ thống</span>
        </div>
        <Divider className="mt-12 mb-12" />
        <div>
          <span className="fw-600">Thời gian: </span> <span>29 đến 28</span>
        </div>
        <Divider className="mt-12 mb-12" />
        <div>
          <span className="fw-600">Địa điểm:</span>
          <span>Hội trường HDHD tỉnh</span>
        </div>
        <Divider className="mt-12 mb-12" /> */}
        <div>
          Số người tham gia:{" "}
          <span className="fw-600">
            {result?.length
              ? result?.filter(item => item?.Status === 2)?.length
              : 0}
            /{result?.length}
          </span>
        </div>
        <div className="mt-16">
          <TableCustom
            columns={columns}
            isPrimary
            dataSource={result}
            rowKey="UserID"
            sticky={{ offsetHeader: 85 }}
            scroll={{ x: "250px" }}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Result
