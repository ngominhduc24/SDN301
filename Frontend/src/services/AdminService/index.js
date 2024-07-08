import http from '../index'
import {apiAddNewUsers, apiAddProducts, apiGetAllCategories, apiGetAllProducts, apiGetAllStores, apiGetAllUsers, apiGetCategoryById, apiGetProductById, apiGetStoreById, apiGetUserDetail, apiUpdateProducts, apiUpdateStatusUser} from './url'
const getAllProducts = () => http.get(apiGetAllProducts)
const getAllStores = () => http.get(apiGetAllStores);
const getStoreById = (id) => http.get(apiGetStoreById(id))
const getAllManagers = (token) => http.get(apiGetAllUsers, {
      headers: {
            Authorization: `Bearer ${token}`
      }
})
const getManagerById = (id) => http.get(apiGetUserDetail(id))
const updateStatusUsers = (id, body) => http.put(apiUpdateStatusUser(id), body)
const getUserDetail = (id, body) => http.put(apiGetUserDetail(id), body)
const addnewUsers = (body) => http.post(apiAddNewUsers, body);
const getProductById = (id) => http.get(apiGetProductById(id));
const addNewProduct = (body) => http.post(apiAddProducts, body);
const updateProducts = (id, body) => http.put(apiUpdateProducts(id), body)
const getAllCategories = () => http.get(apiGetAllCategories);
const getCategoryById = (id) => http.get(apiGetCategoryById(id))
const AdminServices = {
      getAllProducts, getAllStores, getStoreById, getAllManagers, getManagerById, updateStatusUsers, getUserDetail, addnewUsers, addNewProduct, getProductById, updateProducts, getAllCategories, getCategoryById
}

export default AdminServices;