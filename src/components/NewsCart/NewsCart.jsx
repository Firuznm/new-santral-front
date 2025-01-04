import { Link } from "react-router-dom"
import style from "./NewsCart.module.scss"
import IsBigIcon from "../../assets/Icons/IsBigIcon"
import ClockIcon from "../../assets/Icons/ClockIcon"
import santral from "../../Helpers/Helpers"

export default function NewsCart({data}) {
  return (
      <Link to={data.route} className={style.newsCartWrapper}>
          <img className={style.newsImg} src={`${santral.baseUrlImage}${data.thumbnail}`} />
          <h6 className={style.newsTitle}>{data.title}</h6>
          <p className={style.shortInfo} dangerouslySetInnerHTML={{ __html: data.content.replace(/(<([^>]+)>)/gi, "") }}></p>
          <div className={style.detailBtn_Date}>
              <button className={style.newsDetailBtn}>
                  Ətraflı oxu
                  <IsBigIcon color={"black"} />
              </button>
              <span className={style.newsDate}>
                  <ClockIcon /> {data.date}
              </span>
          </div>
      </Link>
  );
}
