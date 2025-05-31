import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import style from './SearchResult.module.scss';
import { useEffect} from 'react';
import ProductCart from '../../components/ProductCart/ProductCart';
import Pagination from '../../components/Pagination/Pagination';
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';

export default function SearchResult() {
	const {
		searchFunc,
		searchQueryFunc,
		searchQueryData,
		searchLoading
	} = useSearch();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('searchValue');
	

useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    searchQueryFunc(searchQuery,page);
}, [searchQuery, searchParams]);
	
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},[searchQuery])
	
	return (
		<>
			<HelmetAsync title={`Axtarış = ${searchQuery}`}/>
			<section id={style.searchResultPage}>
				<div className="container">
					{searchQueryData?.data?.length > 0 && (
						<div className={style.searchProductTitleAndCount}>
							<span className={style.searchProduct}>{searchQuery}</span>
							{
								<span className={style.searchPrCount}>
									({searchQueryData?.pagination?.count})
								</span>
							}
						</div>
					)}
					<div className={style.searchResultArea}>
						{searchQueryData?.data?.length > 0 ? (
							<div className={style.searchResult}>
								{searchQueryData?.data?.map((item) => (
									<ProductCart key={item.id} data={item} />
								))}
							</div>
						) : (
							<div>
								{searchLoading ? (
									<span className={style.freeLoading}></span>
								) : (
									<div className={style.noSearchProduct}>
										<span className={style.searchValue}>
											{searchQuery}
										</span>
										adında məhsul yoxdur
									</div>
								)}
							</div>
						)}
					</div>
					<Pagination
						func={(page) => searchFunc(page)}
						paginationData={searchQueryData?.pagination}
					/>
				</div>
			</section>
		</>
	);
}
