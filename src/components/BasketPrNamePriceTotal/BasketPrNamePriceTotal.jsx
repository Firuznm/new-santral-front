import style from './BasketPrNamePriceTotal.module.scss';
import applePay from '../../assets/Images/Apple Pay Button.png';
import googlePay from '../../assets/Images/Google Pay Button.png';
import RightIcon from '../../assets/Icons/RightIcon';

export default function BasketPrNamePriceTotal({ baskets }) {

	const allPrice = baskets?.reduce((acm, item) => {
		return (acm += item.price * item.quantity);
	}, 0);

	const discountPrice = baskets?.reduce((acm, item) => {
		return (acm += item.oldPrice);
	}, 0);

	const amountPayEnd = allPrice - discountPrice;

	return (
		<div className={style.basketPrNamePriceTotal}>
			<div className={style.header}>
				<h5 className={style.title}>Məhsul:</h5>
				<span className={style.basketCount}>{baskets?.length}</span>
			</div>
			<div className={style.prNameOldpriceNewprice}>
				{baskets?.map((item) => (
					<div key={item.id} className={style.namePriceOldPrice}>
						<div className={style.titleQuantity}>
							<h4 className={style.prName}>{item.title} </h4>
							<span className={style.prQuantity}>{item.quantity} ədəd</span>
						</div>
						<div className={style.oldpriceNewprice}>
							{item?.oldPrice != 0 && (
								<span className={style.oldprice}>
									{item?.oldPrice.toFixed(2)}₼
								</span>
							)}
							<span className={style.newprice}>
								{item?.price.toFixed(2)}₼
							</span>
						</div>
					</div>
				))}
			</div>
			{discountPrice != 0 && (
				<div className={style.allPrice}>
					<span className={style.key}>Ümumi məbləğ:</span>
					<span className={style.value}>{allPrice.toFixed(2)}₼</span>
				</div>
			)}
			{discountPrice != 0 && (
				<div className={style.discountPrice}>
					<span className={style.key}>Endirim:</span>
					<span className={style.value}>{discountPrice.toFixed(2)}₼</span>
				</div>
			)}
			<div className={style.amountPayEnd}>
				<span className={style.key}>Yekun məbləğ:</span>
				<span className={style.value}>{amountPayEnd.toFixed(2)}₼</span>
			</div>
			<p className={style.ordersInfo}>
				Çatdırılma məsafədən asılı olaraq 2-8 azn məbləğində dəyişir. Onlayn
				alış-verişləriniz zamanı cashback ilə ödənişdən faydalana bilərsiniz. Hər
				uğurlu sifarişdə(1₼ və üzəri) sifariş məbləğinin 1%-i qədər cashback
				qazanın.
			</p>

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

			<a href="/about" className={style.confirmOrder}>
				Sifarişi rəsmiləşdir <RightIcon />
			</a>
		</div>
	);
}
