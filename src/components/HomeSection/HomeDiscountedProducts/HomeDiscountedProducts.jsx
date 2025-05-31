// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import styles from './HomeDiscountedProducts.module.scss';
import ProductCart from '../../ProductCart/ProductCart';
import ArrowLeftIcon from '../../../assets/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/Icons/ArrowRightIcon';
import SectionTitle from '../../SectionTitle/SectionTitle';

export default function HomeDiscountedProducts({ discountData }) {
	return (
		discountData.length > 0 && (
			<section id={styles.DiscountedProducts}>
				<SectionTitle title={'Endirimdə olan məhsullar'} />
				<Swiper
					slidesPerView={1}
					spaceBetween={10}
					pagination={{
						clickable: true,
					}}
					// loop={true}
					modules={[Navigation]}
					navigation={{
						nextEl: '.home-categorySliderAndDiscountPrSlider-button-prev',
						prevEl: '.home-categorySliderAndDiscountPrSlider-button-next',
					}}
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
					className="resultSlider"
				>
					{discountData?.map((item) => (
						<SwiperSlide key={item.id}>
							<ProductCart data={item.product} />
						</SwiperSlide>
					))}
				</Swiper>
				<div className="home-categorySliderAndDiscountPrSlider-button-next">
					<ArrowLeftIcon />
				</div>
				<div className="home-categorySliderAndDiscountPrSlider-button-prev">
					<ArrowRightIcon />
				</div>
			</section>
		)
	);
}
