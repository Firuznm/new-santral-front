import style from "./HomeSeasonOffers.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCart from "../../ProductCart/ProductCart";
import SectionTitle from "../../SectionTitle/SectionTitle";




export default function HomeSeasonOffers({ seasonOffersData }) {
    
    return (
        <section id={style.homeSeasonOffersWrapper}>
            <SectionTitle title={"Mövsüm təklifləri"}/>
                <Swiper   
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[]}
                    className="mySwiper"
                >
                    {seasonOffersData[0]?.products.map((item) => (
                        <SwiperSlide key={item.id}>
                            <ProductCart data={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
        </section>
    );
}
