
import { Link } from "react-router-dom";
import styles from "./ProductCartNew.module.scss"


export default function ProductCartNew() {

 
  return (
      <Link to="/" className={styles.prCartWrapper}>
        <span className={styles.cat}>catdirilma</span>
         <div className={styles.prCartTop}>
         {/* <img src="https://cdn.santral.az//images/e8334009-ac8a-11ea-a5ac-005056b06295.jpeg"/> */}
         {/* <img src="https://cdn.santral.az//images/ad58f148-9d6b-11e4-a879-000c29bb375f.jpeg"/> */}
         {/* <img src="https://cdn.santral.az//images/afba708c-4540-11e8-b783-000c29bb375f.jpeg"/> */}
         <img src="https://cdn.santral.az//images/afba708c-4540-11e8-b783-000c29bb375f.jpeg"/>
         <span className={styles.endirim}>-10%</span>
         </div>


         <div className={styles.prCartBottom}>
           <h6 className={styles.prTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempore quos omnis cumque ullam veniam aut unde inventore nostrum commodi blanditiis debitis natus porro, facere vitae illo dolorem nobis! Vel.</h6>
           <span className={styles.prPrice}>123.1222121</span>
         </div>
      </Link>
  );
}
