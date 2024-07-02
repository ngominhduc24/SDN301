export const apiGetShopById = id => `api/shop/${id}`
export const apiGetListProductsInShop = id => `api/shop/${id}/product`
export const apiGetListProductsNotInShop = id =>
  `api/shop/${id}/product/unadded/getinfo`
export const apiAddProductsToShop = id => `api/shop/${id}/product`
export const apiUpdateProductsToShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`
export const apiGetDetailProductsInShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`

export const apiGetShopList = `api/shop`
export const apiGetListStaff = `api/manager/staff`

//
export const apiUpdateStatusStaff = id => `api/admin/users/${id}`
export const apiGetStaffDetail = id => `api/admin/users/${id}`

export const apiGetAllInvoice = `api/invoice`
export const apiGetInvoiceById = id => `api/invoice/${id}`
export const apiCreateInvoice = `api/order`
export const apiUpdateInfoInvoice = id => `api/invoice/status/${id}`
export const apiUpdateStatusInvoice = id => `api/invoice/status/${id}`