import React, { useEffect, useState } from "react"
import WarehouseManagerService from "src/services/WarehouseManagerService"

const WarehouseDashBoard = () => {
  const [loading, setLoading] = useState(false)
  const [infoWareHouse, setInfoWareHouse] = useState(null)

  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const res = await WarehouseManagerService.getInfoWareHouse()
      if (res?.isError) return
      setInfoWareHouse(res)
    } catch (error) {
      console.error("Error fetching warehouse info:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWarehouseInfo()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!infoWareHouse) {
    return null
  }

  return (
    <div>
      <h2>Thông tin kho hàng: {infoWareHouse.name}</h2>
      <p>
        <strong>Địa chỉ:</strong> {infoWareHouse.location}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {infoWareHouse.phone}
      </p>
      <p>
        <strong>Email:</strong> {infoWareHouse.email}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {infoWareHouse.status === "open" ? "Đang mở" : "Đang đóng"}
      </p>
      <p>
        <strong>Ngày tạo:</strong>{" "}
        {new Date(infoWareHouse.createdAt).toLocaleDateString()}
      </p>
      {/* Các thông tin khác bạn muốn hiển thị */}
    </div>
  )
}

export default WarehouseDashBoard

