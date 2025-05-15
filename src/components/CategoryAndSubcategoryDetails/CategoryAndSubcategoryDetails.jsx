import { useEffect, useState } from 'react';
import style from './CategoryAndSubcategoryDetails.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import { useParams } from 'react-router-dom';

import ProductCart from '../ProductCart/ProductCart';
import Filter from '../Filter/Filter';
import MobileFilterIcon from '../../assets/Icons/MobileFilterIcon';

export default function CategoryAndSubcategoryDetails() {
	const { '*': slug } = useParams();
    const [mobileFilterShowHidden, setMobileFilterShowHidden] = useState(false)
	const [categoryDetailsFilterDatas, setCategoryDetailsFilterDatas] = useState([]);
	const [categoryDetailsData, setCategoryDetailsData] = useState([]);
	const [categorySlugData, setCategorySlugData] = useState([]);

	const handleMobileFilterArea = () => {
		setMobileFilterShowHidden(!mobileFilterShowHidden)
	}

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
    // const [visibleIndicators, setVisibleIndicators] = useState({});


	// const onClickTitleShowHiddenIndicators = (id) => {
	// 	setVisibleIndicators((prevState) => ({
	// 		...prevState,
	// 		[id]: !prevState[id],
	// 	}));
	// };

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [categoryDetailsData]);
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
						<div className={style.prSortWeb}>
							<span className={style.sortBtn}>A-dan Z-yə</span>
							<span className={style.sortBtn}>Z-dən A-ya</span>
							<span className={style.sortBtn}>Ucuzdan bahaya</span>
							<span className={style.sortBtn}>Bahadan ucuza</span>
						</div>
							 <div className={`${style.mobilefilter} ${mobileFilterShowHidden ? "":style.noFilterArea}`}>
								<Filter data={categoryDetailsFilterDatas} onClickFunk={handleMobileFilterArea} />
							</div>
						<div className={style.mobileSortAndMobileFilter}>
							<select className={style.prSortMobile} name="" id="">
								<option value="">A-dan Z-yə</option>
								<option value="">Z-dən A-ya</option>
								<option value="">Ucuzdan bahaya</option>
								<option value="">Bahadan ucuza</option>
							</select>
							<div onClick={handleMobileFilterArea} className={style.mobileFilterBtn}>
								<MobileFilterIcon /> Filter
							</div>
						</div>
					</div>
					<div className={style.filterAndCategoryFilterResultArea}>
						<div className={style.webFilterAreaWrapper}>
							<Filter data={categoryDetailsFilterDatas} />
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
