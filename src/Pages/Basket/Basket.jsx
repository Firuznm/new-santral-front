import { useDispatch, useSelector } from 'react-redux';
import style from './Basket.module.scss';
import TrashIconBasket from '../../assets/Icons/TrashIconBasket';
import DeleteRedIcon from '../../assets/Icons/DeleteRedIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';
import MinusIcon from '../../assets/Icons/MinusIcon';
import santral from '../../Helpers/Helpers';
import BasketPrNamePriceTotal from '../../components/BasketPrNamePriceTotal/BasketPrNamePriceTotal';
import {
	clearBaskets,
	decrementCount,
	GetAllApiBaskets,
	incrementCount,
	removeFromCart,
} from '../../redux/BasketSlice';
import { useNavigate } from 'react-router-dom';
import urls from '../../ApiUrls/Urls';
import { useEffect } from 'react';

export default function Basket() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { isLogin, bpUser } = useSelector((state) => state.userInfo);

	console.log("islogin=", isLogin);
	console.log('bpuser=', bpUser);
	 console.log("api basket=", apiBaskets);
	 
	

	const FuncApiBasketAllClear = async () => {
		try {
			await santral.api().post(urls.apiBasketAllClear);
			dispatch(GetAllApiBaskets());
		} catch (error) {
			console.log(error);
		}
	};

	const FuncApiRemoveBasketProduct = async (id) => {
		try {
			await santral.api().post(urls.apiRemoveBasketProduct, { product: id });
			dispatch(GetAllApiBaskets());
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		dispatch(GetAllApiBaskets());
	}, []);

	const handleIncrement = async (id) => {
		if (isLogin) {
			await santral.api().post(urls.apiBasketInc, { product: id });
			dispatch(GetAllApiBaskets());
		} else {
			dispatch(incrementCount({ id }));
		}
	};

	const handleDecrement = async (id) => {
		if (isLogin) {
			await santral.api().post(urls.apiBasketDec, { product: id });
			dispatch(GetAllApiBaskets());
		} else {
			dispatch(decrementCount({ id }));
		}
	};


	const isBasketNotEmpty = isLogin ? apiBaskets?.length > 0 : localBaskets?.length > 0;

	return (
		<section id={style.Basket}>
			<div className="container">
				{isBasketNotEmpty ? (
					<div className={style.basketContent}>
						<div className={style.basketContentLeft}>
							<div className={style.basketLeftHeader}>
								<h3 className="sectionMiniTitle">Səbət</h3>
								<div
									onClick={
										isLogin
											? FuncApiBasketAllClear
											: () => dispatch(clearBaskets())
									}
									className={style.allBasketPrDelete}
								>
									<TrashIconBasket /> Hamısını sil
								</div>
							</div>
							{(isLogin ? apiBaskets : localBaskets)?.map((item) => (
								<div key={item.id} className={style.basketPrList}>
									<img
										className={style.basketPrImg}
										src={`${santral.baseUrlImage}${item.thumbnail}`}
									/>

									<div className={style.prTitleAndAlert}>
										<h5 className={style.basketPrTitle}>
											{item.title}
										</h5>
										<span
											className={`${style.alert} ${
												item.stock === item.count
													? style.showAlert
													: ''
											}`}
										>
											Məhsulun stok sayi : {`${item.stock}`} ədəd
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
												{item.count}
											</span>
											<span
												onClick={() => handleIncrement(item.id)}
												className={style.increase}
											>
												<PlusIcon />
											</span>
										</div>
										<div className={style.oldAndNewprice}>
											{bpUser ? (
												<div className={style.bpPriceWrapper}>
													{item.oldPrice !== 0 ? (
														<span className={style.oldPrice}>
															{(
																item.count * item.oldPrice
															).toFixed(2)}
															₼
														</span>
													) : (
														<span className={style.oldPrice}>
															{(
																item.count * item.price
															).toFixed(2)}
															₼
														</span>
													)}
													<span className={style.bpPrice}>
														{item.bp_total?.toFixed(2)}
													</span>
												</div>
											) : (
												<div className={style.price}>
													{item.oldPrice !== 0 && (
												<span className={style.oldPrice}>
													{(item.count * item.oldPrice).toFixed(
														2,
													)}
													₼
												</span>
											)} <br />
													{(isLogin
														? item.total
														: item.price * item.count
													).toFixed(2)}
												</div>
											)}
										</div>
										<span
											onClick={() =>
												isLogin
													? FuncApiRemoveBasketProduct(item.id)
													: dispatch(
															removeFromCart({
																id: item.id,
															}),
													  )
											}
											className={style.deleteIcon}
										>
											<DeleteRedIcon />
										</span>
									</div>
								</div>
							))}
						</div>

						<BasketPrNamePriceTotal
							onclick={() => navigate('/order-confirm')}
							title={'Sifarişi rəsmiləşdir'}
						/>
					</div>
				) : (
					<div className={style.freeBasket}>Səbətdə məhsul yoxdu</div>
				)}
			</div>
		</section>
	);
}
