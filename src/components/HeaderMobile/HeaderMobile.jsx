import style from './HeaderMobile.module.scss';
import santarlLogo from '../../assets/logos/santralLogo.png';
import MobileHamburgerMenuIcon from '../../assets/Icons/MobileHamburgerMenuIcon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowEnterSiteArea } from '../../redux/userSlice';
import santral from '../../Helpers/Helpers';
import defaultUserImg from '../../assets/Images/dafaultUserImg.png';
import { Link, NavLink } from 'react-router-dom';
import EnterSiteHeader from '../../Authentication/EnterSiteHeader/EnterSiteHeader';
import CatalogIcon from '../../assets/Icons/CatalogIcon';
import SearchIcon from '../../assets/Icons/SearchIcon';
import MobileCatalogIcon from '../../assets/Icons/MobileCatalogIcon';
import HeartIcon from '../../assets/Icons/HeartIcon';
import MobileBasketIcon from '../../assets/Icons/MobileBasketIcon';
import MobileHomePageIcon from '../../assets/Icons/MobileHomePageIcon';
import HeaderPhoneIcon from '../../assets/Icons/HeaderPhoneIcon';
import { useEffect, useState } from 'react';
import MobilMenuCloseIcon from '../../assets/Icons/MobilMenuCloseIcon';
import MobileCatalog from '../MobileCatalog/MobileCatalog';
import { useSearch } from '../../context/SearchContext';
import CloseIcon from '../../assets/Icons/CloseIcon';

