import axios from "axios"
import http from "../index"
import {
  apiAddProductsToWarehouse,
  apiGetInfoWarehouse,
  apiGetListProductsNotInWarehouse,
  apiGetListProductsWarehouse,
  apiGetShopList,
} from "./urls"
import QueryString from "qs"

const getInfoWareHouse = () => http.get(apiGetInfoWarehouse)
const getShopList = () => http.get(apiGetShopList)
const getListProductsWarehouse = id => http.get(apiGetListProductsWarehouse(id))
const getListProductsNotInWarehouse = id =>
  http.get(apiGetListProductsNotInWarehouse(id))
const addProductsToWarehouse = (id, body) =>
  http.post(apiAddProductsToWarehouse(id), body)

const WarehouseManagerService = {
  getInfoWareHouse,
  getListProductsWarehouse,
  getListProductsNotInWarehouse,
  addProductsToWarehouse,
  getShopList,
}

export default WarehouseManagerService

