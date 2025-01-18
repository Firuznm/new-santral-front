
const urls = {
    homePartners: "/v1/partners/",
    homeBrands: "/v1/brands/published?lang=az",
    catalog: "/v1/categories/published?lang=az",
    homeNewComers:(id)=>`/v1/products/mobile?category=${id}&lang=az`,
    banners: "/v1/sliders/index/published",
    news: "/v1/blogs/published?page=1&lang=az",
    homeSeasonOffers: "/v1/sliders/producttab/published?page=1&lang=az",
    prDetails:(name)=>`/v1/routes/find?domain=santral_www&location=/az/products/${name}&lang=az`,
    related:(id)=>`/v1/products/published?id=${id}&related=1&lang=az`
               // /v1/products/published?id=${id}&related=1&lang
};

export default urls  