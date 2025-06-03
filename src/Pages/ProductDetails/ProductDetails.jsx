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
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
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
import { addToBasket, apiAddToBasket, GetAllApiBaskets } from '../../redux/BasketSlice';
import { toggleFavoriteItem } from '../../redux/FavoriteItemsSlice';
import FullRedHeartIcon from '../../assets/Icons/FullRedHeartIcon';
import BasketIconBlack from '../../assets/Icons/BasketIconBlack';
import bpImg from '../../assets/Images/bpQiymeti.png';
import reklamVideo from "../../assets/Images/reklamVideo.mp4"
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';

export default function ProductDetails() {
	const { name } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [count, setCount] = useState(1);
	const socialAreaRef = useRef(null);
	const [relatedDatas, setRelatedDatas] = useState();
	const [prDetailsData, setPrDetailsData] = useState({});
	const [prDetailsSocial, setPrDetailsSocial] = useState(false);
	const [showCreditMonthPayment, setShowCreditMonthPayment] = useState(true);
	const [oneClickBuyModal, setOneClickBuyModal] = useState(false);
	const [url, setUrl] = useState('');
	const { isLogin, bpUser } = useSelector((state) => state.userInfo);
	const { localBaskets, apiBaskets } = useSelector((store) => store.basketData);
	const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);

	const isFavorite = favoriteItemsList.some((fav) => fav.id === prDetailsData.id);
	const prInLocalBasket = localBaskets.some((product) => product.id === prDetailsData.id);
	const prInApiBasket = apiBaskets?.some((product) => product.id === prDetailsData.id);
	const prIsInBasket = isLogin ? prInApiBasket : prInLocalBasket;

	console.log("pr detail data=", prDetailsData);
	

	const decrement = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const increment = () => {
		if (count < prDetailsData?.stock) {
			setCount(count + 1);
		}
	};

		const handlePrAddBasket = async () => {
			if (prIsInBasket) {
				navigate('/basket');
				return;
			}
			if (isLogin) {
				await dispatch(
					apiAddToBasket({ productId: prDetailsData.id, count: prDetailsData.count || 1 }),
				).unwrap();
				await dispatch(GetAllApiBaskets()).unwrap();
			} else {
				dispatch(addToBasket(prDetailsData));
			}
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

	// const prPriceDifference = (prDetailsData.oldPrice - prDetailsData.price).toFixed(2);
	const discountRate = (
		100 -
		(prDetailsData.price * 100) / prDetailsData.oldPrice
	).toFixed(0);

	const prOldPrice = count * prDetailsData?.oldPrice;
	const prPrice = count * prDetailsData?.price;
	const bpPrice = count * prDetailsData?.bp_price;

	const threeMonths =
		prOldPrice > 0
			? (prOldPrice / 3).toFixed(2)
			: (prPrice / 3).toFixed(2);

	const sixMonths =
		prOldPrice > 0 ? (prOldPrice / 6).toFixed(2) : (prPrice / 6).toFixed(2);

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
		<>
			<HelmetAsync title={prDetailsData?.title} />
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
								<button className={style.oneClickBuyBtn}>
									Bir klikə al
								</button>
							</form>
						</div>
					</div>
					<div className={style.prImgAndPrInfo}>
						{/* məhsulun səkillərinin slider- i (sag tərəf) */}
						<PrDetailsPagePrImgSlider
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
										className={`${style.favorite} ${
											isFavorite ? style.prInFavoriteList : ''
										}`}
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
									Məhsul mövcuddur :
									<span className={style.productCount}>
										{prDetailsData.stock}
									</span>
								</span>
								{prDetailsData.brandCode && (
									<span className={style.prCode}>
										Məhsulun Codu:
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
									<span
										style={{ fontWeight: 900 }}
										className={style.count}
									>
										{count}
									</span>
									<span
										onClick={() => increment()}
										className={style.increase}
									>
										<PlusIcon />
									</span>
								</div>
								<div className={style.priceWrapper}>
									{bpUser && (
										<img
											className={style.bpPriceImg}
											src={bpImg}
											alt=""
										/>
									)}
									{bpUser ? (
										// login olub ve user-in rolu BPuser olduqda
										<div className={style.bpPriceWrapper}>
											{prDetailsData.oldPrice !== 0 ? (
												<span className={style.oldPrice}>
													{prOldPrice?.toFixed(2)}₼
												</span>
											) : (
												<span className={style.noOldPrice}>
													{prPrice?.toFixed(2)}₼
												</span>
											)}
											<span className={style.bpPrice}>
												{bpPrice?.toFixed(2)}₼
											</span>
										</div>
									) : (
										// bura mehsulun endirime dusubse evvelki qiymetini gosterir
										<div className={style.priceOldPrice}>
											{prDetailsData.oldPrice !== 0 && (
												<span className={style.oldPrice}>
													{prOldPrice?.toFixed(2)} ₼
												</span>
											)}
											<span className={style.price}>
												{prPrice?.toFixed(2)} ₼
											</span>
										</div>
									)}
								</div>
							</div>
							<hr className={style.line} />  
							{!bpUser && (
								<div className={style.paymentCartInfoAndSlider}>
									<div className={style.paymentCartInfo}>
										<h5 className={style.title}>Hissə-hissə alış :</h5>
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
							)}
							{!bpUser && (
								<div className={style.paymentMonths}>
									<div>
										<span
											onClick={handleStateCreditMonth}
											className={`${style.month} ${
												showCreditMonthPayment
													? style.activeMonth
													: ''
											}`}
										>
											3ay
										</span>
										<span
											onClick={handleStateCreditMonth}
											className={`${style.month} ${
												showCreditMonthPayment
													? ''
													: style.activeMonth
											}`}
										>
											6ay
										</span>
									</div>
									<div className={style.payementResuslt}>
										Aylıq ödəniş
										<span className={style.payment}>
											{showCreditMonthPayment
												? threeMonths
												: sixMonths}{' '}
											₼
										</span>
									</div>
								</div>
							)}
							<div className={style.btnGroup}>
								{prDetailsData.price !== 0 && <button
									onClick={handlePrAddBasket}
									className={`${style.basketBtn} ${prIsInBasket ? style.prBasket : ''
										}`}
								>
									{prIsInBasket ? 'Səbətdədir' : 'Səbətə at'}
									{prIsInBasket ? <BasketIcon /> : <BasketIconBlack />}
								</button>}
								<button
									onClick={handleBuyModal}
									className={style.oneClickByBtn}
								>
									Bir kliklə al
								</button>
								<button className={style.callBtn}>
									<HeaderPhoneIcon /> Zəng et
								</button>
							</div>
							<div className={style.billboard}>
								<video autoPlay loop muted loading="lazy">
									<source
										src={reklamVideo}
										type="video/mp4"
										loading="lazy"
									/>
								</video>
							</div>
						</div>
					</div>
					{/* oxşar məhsular və məhsulun xususiyyətləri */}
					<PrDetailsPageSimilarPrAndPrFeatures
						prDetailsData={prDetailsData}
						relatedDatas={relatedDatas}
					/>
				</div>
			</section>
		</>
	);
}
