import http from '../index'
import {apiGetAllProducts, apiGetAllStores, apiGetAllUsers, apiGetStoreById, apiGetUserDetail} from './url'
const getAllProducts = () => http.get(apiGetAllProducts)
const getAllStores = () => http.get(apiGetAllStores);
const getStoreById = (id) => http.get(apiGetStoreById(id))
const getAllManagers = (token) => http.get(apiGetAllUsers, {
      headers: {
            Authorization: `Bearer ${token}`
      }
})
const getManagerById = (id) => http.get(apiGetUserDetail(id))
const AdminServices = {
      getAllProducts, getAllStores, getStoreById, getAllManagers, getManagerById
}

export default AdminServices;