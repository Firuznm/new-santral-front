import style from "./ButtonAndArrow.module.scss"
import RightIcon from "../../assets/Icons/RightIcon";

export default function ButtonAndArrow({ title }) {
	return (
		<>
			<button type="submit" className={style.buttonArrow}>
				{title} <RightIcon />
			</button>
		</>
	);
}
