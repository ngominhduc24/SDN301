import axios from "axios"
import http from "../index"
import {
  apiGetShopById,
  apiGetListProductsInShop,
  apiGetListProductsNotInShop,
  apiAddProductsToShop,
  apiUpdateProductsToShop,
  apiGetDetailProductsInShop,
  apiGetListStaff,
  apiUpdateStatusStaff,
  apiGetStaffDetail,
} from "./urls"
import QueryString from "qs"

const getShop = id => http.get(apiGetShopById(id))
const getListProductsInShop = id => http.get(apiGetListProductsInShop(id))
const getListProductsNotInShop = id => http.get(apiGetListProductsNotInShop(id))
const addProductsToShop = (id, body) =>
  http.post(apiAddProductsToShop(id), body)
const updateProductsToShop = (shopId, productId, body) =>
  http.put(apiUpdateProductsToShop(shopId, productId), body)
const getProductsToShop = (shopId, productId, body) =>
  http.get(apiUpdateProductsToShop(shopId, productId), body)
const getListStaff = () => http.get(apiGetListStaff)
const createStaff = body => http.post(apiGetListStaff, body)
const updateStatusStaff = (id, body) => http.put(apiUpdateStatusStaff(id), body)
const getDetailStaff = (id, body) => http.put(apiGetStaffDetail(id), body)

const ManagerService = {
  getShop,
  getListProductsInShop,
  getListProductsNotInShop,
  addProductsToShop,
  updateProductsToShop,
  getProductsToShop,
  getListStaff,
  createStaff,
  updateStatusStaff,
  getDetailStaff,
}

export default ManagerService

