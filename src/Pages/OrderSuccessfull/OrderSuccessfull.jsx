import style from "./OrderSuccessfull.module.scss"
import successFullImg from "../../assets/Images/successfullImg.png"
import { Link } from "react-router-dom";

export default function OrderSuccessfull() {
  return (
		<div className={style.orderSuccessfull}>
			<img className={style.successFullImg} src={successFullImg} alt="" />
			<h3 className={style.success}>Sifarişiniz üçün təşəkkür edirik</h3>
			<p className={style.sortInfo}>Sifarişiniz uğurla tamamlanndı</p>
			<p className={style.sortInfo}>
				Sifarişinizin rəsmiləşdirilməsi üçün sizinnlə əlaqə saxlanılacaqdır
			</p>

			<div className={style.pageUrl}>
				<Link className={style.urlHome} to="/">
					Əsas səhifə
				</Link>
				<Link className={style.urrMyOrders} to="/my-orders">
					Sifarişlərim
				</Link>
			</div>
		</div>
  );
}
