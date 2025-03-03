// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Navigation} from "swiper/modules";
import ProductCart from '../ProductCart/ProductCart';
import ArrowLeftIcon from '../../assets/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../assets/Icons/ArrowRightIcon';
import { useRef, useEffect } from 'react';
  
export default function ProductCartSlider({data}) {
    const swiperRef = useRef(null); 
    // console.log("data slider=",data);
    
    // category degisdiginde sliderin render olunmasi
    useEffect(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(0); 
      }
    }, [data]);
  
  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".home-categorySliderAndDiscountPrSlider-button-prev",
          prevEl: ".home-categorySliderAndDiscountPrSlider-button-next",
         
        }}
          breakpoints={{
            470: {
              slidesPerView: 1,
            },
            670: {  
              slidesPerView: 2.1,
            },
            850: {
              slidesPerView: 2.7,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1270: {
              slidesPerView: 4.1,
            },
            1400: {
              slidesPerView: 4.7,
            },
             1600: {
              slidesPerView: 5,
            },
          }}
        className="resultSlider"
      >
        {
            data?.map(item=>(
                <SwiperSlide key={item.id}>
                 <ProductCart data={item}/>
                </SwiperSlide>
            ))
        }
      </Swiper>
     <div className="home-categorySliderAndDiscountPrSlider-button-next">
                          <ArrowLeftIcon />
                </div>
                  <div className="home-categorySliderAndDiscountPrSlider-button-prev">
                            <ArrowRightIcon />
                </div>
    </>
  )
}
