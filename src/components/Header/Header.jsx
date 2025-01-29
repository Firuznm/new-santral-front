import style from "./Header.module.scss"
import logo from "../../assets/logos/santralLogo.png"
import { Link, NavLink } from "react-router-dom";
import HeaderPhoneIcon from "../../assets/Icons/HeaderPhoneIcon";
import CatalogIcon from "../../assets/Icons/CatalogIcon";
import SearchIcon from "../../assets/Icons/SearchIcon";
import HeartIcon from "../../assets/Icons/HeartIcon";
import BasketIcon from "../../assets/Icons/BasketIcon";
import {  useState } from "react";
import Catalog from "../Catalog/Catalog";
import Input from "../Input/Input";
import CloseIcon from "../../assets/Icons/CloseIcon";
import RightIcon from "../../assets/Icons/RightIcon";


export default function Header() {
    const [showOpenArea, setShowOpenArea] = useState(false) 
    const [showHiddenCatalog, setShowHiddenCatalog] = useState(false);

    
        const handleCloseOpenArea = () => {
            setShowOpenArea(false);
        };
    
        window.addEventListener("click", handleCloseOpenArea);
 

    const enterInputData=[
        {
            id:1,
            labelName:"E-mail",
            placeholder:"E-mail daxil edin",
            inputType:"email"
        },
        {
            id:2,
            labelName:"Şifrə",
            placeholder:"****",
            inputType:"password"
        }
    ]

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
                            <div className={style.headerEnter}>
                            <button    
                            onClick={(e) => {
                              e.stopPropagation();
                            setShowOpenArea(!showOpenArea);
                                    }} 
                           className={style.headerEnterBtn}>Daxil ol</button>
                           {showOpenArea && 
                           <div className={style.enterArea} onClick={(e) => e.stopPropagation()}>
                                 <span onClick={handleCloseOpenArea} className={style.enterAreaCloseBtn}><CloseIcon/></span>
                               {
                                enterInputData?.map(item=>(
                                    <Input key={item.id} inputInfo={item}/>
                                ))
                               }
                               <Link className={style.parolForgotten}>Şifrəni unutmusunuz?</Link>
                               <button className={style.enterBtn}>Daxil ol <RightIcon/></button>
                               <span className={style.donotAccount}>Hesabınız yoxdur?</span>
                               <Link className={style.LinkSignUp}>Qeydiyyatdan keç</Link>
                               </div>
                               }
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
