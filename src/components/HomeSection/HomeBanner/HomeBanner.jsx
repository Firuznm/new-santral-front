import style from './HomeBanner.module.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import santral from '../../../Helpers/Helpers';

export default function HomeBanner({ data }) {
	return (
		<section id={style.bannerWrapper}>
			<div style={{ paddingLeft: 0, paddingRight: 0 }} className="container">
				<div className={style.banner}>
					<div className={style.tallBannerWrapper}>
						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							effect={'fade'}
							autoplay={{
								delay: 1500,
							}}
							pagination={{
								clickable: true,
							}}
							modules={[Autoplay, Pagination, EffectFade]}
							className="tallBannerSlider"
						>
							{/* {data.map((item) => ( */}
							<SwiperSlide>
								<Link
									to={data?.firstbannerleft?.route}
									className={style.tallBannerCart}
								>
									<img
										src={`${santral.baseUrlImage}${data?.firstbannerleft?.thumbnail}`}
									/>
								</Link>
							</SwiperSlide>
							{/* ))} */}
						</Swiper>
					</div>

					<div className={style.narrowBanners}>
						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							effect={'fade'}
							autoplay={{
								delay: 2000,
							}}
							pagination={{
								clickable: true,
							}}
							modules={[Autoplay, Pagination, EffectFade]}
							className="narrowTopBottomSlider"
						>
							{/* {data.map((item) => ( */}
							<SwiperSlide>
								<Link
									to={data?.firstbannerright1?.route}
									className={style.topNarrowBannerCart}
								>
									<img
										src={`${santral.baseUrlImage}${data.firstbannerright1?.thumbnail}`}
									/>
								</Link>
							</SwiperSlide>
							{/* ))} */}
						</Swiper>

						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							effect={'fade'}
							autoplay={{
								delay: 2500,
							}}
							pagination={{
								clickable: true,
							}}
							modules={[Autoplay, Pagination, EffectFade]}
							className="narrowTopBottomSlider"
						>
							{/* {data.map((item) => ( */}
							<SwiperSlide>
								<Link
									to={data?.firstbannerright2?.route}
									className={style.bottomNarrowBannerCart}
								>
									<img
										src={`${santral.baseUrlImage}${data?.firstbannerright2?.thumbnail}`}
									/>
								</Link>
							</SwiperSlide>
							{/* ))} */}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
