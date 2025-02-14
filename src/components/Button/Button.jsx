import RightIcon from "../../assets/Icons/RightIcon"
import style from "./Button.module.scss"

export default function Button({title}) {
  return (
       <>
       <button className={style.button}>{title} <RightIcon/></button>
       </>
  )
}
