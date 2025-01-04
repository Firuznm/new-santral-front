import style from "./HomeBrands.module.scss"
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid} from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import santral from "../../../Helpers/Helpers";

export default function HomeBrands({ brandsData }) {
	
    return (
        <section id={style.HomeBrandsWrapper}>
            <div className="container">
                    <Swiper
                        slidesPerView={5}
                        grid={{
                            rows: 2,
                        }}
                        // spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }} 
                        modules={[Grid]}
                        className={style.bransSlider}
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
