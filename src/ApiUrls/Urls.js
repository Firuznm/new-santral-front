
const urls = {
    homeMainSlider:"/v1/sliders/main/published?page=1&lang=az",
    homeDiscounted:"/v1/sliders/bottom/published?page=1&lang=az",
    homePartners: "/v1/partners/",
    homeBrands: "/v1/brands/published?lang=az",
    catalog: "/v1/categories/published?lang=az",
    homeNewComers:(id)=>`/v1/products/mobile?category=${id}&lang=az`,
    banners: "/v1/sliders/index/published",
    news: "/v1/blogs/published?page=1&lang=az",
    homeSeasonOffers: "/v1/sliders/producttab/published?page=1&lang=az",
    prDetails:(name)=>`/v1/routes/find?domain=santral_www&location=/az/products/${name}&lang=az`,
    related:(id)=>`/v1/products/published?id=${id}&related=1&lang=az`,
    register:"/v1/auth/signup",
    login:"/v1/auth/login",
    authMe:"/v1/auth/me",
};

export default urls  