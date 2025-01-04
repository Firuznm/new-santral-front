import BasketIcon from "../../assets/Icons/BasketIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import santral from "../../Helpers/Helpers";
import style from "./ProductCart.module.scss"


export default function ProductCart({ data }) {

    const testFunc = () => {
        console.log("basket btn click");
    } 
  return (
      <div className={style.productCartWrapper}>
          <span className={style.catdirilma}>catdirilma</span>
          <span className={style.endirim}>-33%</span>
          <a target="_blank" href="https://www.acehardware.com/">
              <img className={style.productImg} src={`${santral.baseUrlImage}${data.thumbnail}`} />
          </a>
          <div className={style.productInfo}>
              <a href="https://turbo.az/" className={style.productTitle}>
                  {data.title}
              </a>
              <span className={style.productPrice}>  {Number(data.price).toFixed(2)} ₼</span>
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
