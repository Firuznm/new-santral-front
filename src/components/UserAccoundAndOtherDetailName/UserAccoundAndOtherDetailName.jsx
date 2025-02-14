import { NavLink } from "react-router-dom"
import style from "./UserAccoundAndOtherDetailName.module.scss"


export default function UserAccoundAndOtherDetailName() {

  return (
<div className={style.userAccoundAndOtherDetailName}>
    <NavLink to="/personal-information" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Şəxsi məlumatlar
    </NavLink>
    <NavLink to="/my-orders" className={({ isActive }) => `${style.pageName} ${isActive ? style.active : ''}`}>
        Sifarişlərim
    </NavLink>
    <NavLink to="/my-addresses" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Mənim ünvanlarım
    </NavLink>
    <NavLink to="/reset-password" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Şifrəni yenilə
    </NavLink>
</div>


  )
}
