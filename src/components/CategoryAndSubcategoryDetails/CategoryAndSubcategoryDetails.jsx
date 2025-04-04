import { useEffect, useState } from 'react';
import style from './CategoryAndSubcategoryDetails.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import { useParams } from 'react-router-dom';
import GoldMinusIcon from '../../assets/Icons/GoldMinusIcon';
import GoldPlusIcon from '../../assets/Icons/GoldPlusIcon';
import ProductCart from '../ProductCart/ProductCart';

export default function CategoryAndSubcategoryDetails() {
	const { '*': slug } = useParams();

	const [categoryDetailsFilterDatas, setCategoryDetailsFilterDatas] = useState([]);
	const [categoryDetailsData, setCategoryDetailsData] = useState([]);
	const [categorySlugData, setCategorySlugData] = useState([]);

	const getCategoryDetailsDatas = async () => {
		try {
			const categorySlug = await santral.api().get(urls.categorySlug(slug));
			setCategorySlugData(categorySlug.data);
			const lookupId = categorySlug?.data?.route?.lookupId;
			const [data1, data2] = await Promise.all([
				santral.api().post(urls.categoryDetailsFilter(lookupId)),
				santral.api().post(urls.categoryDetails(lookupId)),
			]);
			setCategoryDetailsFilterDatas(data1.data.data);
			setCategoryDetailsData(data2.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getCategoryDetailsDatas();
	}, [slug]);
	// console.log('filter data=', categoryDetailsFilterDatas);
	// console.log("detail=", categoryDetailsData);
	// console.log("slug=", categorySlugData);
    const [visibleIndicators, setVisibleIndicators] = useState({});
    useEffect(() => {
       window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
    },[categoryDetailsData])

	const onClickTitleShowHiddenIndicators = (id) => {
		setVisibleIndicators((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};
	return (
		<>
			{categoryDetailsData?.pagination?.count === 0 ? (
				<div className={style.noProduct}>Məhsul yoxdu</div>
			) : (
				<div style={{ paddingTop: '1rem' }} className="container">
					<div className={style.categoryTitlePrSort}>
						<div className={style.categoryTitleAndPrCount}>
							<h4 className={style.categoryTitle}>
								{categorySlugData?.route?.title}
							</h4>
							{categoryDetailsData?.pagination?.count && (
								<span className={style.prCount}>
									({categoryDetailsData?.pagination?.count} məhsul)
								</span>
							)}
						</div>
						<div className={style.prSort}>
							<span className={style.sortBtn}>A-dan Z-yə</span>
							<span className={style.sortBtn}>Z-dən A-ya</span>
							<span className={style.sortBtn}>Ucuzdan bahaya</span>
							<span className={style.sortBtn}>Bahadan ucuza</span>
						</div>
					</div>
					<div className={style.filterAndCategoryFilterResultArea}>
						<div className={style.filterAreaWrapper}>
							<div
								className={`${style.filterArea} ${
									categoryDetailsFilterDatas.length > 9
										? style.scrollHeight
										: ''
								}`}
							>
								{categoryDetailsFilterDatas?.map((item) => (
									<div key={item.id}>
										<div
											onClick={() =>
												onClickTitleShowHiddenIndicators(item.id)
											}
											className={style.titleAndIcon}
										>
											{item.title}
											<span className={style.plusMinusIcon}>
												{visibleIndicators[item.id] ? (
													<GoldMinusIcon />
												) : (
													<GoldPlusIcon />
												)}
											</span>
										</div>
										{visibleIndicators[item.id] && (
											<div className={style.categoryIndicators}>
												<span style={{ display: 'block' }}>
													test 1
												</span>
												<span style={{ display: 'block' }}>
													test 2
												</span>
												<span style={{ display: 'block' }}>
													test 3
												</span>
											</div>
										)}
									</div>
								))}
								{/* <div className={style.inpCheckboxWrapper}>
								<input type="checkbox" id="1" />
								<label htmlFor="1">Brend</label>
							</div>
							<div className={style.inpCheckboxWrapper}>
								<input type="checkbox" id="2" />
								<label htmlFor="2">olcu</label>
							</div>
							<div className={style.inpCheckboxWrapper}>
								<input type="checkbox" id="3" />
								<label htmlFor="3">reng</label>
							</div> */}
							</div>
						</div>
						<div className={style.productsArea}>
							{categoryDetailsData?.data?.map((product) => (
								<ProductCart data={product} key={product.id} />
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
