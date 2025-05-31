import HelmetAsync from "../../components/HelmetAsync/HelmetAsync";
import style from "./News.module.scss"

export default function News() {
  return (
    <>
      <HelmetAsync title={"Xəbərlər"}/>
			<section id={style.newsPage}>
				<div className="container">
					<h1>News page santral</h1>
				</div>
			</section>
		</>
  );
}
