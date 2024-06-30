export const apiGetInfoWarehouse = `api/shop/warehouse/getinfo`
export const apiGetListProductsWarehouse = id => `api/shop/${id}/product`
export const apiGetListProductsNotInWarehouse =
  id => `api/shop/${id}/product/unadded/getinfo
`
export const apiAddProductsToWarehouse = id => `api/shop/${id}/product
`
export const apiGetShopList = `api/shop`
export const apiUpdateProductsInWarehouse = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`

