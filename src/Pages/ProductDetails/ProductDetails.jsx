import style from './ProductDetails.module.scss';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeartIcon from '../../assets/Icons/HeartIcon';
import LinkIcon from '../../assets/Icons/LinkIcon';
import MinusIcon from '../../assets/Icons/MinusIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';
import birbankKartImg from '../../assets/Images/birbank.png';
import tamKartImg from '../../assets/Images/tamkart.jfif';
import BasketIcon from '../../assets/Icons/BasketIcon';
import HeaderPhoneIcon from '../../assets/Icons/HeaderPhoneIcon';
import TruckAnimation from '../../components/TruckAnimation/TruckAnimation';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import { prDetailsDataTest } from '../../MyDatas/MyDatas';
// import ProductCartSlider from '../../components/ProductCartSlider/ProductCartSlider';
import whatsappImg from '../../assets/Images/whatsapp.png';
import instagramImg from '../../assets/Images/instagram.png';
import facebookImg from '../../assets/Images/facebook.png';
import copyImg from '../../assets/Images/copy.png';
import CloseIcon from '../../assets/Icons/CloseIcon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PrDetailsPagePrImgSlider from '../../components/PrDetailsPagePrImgSlider/PrDetailsPagePrImgSlider';
import PrDetailsPageSimilarPrAndPrFeatures from '../../components/PrDetailsPageSimilarPrAndPrFeatures/PrDetailsPageSimilarPrAndPrFeatures';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../../redux/BasketSlice';
import { toggleFavoriteItem } from '../../redux/FavoriteItemsSlice';
import FullRedHeartIcon from '../../assets/Icons/FullRedHeartIcon';

