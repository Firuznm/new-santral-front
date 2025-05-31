import HelmetAsync from "../../components/HelmetAsync/HelmetAsync";
import style from "./Projects.module.scss"

export default function Projects() {
  return (
    <>
      <HelmetAsync title={"Layihələr"}/>
			<section id={style.projectsPage}>
				<div className="container">
					<h1>Projects page santral</h1>
				</div>
			</section>
		</>
  );
}
