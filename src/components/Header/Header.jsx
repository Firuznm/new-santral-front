import style from "./Header.module.scss"
import logo from "../../assets/logos/santralLogo.png"
import { Link, NavLink } from "react-router-dom";
import HeaderPhoneIcon from "../../assets/Icons/HeaderPhoneIcon";
import CatalogIcon from "../../assets/Icons/CatalogIcon";
import SearchIcon from "../../assets/Icons/SearchIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import BasketIcon from "../../assets/Icons/BasketIcon";
import { useState } from "react";
import Catalog from "../Catalog/Catalog";


export default function Header() {
    const [showHiddenCatalog, setShowHiddenCatalog] = useState(false);

    const onClickCatalogShowHidden = () => {
        const scrollSituation = !showHiddenCatalog;
        setShowHiddenCatalog(scrollSituation);

        if (scrollSituation) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto"; 
        }
      };
	return (
        <div className={style.headerWrapper}>
            <div className={style.headerTopWrapper}>
                <div style={{ paddingTop: 0, paddingBottom: 0 }} className="container">
                    <div className={style.headerTop}>
                       <a href="/"><img className={style.logo} src={logo} alt="" /></a>
                        <div className={style.headerPage}>
                            <NavLink to="about">Haqqımızda</NavLink>
                            <NavLink>Filiallar</NavLink>
                            <NavLink>Xəbərlər</NavLink>
                        </div>
                        <div className={style.langEnterBtn}>
                            <a className={style.shortPhone} href="tel:1410">
                                <HeaderPhoneIcon /> 1410
                            </a>
                            <button className={style.enterBtn}>Daxil ol</button>
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
                        <div onClick={onClickCatalogShowHidden} className={`${style.catalogArea} ${showHiddenCatalog ? style.noneOverlay : ""}`}
                        >
                        {
                            showHiddenCatalog && <Catalog/>
                        }
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
