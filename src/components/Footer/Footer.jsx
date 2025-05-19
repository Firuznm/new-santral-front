import style from "./Footer.module.scss"
import logo from "../../assets/logos/santralLogo.png"
import FacebookIcon from "../../assets/Icons/FacebookIcon";
import InstagramIcon from "../../assets/Icons/InstagramIcon";
import WhatsappIcon from "../../assets/Icons/WhatsappIcon";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import looptechLogo from "../../assets/logos/looptech-logo-animated.svg"
import FooterCallPhoneIcon from "../../assets/Icons/FooterCallPhoneIcon";
import FooterHomeCallIcon from "../../assets/Icons/FooterHomeCallIcon";
import EmailIcon from "../../assets/Icons/EmailIcon";
import LocationIcon from "../../assets/Icons/LocationIcon";
import visaCartImg from "../../assets/logos/visa-electron.svg"
import masterCartImg from "../../assets/logos/Mastercard-logo.svg";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";
import { OurAdvantagesMiniPageData} from "../../MyDatas/MyDatas";

 
export default function Footer() {
	const [categoryNameData, setCategoryNameData] = useState([]);
	

    const getCategoryData = async () => {
        try {
            const resData = await santral.api().post(urls.catalog);
              setCategoryNameData(resData.data.data)
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getCategoryData()
    },[])
// console.log("fot cat=", categoryNameData);

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
						<p className={style.santralShortInfo}>
							2000-ci ildən bu yana “Santral Elektrik” QSC şirkəti belə
							uğurlu iqtisadi siyasətdən bəhrələnərək müştərilərə müasir
							tələblərə cavab verən müxtəlif çeşidli məhsullar və sərfəli
							xidmətlər təklif edir.
						</p>
					</div>
				</div>
			</div>
			<hr className={style.line} />
			<div
				style={{ paddingTop: '10px', paddingBottom: '10px' }}
				className="container"
			>
				<div className={style.footerBottom}>
					<div className={style.footerPage}>
						<h4 className={style.footerPartTitle}>Şirkət</h4>
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
					<div className={style.footerForCustomer}>
					  <h4 className={style.footerPartTitle}>Müştəri üçün</h4>
					  {
						  OurAdvantagesMiniPageData.map(item=>(
					  <NavLink to={item.slug} key={item.id}>{item.title}</NavLink>
						  ))
					  }
						
					</div>
					<div className={style.footerCategoryWrapper}>
						<h4 className={style.footerPartTitle}>Kateqoriyalar</h4>
						<div className={style.footerCategory}>
							<div className={style.footerCategoryOne}>
								{categoryNameData?.slice(0, 4).map((category) => (
									<NavLink to={category.route} key={category.id}>
										{category.title}
									</NavLink>
								))}
							</div>
							<div className={style.footerCategoryTwo}>
								{categoryNameData?.slice(4).map((category) => (
									<NavLink to={category.route} key={category.id}>
										{category.title}
									</NavLink>
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
							<img className={style.visaCartImg} src={visaCartImg} />
							<hr className={style.imgLine} />
							<img className={style.masterCartImg} src={masterCartImg} />
						</span>
					</div>
				</div>
			</div>
			<hr className={style.line} />
			<a
				className={style.looptech}
				target="_blank"
				rel="noreferrer"
				href="https://www.looptech.az/"
			>
				<span className={style.title}>Saytı hazırladı:</span>
				<object className={style.looptechLogo} data={looptechLogo} />
			</a>
		</div>
  );
}