export default function ProductDetails() {
	const { name } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [quantity, setQuantity] = useState(1);
	const socialAreaRef = useRef(null);
	const [relatedDatas, setRelatedDatas] = useState();
	const [prDetailsData, setPrDetailsData] = useState({});
	const [prDetailsSocial, setPrDetailsSocial] = useState(false);
	const [showCreditMonthPayment, setShowCreditMonthPayment] = useState(true);
	const [oneClickBuyModal, setOneClickBuyModal] = useState(false);
	const [url, setUrl] = useState('');
	const { localBaskets } = useSelector((store) => store.basketData);
	const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);

	const isFavorite = favoriteItemsList.some((fav) => fav.id === prDetailsData.id);
	const prInBasket = localBaskets.some((item) => item.id === prDetailsData.id);

	const decrement = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const increment = () => {
		if (quantity < prDetailsData?.stock) {
			setQuantity(quantity + 1);
		}
	};

	const handlePrAddBasket = () => {
		if (prInBasket) {
			navigate('/basket');
			return;
		}
		dispatch(addToBasket({ ...prDetailsData, quantity }));
	};

	const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		initialValues: {
			name: '',
			phone: '',
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().required('Adınızı daxil edin'),
			phone: Yup.number()
				.positive('Mənfi rəqəm olmaz !!!')
				.integer('Tam rəqəm daxil edin')
				.required('Nömrənizi daxil edin'),
		}),
		onSubmit: (values) => {
			alert('istifadekinin melumatlari= ' + JSON.stringify(values, null, 2));
			resetForm();
		},
	});

	const prPriceDifference = (prDetailsData.oldPrice - prDetailsData.price).toFixed(2);
	const discountRate = (
		100 -
		(prDetailsData.price * 100) / prDetailsData.oldPrice
	).toFixed(0);
	const threeMonths =
		prDetailsData.oldPrice > 0
			? (prDetailsData.oldPrice / 3).toFixed(2)
			: (prDetailsData.price / 3).toFixed(2);

	const sixMonths =
		prDetailsData.oldPrice > 0
			? (prDetailsData.oldPrice / 6).toFixed(2)
			: (prDetailsData.price / 6).toFixed(2);

	const handleStateCreditMonth = () => {
		setShowCreditMonthPayment(!showCreditMonthPayment);
	};

	useEffect(() => {
		setShowCreditMonthPayment(true);
	}, [name]);

	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	const copyFunc = () => {
		navigator.clipboard.writeText(url);
	};
	const handleBuyModal = () => {
		const modalSituations = !oneClickBuyModal;
		setOneClickBuyModal(modalSituations);
		if (modalSituations) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	};

	const onClickSocialBtn = () => {
		setPrDetailsSocial(!prDetailsSocial);
	};

	const handleClickOutside = (event) => {
		if (socialAreaRef.current && !socialAreaRef.current.contains(event.target)) {
			setPrDetailsSocial(false);
		}
	};

	window.addEventListener('click', handleClickOutside);

	const getPrDetailsData = async (prName) => {
		try {
			const resPrData = await santral.api().get(urls.prDetails(prName));
			setPrDetailsData(resPrData.data.route);
		} catch (error) {
			console.log(error);
		}
	};

	const prId = prDetailsData?.id;

	const getRelatedData = async (Id) => {
		try {
			const resPrData = await santral.api().post(urls.related(Id));
			setRelatedDatas(resPrData.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPrDetailsData(name);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [name]);

	useEffect(() => {
		if (prId) {
			getRelatedData(prId);
		}
	}, [prId]);
	console.log("pr details data=", prDetailsData);
	

	return (
		<section id={style.prDetailsWrapper}>
			<div style={{ paddingTop: '1rem' }} className="container">
				{/* bir kliklə al modali */}
				<div
					onClick={handleBuyModal}
					className={`${style.overlayOneByModal}${
						oneClickBuyModal ? '' : style.hiddenOverlay
					}`}
				></div>
				<div
					className={`${style.modalWrapper} ${
						oneClickBuyModal ? '' : style.closeModal
					}`}
				>
					<div className={style.oneClickByModalArea}>
						<div className={style.modalHeaderAndCloseBtn}>
							<h6 className={style.title}>1 kliklə məhsulu alın</h6>
							<span onClick={handleBuyModal}>
								<CloseIcon />
							</span>
						</div>
						<hr className={style.line} />
						<form onSubmit={handleSubmit}>
							<label htmlFor="">Adınızı daxil edin</label>
							<input
								className={style.oneClickInp}
								onChange={handleChange}
								name="name"
								value={values.name}
								type="text"
								placeholder="Ad"
							/>
							<span className={style.errorMessage}>{errors.name}</span>
							<label htmlFor="">Nömrənizi daxil edin</label>
							<input
								className={style.oneClickInp}
								onChange={handleChange}
								name="phone"
								value={values.phone}
								type="number"
								placeholder="phone"
							/>
							<span className={style.errorMessage}>{errors.phone}</span>
							<button className={style.oneClickBuyBtn}>Bir klikə al</button>
						</form>
					</div>
				</div>
				<div className={style.prImgAndPrInfo}>
					{/* pulsuz catdirilma animasiyasi masinin hərəkəti */}
					<div className={style.delivery}>
						<TruckAnimation />
					</div>
					{/* məhsulun səkillərinin slider- i (sag tərəf) */}
					<PrDetailsPagePrImgSlider
						data={prDetailsDataTest}
						prDetailsData={prDetailsData}
						discountRate={discountRate}
					/>
					{/* məhsul haqqinda məlumatlar (sol tərəfdəki) */}
					<div className={style.prInfoWrapper}>
						<div className={style.prTitleAndFavoriteSocial}>
							<h4 className={style.prTitle}>{prDetailsData.title}</h4>
							<div className={style.favoriteSocial}>
								<span
									onClick={() =>
										dispatch(toggleFavoriteItem(prDetailsData))
									}
									className={`${style.favorite} ${isFavorite ? style.prInFavoriteList : ""}`}
								>
									{isFavorite ? (
										<FullRedHeartIcon />
									) : (
										<HeartIcon color={'black'} />
									)}
								</span>
								<span
									ref={socialAreaRef}
									onClick={onClickSocialBtn}
									className={`${style.socialWrapper} ${
										prDetailsSocial ? style.btnActive : ''
									}`}
								>
									<LinkIcon />
									<div
										className={`${style.prDeatailsSocilaLink} ${
											prDetailsSocial ? '' : style.noActive
										}`}
									>
										<a
											className={style.prDetailsSocial}
											href=""
											target="_blank"
										>
											<img src={whatsappImg} /> Whatsapp
										</a>
										<a
											className={style.prDetailsSocial}
											href=""
											target="_blank"
										>
											<img src={instagramImg} /> Instagram
										</a>
										<a
											className={style.prDetailsSocial}
											href=""
											target="_blank"
										>
											<img src={facebookImg} /> Facebook
										</a>
										<div
											onClick={copyFunc}
											className={style.prDetailsSocial}
											href=""
											target="_blank"
										>
											<img src={copyImg} /> Linki Kopyala
										</div>
									</div>
								</span>
							</div>
						</div>
						<div className={style.prAvailableAndPrCod}>
							<span className={style.prAvailable}>
								Məhsul mövcuddur :{' '}
								<span className={style.productCount}>
									{prDetailsData.stock}
								</span>{' '}
							</span>
							{prDetailsData.brandCode && (
								<span className={style.prCode}>
									Məhsulun Codu:{' '}
									<span className={style.code}>
										{prDetailsData.brandCode}
									</span>
								</span>
							)}
						</div>
						<hr className={style.line} />
						<div className={style.prCountAndPrice}>
							<div className={style.prCountWrapper}>
								<span
									onClick={() => decrement()}
									className={style.decrease}
								>
									<MinusIcon />
								</span>
								<span className={style.count}>{quantity}</span>
								<span
									onClick={() => increment()}
									className={style.increase}
								>
									<PlusIcon />
								</span>
							</div>
							<div className={style.priceWrapper}>
								<span className={style.newPrice}>
									{prDetailsData?.price?.toFixed(2)} ₼
								</span>
								{prDetailsData?.oldPrice > 0 && (
									<span className={style.prOldPrice}>
										{prDetailsData?.oldPrice?.toFixed(2)} ₼
									</span>
								)}
								{prPriceDifference > 0 && (
									<span className={style.prDiscount}>
										-{prPriceDifference} ₼
									</span>
								)}
							</div>
						</div>
						<hr className={style.line} />
						<div className={style.paymentCartInfoAndSlider}>
							<div className={style.paymentCartInfo}>
								<h5 className={style.title}>Hissə-hissə alış</h5>
								<p className={style.info}>
									Şərtlər endirimsiz qiymətə tətbiq olunur
								</p>
							</div>
							<div className={style.paymentCartSlider}>
								<Swiper
									spaceBetween={30}
									speed={3000}
									autoplay={{
										delay: 1500,
									}}
									loop={true}
									modules={[Autoplay]}
									className={style.creditCartSlider}
								>
									<SwiperSlide>
										<span className={style.BirKart}>
											<img src={birbankKartImg} />
											<p className={style.content}>
												BirKart ilə 3 ay fiazsiz ödə!
											</p>
										</span>
									</SwiperSlide>
									<SwiperSlide>
										<span className={style.TamKart}>
											<img src={tamKartImg} />
											<p className={style.content}>
												TamKart ilə 6 ay fiazsiz ödə!
											</p>
										</span>
									</SwiperSlide>
								</Swiper>
							</div>
						</div>
						<div className={style.paymentMonths}>
							<div>
								<span
									onClick={handleStateCreditMonth}
									className={`${style.month} ${
										showCreditMonthPayment ? style.activeMonth : ''
									}`}
								>
									3ay
								</span>
								<span
									onClick={handleStateCreditMonth}
									className={`${style.month} ${
										showCreditMonthPayment ? '' : style.activeMonth
									}`}
								>
									6ay
								</span>
							</div>
							<div className={style.payementResuslt}>
								Aylıq ödəniş
								<span className={style.payment}>
									{showCreditMonthPayment ? threeMonths : sixMonths} ₼
								</span>
							</div>
						</div>
						<div className={style.btnGroup}>
							<button
								onClick={handlePrAddBasket}
								className={`${style.basketBtn} ${
									prInBasket ? style.prInBasket : ''
								}`}
							>
								<BasketIcon color={'black'} />
								{prInBasket ? 'Səbətdədir' : 'Səbətə at'}
							</button>
							<button
								onClick={handleBuyModal}
								className={style.oneClickByBtn}
							>
								icon Bir kliklə al
							</button>
							<button className={style.callBtn}>
								<HeaderPhoneIcon /> Zəng et
							</button>
						</div>
						<div className={style.billboard}>reklam panel</div>
					</div>
				</div>
				{/* oxşar məhsular və məhsulun xususiyyətləri */}
				<PrDetailsPageSimilarPrAndPrFeatures
					prDetailsData={prDetailsData}
					relatedDatas={relatedDatas}
				/>
			</div>
		</section>
	);
}
