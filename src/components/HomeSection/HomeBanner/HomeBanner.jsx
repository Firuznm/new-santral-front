import style from "./HomeBanner.module.scss"
import { bannerDatas } from "../../../MyDatas/MyDatas";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

export default function HomeBanner({ reverse }) {
    
  return (
      <section id={style.bannerWrapper}>
          <div className="container">
              {/* <div style={{ flexDirection: reverse }} className={style.banner}>
				 
                  <a href="/" style={{ backgroundImage: `url(${bannerDatas.rightBannerData.img})` }} className={style.bannerLeft}>
                      <div className={style.bannerInfo}>
                          <h5 className={style.bannerTitle}>{bannerDatas.rightBannerData.title}</h5>
                          <p className={style.bannerText}>{bannerDatas.rightBannerData.text}</p>
                      </div>
                  </a>
                  <div className={style.bannerRight}>
                      <a href="/" style={{ backgroundImage: `url(${bannerDatas.leftTopBannerData.img})` }} className={style.top}>
                          <div className={style.bannerInfo}>
                              <h5 className={style.bannerTitle}>{bannerDatas.rightBannerData.title}</h5>
                              <p className={style.bannerText}>{bannerDatas.leftTopBannerData.text}</p>
                          </div>
                      </a>
                      <a href="/" style={{ backgroundImage: `url(${bannerDatas.leftBommomBannerData.img})` }} className={style.bottom}>
                          <div className={style.bannerInfo}>
                              <h5 className={style.bannerTitle}>{bannerDatas.leftBommomBannerData.title}</h5>
                              <p className={style.bannerText}>{bannerDatas.leftBommomBannerData.text}</p>
                          </div>
                      </a>
                  </div>
              </div> */}
              <div className={style.banner}>
                  <div className={style.tallBannerWrapper}>
                      <Swiper
                          spaceBetween={30}
                          centeredSlides={true}
                          effect={"fade"}
                          autoplay={{
                              delay: 1500,
                          }}
                          pagination={{
                              clickable: true,
                          }}
                          modules={[Autoplay, Pagination, EffectFade]}
                          className="tallBannerSlider"
                      >
                          {bannerDatas.topBanner.topLeft.map((item) => (
                              <SwiperSlide key={item.id}>
                                  <Link className={style.tallBannerCart}>
                                      <img src={item.img} />
                                  </Link>
                              </SwiperSlide>
                          ))}
                      </Swiper>
                  </div>

                  <div className={style.narrowBanners}>
                      {/* <div className={style.topNarrowBannerWrapper}> */}
                      <Swiper
                          spaceBetween={30}
                          centeredSlides={true}
                          effect={"fade"}
                          autoplay={{
                              delay: 2000,
                          }}
                          pagination={{
                              clickable: true,
                          }}
                          modules={[Autoplay, Pagination, EffectFade]}
                          className="narrowTopBottomSlider"
                      >
                          {bannerDatas.topBanner.rightTop.map((item) => (
                              <SwiperSlide key={item.id}>
                                  <Link className={style.topNarrowBannerCart}>
                                      <img src={item.img} />
                                  </Link>
                              </SwiperSlide>
                          ))}
                      </Swiper>
                      {/* </div> */}
                      {/* <div className={style.bottomNarrowBannerwrapper}> */}
                      <Swiper
                          spaceBetween={30}
                          centeredSlides={true}
                          effect={"fade"}
                          autoplay={{
                              delay: 2500,
                          }}
                          pagination={{
                              clickable: true,
                          }}
                          modules={[Autoplay, Pagination, EffectFade]}
                          className="narrowTopBottomSlider"
                      >
                          {bannerDatas.topBanner.rightBottom.map((item) => (
                              <SwiperSlide key={item.id}>
                                  <Link className={style.bottomNarrowBannerCart}>
                                      <img src={item.img} />
                                  </Link>
                              </SwiperSlide>
                          ))}
                      </Swiper>
                  </div>
              </div>
          </div>
          {/* </div> */}
      </section>
  );
}
