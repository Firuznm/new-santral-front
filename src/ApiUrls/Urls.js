
const urls = {
	homeMainSlider: '/v1/sliders/main/published?page=1&lang=az',
	homeDiscounted: '/v1/sliders/bottom/published?page=1&lang=az',
	homePartners: '/v1/partners/',
	homeBrands: '/v1/brands/published?lang=az',
	catalog: '/v1/categories/published?lang=az',
	homeNewComers: (id) => `/v1/products/mobile?category=${id}&lang=az`,
	banners: '/v1/sliders/index/published',
	news: '/v1/blogs/published?page=1&lang=az',
	homeSeasonOffers: '/v1/sliders/producttab/published?page=1&lang=az',
	prDetails: (name) => `/v1/routes/find?domain=santral_www&location=/az/products/${name}&lang=az`,
	related: (id) => `/v1/products/published?id=${id}&related=1&lang=az`,
	apiAddToBasket: "/v1/products/basket/add",
	apiGetAllBasket: "/v1/products/basket?page=1",
	apiBasketAllClear: "/v1/products/basket/removeAll",
	apiRemoveBasketProduct: "/v1/products/basket/remove",
	apiBasketInc: "/v1/products/basket/inc",
	apiBasketDec:"/v1/products/basket/dec",
	register: '/v1/auth/signup',
	login: '/v1/auth/login',
	authMe: '/v1/auth/me',
	userPhoto: '/v1/file/upload/photo',
	userPersonalInfo: '/v1/auth/profile',
	userAddressCreate: "/v1/customers/address/create",
	userAddressData: "/v1/customers/address/",
	deletedUserAddress: (id) => `/v1/customers/address/delete/${id}`,
	myOrdersPage: (pageNum) => `/v1/orders/history?page=${pageNum}&lang=az`,
	changePassword: "/v1/auth/changepassword",  //-- qosulmuyub
	categoryDetailsFilter:(id)=> `/v1/products/mobile?filters=1&category=${id}&lang=az`,
	categoryDetails: (id, page = 1, sort = '') =>
		`/v1/products/mobile?category=${id}&limit=18&page=${page}&sort=${sort}&search=&lang=az`,
	categorySlug: (slug) => `/v1/routes/find?domain=santral_www&location=/${slug}`,
	search: (value, pageCount) => `/v1/products/published?search=${value}&lang=az&page=${pageCount}`,
	branches:"v1/stores/published?lang=az"
		// categoryDetails: (id) => `/v1/products/mobile?category=${id}&limit=18&page=1&sort=az&search=&lang=az`,
};
  
export default urls  