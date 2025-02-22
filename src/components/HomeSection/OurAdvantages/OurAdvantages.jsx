import style from "./OurAdvantages.module.scss"
import { OurAdvantagesData } from "../../../MyDatas/MyDatas"


export default function OurAdvantages() {
  return (
    <section id={style.OurAdvantages}>
    <div className="container">
      <div className={style.OurAdvantagesTitle}>
     <h2 className={style.sectionTitle}>Üstünlüklərimiz</h2>
     </div>
    <div className={style.OurAdvantagesCartWrapper}>
      {
        OurAdvantagesData.map(item=>(
          <div key={item.id} className={style.OurAdvantagesCart}>
          <img src={item.img} />
          <h4 className={style.title}>{item.title}</h4>
          <p className={style.description}>{item.description}</p>
        </div>
        ))
      }
   </div>
    </div>
    </section>
  )
}
