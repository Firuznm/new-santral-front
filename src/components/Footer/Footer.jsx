import style from "./Footer.module.scss"
import logo from "../../assets/logos/santralLogo.png"
import FacebookIcon from "../../assets/Icons/FacebookIcon";
import InstagramIcon from "../../assets/Icons/InstagramIcon";
import WhatsappIcon from "../../assets/Icons/WhatsappIcon";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { categoryName } from "../../MyDatas/MyDatas";
import looptechLogo from "../../assets/logos/looptech-logo-animated.svg"
import FooterCallPhoneIcon from "../../assets/Icons/FooterCallPhoneIcon";
import FooterHomeCallIcon from "../../assets/Icons/FooterHomeCallIcon";
import EmailIcon from "../../assets/Icons/EmailIcon";
import LocationIcon from "../../assets/Icons/LocationIcon";
import visaCartImg from "../../assets/logos/visa-electron.svg"
import masterCartImg from "../../assets/logos/Mastercard-logo.svg";


export default function Footer() {
    const [readMoreOrLess, setReadMoreOrLess] = useState(false)
    const handleReadMoreOrLess = () => {
        setReadMoreOrLess(!readMoreOrLess)
    }
  return (
      <div className={style.footerWrapper}>
          <div className="container">
              <div className={style.footerTop}>
                  <div className={style.logoSocial}>
                      <a className={style.footerLogo} href="/">
                          <img src={logo} />
                      </a>

                      <div className={style.social}>
                          <a href="" target="_blank">
                              <FacebookIcon />
                          </a>
                          <a href="" target="_blank">
                              <InstagramIcon />
                          </a>
                          <a href="" target="_blank">
                              <WhatsappIcon />
                          </a>
                      </div>
                  </div>
                  <div className={style.shortInfoWrapper}>
                      <p className={style.santralShortInfo}>2000-ci ildən bu yana “Santral Elektrik” QSC şirkəti belə uğurlu iqtisadi siyasətdən bəhrələnərək müştərilərə müasir tələblərə cavab verən müxtəlif çeşidli məhsullar və sərfəli xidmətlər təklif edir.</p>
                      <span onClick={handleReadMoreOrLess}>Cox oxu</span>
                  </div>
              </div>
          </div>
          <hr className={style.line} />
          <div className="container">
              <div className={style.footerBottom}>
                  <div className={style.footerPage}>
                      <h4 className={style.footerPartTitle}>Şirkət</h4>
                      <NavLink>Haqqımızda</NavLink>
                      <NavLink>Filiallar</NavLink>
                      <NavLink>Xəbərlər</NavLink>
                      <NavLink>Partnyorlar</NavLink>
                  </div>
                  <div className={style.footerForCustomer}>
                      <h4 className={style.footerPartTitle}>Müştəri üçün</h4>
                      <NavLink>Çatdırılma qaydaları</NavLink>
                      <NavLink>Məxfilik siyasəti</NavLink>
                      <NavLink>Blog</NavLink>
                  </div>
                  <div className={style.footerCategoryWrapper}>
                      <h4 className={style.footerPartTitle}>Kateqoriyalar</h4>
                      <div className={style.footerCategory}>
                          <div className={style.footerCategoryOne}>
                              {categoryName.slice(0, 5).map((category) => (
                                  <NavLink key={category.id}>{category.title}</NavLink>
                              ))}
                          </div>
                          <div className={style.footerCategoryTwo}>
                              {categoryName.slice(5).map((category) => (
                                  <NavLink key={category.id}>{category.title}</NavLink>
                              ))}
                          </div>
                      </div>
                  </div>
                  <div className={style.footerContact}>
                      <h4 className={style.footerPartTitle}>Əlaqə</h4>
                      <a href="tel">
                          <FooterCallPhoneIcon /> 1410
                      </a>
                      <a href="">
                          <FooterHomeCallIcon />
                          0123104314
                      </a>
                      <a href="">
                          <EmailIcon />
                          sales@santral.az
                      </a>
                      <a href="">
                          <LocationIcon />
                          Z.Bünyadov pr., 2071 AZ1029, AZərbaycan, Bakı
                      </a>
                      <span className={style.payCartImg}>
                          <img className={style.visaCartImg} src={visaCartImg}  />
                          <hr className={style.imgLine} />
                          <img className={style.masterCartImg} src={masterCartImg} />
                      </span>
                  </div>
              </div>
          </div>
          <hr className={style.line} />
          <a className={style.looptech} target="_blank" rel="noreferrer" href="https://www.looptech.az/">
              <span className={style.title}>Saytı hazırladı:</span>
              <object className={style.looptechLogo} data={looptechLogo} />
          </a>
      </div>
  );
}
