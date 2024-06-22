import axios from "axios"
import http from "../index"
import {
  apiGetInfoWarehouse,
  apiGetListProductsNotInWarehouse,
  apiGetListProductsWarehouse,
} from "./urls"
import QueryString from "qs"

const getInfoWareHouse = () => http.get(apiGetInfoWarehouse)
const getListProductsWarehouse = id => http.get(apiGetListProductsWarehouse(id))
const getListProductsNotInWarehouse = id =>
  http.get(apiGetListProductsNotInWarehouse(id))
const WarehouseManagerService = {
  getInfoWareHouse,
  getListProductsWarehouse,
  getListProductsNotInWarehouse,
}

export default WarehouseManagerService

