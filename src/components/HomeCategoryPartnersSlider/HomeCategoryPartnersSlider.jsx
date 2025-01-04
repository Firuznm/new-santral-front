import style from "./HomeCategoryPartnersSlider.module.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import santral from "../../Helpers/Helpers";


export default function HomeCategoryPartnersSlider({ data, cartNumber,cartWidth, imgWidth,imgHeight }) {
    return (
        <div className={style.homeCategoryPartnersSliderWrapper}>
            <div style={{paddingLeft:0}} className="container">
                <Swiper
                    slidesPerView={7}
                    spaceBetween={10}
                    //   autoplay={{
                    //       delay: 2000,
                    //       disableOnInteraction: false,
                    //   }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {data?.map((categoryParners) => (
                        <SwiperSlide key={categoryParners.id}>
                            <Link to={`${categoryParners.route ? categoryParners.route : categoryParners.url}`} style={{ width: cartWidth }} className={style.category_PartnersCartWrapper}>
                                <img className={style.category_ParnersCoverImg} style={{ width: imgWidth, height: imgHeight }} src={`${santral.baseUrlImage}${categoryParners.cover ? categoryParners.cover : categoryParners.logo}`} />
                                <h4 className={style.category_ParnersTitle}>{categoryParners.title}</h4>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
