import HelmetAsync from "../../components/HelmetAsync/HelmetAsync";
import style from "./About.module.scss"


export default function About() {
	return (
		<>
			<HelmetAsync title={'Haqqımızda'} />
			<div className={style.aboutPage}>
				<div className="container">
					<h1> about page santral</h1>
				</div>
			</div>
		</>
	);
}
