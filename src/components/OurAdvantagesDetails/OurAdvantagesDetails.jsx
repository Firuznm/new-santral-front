import style from "./OurAdvantagesDetails.module.scss"
import { useParams } from 'react-router-dom';
import { OurAdvantagesMiniPageData } from '../../MyDatas/MyDatas';

export default function OurAdvantagesDetails() {
    const { slug } = useParams();
   const selectPage= OurAdvantagesMiniPageData.find(item => item.slug === slug)
    
  return (
        <div className={style.ourAdvantagesMiniPage}>
          {selectPage && <div className="container">
              <img className={style.ourAdvantagesDetailsBanner} src={selectPage.banner} alt="" />
              <h5 className={style.ourAdvantagesDetailsTitle}>{selectPage.title}</h5>
              <p className={style.ourAdvantagesDetailsDescription}>{selectPage.description}</p>
          </div>}
        </div>
  );
}
