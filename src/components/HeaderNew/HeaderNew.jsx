import style from "./HeaderNew.module.scss"
import santralLogo from '../../assets/logos/santralLogo.png';
import HeaderPhoneIcon from '../../assets/Icons/HeaderPhoneIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authMe, logout, toggleShowEnterSiteArea } from '../../redux/userSlice';
import PersonIcon from '../../assets/Icons/PersonIcon';
import EnterSiteHeader from '../../Authentication/EnterSiteHeader/EnterSiteHeader';
import HeartIcon from '../../assets/Icons/HeartIcon';
import BasketIcon from '../../assets/Icons/BasketIcon';
import SearchIcon from "../../assets/Icons/SearchIcon";
import CatalogIcon from "../../assets/Icons/CatalogIcon";
import Catalog from "../Catalog/Catalog";

export default function HeaderNew() {
	const [showHiddenCatalog, setShowHiddenCatalog] = useState(false);
   const [scrollHeaderChange, setScrollHeaderChange] = useState(true);
	const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authMeUser } = useSelector((state) => state.userInfo);
    const { userToken, showOpenEnterSiteArea } = useSelector((state) => state.userInfo);
    const isLogin = !!userToken;

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
        if (userToken) {
            dispatch(authMe());
        }
    }, [userToken, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
		<div id={style.hederWrapper}>
			<div className={style.headerTop}>
				<div style={{ paddingTop: 0, paddingBottom: 0 }} className="container">
					<div className={style.headerTopContent}>
						<a href="/">
							{scrollHeaderChange ? (
								<img
									className={style.santralLogo}
									src={santralLogo}
									alt=""
								/>
							) : (
								<span>S-LOGO</span>
							)}
						</a>
						{scrollHeaderChange ? (
							''
						) : (
							<div className={style.headerTopCatalog}>
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
							</div>
						)}
						<label htmlFor="search" className={style.SearchWrapper}>
							<SearchIcon />
							<input
								id="search"
								type="text"
								placeholder="25000 müxtəlif məhsul içindən axtarın"
							/>
						</label>

						<div className={style.freeDelivery}>
							50 manatdan yuxarı pulsuz çatdırılma
						</div>
						<a className={style.shortPhone} href="tel:1410">
							<HeaderPhoneIcon />
							1410
						</a>
						<div className={style.headerEnter}>
							{isLogin ? (
								<div className={style.userHaveLogin}>
									<span className={style.cashmere}>
										Keşbək : {authMeUser.cashback}₼
									</span>
									<span
										onClick={() =>
											dispatch(toggleShowEnterSiteArea())
										}
										className={style.PersonIcon}
									>
										<PersonIcon />
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
						<div className={style.basketWishList}>
							<Link className={style.wishList}>
								<HeartIcon />
								<span className={style.wishListCount}>14</span>
							</Link>
							<Link className={style.basket}>
								<BasketIcon />
								<span className={style.basketCount}>18</span>
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

			<div
				className={`${style.headerBottom} ${
					scrollHeaderChange ? '' : style.noHeaderBottom
				}`}
			>
				<div style={{ paddingTop: 0, paddingBottom: 0 }} className="container">
					<div className={style.headerBottomContent}>
						<div onClick={onClickCatalogShowHidden} className={style.catalog}>
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
							<NavLink to="/about">Haqqımızda</NavLink>
							<NavLink to="/branchs">Filiallar</NavLink>
							<NavLink to="/news">Xəbərlər</NavLink>
							<NavLink to="/projects">Layihələr</NavLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
