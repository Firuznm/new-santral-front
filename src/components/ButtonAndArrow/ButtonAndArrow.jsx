import style from "./ButtonAndArrow.module.scss"
import RightIcon from "../../assets/Icons/RightIcon";

export default function ButtonAndArrow({ onclick,title }) {
	return (
		<>
			<button onClick={onclick} type="submit" className={style.buttonArrow}>
				{title} <RightIcon />
			</button>
		</>
	);
}
