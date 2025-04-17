import { useDispatch, useSelector } from 'react-redux';
import style from './Basket.module.scss';
import TrashIconBasket from '../../assets/Icons/TrashIconBasket';
import DeleteRedIcon from '../../assets/Icons/DeleteRedIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';
import MinusIcon from '../../assets/Icons/MinusIcon';
import santral from '../../Helpers/Helpers';
import BasketPrNamePriceTotal from '../../components/BasketPrNamePriceTotal/BasketPrNamePriceTotal';
import { clearBaskets, decrementQuantity, incrementQuantity, removeFromCart } from '../../redux/BasketSlice';

export default function Basket() {
	const dispatch = useDispatch();
	const { baskets } = useSelector((state) => state.basketData);

	const handleIncrement = (id) => {
		dispatch(incrementQuantity({ id }));
	};

	const handleDecrement = (id) => {
		dispatch(decrementQuantity({ id }));
	};

	console.log("basket page =", baskets);
	
	return (
		<section id={style.Basket}>
			<div className="container">
				{baskets?.length > 0 ? (
					<div className={style.basketContent}>
						<div className={style.basketContentLeft}>
							<div className={style.basketLeftHeader}>
								<h3 className="sectionTitle">Səbət</h3>
								<div
									onClick={() => dispatch(clearBaskets())}
									className={style.allBasketPrDelete}
								>
									<TrashIconBasket /> Hamısını sil
								</div>
							</div>
							{baskets?.map((item) => (
								<div key={item.id} className={style.basketPrList}>
									<img
										className={style.basketPrImg}
										src={`${santral.baseUrlImage}${item.thumbnail}`}
									/>

									<div className={style.prTitleAndAlert}>
										<h5 className={style.basketPrTitle}>
											{item.title}
										</h5>
											<span className={`${style.alert} ${item.stock === item.quantity ? style.showAlert : ""}`}>
												Stokdaki mehsul sayi: {`${item.stock}`}
											</span>
										
									</div>
									<div className={style.quantityPriceDelete}>
										<div className={style.prCountWrapper}>
											<span
												onClick={() => handleDecrement(item.id)}
												className={style.decrease}
											>
												<MinusIcon />
											</span>
											<span className={style.count}>
												{item.quantity}
											</span>
											<span
												onClick={() => handleIncrement(item.id)}
												className={style.increase}
											>
												<PlusIcon />
											</span>
										</div>
										<div className={style.oldAndNewprice}>
											{item.oldPrice !== 0 && (
												<span className={style.oldPrice}>
													{item.quantity *
														item.oldPrice.toFixed(2)}
													₼
												</span>
											)}

											<span className={style.newPrice}>
												{item.quantity * item.price.toFixed(2)}₼
											</span>
										</div>
										<span
											onClick={() =>
												dispatch(removeFromCart({ id: item.id }))
											}
											className={style.deleteIcon}
										>
											<DeleteRedIcon />
										</span>
									</div>
								</div>
							))}
						</div>
						<div className={style.basketContentRight}>
							<div className={style.content}>
								<BasketPrNamePriceTotal baskets={baskets} />
							</div>
						</div>
					</div>
				) : (
					<div className={style.freeBasket}>Səbətdə məhsul yoxdu</div>
				)}
			</div>
		</section>
	);
}
