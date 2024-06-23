import axios from "axios"
import http from "../index"
import {
  apiGetShopById,
  apiGetListProductsInShop,
  apiGetListProductsNotInShop,
  apiAddProductsToShop,
  apiUpdateProductsToShop,
  apiGetDetailProductsInShop,
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
const ManagerService = {
  getShop,
  getListProductsInShop,
  getListProductsNotInShop,
  addProductsToShop,
  updateProductsToShop,
  getProductsToShop,
}

export default ManagerService

