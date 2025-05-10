import HomeCategoryPartnersSlider from "../../HomeCategoryPartnersSlider/HomeCategoryPartnersSlider";
import style from "./HomeCategorySlider.module.scss"

export default function HomeCategorySlider({ homeCategorySliderData }) {
    return (
		<section id={style.homeCategory}>
			<HomeCategoryPartnersSlider
				cartNumber={1}
				sliderCartHeight={'170px'}
                imgHeight={'116px'}
                imgWidth={"116px"}
				data={homeCategorySliderData}
			/>
		</section>
	);
}   
