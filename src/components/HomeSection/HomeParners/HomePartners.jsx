import HomeCategoryPartnersSlider from "../../HomeCategoryPartnersSlider/HomeCategoryPartnersSlider"
import style from "./HomePartners.module.scss"


export default function HomePartners({PartnersData}) {
  return (
		<div id={style.HomeParenresWrapper}>
			<HomeCategoryPartnersSlider
				sliderCartHeight={'220px'}
				cartNumber={1}
				imgHeight={'130px'}
				imgWidth={'130px'}
				data={PartnersData}
			/>  
		</div>
  );
}
  