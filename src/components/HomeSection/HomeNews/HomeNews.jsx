import style from "./HomeNews.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import NewsCart from "../../NewsCart/NewsCart";


export default function HomeNews({ newsData }) {
    return (
        <section id={style.homeNewsWrapper}>
            <div className="container">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    // breakpoints={{
                    //     640: {
                    //         slidesPerView: 2,
                    //         spaceBetween: 20,
                    //     },
                    //     768: {
                    //         slidesPerView: 4,
                    //         spaceBetween: 40,
                    //     },
                    //     1024: {
                    //         slidesPerView: 5,
                    //         spaceBetween: 50,
                    //     },
                    // }}
                    modules={[]}
                    className="mySwiper"
                >
                    {newsData?.map((news) => (
						<SwiperSlide key={news.id}>
							<NewsCart data={news} />
						</SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
