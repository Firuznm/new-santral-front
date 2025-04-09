import style from "./HomeCategoryPartnersSlider.module.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import santral from "../../Helpers/Helpers";


export default function HomeCategoryPartnersSlider({ data, cartNumber, imgHeight,imgWidth, sliderCartHeight }) {
	return (
		<div className={style.homeCategoryPartnersSliderWrapper}>
			<div style={{ paddingLeft: 0 }} className="container">
				<Swiper
					slidesPerView={cartNumber}
					spaceBetween={10}
					  autoplay={{
					      delay: 2000,
					      disableOnInteraction: false,
					}}
					speed={2000}
					loop={true}
					pagination={{
						clickable: true,
					}}
					modules={[Autoplay]}
					style={{ height: sliderCartHeight }}
					className="homeCategoryPartnersSlider"
				>
					{data?.map((categoryParners) => (
						<SwiperSlide key={categoryParners.id}>
							<Link
								to={`${
									categoryParners.route
										? categoryParners.route
										: categoryParners.url
								}`}
								className={style.category_PartnersCartWrapper}
							>
								<img
									className={style.category_ParnersCoverImg}
									style={{ height: imgHeight, width:imgWidth }}
									src={`${santral.baseUrlImage}${
										categoryParners.cover
											? categoryParners.cover
											: categoryParners.logo
									}`}
								/>
								<h4 className={style.category_ParnersTitle}>
									{categoryParners.title}
								</h4>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}
