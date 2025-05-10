import style from "./OrderSuccessfull.module.scss"
import successFullImg from "../../assets/Images/successfullImg.png"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OrderSuccessfull() {
    
	const { isLogin } = useSelector((state) => state.userInfo);

  return (
		<div className={style.orderSuccessfull}>
			<img className={style.successFullImg} src={successFullImg} alt="" />
			<h3 className={style.success}>Sifarişiniz üçün təşəkkür edirik</h3>
			<p className={style.sortInfo}>Sifarişiniz uğurla tamamlanndı</p>
			<p className={style.sortInfo}>
				Sifarişinizin rəsmiləşdirilməsi üçün sizinnlə əlaqə saxlanılacaqdır
			</p>

			<div
				style={isLogin ? {} : { justifyContent: 'center' }}
				className={style.pageUrl}
			>
				<Link className={style.urlHome} to="/">
					Əsas səhifə
				</Link>
				{isLogin && (
					<Link className={style.urlMyOrders} to="/my-orders">
						Sifarişlərim
					</Link>
				)}
			</div>
		</div>
  );
}
