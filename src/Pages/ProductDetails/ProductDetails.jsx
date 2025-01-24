import style from "./ProductDetails.module.scss"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay, FreeMode, Navigation,Thumbs } from 'swiper/modules';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import HeartIcon from "../../assets/Icons/HeartIcon";
import LinkIcon from "../../assets/Icons/LinkIcon";
import MinusIcon from "../../assets/Icons/MinusIcon";
import PlusIcon from "../../assets/Icons/PlusIcon";
import birbankKartImg from "../../assets/Images/birbank.png"
import tamKartImg from "../../assets/Images/tamkart.jfif"
import BasketIcon from "../../assets/Icons/BasketIcon";
import HeaderPhoneIcon from "../../assets/Icons/HeaderPhoneIcon";
import TruckAnimation from "../../components/TruckAnimation/TruckAnimation";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";
import { prDetailsDataTest } from "../../MyDatas/MyDatas";
import ProductCartSlider from "../../components/ProductCartSlider/ProductCartSlider";
import whatsappImg from "../../assets/Images/whatsapp.png";
import instagramImg from "../../assets/Images/instagram.png";
import facebookImg from "../../assets/Images/facebook.png";
import copyImg from "../../assets/Images/copy.png";
import CloseIcon from "../../assets/Icons/CloseIcon";


