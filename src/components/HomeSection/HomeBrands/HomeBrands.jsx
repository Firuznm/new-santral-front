import style from "./HomeBrands.module.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay, } from 'swiper/modules';
import santral from "../../../Helpers/Helpers";

export default function HomeBrands({ brandsData }) {
	
    return (
        <section id={style.HomeBrandsWrapper}>
            <div className="container">  
                    <Swiper
                        slidesPerView={6}
                        // spaceBetween={30}
                        autoplay={{
                            delay: 1500,
                          }}
                        pagination={{
                            clickable: true,
                        }} 
                         loop={true}
                         modules={[Pagination,Autoplay]}
                        className="bransSlider"
                    >
                        {brandsData?.map((brand) => (
                            <SwiperSlide key={brand.id}>
								<a href={brand.route} className={style.brandCart} style={{ backgroundImage: `url(${santral.baseUrlImage}${brand.image})` }}>
									<div className={style.overlay}></div>
                                    <img className={style.brandLogo} src={`${santral.baseUrlImage}${brand.logo}`} />
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
        </section>
    );
}
