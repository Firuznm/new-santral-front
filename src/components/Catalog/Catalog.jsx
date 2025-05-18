import { useEffect } from "react";
import styles from "./Catalog.module.scss";
import { Link } from "react-router-dom";
import IsBigIcon from "../../assets/Icons/IsBigIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatalogDatas } from "../../redux/userSlice";

export default function Catalog() {
  
	const dispatch = useDispatch();
	// const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllCatalogDatas());
	}, []);
  
  const { catalogDatas } = useSelector((state) => state.userInfo);

//   console.log("redux catalog=",catalogDatas);
  
  
    
  const renderCategories = (category) => (
		<Link  to={category.route} key={category.id} className={styles.categoryName}>
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
        {catalogDatas?.map(renderCategories)}
    </ul>
  );
}


