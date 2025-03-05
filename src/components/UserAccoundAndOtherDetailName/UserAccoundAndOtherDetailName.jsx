import { NavLink, useNavigate } from "react-router-dom"
import style from "./UserAccoundAndOtherDetailName.module.scss"
import { useDispatch } from "react-redux"
import { logout} from "../../redux/userSlice";


export default function UserAccoundAndOtherDetailName() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); 
        navigate("/")
      };

  return (
<div className={style.userAccoundAndOtherDetailName}>
    <NavLink  to="/personal-information" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Şəxsi məlumatlar
    </NavLink>
    <NavLink  to="/my-orders" className={({ isActive }) => `${style.pageName} ${isActive ? style.active : ''}`}>
        Sifarişlərim
    </NavLink>
    <NavLink  to="/my-addresses" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Mənim ünvanlarım
    </NavLink>
    <NavLink  to="/reset-password" className={({ isActive }) => `${style.pageName} ${isActive ?  style.active : ''}`}>
        Şifrəni yenilə
    </NavLink>
    <span onClick={handleLogout} className={style.outside}>Cıxış Et</span>
</div> 


  )
}
