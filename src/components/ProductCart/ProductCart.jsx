import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, apiAddToBasket, GetAllApiBaskets } from '../../redux/BasketSlice';
import { useNavigate, Link } from 'react-router-dom';
import BasketIcon from '../../assets/Icons/BasketIcon';
import HeartIcon from '../../assets/Icons/HeartIcon';
import truck from '../../assets/Images/truck.png';
import santral from '../../Helpers/Helpers';
import style from './ProductCart.module.scss';
import { useEffect } from 'react';

export default function ProductCart({ data }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { isLogin } = useSelector((state) => state.userInfo);

	const isInLocalBasket = localBaskets.some((item) => item.id === data.id);
	const isInApiBasket = apiBaskets?.some((item) => item.id === data.id);

	const isInBasket = isLogin ? isInApiBasket : isInLocalBasket;

	const handleBasketClick = async () => {
		if (isInBasket) {
			navigate('/basket');
			return;
		}
		if (isLogin) {
			await dispatch(
				apiAddToBasket({ productId: data.id, count: data.count || 1 }),
			).unwrap();
			await dispatch(GetAllApiBaskets()).unwrap();
		} else {
			dispatch(addToBasket(data));
		}
	};

	useEffect(() => {
		if (isLogin) {
			dispatch(GetAllApiBaskets());
		}
	}, [isLogin]);

	const priceDifference = (data.oldPrice - data.price).toFixed(2);

	return (
		<div className={style.productCartWrapper}>
			{data.price > 50 && (
				<div className={style.delivery}>
					<img src={truck} className={style.truckImg} />
					Məhsul Pulsuz Catdırılır
				</div>
			)}

			{data.discountPercent > 0 && (
				<span className={style.discount}>-{data.discountPercent}%</span>
			)}

			<Link to={`/product/${data.name}`}>
				<img
					className={style.productImg}
					src={`${santral.baseUrlImage}${data.thumbnail}`}
				/>
			</Link>

			<div className={style.productInfo}>
				<Link to={`/product/${data.name}`} className={style.productTitle}>
					{data.title}
				</Link>

				{priceDifference > 0 && (
					<div className={style.discountPrice}>
						<span className={style.prPriceDifference}>
							- {priceDifference} ₼
						</span>
					</div>
				)}

				<div className={style.prPricesWrapper}>
					<span className={style.productPrice}>
						{Number(data.price).toFixed(2)} ₼
					</span>
					{data.oldPrice > 0 && (
						<span className={style.prPreviousPrice}>
							{Number(data.oldPrice).toFixed(2)} ₼
						</span>
					)}
				</div>

				<div className={style.basketAndFavorit}>
					<span
						onClick={handleBasketClick}
						className={`${style.productBasket} ${
							isInBasket ? style.isBasket : ''
						}`}
					>
						<BasketIcon color="rgba(0, 0, 0, 0.87)" />
						{isInBasket ? 'Səbətdədir' : 'Səbətə at'}
					</span>

					<span className={style.ProductFavorite}>
						<HeartIcon color="rgba(0, 0, 0, 0.87)" />
					</span>
				</div>
			</div>
		</div>
	);
}
