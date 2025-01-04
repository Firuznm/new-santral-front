import styles from "./HomeMainSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { mainSliderData } from "../../../MyDatas/MyDatas";

export default function HomeMainSlider() {
  return (
    <div id={styles.homeMainSliderWrapper}>
      <div className="container">
        <div className={styles.homeMainSlider}>
          <div className={styles.mainSliderLeft}>
            <Slider
              data={mainSliderData.leftData}
              prevNavigation={"prevBtn"}
              nextNavigation={"nextBtn"}
            />
          </div>
          <div className={styles.mainSliderRightWrapper}>
            <div className={styles.mainSliderRightTop}>
              <Slider data={mainSliderData.rightTop} />
            </div>
            <div className={styles.mainSliderRightBottomWrapper}>
              <div className={styles.rightBottomLeft}>
                <Slider
                  data={mainSliderData.bottomLeft}
                  paginationStyles="rightLeftPagination"
                  autoplayStyle={{ delay: 3000 }}
                  effectStyle="fade"
                />
              </div>
              <div className={styles.rightBottomRight}>
                <Slider
                  data={mainSliderData.bottomRight}
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

export function Slider({ data, paginationStyles, autoplayStyle, effectStyle, prevNavigation, nextNavigation }) {
  return (
    <>
      <div className={paginationStyles}></div>
      <Swiper
        spaceBetween={20}
        navigation={
          prevNavigation && nextNavigation
            ? {
                prevEl: `.${prevNavigation}`,
                nextEl: `.${nextNavigation}`,
              }
            : false
        }
        pagination={{
          clickable: true,
          el: `.${paginationStyles}`,
        }}
        effect={effectStyle}
        autoplay={autoplayStyle}
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
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
              <img src={item.image} alt="" />
            )}
          </SwiperSlide>
        ))}
        {prevNavigation && nextNavigation && (
          <div className="sliderNextPrevBtn">
            <div className="nextBtn">next</div>
            <div className="prevBtn">prev</div>
          </div>
        )}
      </Swiper>
    </>
  );
}
