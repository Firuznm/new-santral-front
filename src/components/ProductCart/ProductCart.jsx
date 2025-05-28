// import { useDispatch, useSelector } from 'react-redux';
// import { addToBasket, apiAddToBasket, GetAllApiBaskets } from '../../redux/BasketSlice';
// import { useNavigate, Link } from 'react-router-dom';
// import BasketIcon from '../../assets/Icons/BasketIcon';
// import HeartIcon from '../../assets/Icons/HeartIcon';
// import truck from '../../assets/Images/truck.png';
// import santral from '../../Helpers/Helpers';
// import style from './ProductCart.module.scss';

// export default function ProductCart({ data }) {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
// 	const { isLogin } = useSelector((state) => state.userInfo);

// 	const isInLocalBasket = localBaskets.some((item) => item.id === data.id);
// 	const isInApiBasket = apiBaskets?.some((item) => item.id === data.id);

// 	const isInBasket = isLogin ? isInApiBasket : isInLocalBasket;

// 	const handleBasketClick = async () => {
// 		if (isInBasket) {
// 			navigate('/basket');
// 			return;
// 		}
// 		if (isLogin) {
// 			await dispatch(
// 				apiAddToBasket({ productId: data.id, count: data.count || 1 }),
// 			).unwrap();
// 			await dispatch(GetAllApiBaskets()).unwrap();
// 		} else {
// 			dispatch(addToBasket(data));
// 		}
// 	};

// 	const priceDifference = (data.oldPrice - data.price).toFixed(2);

// 	return (
// 		<div className={style.productCartWrapper}>
// 			{data.price > 50 && (
// 				<div className={style.delivery}>
// 					<img src={truck} className={style.truckImg} />
// 					Məhsul Pulsuz Catdırılır
// 				</div>
// 			)}

// 			{data.discountPercent > 0 && (
// 				<span className={style.discount}>-{data.discountPercent}%</span>
// 			)}

// 			<Link to={`/product/${data.name}`}>
// 				<img
// 					className={style.productImg}
// 					src={`${santral.baseUrlImage}${data.thumbnail}`}
// 				/>
// 			</Link>

// 			<div className={style.productInfo}>
// 				<Link to={`/product/${data.name}`} className={style.productTitle}>
// 					{data.title}
// 				</Link>

// 				{priceDifference > 0 && (
// 					<div className={style.discountPrice}>
// 						<span className={style.prPriceDifference}>
// 							- {priceDifference} ₼
// 						</span>
// 					</div>
// 				)}

// 				<div className={style.prPricesWrapper}>
// 					<span className={style.productPrice}>
// 						{Number(data.price).toFixed(2)} ₼
// 					</span>
// 					{data.oldPrice > 0 && (
// 						<span className={style.prPreviousPrice}>
// 							{Number(data.oldPrice).toFixed(2)} ₼
// 						</span>
// 					)}
// 				</div>

// 				<div className={style.basketAndFavorit}>
// 					<span
// 						onClick={handleBasketClick}
// 						className={`${style.productBasket} ${
// 							isInBasket ? style.isBasket : ''
// 						}`}
// 					>
// 						<BasketIcon color="rgba(0, 0, 0, 0.87)" />
// 						{isInBasket ? 'Səbətdədir' : 'Səbətə at'}
// 					</span>

// 					<span className={style.ProductFavorite}>
// 						<HeartIcon color="rgba(0, 0, 0, 0.87)" />
// 					</span>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// product cart new cart

import { Link, useNavigate } from 'react-router-dom';
import DeliveryCar from '../../assets/Icons/DeliveryCar';
import BasketIcon from '../../assets/Icons/BasketIcon';
import HeartIcon from '../../assets/Icons/HeartIcon';
import santral from '../../Helpers/Helpers';
import style from './ProductCart.module.scss';
import BasketIconBlack from '../../assets/Icons/BasketIconBlack';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, apiAddToBasket, GetAllApiBaskets } from '../../redux/BasketSlice';
import bpPriceImg from '../../assets/Images/bpQiymeti.png';
import { toggleFavoriteItem } from '../../redux/FavoriteItemsSlice';
import FullRedHeartIcon from '../../assets/Icons/FullRedHeartIcon';
// import { useEffect } from 'react';

export default function ProductCart({ data }) {
	// console.log("pr data=", data);

	
	const dispatch = useDispatch();   
	const navigate = useNavigate();
	const { isLogin, bpUser } = useSelector((state) => state.userInfo);
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);

	const isFavorite = favoriteItemsList.some((fav) => fav.id === data.id); 
	const prInLocalBasket = localBaskets.some((product) => product.id === data.id);
	const prInApiBasket = apiBaskets?.some((product) => product.id === data.id);
	const prIsInBasket = isLogin ? prInApiBasket : prInLocalBasket;
	// console.log("bp-user=", bpUser);
	
	const addToPrBasket = async () => {
		if (prIsInBasket) {
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

	const discountPercent = data.oldPrice - data.price;

	return (
		<div className={style.productCartWrapper}>
			{data.price > 50 && (
				<div className={style.delivery}>
					MƏHSUL PULSUZ ÇATDIRILIR <DeliveryCar />
				</div>
			)}

			<span
				onClick={() => dispatch(toggleFavoriteItem(data))}
				className={`${style.heartIcon} ${
					isFavorite ? style.prInFavoriteItems : ''
				}`}
			>
				{isFavorite ? <FullRedHeartIcon /> : <HeartIcon color={'black'} />}
			</span>

			{data?.discountPercent !== 0 && (
				<span className={style.prPercent}>{data?.discountPercent}%</span>
			)}
			<Link
				to={`/product/${data.name}`}
				className={`${data.price > 50 ? style.prImg : style.noDelivery}`}
			>
				<img src={`${santral.baseUrlImage}${data.thumbnail}`} alt="" />
			</Link>
			<Link to={`/product/${data.name}`} className={style.prTitle}>
				{data.title}
			</Link>
			<div className={style.bpPrigeImgDiscountPrice}>
				{bpUser ? (
					<img className={style.bpPriceImg} src={bpPriceImg} alt="" />
				) : (
					<div className={style.discountPercentWrapper}>
						{discountPercent > 0 && (
							<span className={style.discountPercent}>
								-{discountPercent.toFixed(2)}₼
							</span>
						)}
					</div>
				)}
			</div>
			<div className={style.priceBasket}>
				{bpUser ? (
					<div className={style.bpPriceWrapper}>
						{data.oldPrice !== 0 ? (
							<span className={style.withBPoldPrice}>
								{data?.oldPrice?.toFixed(2)}₼
							</span>
						) : (
							<span className={style.withBPoldPrice}>
								{data?.price?.toFixed(2)}₼
							</span>
						)}
						<span className={style.BPprice}>
							{data?.bp_price?.toFixed(2)}₼
						</span>
					</div>
				) : (
					<div className={style.priceDiscountPrice}>
						{data.oldPrice !== 0 && (
							<span className={style.oldPrice}>
								{data?.oldPrice !== null &&
									`${data?.oldPrice?.toFixed(2)}₼`}
							</span>
						)}
						<span className={style.price}>
							{data?.price !== null && `${data?.price?.toFixed(2)}₼`}
						</span>
					</div>
				)}
				<div
					onClick={addToPrBasket}
					className={`${style.basket} ${prIsInBasket ? style.prBasket : ''}`}
				>
					{prIsInBasket ? 'Səbətdədir' : 'Səbətə at'}
					{prIsInBasket ? <BasketIcon /> : <BasketIconBlack />}
				</div>
			</div>
		</div>
	);
}
