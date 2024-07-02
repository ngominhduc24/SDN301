import http from '../index'
import {apiAddNewUsers, apiGetAllProducts, apiGetAllStores, apiGetAllUsers, apiGetStoreById, apiGetUserDetail, apiUpdateStatusUser} from './url'
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
const AdminServices = {
      getAllProducts, getAllStores, getStoreById, getAllManagers, getManagerById, updateStatusUsers, getUserDetail, addnewUsers
}

export default AdminServices;