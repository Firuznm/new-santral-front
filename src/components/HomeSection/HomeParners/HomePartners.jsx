import HomeCategoryPartnersSlider from "../../HomeCategoryPartnersSlider/HomeCategoryPartnersSlider"
import style from "./HomePartners.module.scss"


export default function HomePartners({PartnersData}) {
  return (
		<div id={style.HomeParenresWrapper}>
			<HomeCategoryPartnersSlider
				sliderCartHeight={'220px'}
				cartNumber={7}
				imgHeight={'142px'}
				imgWidth={'142px'}
				data={PartnersData}
			/>
		</div>
  );
}
  