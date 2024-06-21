import React from "react"
import { useEffect, useState } from "react"
import WarehouseManagerService from "src/services/WarehouseManagerService"
const WarehouseDashBoard = () => {
  const [loading, setLoading] = useState(false)
  const [infoWareHouse, setInfoWareHouse] = useState([])
  const getWarehouseInfo = async () => {
    try {
      setLoading(true)
      const res = await WarehouseManagerService.getInfoWareHouse()
      if (res?.isError) return
      setInfoWareHouse(res)
    } finally {
      setLoading(false)
    }
  }

  return <div>Dashboard</div>
}

export default WarehouseDashBoard

