export const apiGetShopById = id => `api/shop/${id}`
export const apiGetListProductsInShop = id => `api/shop/${id}/product`
export const apiGetListProductsNotInShop =
  id => `api/shop/${id}/product/unadded/getinfo
`
export const apiAddProductsToShop = id => `api/shop/${id}/product
`
export const apiUpdateProductsToShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`
export const apiGetDetailProductsInShop = (shopId, productId) =>
  `api/shop/${shopId}/product/${productId}`

export const apiGetShopList = `api/shop`

