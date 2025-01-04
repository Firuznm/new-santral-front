import HomeCategoryPartnersSlider from "../../HomeCategoryPartnersSlider/HomeCategoryPartnersSlider";
import style from "./HomeCategorySlider.module.scss"

export default function HomeCategorySlider({ homeCategorySliderData }) {
    return (
        <section id={style.homeCategory}>
            <HomeCategoryPartnersSlider cartNumber={7} data={homeCategorySliderData}/>
            {/* <div className={style.homeCategoryPartnersSliderWrapper}>
                <div className="container">
                    <Swiper
                        slidesPerView={7}
                        spaceBetween={10}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {data?.map((categoryParners) => (
                            <SwiperSlide key={categoryParners.id}>
                                <Link to={categoryParners.route} className={style.category_PartnersCartWrapper}>
                                    <img className={style.category_ParnersCoverImg} src={`${santral.baseUrlImage}${categoryParners.cover}`} />
                                    <h4 className={style.category_ParnersTitle}>{categoryParners.title}</h4>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div> */}
        </section>
    );
}
