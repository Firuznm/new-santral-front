import { useDispatch, useSelector } from "react-redux";
import TrashIconBasket from "../../assets/Icons/TrashIconBasket";
import SectionTitle from "../../components/SectionTitle/SectionTitle"
import style from "./FavoriteItems.module.scss"
import ProductCart from "../../components/ProductCart/ProductCart";
import { removeAllFavoriteItems } from "../../redux/FavoriteItemsSlice";

export default function FavoriteItems() {
    const dispatch = useDispatch()
    const { favoriteItemsList } = useSelector((state) => state.favoriteItemsData);
  
    return (
		<section id={style.favoriteItemsPage}>
			{favoriteItemsList?.length !== 0 ? (
				<div className="container">
					<div className={style.favoriteItemsPageHeader}>
						<SectionTitle title={'Seçilmişlər'} />
						<span
							onClick={() => dispatch(removeAllFavoriteItems())}
							className={style.removeAllFavoriteItems}
						>
							<TrashIconBasket />
							Hamısını sil
						</span>
					</div>
					<div className={style.favoriteItemsList}>
						{favoriteItemsList.length > 0 &&
							favoriteItemsList?.map((product) => (
								<ProductCart data={product} key={product.id} />
							))}
					</div>
				</div>
			) : (
				<div className={style.noFavoriteItems}>Seçilmiş məhsul yoxdur</div>
			)}
		</section>
	);
}
