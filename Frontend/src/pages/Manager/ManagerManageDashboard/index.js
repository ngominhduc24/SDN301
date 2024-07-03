import React, { useEffect, useState } from "react"
import ManagerService from "src/services/ManagerService"
const ManagerDashBoard = () => {
  const [loading, setLoading] = useState(false)
  const [infoShop, setInfoShop] = useState(null)

  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const res = await ManagerService.getShop("666da2c059207cb17349144a")
      if (res?.isError) return
      setInfoShop(res)
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

  if (!infoShop) {
    return null
  }

  return (
    <div>
      <h2>Thông tin kho hàng: {infoShop.name}</h2>
      <p>
        <strong>Địa chỉ:</strong> {infoShop.location}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {infoShop.phone}
      </p>
      <p>
        <strong>Email:</strong> {infoShop.email}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {infoShop.status === "open" ? "Đang mở" : "Đang đóng"}
      </p>
      <p>
        <strong>Ngày tạo:</strong>{" "}
        {new Date(infoShop.createdAt).toLocaleDateString()}
      </p>
    </div>
  )
}

export default ManagerDashBoard

