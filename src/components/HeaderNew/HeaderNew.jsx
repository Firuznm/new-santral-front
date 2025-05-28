import style from './HeaderNew.module.scss';
import santralLogo from '../../assets/logos/santralLogo.png';
import santralMiniLogo from '../../assets/logos/santralMiniLogo.png';
import HeaderPhoneIcon from '../../assets/Icons/HeaderPhoneIcon';
import defaultUserImg from '../../assets/Images/dafaultUserImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { authMe, getAllCatalogDatas, logout, toggleShowEnterSiteArea } from '../../redux/userSlice';
import EnterSiteHeader from '../../Authentication/EnterSiteHeader/EnterSiteHeader';
import HeartIcon from '../../assets/Icons/HeartIcon';
import BasketIcon from '../../assets/Icons/BasketIcon';
import SearchIcon from '../../assets/Icons/SearchIcon';
import CatalogIcon from '../../assets/Icons/CatalogIcon';
import Catalog from '../Catalog/Catalog';
// import HeaderFreeDeliverySlider from '../HeaderFreeDeliverySlider/HeaderFreeDeliverySlider';
import santral from '../../Helpers/Helpers';
import HeaderMobile from '../HeaderMobile/HeaderMobile';
import { useSearch } from '../../context/SearchContext';
import CloseIcon from '../../assets/Icons/CloseIcon';

       
export default function HeaderNew() {
	const [showHiddenCatalog, setShowHiddenCatalog] = useState(false);
	const [scrollHeaderChange, setScrollHeaderChange] = useState(true);
	const { searchInputValue, setSearchInputValue, searchFunc, searchResult } =
		useSearch();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);

	const { authMeUser, showOpenEnterSiteArea, isLogin, bpUser } = useSelector(
		(state) => state.userInfo,
	);
   console.log("meeee =", authMeUser);

	useEffect(() => {
			searchFunc(searchInputValue,1);
	}, [searchInputValue]);
	
	const onClickSearchReslutCart = (itemName) => {
		clearInput();
		navigate(`/product/${itemName}`);
	};

		const onKeyDownInput = (e) => {
			if (searchInputValue !== '' && e.key === 'Enter') {
				clearInput();
				navigate(`/search?searchValue=${searchInputValue}`);
			} else {
				return false;
			}
	}; 

	const onClickMoreSearchBtn = () => {
		clearInput();
		navigate(`/search?searchValue=${searchInputValue}`);
	}
	
		const clearInput = () => {
			setSearchInputValue('');
		};
		const onChangeSearchInput = (e) => {
			setSearchInputValue(e.target.value);
		};
    
	const onClickCatalogShowHidden = () => {
		const scrollSituation = !showHiddenCatalog;
		setShowHiddenCatalog(scrollSituation); 
		document.body.style.overflow = scrollSituation ? 'hidden' : 'auto';
	}; 

	const handleScroll = () => {
		if (window.scrollY > 10) {
			setScrollHeaderChange(false);
		} else {
			setScrollHeaderChange(true);
		}
	};

	window.addEventListener('scroll', handleScroll);

	useEffect(() => {
		if (isLogin) {
			dispatch(authMe());
		}
	}, [isLogin, dispatch]);

	

	const handleLogout = () => {
		dispatch(logout());
		navigate('/');
	};

	useEffect(() => {
		dispatch(getAllCatalogDatas());
	}, []);

	return (
		<div id={style.hederWrapper}>
			{/* BASDA REKLAM UCUN YER OLACAQ */}
			{/* <HeaderFreeDeliverySlider/> */}
			<div className={style.headerDesctopAndLeptopVersion}>
				<div className={style.headerTop}>
					<div
						style={{ paddingTop: 0, paddingBottom: '5px' }}
						className="container"
					>
						<div className={style.headerTopContent}>
							<div className={style.headerTopLeft}>
								<a className={style.logo} href="/">
									{scrollHeaderChange ? (
										<img
											className={style.santralLogo}
											src={santralLogo}
											alt=""
										/>
									) : (
										<img
											className={style.miniLogo}
											src={santralMiniLogo}
										/>
									)}
								</a>
								{scrollHeaderChange ? (
									''
								) : ( 
									<div className={style.headerTopCatalog}>
										<div
											onClick={onClickCatalogShowHidden}
											className={style.scrollTopCatalog}
										>
											<CatalogIcon /> Kataloq
										</div>
										<div
											onClick={onClickCatalogShowHidden}
											className={`${style.catalogScrollTopArea} ${
												showHiddenCatalog ? style.noneOverlay : ''
											}`}
										>
											{showHiddenCatalog && <Catalog />}
										</div>
									</div>
								)}
							</div>
							<div className={style.searchArea}>
								<label htmlFor="search" className={style.SearchWrapper}>
									<SearchIcon />
									<input
										value={searchInputValue}
										onKeyDown={onKeyDownInput}
										onChange={onChangeSearchInput}
										id="search"
										type="text"
										placeholder="25000 müxtəlif məhsul içindən axtarın"
									/>
								</label>
								{searchInputValue?.length > 0 && (
									<div className={style.searchHeaderResultArea}>
										{searchResult?.data?.length > 0 ? (
											<div className={style.searchResultProduct}>
												{searchResult?.data?.map((item) => (
													<div
														onClick={() =>
															onClickSearchReslutCart(
																item.name,
															)
														}
														className={style.searchCart}
														key={item.id}
													>
														<img
															className={style.searchImg}
															src={`${santral.baseUrlImage}${item.thumbnail}`}
															alt=""
														/>
														<div className={style.titlePrice}>
															<span className={style.title}>
																{item.title}
															</span>
															<div className={style.priceList}>
																{item?.discountPercent != 0 && (
																	<span
																		className={
																			style.discountPercent
																		}
																	>{item?.discountPercent}%</span>
																)}
																{item?.oldPrice != 0 && (
																	<span
																		className={
																			style.oldPrice
																		}
																	>
																		{item?.oldPrice?.toFixed(2)}
																	</span>
																)}

																<span
																	className={
																		style.price
																	}
																>
																	{item?.price?.toFixed(2)}₼
																</span>
															</div>
														</div>
													</div>
												))}
											</div>
										) : (
											<div className={style.noSearchProduct}>
												<span className={style.searchValue}>
													{searchInputValue}
												</span>
												adında məhsul yoxdur
											</div>
										)}
										<span
											onClick={clearInput}
											className={style.closeBtn}
										>
											<CloseIcon />
										</span>
										<div className={style.moreBtn}>
											{searchResult?.data?.length > 11 && (
												<span
													onClick={onClickMoreSearchBtn}
													className={style.Btn}
												>
													Daha cox görün
												</span>
											)}
										</div>
									</div>
								)}
							</div>
							<div className={style.headerTopRight}>
								<a className={style.shortPhone} href="tel:1410">
									<HeaderPhoneIcon />
									1410
								</a>
								<div className={style.headerEnter}>
									{isLogin ? (
										<div
											className={`${style.userHaveLogin} ${
												!bpUser ? '' : style.bpImgEnd
											}`}
										>
											{!bpUser && (
												<span className={style.cashback}>
													Keşbək : {authMeUser.cashback}₼
												</span>
											)}
											<span
												onClick={() =>
													dispatch(toggleShowEnterSiteArea())
												}
												className={style.defaultUserImg}
											>
												{authMeUser?.photo ? (
													<img
														src={`${santral.baseUrlImage}${authMeUser?.photo}`}
														alt=""
													/>
												) : (
													<img src={defaultUserImg} alt="" />
												)}
												{/* <img src={defaultUserImg} alt="" /> */}
											</span>
											{showOpenEnterSiteArea && (
												<div className={style.headerUserInfoPage}>
													<NavLink
														onClick={() =>
															dispatch(
																toggleShowEnterSiteArea(),
															)
														}
														to="/personal-information"
														className={({ isActive }) =>
															`${style.pageName} ${
																isActive
																	? style.active
																	: ''
															}`
														}
													>
														Şəxsi məlumatlar
													</NavLink>
													<NavLink
														onClick={() =>
															dispatch(
																toggleShowEnterSiteArea(),
															)
														}
														to="/my-orders"
														className={({ isActive }) =>
															`${style.pageName} ${
																isActive
																	? style.active
																	: ''
															}`
														}
													>
														Sifarişlərim
													</NavLink>
													<NavLink
														onClick={() =>
															dispatch(
																toggleShowEnterSiteArea(),
															)
														}
														to="/my-addresses"
														className={({ isActive }) =>
															`${style.pageName} ${
																isActive
																	? style.active
																	: ''
															}`
														}
													>
														Mənim ünvanlarım
													</NavLink>
													<NavLink
														onClick={() =>
															dispatch(
																toggleShowEnterSiteArea(),
															)
														}
														to="/change-password"
														className={({ isActive }) =>
															`${style.pageName} ${
																isActive
																	? style.active
																	: ''
															}`
														}
													>
														Şifrəni yenilə
													</NavLink>
													<span
														onClick={handleLogout}
														className={style.outside}
													>
														Cıxış Et
													</span>
												</div>
											)}
										</div>
									) : (
										<div>
											<button
												onClick={() =>
													dispatch(toggleShowEnterSiteArea())
												}
												className={style.headerEnterBtn}
											>
												Daxil ol
											</button>
											{showOpenEnterSiteArea && <EnterSiteHeader />}
										</div>
									)}
								</div>
								<div className={style.basketWishList}>
									<Link
										to={'favorite-items'}
										className={style.wishList}
									>
										<HeartIcon />
										<span className={style.wishListCount}>
											{favoriteItemsList?.length}
										</span>
									</Link>
									<Link to={'/basket'} className={style.basket}>
										<BasketIcon />
										<span className={style.basketCount}>
											{isLogin
												? apiBaskets?.length
												: localBaskets?.length}
										</span>
									</Link>
								</div>
								{/* <select className={style.lang} name="" id="">
									<option value="">AZ</option>
									<option value="">EN</option>
									<option value="">RU</option>
								</select> */}
							</div>
						</div>
					</div>
				</div>
				<div
					className={`${style.headerBottom} ${
						scrollHeaderChange ? '' : style.noHeaderBottom
					}`}
				>
					<div
						style={{ paddingTop: 0, paddingBottom: 0 }}
						className="container"
					>
						<div className={style.headerBottomContent}>
							<div
								onClick={onClickCatalogShowHidden}
								className={style.catalog}
							>
								<CatalogIcon /> Kataloq
							</div>
							<div
								onClick={onClickCatalogShowHidden}
								className={`${style.catalogArea} ${
									showHiddenCatalog ? style.noneOverlay : ''
								}`}
							>
								{showHiddenCatalog && <Catalog />}
							</div>
							<div className={style.headerPage}>
								<NavLink
									className={({ isActive }) =>
										`${style.pageName} ${
											isActive ? style.active : ''
										}`
									}
									to="/about"
								>
									Haqqımızda
								</NavLink>
								<NavLink
									className={({ isActive }) =>
										`${style.pageName} ${
											isActive ? style.active : ''
										}`
									}
									to="/branches"
								>
									Filiallar
								</NavLink>
								<NavLink
									className={({ isActive }) =>
										`${style.pageName} ${
											isActive ? style.active : ''
										}`
									}
									to="/news"
								>
									Xəbərlər
								</NavLink>
								<NavLink
									className={({ isActive }) =>
										`${style.pageName} ${
											isActive ? style.active : ''
										}`
									}
									to="/projects"
								>
									Layihələr
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={style.mobileHeaderVersion}>
				<HeaderMobile handleLogout={handleLogout}
	onClickSearchReslutCart={onClickSearchReslutCart}
	onKeyDownInput = {onKeyDownInput}
	onClickMoreSearchBtn = {onClickMoreSearchBtn}
	clearInput = {clearInput}
	onChangeSearchInput={onChangeSearchInput} />
			</div>
		</div>
	);
}
