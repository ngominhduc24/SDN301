import http from '../index'
import {apiGetAllProducts, apiGetAllStores, apiGetStoreById} from './url'
const getAllProducts = () => http.get(apiGetAllProducts)
const getAllStores = () => http.get(apiGetAllStores);
const getStoreById = (id) => http.get(apiGetStoreById(id))
const AdminServices = {
      getAllProducts, getAllStores, getStoreById
}

export default AdminServices;