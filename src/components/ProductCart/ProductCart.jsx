import BasketIcon from "../../assets/Icons/BasketIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import santral from "../../Helpers/Helpers";
import style from "./ProductCart.module.scss";
import truck from "../../assets/Images/truck.png"
import { Link } from "react-router-dom";


export default function ProductCart({ data }) {

    const testFunc = () => {
        console.log("basket btn click");
    } 
    // console.log("data pr", data);
  const PriceDifference= Number(data.oldPrice - data.price).toFixed(2)
//   console.log("diff", PriceDifference);
  
    
  return (
      <div className={style.productCartWrapper}>
      {data.price > 50  && (
  <div className={style.delivery}>
    <img src={truck} className={style.truckImg} />
    Mehsul Pulsuz catdirilir
  </div>
)}

       {data.discountPercent > 0 && <span className={style.discount}>-{data.discountPercent}%</span>}

          <Link to={`/product/${data.name}`}>
              <img className={style.productImg} src={`${santral.baseUrlImage}${data.thumbnail}`} />
          </Link>
          <div className={style.productInfo}>
              <Link to={`/product/${data.name}`} className={style.productTitle}>
                  {data.title}
              </Link>

            <div className={style.discountPrice}>
              {PriceDifference > 0 ?  <span className={style.prPriceDifference}>- {PriceDifference} ₼</span> :<div style={{height:"20px"}}></div>}
               {/* <span className={style.te}><img src={truck} alt="" /> Pulsuz Catdirilma</span> */}
              </div>
              <div className={style.prPricesWrapper}>
              <span className={style.productPrice}>{Number(data.price).toFixed(2)} ₼</span>
           {data.oldPrice > 0  && <span className={style.prPreviousPrice}>{Number(data.oldPrice).toFixed(2)} ₼</span>}   
              </div>

              <div className={style.basketAndFavorit}>
                  <span onClick={() => testFunc()} className={style.productBasket}>
                      <BasketIcon color={"rgba(0, 0, 0, 0.87) "} /> Səbətə at
                  </span>
                  <span className={style.ProductFavorite}>
                      <HeartIcon color={"rgba(0, 0, 0, 0.87"} />
                  </span>
              </div>
          </div>
      </div>
  );
}
