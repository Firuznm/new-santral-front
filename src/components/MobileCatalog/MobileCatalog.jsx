import { useDispatch, useSelector } from "react-redux";
import styles from "./MobileCatalog.module.scss"
import { useEffect, useState } from "react";
import { getAllCatalogDatas } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const MobileCatalog = ({ closeCatalog }) => {
	const [menuStack, setMenuStack] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllCatalogDatas());
	}, []);

	const { catalogDatas } = useSelector((state) => state.userInfo);

	const currentMenu =
		menuStack.length === 0 ? catalogDatas : menuStack[menuStack.length - 1].children;

	const handleClick = (category) => {
		if (category.children && category.children.length > 0) {
			setMenuStack((prev) => [...prev, category]);
		} else {
            navigate(category.route);
            closeCatalog()
		}
	};

	const handleBack = () => {
		setMenuStack((prev) => prev.slice(0, -1));
	};

	return (
		<div className={styles.catalogWrapper}>
			{menuStack.length > 0 && (
				<button className={styles.backBtn} onClick={handleBack}>
					← Geri
				</button>
			)}
			<div className={styles.menuSlide}>
				{currentMenu?.map((category) => (
					<div
						key={category.id}
						className={styles.categoryItem}
						onClick={() => handleClick(category)}
					>
						<span>{category.title}</span>
						{category.children && <span className={styles.arrow}>›</span>}
					</div>
				))}
			</div>
		</div>
	);
};

export default MobileCatalog;
