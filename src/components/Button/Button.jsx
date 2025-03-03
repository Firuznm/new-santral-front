import RightIcon from "../../assets/Icons/RightIcon"
import style from "./Button.module.scss"

export default function Button({title}) {
  return (
       <>
       <button type="submit" className={style.button}>{title} <RightIcon/></button>
       </>
  )
}