export default function ProductDetails() {
    const {name}= useParams();
    const socialAreaRef = useRef(null); 
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [relatedDatas, setRelatedDatas]= useState();
    const [prDetailsData, setPrDetailsData]= useState({});
    const [showRelatedOrPrInfo, setShowRelatedOrPrInfo]= useState(true);
    const [prDetailsSocial, setPrDetailsSocial]= useState(false);
    const [showCreditMonthPayment, setShowCreditMonthPayment]= useState(true);
    const [oneClickBuyModal, setOneClickBuyModal]= useState(false);
    const [oneClickInput, setOneClickInput] = useState("")
    const [url, setUrl]= useState("")
    console.log("data=", prDetailsData);

    const prPriceDifference = (prDetailsData.oldPrice - prDetailsData.price).toFixed(2);
    const discountRate= (100 - (prDetailsData.price*100 / prDetailsData.oldPrice)).toFixed(0);
    const threeMonths = prDetailsData.oldPrice > 0 ? (prDetailsData.oldPrice / 3).toFixed(2) : (prDetailsData.price / 3).toFixed(2);
    const sixMonths = prDetailsData.oldPrice > 0 ? (prDetailsData.oldPrice / 6).toFixed(2) : (prDetailsData.price / 6).toFixed(2);
    
    const handlePhoneInputChange = ()=>{
      setOneClickInput()
    }
    const handleState=()=>{
    setShowRelatedOrPrInfo(!showRelatedOrPrInfo)
   }

   const handleStateCreditMonth=()=>{
      setShowCreditMonthPayment(!showCreditMonthPayment)
   }

   useEffect(()=>{
    setShowCreditMonthPayment(true)
   },[name])
    useEffect(()=>{
     setUrl(window.location.href)
    },[])
    const copyFunc= ()=>{
      navigator.clipboard.writeText(url)
    }
    const handleBuyModal = ()=>{
           const modalSituations = !oneClickBuyModal;
           setOneClickBuyModal(modalSituations);
          if (modalSituations) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto"; 
      }
    }

  const onClickSocialBtn = () => {
    setPrDetailsSocial(!prDetailsSocial);
  };

  const handleClickOutside = (event) => {
    if (socialAreaRef.current && !socialAreaRef.current.contains(event.target)) {
      setPrDetailsSocial(false);
    }
  };

  window.addEventListener('click', handleClickOutside);

   const getPrDetailsData= async(prName)=>{
try {
    const resPrData= await santral.api().get(urls.prDetails(prName))
     setPrDetailsData(resPrData.data.route)
} catch (error) {
    console.log(error);
}
   }

    const prId=prDetailsData?.id;

    const getRelatedData= async(Id)=>{
      try {
        const resPrData= await santral.api().post(urls.related(Id))
          setRelatedDatas(resPrData.data.data)
    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
      getPrDetailsData(name);
      window.scrollTo({ top:0, behavior: "smooth" });
    }, [name]);
    
    useEffect(() => {
      if (prId) {
        getRelatedData(prId);
      }
    }, [prId]);
    
  return (
    <section id={style.prDetailsWrapper}>
      <div className="container">
        <div onClick={handleBuyModal} className={`${style.modalWrapper}  ${oneClickBuyModal ? "" : style.closeModal}`}>
        <div className={style.oneClickByModalArea}>
          <div className={style.modalHeaderAndCloseBtn}>
          <h6>1 kliklə məhsulu alın</h6>
          <span onClick={handleBuyModal}><CloseIcon /></span>
          </div>
          <hr className={style.line}/>
       <label htmlFor="">Nömrənizi daxil edin</label>
       <input type="number" />
       <button className={style.oneClickBuyBtn}>1 klikə al</button>
        </div>
        
        </div>
        <div className={style.prImgAndPrInfo}>
                  <div className={style.prDetailsSlider}>
              {prDetailsData.oldPrice > 0 && <div className={style.discountRate}>-{discountRate}%</div>}  
                      <Swiper
                      style={{
                      '--swiper-navigation-color': 'green',
                      }}
                      loop={true}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className={style.mySwiperSlider}
            >
              {
                   prDetailsDataTest.map(item=>(
                      <SwiperSlide key={item.id}>
                        <img src={item.img} alt="" />
                      {/* <img src={`${santral.baseUrlImage}${prDetailsData.thumbnail}`} /> */}
                    </SwiperSlide>
                  ))
              }
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
              {
                prDetailsDataTest.map(item=>(
                    <SwiperSlide
                     key={item.id}
                    >
                      <img src={item.img} alt="" />
                      {/* <img src={`${santral.baseUrlImage}${prDetailsData.thumbnail}`}/> */}
                    </SwiperSlide>
                ))
              }
                </Swiper>

                      </div>
        <div className={style.prInfoWrapper}>
          <div className={style.delivery}>
            <TruckAnimation/>
          </div>
            <div className={style.prTitleAndFavoriteSocial}>
              <h4 className={style.prTitle}>{prDetailsData.title}</h4>
              <div className={style.favoriteSocial}>
                <span className={style.favorite}><HeartIcon color={"black"}/></span>
                <span  ref={socialAreaRef}  onClick={onClickSocialBtn} className={`${style.socialWrapper} ${prDetailsSocial ? style.btnActive : ""}`}>
                  <LinkIcon/>
                  <div  className={`${style.prDeatailsSocilaLink} ${prDetailsSocial ? "": style.noActive}`}>
                    <a className={style.prDetailsSocial} href="" target="_blank"><img src={whatsappImg} /> Whatsapp</a>
                    <a className={style.prDetailsSocial} href="" target="_blank"><img src={instagramImg} /> Instagram</a>
                    <a className={style.prDetailsSocial} href="" target="_blank"><img src={facebookImg} /> Facebook</a>
                    <div onClick={copyFunc} className={style.prDetailsSocial} href="" target="_blank"><img src={copyImg} /> Linki Kopyala</div>
                  </div>
                  
                </span>
              </div>
            </div>
            <div className={style.prAvailableAndPrCod}>
              <span className={style.prAvailable}>Məhsul mövcuddur : {prDetailsData.stock}</span>
             {prDetailsData.brandCode && <span className={style.prCode}>Məhsulun Codu:  <span className={style.code}>{prDetailsData.brandCode}</span></span>} 
            </div>
            <hr className={style.line}/>
            <div className={style.prCountAndPrice}>
              <div className={style.prCountWrapper}>
                <span className={style.decrease}><MinusIcon/></span>
                <span className={style.count}>199</span>
                <span className={style.increase}><PlusIcon/></span>
              </div>
     <div className={style.priceWrapper}>
      <span className={style.newPrice}>{prDetailsData?.price?.toFixed(2)} ₼</span>
    {prDetailsData?.oldPrice > 0  && <span className={style.prOldPrice}>{prDetailsData?.oldPrice?.toFixed(2)} ₼</span>}  
    {prPriceDifference > 0 &&  <span className={style.prDiscount}>-{prPriceDifference} ₼</span>} 
      </div>
      </div>
      <hr className={style.line}/>
      <div className={style.paymentCartInfoAndSlider}>
        <div className={style.paymentCartInfo}>
          <h5 className={style.title}>Hissə-hissə alış</h5>
          <p className={style.info}>Şərtlər endirimsiz qiymətə tətbiq olunur</p>
        </div>
        <div className={style.paymentCartSlider}>
        <Swiper
        spaceBetween={30}
        speed={3000}
        autoplay={{
          delay: 1500,
        }}
        loop={true}
        modules={[Autoplay]}
        className={style.creditCartSlider}
      >
        <SwiperSlide>
          <span className={style.BirKart}>
                <img src={birbankKartImg}  />
                <p className={style.content}>BirKart ilə 3 ay fiazsiz ödə!</p>
              </span>
              </SwiperSlide>
        <SwiperSlide>
          <span className={style.TamKart}>
                <img src={tamKartImg}   />
                <p className={style.content}>TamKart ilə 6 ay fiazsiz ödə!</p>
              </span>
              </SwiperSlide>
      </Swiper>
          </div>
      </div>
      <div className={style.paymentMonths}>
        <div>
          <span onClick={handleStateCreditMonth} className={`${style.month} ${showCreditMonthPayment ? style.activeMonth : ""}`}>3ay</span>
          <span onClick={handleStateCreditMonth} className={`${style.month} ${showCreditMonthPayment ? "" : style.activeMonth }`}>6ay</span>
        </div>
        <div className={style.payementResuslt}>
          Aylıq ödəniş
        <span className={style.payment}> {showCreditMonthPayment ? threeMonths : sixMonths} ₼</span>
        </div>
      </div>
      <div className={style.btnGroup}>
      <button className={style.basketBtn}><BasketIcon color={"black"}/>Səbətə at</button>
      <button onClick={handleBuyModal} className={style.oneClickByBtn}>icon Bir kliklə al</button>
      <button className={style.callBtn}><HeaderPhoneIcon/> Mənə zəng et</button>
      </div>
      
     
      </div>
        </div>


        <div className={style.similarPrAndFeaturesBtn}>
         <button onClick={handleState} className={`${style.similarBtn} ${showRelatedOrPrInfo ? style.BtnActive : ""}`}>Oxşar məhsullar</button>
        {prDetailsData.parameters && <button onClick={handleState} className={`${style.featuresBtn} ${showRelatedOrPrInfo ? "" : style.BtnActive}`}>Xüsusiyyətləri</button>}
        </div>
     { showRelatedOrPrInfo ? 
         <div className={style.relatedProducts}>
          <ProductCartSlider data={relatedDatas}/>
        </div>
        :
        <div className={style.prMoreInfoWrapper}>
           <h4 className={style.prInfoTitle}>{prDetailsData?.title}</h4>
           <p className={style.prInfo}></p>
           <div className={style.indicatorsWrapper}>
            {
              prDetailsData?.parameters?.map((indicator,i)=>(
                <div key={i} className={style.prIndicator}>
                <span className={style.param}>{indicator?.param.title}</span>
                <span className={style.option}>{indicator?.option.title}</span>
                </div>
              ))
            }
           </div>
      </div>
         }
   
     

{/* <div className={style.paymentPriceWrapper}>

          <div className={style.paymentCartWrapper}>

          </div>
          <div className={style.prCountPriceAndBasket}>
            <div className={style.prCount}>
            <span className={style.decrease}><MinusIcon/></span>
                <span className={style.count}>1</span>
                <span className={style.increase}><PlusIcon/></span>
            </div>
            <div className={style.prPrices}>
              <span className={style.discountPrice}>-7733 ₼</span>
              <div className={style.priceAndOldprice}>
              <span className={style.price}>5955 ₼</span>
              <span className={style.prOldPrice}>777₼</span>
              </div>
            </div>
            <button className={style.basketBtn}><BasketIcon color={"black"}/> Səbətə at</button>
          </div>

          </div> */}
            {/* <hr className={style.line}/>
            <div className={style.prCountAndPrice}>
              <div className={style.countWrapper}>
                <span className={style.decrease}><MinusIcon/></span>
                <span className={style.count}>199</span>
                <span className={style.increase}><PlusIcon/></span>
              </div>
  <div className={style.priceWrapper}>
      <span className={style.newPrice}>435 ₼</span>
      <span className={style.oldPrice}>657 ₼</span>
      <span className={style.prDiscount}>-222 ₼</span>
       </div>
   
            </div>
            <hr className={style.line}/>
            <div className={style.creditAndPaymentCart}>
             <div className={style.PaymentInfo}>
                <h4 className={style.paymentTitle}>Hissəli alış kalkulyatoru</h4>
                <p className={style.info}>Şərtlər məhsulun bugünki qiymətinə tətbiq olunur</p>
             </div>
             <div className={style.PaymentCart}>
              <span className={style.BirKart}>
                <img src={birbankKartImg}  />
                <p>BirKart ilə 3 ay fiazsiz ödə</p>
              </span>
              <span className={style.TamKart}>
                <img src={tamKartImg}   />
                <p>TamKart ilə 6 ay fiazsiz ödə</p>
              </span>
             </div>
            </div> */}
            {/* <div className={style.paymentCalculateWrapper}>
              <div className={style.paymentCarts}>
              <p className={style.paymentCartInfo}>Şərtlər məhsulun bugünki qiymətinə tətbiq olunur</p>
              <div className={style.buyCarts}>
              <span className={style.BirKart}>
                <img src={birbankKartImg}  />
                <p>BirKart ilə 3 ay fiazsiz ödə</p>
              </span>
              <span className={style.TamKart}>
                <img src={tamKartImg}   />
                <p>TamKart ilə 6 ay fiazsiz ödə</p>
              </span>
             </div>
              </div>
              <div className={style.months}>
                <span className={style.month}>3 ay</span>
                <span className={style.month}>6 ay</span>
              </div>
              <hr className={style.horizontalLine}/>
              <div className={style.calculateResult}>
               Aylıq ödəniş
               <span className={style.payment}>40.40 ₼</span> 
              </div>
            </div>
            <div className={style.basketBtnAndBuyBtn}>
           <button className={style.basketBtn}><BasketIcon color={"black"}/> Səbətə at</button>
           <button className={style.buyBtn}>icon Bir kliklə al</button>
           <a className={style.callBtn} href=""><HeaderPhoneIcon/> Zəng et</a>
            </div> */}
      
      </div>
    </section>
  )
}
