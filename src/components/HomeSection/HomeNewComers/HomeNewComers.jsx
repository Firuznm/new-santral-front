import style from './HomeNewComers.module.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import santral from '../../../Helpers/Helpers';
import urls from '../../../ApiUrls/Urls';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from '../../../assets/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/Icons/ArrowRightIcon';
import ProductCartSlider from '../../ProductCartSlider/ProductCartSlider';
import SectionTitle from '../../SectionTitle/SectionTitle';

export default function HomeNewComers({ data }) {
	const [homeNewComersData, setHomeNewComersData] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);

	const getNewComersData = async (categoryId) => {
		try {
			const resData = await santral.api().post(urls.homeNewComers(categoryId));
			setHomeNewComersData(resData.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (data?.length > 0) {
			const initialCategoryId = activeCategory || data[0].id;
			setActiveCategory(initialCategoryId);
			getNewComersData(initialCategoryId);
		}
	}, [data, activeCategory]);

	return (
		<section id={style.newComersSlider}>
			<SectionTitle title={'Sizin üçün yeni gələnlər'} />
			<div className={style.categoresList}>
				<Swiper
					spaceBetween={'5px'}
					slidesPerView={'auto'}
					navigation={{
						prevEl: '.home-category-button-next',
						nextEl: '.home-category-button-prev',
					}}
					pagination={{
						clickable: true,
					}}
					className={style.categoryNameSlider}
					modules={[Navigation]}
				>
					{data?.map((category) => (
						<SwiperSlide
							className={`${style.category} ${
								activeCategory === category.id ? style.active : ''
							}`}
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
						>
							{category.title}
						</SwiperSlide>
					))}
				</Swiper>
				<div className="home-category-button-prev">
					<ArrowRightIcon />
				</div>
				<div className="home-category-button-next">
					<ArrowLeftIcon />
				</div>
			</div>

			<div className={style.categoryClickResultSlider}>
				<ProductCartSlider data={homeNewComersData} />
			</div>
		</section>
	);
}
