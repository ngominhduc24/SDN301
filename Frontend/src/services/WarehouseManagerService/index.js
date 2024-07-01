import axios from "axios"
import http from "../index"
import {
  apiAddProductsToWarehouse,
  apiGetInfoWarehouse,
  apiGetListProductsNotInWarehouse,
  apiGetListProductsWarehouse,
  apiGetShopList,
  apiUpdateProductsInWarehouse,
  apiCreateInvoice,
  apiGetInvoiceById,
  apiUpdateInfoInvoice,
  apiUpdateStatusInvoice,
  apiGetAllInvoice,
} from "./urls"
import QueryString from "qs"
import { update } from "lodash"

const getInfoWareHouse = () => http.get(apiGetInfoWarehouse)
const getShopList = () => http.get(apiGetShopList)
const getListProductsWarehouse = id => http.get(apiGetListProductsWarehouse(id))
const getListProductsNotInWarehouse = id =>
  http.get(apiGetListProductsNotInWarehouse(id))
const addProductsToWarehouse = (id, body) =>
  http.post(apiAddProductsToWarehouse(id), body)
const updateProductsToWarehouse = (shopId, productId, body) =>
  http.put(apiUpdateProductsInWarehouse(shopId, productId), body)
const getAllInvoice = () => http.get(apiGetAllInvoice)
const getInvoiceById = id => http.get(apiGetInvoiceById(id))
const updateInfoInvoice = (id, body) => http.put(apiUpdateInfoInvoice(id), body)
const updateStatusInvoice = (id, body) =>
  http.put(apiUpdateStatusInvoice(id), body)
const createInvoice = () => http.post(apiCreateInvoice)

const WarehouseManagerService = {
  getInfoWareHouse,
  getListProductsWarehouse,
  getListProductsNotInWarehouse,
  addProductsToWarehouse,
  getShopList,
  updateProductsToWarehouse,
  getAllInvoice,
  getInvoiceById,
  updateInfoInvoice,
  updateStatusInvoice,
  createInvoice,
}

export default WarehouseManagerService

