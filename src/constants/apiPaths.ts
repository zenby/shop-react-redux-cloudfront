const bffUrl = 'http://zenby-bff-api-dev.eba-ec3kquta.eu-central-1.elasticbeanstalk.com'
const importServiceUrl = 'https://omdfergjvk.execute-api.eu-central-1.amazonaws.com/dev'
// const cartServiceUrl = 'http://zenby-cart-api-develop.eu-central-1.elasticbeanstalk.com/api/profile/cart'

const API_PATHS = {
  product: bffUrl,
  order: bffUrl,
  import: importServiceUrl,
  bff: bffUrl,
  cartProfile: bffUrl,
}

export default API_PATHS
