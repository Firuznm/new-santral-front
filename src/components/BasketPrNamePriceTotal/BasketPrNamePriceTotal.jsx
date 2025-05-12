import style from './BasketPrNamePriceTotal.module.scss';
import applePay from '../../assets/Images/Apple Pay Button.png';
import googlePay from '../../assets/Images/Google Pay Button.png';
import { useSelector } from 'react-redux';
import ButtonAndArrow from '../ButtonAndArrow/ButtonAndArrow';
import bpPriceImg from "../../assets/Images/bpQiymeti.png"
import { useState } from 'react'; 

export default function BasketPrNamePriceTotal({ onclick, title }) {
	  const [isChecked, setIsChecked] = useState(false);
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { isLogin, bpUser, authMeUser } = useSelector((state) => state.userInfo);
	
	  const handleCheckboxChange = (e) => {
			setIsChecked(e.target.checked);
		};

	// console.log('api basket', apiBaskets);
	// console.log('local baskets=', localBaskets);
	// console.log("login=", isLogin);
	// console.log("bpUser=", bpUser);
	

	const allPrice = (isLogin ? apiBaskets : localBaskets)?.reduce((acm, item) => {
		const priceToUse = item.oldPrice === 0 ? item.price : item.oldPrice;
		return acm + priceToUse * item.count;
	}, 0);

	const Price = (isLogin ? apiBaskets : localBaskets)?.reduce((acm, item) => {
		return (acm += item.price * item.count);
	}, 0);

	const discountPrice = allPrice - Price;
	const amountPayEnd = allPrice - discountPrice;

	const BPprice = apiBaskets.reduce((acm, item) => {
		return (acm += item.bp_total);
	}, 0);

	const discountBPprice = allPrice - BPprice;

	// console.log('allprice=', allPrice);
	// console.log('discount price=', discountPrice);
	// console.log('discount price=', Price);
	// console.log('discount bp price=', discountBPprice);
	// console.log('bpPrice= ', BPprice);

	return (
		<div className={style.wrapperBasketContent}>
			<div className={style.basketContentList}>
				<div className={style.basketPrNamePriceTotal}>
					<div className={style.header}>
						<h5 className={style.title}>Məhsul:</h5>
						<span className={style.basketCount}>
							{isLogin ? apiBaskets?.length : localBaskets?.length}
						</span>
					</div>
					<div className={style.prNameOldpriceNewprice}>
						{(isLogin ? apiBaskets : localBaskets)?.map((item) => (
							<div key={item.id} className={style.nameCountPrice}>
								<div className={style.titleQuantity}>
									<h4 className={style.prName}>{item.title} </h4>
									<span className={style.prQuantity}>
										{item.count} ədəd
									</span>
								</div>
								<div className={style.oldpriceNewprice}>
									{bpUser ? (
										<div className={style.BPpriceWrapper}>
											{item.oldPrice === 0 ? (
												<span className={style.noOldPrice}>
													{(item.price * item.count).toFixed(2)}
													₼
												</span>
											) : (
												<span className={style.oldPrice}>
													{(item.oldPrice * item.count).toFixed(
														2,
													)}
													₼
												</span>
											)}
											<span className={style.bpPrice}>
												{item.bp_total?.toFixed(2)}
											</span>
										</div>
									) : (
										<div className={style.loginNoLoginPrice}>
											{item.oldPrice !== 0 && (
												<span className={style.oldPrice}>
													{(item.oldPrice * item.count).toFixed(
														2,
													)}
													₼
												</span>
											)}
											<span className={style.price}>
												{(isLogin
													? item.total
													: item.price * item.count
												).toFixed(2)}
												₼
											</span>
										</div>
									)}
								</div>
							</div>
						))}
					</div>

					<div className={style.allPrice}>
						<span className={style.key}>Ümumi məbləğ:</span>
						<span className={style.value}>{allPrice.toFixed(2)}₼</span>
					</div>

					<div className={style.discountPrice}>
						<span className={style.key}>Endirim:</span>
						<span className={style.value}>
							{(bpUser ? discountBPprice : discountPrice).toFixed(2)}₼
						</span>
					</div>
					{isChecked && <div className={style.paymendCashback}>
						<span className={style.key}>Cashback:</span>
						<span className={style.value}>{authMeUser?.cashback}₼</span>
					</div>}
					<div className={style.amountPayEnd}>
						{bpUser ? (
							<img className={style.bpPriceImg} src={bpPriceImg} alt="" />
						) : (
							<span className={style.key}>Yekun məbləğ:</span>
						)}
						<span className={style.value}>
							{(bpUser ? BPprice : amountPayEnd).toFixed(2)}₼
						</span>
					</div>

					<p className={style.ordersInfo}>
						Çatdırılma məsafədən asılı olaraq 2-8 azn məbləğində dəyişir.
						Onlayn alış-verişləriniz zamanı cashback ilə ödənişdən faydalana
						bilərsiniz. Hər uğurlu sifarişdə(1₼ və üzəri) sifariş məbləğinin
						1%-i qədər cashback qazanın.
					</p>
					{isLogin && !bpUser && (
						<div className={style.cashback}>
							<input
								checked={isChecked}
								onChange={handleCheckboxChange}
								type="checkbox"
								id="cashback"
							/>
							<label htmlFor="cashback">
								Cashbackdən istifadə et:  {authMeUser?.cashback}₼
							</label>
						</div>
					)}
					<div className={style.appGooglePay}>
						<a
							target="_blank"
							href="https://apps.apple.com/az/app/santral/id1597914919"
						>
							<img src={applePay} alt="" />
						</a>
						<a
							target="_blank"
							href="https://play.google.com/store/apps/details?id=santral.ionic&pli=1"
						>
							<img src={googlePay} alt="" />
						</a>
					</div>

					<ButtonAndArrow onclick={onclick} title={title} />
				</div>
			</div>
		</div>
	);
}
