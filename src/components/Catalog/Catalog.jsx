import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";
import { Link } from "react-router-dom";
import IsBigIcon from "../../assets/Icons/IsBigIcon";

export default function Catalog() {
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    const getCategoryDatas = async () => {
      try {
        const res = await santral.api().post(urls.catalog);
        setCatalogData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCategoryDatas();
  }, []);

  console.log("cato=", catalogData);
  
    
  const renderCategories = (category) => (
		<Link to={category.route} key={category.id} className={styles.categoryName}>
			<span className={styles.title}>{category.title}</span>

			{category.children?.length > 0 && (
				<>
					<span className={styles.arrow}>
						<IsBigIcon />
					</span>
					<div className={styles.subCategoryWrapper}>
						<ul className={styles.subCategory}>
							<span className={styles.subCategoryHeaderTitle}>
								{category.title}
							</span>
							{category.children.map(renderCategories)}
						</ul>
					</div>
				</>
			)}
		</Link>
  );

  return (
    <ul className={styles.catalogWrapper}>
        {catalogData.map(renderCategories)}
    </ul>
  );
}