export default function HeaderMobile({ handleLogout,
	onClickSearchReslutCart ,
	onKeyDownInput,
	clearInput,
	onClickMoreSearchBtn ,
	onChangeSearchInput}) {
	const dispatch = useDispatch();
	const [showHiddenHamburgerMenu, setShowHiddenHamburgerMenu] = useState(false);
	const [mobileCatalog, setMobileCatalog] = useState(false)
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
	const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);
	const { searchInputValue,searchFunc, searchResult } =
		useSearch();
	const { authMeUser, showOpenEnterSiteArea, isLogin } = useSelector(
		(state) => state.userInfo,
	);

	useEffect(() => {
		searchFunc(searchInputValue, 1);
	}, [searchInputValue]);
	const handleMobileCatalog = () => {
		setMobileCatalog(!mobileCatalog)
	}
	const handleHamburgerMenu = () => {
		setShowHiddenHamburgerMenu(!showHiddenHamburgerMenu);
	};
	useEffect(() => {
		document.body.style.overflow = showHiddenHamburgerMenu ? 'hidden' : 'auto';
	}, [showHiddenHamburgerMenu]);
	return (
		<div className={style.mobileHeaderWrapper}>
			<div style={{ paddingTop: 0, paddingBottom: '5px' }} className="container">
				<div className={style.headerMobileTop}>
					<a className={style.mobileLogo} href="/">
						<img src={santarlLogo} alt="" />
					</a>
					<div className={style.enterSiteAreaHamburgerMenu}>
						<div className={style.headerEnter}>
							{isLogin ? (
								<div className={style.userHaveLogin}>
									<span className={style.cashback}>
										Keşbək : {authMeUser.cashback}₼
									</span>
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
													dispatch(toggleShowEnterSiteArea())
												}
												to="/personal-information"
												className={({ isActive }) =>
													`${style.pageName} ${
														isActive ? style.active : ''
													}`
												}
											>
												Şəxsi məlumatlar
											</NavLink>
											<NavLink
												onClick={() =>
													dispatch(toggleShowEnterSiteArea())
												}
												to="/my-orders"
												className={({ isActive }) =>
													`${style.pageName} ${
														isActive ? style.active : ''
													}`
												}
											>
												Sifarişlərim
											</NavLink>
											<NavLink
												onClick={() =>
													dispatch(toggleShowEnterSiteArea())
												}
												to="/my-addresses"
												className={({ isActive }) =>
													`${style.pageName} ${
														isActive ? style.active : ''
													}`
												}
											>
												Mənim ünvanlarım
											</NavLink>
											<NavLink
												onClick={() =>
													dispatch(toggleShowEnterSiteArea())
												}
												to="/change-password"
												className={({ isActive }) =>
													`${style.pageName} ${
														isActive ? style.active : ''
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
						<span
							onClick={() => handleHamburgerMenu()}
							className={style.hamburgerMenuIcon}
						>
							<MobileHamburgerMenuIcon />
						</span>
					</div>
				</div>
			</div>
			<div className={style.mobileHeaderBottom}>
				<div style={{ paddingTop: 0, paddingBottom: 0 }} className="container">
					<div className={style.catalogSearchArea}>
						{mobileCatalog && (
							<MobileCatalog closeCatalog={handleMobileCatalog} />
						)}
						<span
							onClick={handleMobileCatalog}
							className={style.mobileCatalog}
						>
							<CatalogIcon /> Kataloq
						</span>
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
										{searchResult?.data?.slice(0,5).map((item) => (
											<div
												onClick={() =>
													onClickSearchReslutCart(item.name)
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
															>
																{item?.discountPercent}%
															</span>
														)}
														{item?.oldPrice != 0 && (
															<span
																className={style.oldPrice}
															>
																{item?.oldPrice?.toFixed(
																	2,
																)}
															</span>
														)}

														<span className={style.price}>
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
								<span onClick={clearInput} className={style.closeBtn}>
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
				</div>
			</div>
			<div
				className={`${style.hamburgerMenu} ${
					showHiddenHamburgerMenu ? '' : style.noMenu
				}`}
			>
				<div style={{ paddingTop: '10px' }} className="container">
					<nav className={style.hamburgerMenuHeader}>
						<a className={style.shortPhone} href="tel:1410">
							<HeaderPhoneIcon />
							1410
						</a>
						<div className={style.langAndCloseBtn}>
							<select className={style.lang} name="" id="">
								<option value="">Az</option>
								<option value="">En</option>
								<option value="">Ru</option>
							</select>
							<span onClick={() => handleHamburgerMenu()}>
								<MobilMenuCloseIcon />
							</span>
						</div>
					</nav>

					<div className={style.pages}>
						<NavLink
							onClick={handleHamburgerMenu}
							className={({ isActive }) =>
								`${style.pageName} ${isActive ? style.active : ''}`
							}
							to="/about"
						>
							Haqqımızda
						</NavLink>
						<NavLink
							onClick={handleHamburgerMenu}
							className={({ isActive }) =>
								`${style.pageName} ${isActive ? style.active : ''}`
							}
							to="/branches"
						>
							Filiallar
						</NavLink>
						<NavLink
							onClick={handleHamburgerMenu}
							className={({ isActive }) =>
								`${style.pageName} ${isActive ? style.active : ''}`
							}
							to="/news"
						>
							Xəbərlər
						</NavLink>
						<NavLink
							onClick={handleHamburgerMenu}
							className={({ isActive }) =>
								`${style.pageName} ${isActive ? style.active : ''}`
							}
							to="/projects"
						>
							Layihələr
						</NavLink>
					</div>
				</div>
			</div>
			<div className={style.footerBottomFixedMenu}>
				<div
					style={{ paddingTop: '4px', paddingBottom: '4px' }}
					className="container"
				>
					<div className={style.bottomContent}>
						<a href="/">
							<MobileHomePageIcon />
						</a>
						<span onClick={handleMobileCatalog}>
							<MobileCatalogIcon />
						</span>
						<Link to={'favorite-items'} className={style.wishList}>
							<HeartIcon />
							<span className={style.wishListCount}>
								{favoriteItemsList?.length}
							</span>
						</Link>
						<Link to={'/basket'} className={style.basket}>
							<MobileBasketIcon />
							<span className={style.basketCount}>
								{isLogin ? apiBaskets?.length : localBaskets?.length}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
