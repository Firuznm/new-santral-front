import style from "./OurAdvantages.module.scss"
import { OurAdvantagesMiniPageData } from "../../../MyDatas/MyDatas"
import SectionTitle from "../../SectionTitle/SectionTitle"
import { Link } from "react-router-dom";


export default function OurAdvantages() {
  return ( 
		<section id={style.OurAdvantages}>
			<div className={style.OurAdvantagesTitle}>
				<SectionTitle title={'Üstünlüklərimiz'} />
			</div>
			<div className={style.OurAdvantagesCartWrapper}>
				{OurAdvantagesMiniPageData.map((item) => (
					<Link  key={item.id} className={style.OurAdvantagesCart}>
						<img src={item.icon} />
						<div className={style.titleDescription}>
							<h4 className={style.title}>{item.title}</h4>
							<p className={style.description}>{item.description}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
  );
}
