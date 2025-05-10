import style from "./HeaderMobile.module.scss"
import santarlLogo from "../../assets/logos/santralLogo.png"
import MobileHamburgerMenuIcon from "../../assets/Icons/MobileHamburgerMenuIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowEnterSiteArea } from "../../redux/userSlice";
import santral from "../../Helpers/Helpers";
import defaultUserImg from '../../assets/Images/dafaultUserImg.png';
import { Link, NavLink } from "react-router-dom";
import EnterSiteHeader from "../../Authentication/EnterSiteHeader/EnterSiteHeader";
import CatalogIcon from '../../assets/Icons/CatalogIcon';
import SearchIcon from "../../assets/Icons/SearchIcon";
import MobileCatalogIcon from "../../assets/Icons/MobileCatalogIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import MobileBasketIcon from "../../assets/Icons/MobileBasketIcon";
import MobileHomePageIcon from "../../assets/Icons/MobileHomePageIcon";
import HeaderPhoneIcon from "../../assets/Icons/HeaderPhoneIcon";
import { useEffect, useState } from "react";
import MobilMenuCloseIcon from "../../assets/Icons/MobilMenuCloseIcon";


export default function HeaderMobile({handleLogout}) {
	const dispatch = useDispatch();
	const [showHiddenHamburgerMenu, setShowHiddenHamburgerMenu] = useState(false);
		const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);
		const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);
    	const { authMeUser, showOpenEnterSiteArea, isLogin } = useSelector(
			(state) => state.userInfo,
	);
	const handleHamburgerMenu = () => {
		setShowHiddenHamburgerMenu(!showHiddenHamburgerMenu)
	}
	 useEffect(() => {
				document.body.style.overflow = showHiddenHamburgerMenu
					? 'hidden'
					: 'auto';
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
						<span className={style.mobileCatalog}>
							<CatalogIcon /> Kataloq
						</span>
						<label htmlFor="search" className={style.SearchWrapper}>
							<SearchIcon />
							<input
								id="search"
								type="text"
								placeholder="25000 müxtəlif məhsul içindən axtarın"
							/>
						</label>
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
						<span>
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

