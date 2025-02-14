import { useState } from "react";
import ProductCartSlider from "../ProductCartSlider/ProductCartSlider"
import style from "./PrDetailsPageSimilarPrAndPrFeatures.module.scss"

export default function PrDetailsPageSimilarPrAndPrFeatures({prDetailsData, relatedDatas}) {
      const [showRelatedOrPrInfo, setShowRelatedOrPrInfo]= useState(true);
    const handleState=()=>{
        setShowRelatedOrPrInfo(!showRelatedOrPrInfo)
       }

  return (
    <div className={style.similarPrAndPrFeaturesWrapper}>
           <div className={style.similarPrAndFeaturesBtn}>
         <button onClick={handleState} className={`${style.similarBtn} ${showRelatedOrPrInfo ? style.BtnActive : ""}`}>Oxşar məhsullar</button>
        {prDetailsData.parameters && <button onClick={handleState} className={`${style.featuresBtn} ${showRelatedOrPrInfo ? "" : style.BtnActive}`}>Xüsusiyyətləri</button>}
        </div>
     { showRelatedOrPrInfo ? 
         <div className={style.relatedProducts}>
          <ProductCartSlider data={relatedDatas}/>
        </div>
        :
        <div className={style.prMoreInfoWrapper}>
           <h4 className={style.prInfoTitle}>{prDetailsData?.title}</h4>
           <p className={style.prInfo}></p>
           <div className={style.indicatorsWrapper}>
            {
              prDetailsData?.parameters?.map((indicator,i)=>(
                <div key={i} className={style.prIndicator}>
                <span className={style.param}>{indicator?.param.title}</span>
                <span className={style.option}>{indicator?.option.title}</span>
                </div>
              ))
            }
           </div>
      </div>
         }
    </div>
  )
}
