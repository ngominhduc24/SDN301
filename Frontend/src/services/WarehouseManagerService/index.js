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
  apiGetInvoicesByShopId,
  apiGetOrdersByShopId,
  apiUpdateInfoRequest,
  apiUpdateStatusRequest,
  apiCreateRequest,
  apiGetRequestWarehouse,
  apiGetRequestShop,
  apiGetRequestById,
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
const createInvoice = body => http.post(apiCreateInvoice, body)
const getInvoicesByShopId = id => http.get(apiGetInvoicesByShopId(id))
const getOrdersByShopId = id => http.get(apiGetOrdersByShopId(id))

// Request
const updateInfoRequest = (id, body) => http.put(apiUpdateInfoRequest(id), body)
const updateStatusRequest = (id, body) =>
  http.put(apiUpdateStatusRequest(id), body)
const createRequest = body => http.post(apiCreateRequest, body)
const getRequestWarehouse = () => http.get(apiGetRequestWarehouse)
const getRequestShop = id => http.get(apiGetRequestShop(id))
const getRequestById = id => http.get(apiGetRequestById(id))
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
  getInvoicesByShopId,
  getOrdersByShopId,
  updateInfoRequest,
  updateStatusRequest,
  createRequest,
  getRequestWarehouse,
  getRequestShop,
  getRequestById,
}

export default WarehouseManagerService

