import styles from "./HomeMainSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { mainSliderData } from "../../../MyDatas/MyDatas";
import { Link } from "react-router-dom";
import santral from "../../../Helpers/Helpers";

export default function HomeMainSlider({dataMainSlider,dataDiscounted}) {
  const mainSliderDiscountRightData=dataDiscounted.slice(0 , Math.floor(dataDiscounted.length / 2))
  const mainSliderDiscountLeftData=dataDiscounted.slice(Math.floor(dataDiscounted.length / 2))
  
  return (
    <div id={styles.homeMainSliderWrapper}>
      <div className="container">
        <div className={styles.homeMainSlider}>
          <div className={styles.mainSliderLeft}>
            <MainSlider
              data={dataMainSlider}
              autoplayStyle={{ delay: 2000 }}
              effectStyle="fade"
            />
          </div>
          <div className={styles.mainSliderRightWrapper}>
            <div className={styles.mainSliderRightTop}>
              <MainSlider data={mainSliderData.rightTop} />
            </div>
            <div className={styles.mainSliderRightBottomWrapper}>
              <div className={styles.rightBottomLeft}>
                <MainSlider
                  data={mainSliderDiscountLeftData}
                  paginationStyles="rightLeftPagination"
                  autoplayStyle={{ delay: 3000 }}
                  effectStyle="fade"
                />
              </div>
              <div className={styles.rightBottomRight}>
                <MainSlider
                  data={mainSliderDiscountRightData}
                  paginationStyles="rightBottomPagination"
                  autoplayStyle={{ delay: 3000 }}
                  effectStyle="fade"
                />
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export function MainSlider({ data,autoplayStyle, effectStyle }) {
  return (
    <>
      <Swiper
        spaceBetween={20}
        effect={effectStyle}
        // autoplay={autoplayStyle}
        modules={[Autoplay, Navigation, EffectFade]}
        className={styles.swiperMainSlider}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            {item.video ? (
              <iframe
                src={`${item.video}?autoplay=1&mute=1&loop=1&playlist=${item.video.split("/").pop()}`}
                title="YouTube Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <Link to={item?.product && item?.product?.discountPercent > 0 ?  `/product/${item?.product?.name}` : item.route}> <img src={`${santral.baseUrlImage}${item.image}`}/>
              {item?.product && item?.product?.discountPercent > 0 && 
                <div  className={styles.prInfo}>
                    <span className={styles.prDiscountPercent}>{item?.product?.discountPercent}%</span>
                  <h6 className={styles.prTitle}>{item.title}</h6>
                  <div className={styles.prPriceWrapper}>
                    <span className={styles.price}>{item?.product?.price.toFixed(1)}</span>
                    <span className={styles.oldPrice}>{item?.product?.oldPrice?.toFixed(1)}</span>
                    <span className={styles.prDiscount}>
                    {item?.product?.discount?.toFixed(1)}
                    </span>
                  </div>
                </div>
              }
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
