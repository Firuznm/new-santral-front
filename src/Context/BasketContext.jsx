import { useContext, useEffect, useState, createContext } from 'react';

const BasketContext = createContext();

const BasketContextProvider = ({ children }) => {
	const [basketData, setBasketData] = useState(() => {
		const prLocalStorage = localStorage.getItem('basketProduct');
		if (!prLocalStorage || prLocalStorage === 'undefined') return [];
		return JSON.parse(prLocalStorage);
	});
      
	useEffect(() => {
		localStorage.setItem('basketProduct', JSON.stringify(basketData));
	}, [basketData]);

	const addToBasketPr = (product) => {
		setBasketData((prev) => {
			const existingProduct = prev.find((item) => item.id === product.id);
          
			if (existingProduct) {
				return prev.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			} else {
				return [...prev, { ...product, quantity: 1 }];
			}
		});
	};

	return (
		<BasketContext.Provider value={{ addToBasketPr, basketData }}>
			{children}
		</BasketContext.Provider>
	);
};

const BasketContextData = () => useContext(BasketContext);

export { BasketContextData, BasketContextProvider };















// import { Link } from 'react-router-dom';
// import BasketIcon from '../../assets/Icons/BasketIcon';
// import HeartIcon from '../../assets/Icons/HeartIcon';
// import truck from '../../assets/Images/truck.png';
// import santral from '../../Helpers/Helpers';
// import style from './ProductCart.module.scss';
// import { useNavigate } from 'react-router-dom';
// import { BasketContextData } from '../../Context/BasketContext';

// export default function ProductCart({ data }) {
// 	const { addToBasketPr, basketData } = BasketContextData();
// 	const navigate = useNavigate();
// 	const prInBasket = basketData.some((item) => item.id === data.id);

// 	const handleAddToBasketOrBasketPage = () => {
// 		if (prInBasket) {
// 			navigate('/basket');
// 		} else {
// 			addToBasketPr(data);
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
// 						onClick={handleAddToBasketOrBasketPage}
// 						className={`${style.productBasket} ${
// 							prInBasket ? style.isBasket : ''
// 						}`}
// 					>
// 						<BasketIcon color="rgba(0, 0, 0, 0.87)" />
// 						{prInBasket ? 'Səbətdədir' : 'Səbətə at'}
// 					</span>

// 					<span className={style.ProductFavorite}>
// 						<HeartIcon color="rgba(0, 0, 0, 0.87)" />
// 					</span>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
