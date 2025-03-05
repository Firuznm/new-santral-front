import style from "./Header.module.scss";
import logo from "../../assets/logos/santralLogo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HeaderPhoneIcon from "../../assets/Icons/HeaderPhoneIcon";
import CatalogIcon from "../../assets/Icons/CatalogIcon";
import SearchIcon from "../../assets/Icons/SearchIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import BasketIcon from "../../assets/Icons/BasketIcon";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  logout, toggleShowEnterSiteArea } from "../../redux/userSlice"; 
import Catalog from "../Catalog/Catalog";
import EnterSiteHeader from "../../Authentication/EnterSiteHeader/EnterSiteHeader";
import PersonIcon from "../../assets/Icons/PersonIcon";




export default function Header() {

  const [showHiddenCatalog, setShowHiddenCatalog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userToken, showOpenEnterSiteArea, } = useSelector((state) => state.userInfo);
  const isLogin = !!userToken; 

  const onClickCatalogShowHidden = () => {
    const scrollSituation = !showHiddenCatalog;
    setShowHiddenCatalog(scrollSituation);
    document.body.style.overflow = scrollSituation ? "hidden" : "auto";
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/")
  };

  return (
    <div className={style.headerWrapper}>
      <div className={style.headerTopWrapper}>
        <div style={{ paddingTop: 0, paddingBottom: 0 }} className="container">
          <div className={style.headerTop}>
            <a href="/">
              <img className={style.logo} src={logo} alt="Santral Logo" />
            </a>
            <div className={style.headerPage}>
              <NavLink to="about">Haqqımızda</NavLink>
              <NavLink>Filiallar</NavLink>
              <NavLink>Xəbərlər</NavLink>
            </div>
            <div className={style.langEnterBtn}>
              <a className={style.shortPhone} href="tel:1410">
                <HeaderPhoneIcon />1410
              </a>

              <div className={style.headerEnter}>
                {isLogin ? (
                  <div className={style.userHaveLogin}>
                    <span className={style.cashmere}>Keşbək:1.7₼</span>
                    <span onClick={() => dispatch(toggleShowEnterSiteArea())} className={style.PersonIcon}>
                      <PersonIcon />
                    </span>
                    {showOpenEnterSiteArea && (
                      <div className={style.headerUserInfoPage}>
                        {/* <UserAccoundAndOtherDetailName/> */}
                       <NavLink  onClick={()=>dispatch(toggleShowEnterSiteArea())} to="/personal-information"  className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
                           Şəxsi məlumatlar
                       </NavLink>
                       <NavLink onClick={()=>dispatch(toggleShowEnterSiteArea())}  to="/my-orders" className={({ isActive }) => `${style.pageName} ${isActive ? style.active : ''}`}>
                           Sifarişlərim
                       </NavLink>
                       <NavLink onClick={()=>dispatch(toggleShowEnterSiteArea())} to="/my-addresses" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
                           Mənim ünvanlarım
                       </NavLink>
                       <NavLink onClick={()=>dispatch(toggleShowEnterSiteArea())} to="/reset-password" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
                           Şifrəni yenilə
                       </NavLink>
                       <span  onClick={handleLogout}  className={style.outside}>Cıxış Et</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => dispatch(toggleShowEnterSiteArea())}
                      className={style.headerEnterBtn}
                    >
                      Daxil ol
                    </button>
                    {showOpenEnterSiteArea && <EnterSiteHeader />}
                  </div>
                )}
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

      <div className={style.headerBottomWrapper}>
        <div style={{ padding: ".5rem 1rem" }} className="container">
          <div className={style.headerBottom}>
            <div onClick={onClickCatalogShowHidden} className={style.catalog}>
              <CatalogIcon /> Kataloq
            </div>
            <div onClick={onClickCatalogShowHidden} className={`${style.catalogArea} ${showHiddenCatalog ? style.noneOverlay : ""}`}>
              {showHiddenCatalog && <Catalog />}
            </div>

            <div className={style.SearchWrapper}>
              <SearchIcon />
              <input type="text" placeholder="25000 müxtəlif məhsul içindən axtarın" />
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
          </div>
        </div>
      </div>
    </div>
  );
}
