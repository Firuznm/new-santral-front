import style from "./HomeNewComers.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Navigation} from "swiper/modules";
import santral from "../../../Helpers/Helpers";
import urls from "../../../ApiUrls/Urls";
import { useEffect, useState } from "react";
import ArrowLeftIcon from "../../../assets/Icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/Icons/ArrowRightIcon";
import ProductCartSlider from "../../ProductCartSlider/ProductCartSlider";

export default function HomeNewComers({data}) {
    const [homeNewComersData, setHomeNewComersData]= useState([])
    const [activeCategory, setActiveCategory] = useState(null);

   const getNewComersData = async (categoryId)=>{
    try {
        const resData= await santral.api().post(urls.homeNewComers(categoryId))
        setHomeNewComersData(resData.data.data)
    } catch (error) {
        console.log(error);
    }
   }
// console.log("home comer =",homeNewComersData);

   useEffect(() => {
    if (data?.length > 0) {
      const initialCategoryId = activeCategory || data[0].id;
      setActiveCategory(initialCategoryId); 
      getNewComersData(initialCategoryId); 
    }
  }, [data, activeCategory]);
      
  return (
    <section id={style.newComersSlider}>
        <div className="container">
        <div className={style.categoresList}>
    <Swiper
    spaceBetween={"5px"}
    slidesPerView={"auto"}
    navigation={{
        prevEl: ".home-category-button-next",
        nextEl: ".home-category-button-prev",
      }}
       pagination={{
           clickable: true,
       }}
       className={style.categoryNameSlider}
       modules={[Navigation]}
    > 
        {data?.map(category => (
            <SwiperSlide
            className={`${style.category} ${activeCategory === category.id ? style.active : ''}`}
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
{/* <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Navigation]}
        navigation={{
            nextEl: ".home-categoryResult-button-prev",
            prevEl: ".home-categoryResult-button-next",
           
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
            homeNewComersData?.map(item=>(
                <SwiperSlide key={item.id}>
                 <ProductCart data={item}/>
                </SwiperSlide>
            ))
        }
      </Swiper>
      <div className="home-categoryResult-button-next">
    <ArrowLeftIcon />
    </div>
      <div className="home-categoryResult-button-prev">
                <ArrowRightIcon />
    </div> */}
   <ProductCartSlider data={homeNewComersData}/>
</div>
      </div>
    </section>
  )
}
