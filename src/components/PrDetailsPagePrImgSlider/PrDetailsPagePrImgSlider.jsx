import style from "./PrDetailsPagePrImgSlider.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {  FreeMode, Navigation,Thumbs } from 'swiper/modules';
import {  useState } from "react";
import santral from "../../Helpers/Helpers";
import { useSelector } from "react-redux";

export default function PrDetailsPagePrImgSlider({prDetailsData,discountRate }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { bpUser } = useSelector((state) => state.userInfo);
// console.log("slider data-", prDetailsData);

  return (
		<div className={`${style.prDetailsSlider} ${bpUser ? style.BPheight : ""}`}>
			{prDetailsData.oldPrice > 0 && (
				<div className={style.discountRate}>-{discountRate}%</div>
			)}

			<Swiper
				style={{
					'--swiper-navigation-color': 'gold',
				}}
				loop={true}
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className={style.mySwiperSlider}
			>
				{/* {
         data?.map(item=>( */}
				<SwiperSlide
				// key={item.id}
				>
					{/* <img className={style.sliderImg} src={item.img} alt="" /> */}
					<img
						className={style.sliderImg}
						src={`${santral.baseUrlImage}${prDetailsData.thumbnail}`}
					/>
				</SwiperSlide>
				{/* ))
     } */}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				loop={true}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className="sliderLittleImgWrapper"
			>
				{/* {
      data?.map(item=>( */}
				<SwiperSlide
				//  key={item.id}
				>
					{/* <img src={item.img} alt="" /> */}
					<img src={`${santral.baseUrlImage}${prDetailsData.thumbnail}`} />
				</SwiperSlide>
				{/* ))
    } */}
			</Swiper>
		</div>
  );
}
