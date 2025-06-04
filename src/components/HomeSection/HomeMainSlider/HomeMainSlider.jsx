import styles from './HomeMainSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import mainSliderRightTopImg from "../../../assets/Images/Comp-1_1.gif"
import mainSliderBottomRightImg from "../../../assets/Images/mainSliderBottomRight.jpg"
import mainSliderBottomLeftImg from "../../../assets/Images/mainSliderBottomLeft.jpg"
import santral from '../../../Helpers/Helpers';

export default function HomeMainSlider({ leftData, rightData }) {
	console.log('left data=', leftData);
	console.log('right data=', rightData);
	return (
		<div id={styles.homeMainSliderWrapper}>
			<div className={styles.mainSlider}>
				<Swiper
					spaceBetween={20}
					effect={'fade'}
					autoplay={{
						delay: 1500,
					}}
					modules={[Autoplay, Navigation, EffectFade]}
					className={styles.mainSliderLeft}
				>
					{leftData?.map((item) => (
						<SwiperSlide key={item.id}>
							<Link to={`${item.route ? item.route : ''}`}>
								<img src={`${santral.baseUrlImage}${item.image}`} />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
				<div className={styles.mainSliderRight}>
					<img
						className={styles.mainSliderTop}
						src={mainSliderRightTopImg}
						alt=""
					/>
					<div className={styles.mainSliderBottom}>
						<Link className={styles.mainSliderBottomRight} to="/about">
							<img src={mainSliderBottomRightImg} alt="" />
						</Link>
						<Link className={styles.mainSliderBottomLeft} to="/news">
							<img src={mainSliderBottomLeftImg} alt="" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}


