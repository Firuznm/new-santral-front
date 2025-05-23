import style from './HeaderNew.module.scss';
import santralLogo from '../../assets/logos/santralLogo.png';
import santralMiniLogo from '../../assets/logos/santralMiniLogo.png';
import HeaderPhoneIcon from '../../assets/Icons/HeaderPhoneIcon';
import defaultUserImg from '../../assets/Images/dafaultUserImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import { authMe, logout, toggleShowEnterSiteArea } from '../../redux/userSlice';
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

		// useEffect(() => {
		// 	const delayDebounce = setTimeout(() => {
		// 		if (searchInputValue.trim() !== '') {
		// 			searchFunc(searchInputValue);
		// 		}
		// 	}, 500); 

		// 	return () => clearTimeout(delayDebounce);
		// }, [searchInputValue]);
	
		
	
		useEffect(() => {
			searchFunc(searchInputValue);
		}, [searchInputValue]);
	
	console.log("header search =", searchResult);
	
	
		const onKeyDownInput = (e) => {
			if (searchInputValue !== '' && e.key === 'Enter') {
				clearInput();
				navigate(`/search?searchValue=${searchInputValue}`);
			} else {
				return false;
			}
	}; 
	
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
								<select className={style.lang} name="" id="">
									<option value="">Az</option>
									<option value="">En</option>
									<option value="">Ru</option>
								</select>
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
				<HeaderMobile handleLogout={handleLogout} />
			</div>
		</div>
	);
}
