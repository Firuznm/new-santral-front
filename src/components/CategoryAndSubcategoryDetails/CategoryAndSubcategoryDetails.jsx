import { useEffect, useState } from 'react';
import style from './CategoryAndSubcategoryDetails.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductCart from '../ProductCart/ProductCart';
import Filter from '../Filter/Filter';
import MobileFilterIcon from '../../assets/Icons/MobileFilterIcon';
import Pagination from '../Pagination/Pagination';

export default function CategoryAndSubcategoryDetails() {
	const { '*': slug } = useParams();
	const [mobileFilterShowHidden, setMobileFilterShowHidden] = useState(false);
	const [categoryDetailsFilterDatas, setCategoryDetailsFilterDatas] = useState([]);
	const [categoryDetailsData, setCategoryDetailsData] = useState([]);
	const [categorySlugData, setCategorySlugData] = useState([]);
	const [sortType, setSortType] = useState('');
	const [filterBody, setFilterBody] = useState({ filter: {} });
	const [searchParams, setSearchParams] = useSearchParams();

	const handleMobileFilterArea = () => {
		setMobileFilterShowHidden(!mobileFilterShowHidden);
	};

	const onCheckInput = (itemId, optionId, isChecked) => {
		const newFilter = Object.create(filterBody);
		if (!newFilter.filter[`param_${itemId}`])
			newFilter.filter[`param_${itemId}`] = [];
		if (isChecked) newFilter.filter[`param_${itemId}`].push(optionId);
		else {
			const index = newFilter.filter[`param_${itemId}`].indexOf(optionId);
			if (index > -1) {
				newFilter.filter[`param_${itemId}`].splice(index, 1);
			}
		}
		setFilterBody({ filter: newFilter.filter });
	};

	const getCategoryDetailsDatas = async (page = 1, sort = sortType) => {
		try {
			const categorySlug = await santral.api().get(urls.categorySlug(slug));
			setCategorySlugData(categorySlug.data);
			const lookupId = categorySlug?.data?.route?.lookupId;

			const [data1, data2] = await Promise.all([
				santral.api().post(urls.categoryDetailsFilter(lookupId), filterBody),
				santral
					.api()
					.post(urls.categoryDetails(lookupId, page, sort), filterBody),
			]);

			setCategoryDetailsFilterDatas(data1.data.data);
			setCategoryDetailsData(data2.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const sortQuery = searchParams.get('sort') || '';
		const pageQuery = parseInt(searchParams.get('page')) || 1;

		setSortType(sortQuery);
		getCategoryDetailsDatas(pageQuery, sortQuery);
	}, [slug, searchParams]);

	useEffect(() => {
		if (Object.keys(filterBody.filter).length > 0) {
			getCategoryDetailsDatas(1, sortType);
		}
	}, [filterBody]);

	const handleSortChange = (value) => {
		setSortType(value);
		const newParams = new URLSearchParams(searchParams);
		newParams.set('sort', value);
		newParams.set('page', 1);
		setSearchParams(newParams);

		getCategoryDetailsDatas(1, value);
	};

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
							<span
								className={`${style.sortBtn} ${
									sortType === 'az' ? style.active : ''
								}`}
								onClick={() => handleSortChange('az')}
							>
								A-dan Z-yə
							</span>
							<span
								className={`${style.sortBtn} ${
									sortType === 'za' ? style.active : ''
								}`}
								onClick={() => handleSortChange('za')}
							>
								Z-dən A-ya
							</span>
							<span
								className={`${style.sortBtn} ${
									sortType === 'chp' ? style.active : ''
								}`}
								onClick={() => handleSortChange('chp')}
							>
								Ucuzdan bahaya
							</span>
							<span
								className={`${style.sortBtn} ${
									sortType === 'exp' ? style.active : ''
								}`}
								onClick={() => handleSortChange('exp')}
							>
								Bahadan ucuza
							</span>
						</div>

						<div
							className={`${style.mobilefilter} ${
								mobileFilterShowHidden ? '' : style.noFilterArea
							}`}
						>
							<Filter
								data={categoryDetailsFilterDatas}
								onCheckInput={onCheckInput}
								onClickFunk={handleMobileFilterArea}
							/>
						</div>

						<div className={style.mobileSortAndMobileFilter}>
							<select
								className={style.prSortMobile}
								onChange={(e) => handleSortChange(e.target.value)}
								value={sortType}
							>
								<option value="az">A-dan Z-yə</option>
								<option value="za">Z-dən A-ya</option>
								<option value="chp">Ucuzdan bahaya</option>
								<option value="exp">Bahadan ucuza</option>
							</select>
							<div
								onClick={handleMobileFilterArea}
								className={style.mobileFilterBtn}
							>
								<MobileFilterIcon /> Filter
							</div>
						</div>
					</div>

					<div className={style.filterAndCategoryFilterResultArea}>
						<div className={style.webFilterAreaWrapper}>
							<Filter
								data={categoryDetailsFilterDatas}
								onCheckInput={onCheckInput}
							/>
						</div>
						<div className={style.productsAndPagination}>
							<div className={style.productsArea}>
								{categoryDetailsData?.data?.map((product) => (
									<ProductCart data={product} key={product.id} />
								))}
							</div>
							<Pagination
								func={(page) => getCategoryDetailsDatas(page, sortType)}
								paginationData={categoryDetailsData.pagination}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
