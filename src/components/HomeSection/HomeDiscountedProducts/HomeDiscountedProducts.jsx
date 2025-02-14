// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Navigation} from "swiper/modules";
import styles from "./HomeDiscountedProducts.module.scss"
import ProductCart from '../../ProductCart/ProductCart';
import ArrowLeftIcon from '../../../assets/Icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../assets/Icons/ArrowRightIcon';
import SectionTitle from '../../SectionTitle/SectionTitle';


export default function HomeDiscountedProducts({discountData}) {
  // console.log("discountdata=", discountData);
  return (
        discountData.length > 0 && 
        <section id={styles.DiscountedProducts}>
        <SectionTitle title={"Endirimdə olan məhsullar"}/>
              <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  // loop={true}
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
                      discountData?.map(item=>(
                          <SwiperSlide key={item.id}>
                           <ProductCart data={item.product}/>
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
       </section>

  )
}
