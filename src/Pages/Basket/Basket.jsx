import { useSelector } from "react-redux"
import style from "./Basket.module.scss"
import TrashIconBasket from "../../assets/Icons/TrashIconBasket";
import DeleteRedIcon from "../../assets/Icons/DeleteRedIcon";
import PlusIcon from "../../assets/Icons/PlusIcon";
import MinusIcon from "../../assets/Icons/MinusIcon";
import santral from "../../Helpers/Helpers";

export default function Basket() {

  const {baskets} = useSelector(store=> store.basketData)
console.log("basket page=", baskets);

  return (
		<section id={style.Basket}>
			<div className="container">
				{baskets.length > 0 ? (
					<div className={style.basketContent}>
						<div className={style.basketContentLeft}>
							<div className={style.basketLeftHeader}>
								<h3 className="sectionTitle">Səbət</h3>
								<div className={style.allBasketPrDelete}>
									<TrashIconBasket /> Hamısını sil
								</div>
							</div>
							{baskets?.map((item) => (
								<div key={item.id} className={style.basketPrList}>
									<img
										className={style.basketPrImg}
										src={`${santral.baseUrlImage}${item.thumbnail}`}
									/>
									<h5 className={style.basketPrTitle}>{item.title}</h5>
									<div className={style.quantityPriceDelete}>
										<div className={style.prCountWrapper}>
											<span className={style.decrease}>
												<MinusIcon />
											</span>
											<span className={style.count}>971</span>
											<span className={style.increase}>
												<PlusIcon />
											</span>
										</div>
										<div className={style.oldAndNewprice}>
											{item.oldPrice != 0 && (
												<span className={style.oldPrice}>
													{item.oldPrice.toFixed(2)}₼
												</span>
											)}

											<span className={style.newPrice}>
												{item.price.toFixed(2)}₼
											</span>
										</div>
										<span className={style.deleteIcon}>
											<DeleteRedIcon />
										</span>
									</div>
								</div>
							))}
						</div>
						<div className={style.basketContentRight}></div>
					</div>
				) : (
					<div className={style.freeBasket}>Səbətdə məhsul yoxdu</div>
				)}
			</div>
		</section>
  );
}
