import style from "./HomeSeasonOffers.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCart from "../../ProductCart/ProductCart";
import SectionTitle from "../../SectionTitle/SectionTitle";




export default function HomeSeasonOffers({ seasonOffersData }) {
    console.log("test ttt=", seasonOffersData[0]?.products);
    
    
    return (
		<section id={style.homeSeasonOffersWrapper}>
			<SectionTitle title={'Mövsüm təklifləri'} />
			<Swiper
				slidesPerView={1}
				spaceBetween={10}
				pagination={{
					clickable: true,
				}}
				loop={true}
				breakpoints={{
					300: {
						slidesPerView: 1,
					},
					620: {
						slidesPerView: 2,
					},
					930: {
						slidesPerView: 3,
					},
					1240: {
						slidesPerView: 4,
					},
					1550: {
						slidesPerView: 5,
					},
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
