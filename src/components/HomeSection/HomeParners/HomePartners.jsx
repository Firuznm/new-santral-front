import HomeCategoryPartnersSlider from "../../HomeCategoryPartnersSlider/HomeCategoryPartnersSlider"
import style from "./HomePartners.module.scss"


export default function HomePartners({PartnersData}) {
  return (
	<div id={style.HomeParenresWrapper}>
	  <HomeCategoryPartnersSlider cartNumber={4} cartWidth={"198px"} imgWidth={"142px"} imgHeight={"142px"} data={PartnersData}/>
	</div>
  )
}
