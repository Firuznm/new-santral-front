import style from "./HeaderFreeDeliverySlider.module.scss"
import freeDeliveryTruck from '../../assets/Images/truck-fast.png';

export default function HeaderFreeDeliverySlider() {
    return (
	<div className={style.freeDelivery}>
							<div className={style.sentenceAnimate}>
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>{' '}
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>{' '}
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>{' '}
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>{' '}
								<span>
									<img src={freeDeliveryTruck} alt="" /> 50₼ yuxarı
									pulsuz çatdırılma{' '}
								</span>
								{/* <span>50 manatdan yuxarı pulsuz çatdırılma </span>
								<span>50 manatdan yuxarı pulsuz çatdırılma </span>
								<span>50 manatdan yuxarı pulsuz çatdırılma </span>
								<span>50 manatdan yuxarı pulsuz çatdırılma </span>
								<span>50 manatdan yuxarı pulsuz çatdırılma </span> */}
							</div>
						</div>
	);
}
