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
					slidesPerView={1}
					speed={3000}
					spaceBetween={30}
					autoplay={{
					    delay: 1500,
					  }}
					pagination={{
						clickable: true,
					}}
					loop={true}
					breakpoints={{
						300: {
							slidesPerView: 1,
						},
						500: {
							slidesPerView: 2,
						},
						700: {
							slidesPerView: 3,
						},
						900: {
							slidesPerView: 4,
						},
						1100: {
							slidesPerView: 5,
						},
						1300: {
							slidesPerView: 6,
						},
						1500: {
							slidesPerView: 7,
						},
					}}
					modules={[Pagination, Autoplay]}
					className="bransSlider"
				>
					{brandsData?.map((brand) => (
						<SwiperSlide key={brand.id}>
							<a
								href={brand.route}
								className={style.brandCart}
								style={{
									backgroundImage: `url(${santral.baseUrlImage}${brand.image})`,
								}}
							>
								<div className={style.overlay}></div>
								<img
									className={style.brandLogo}
									src={`${santral.baseUrlImage}${brand.logo}`}
								/>
							</a>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
