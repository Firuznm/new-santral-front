import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import style from './SearchResult.module.scss';
import { useEffect } from 'react';

export default function SearchResult() {
	const { searchResult, searchFunc } = useSearch();
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('searchValue');

	useEffect(() => {
		searchFunc(searchQuery);
	}, [searchQuery]);

	console.log('test searc result=', searchResult);

	return (
		<section id={style.searchResultPage}>
			<div className="container">
				<div className={style.searchResult}></div>
			</div>
		</section>
	);
}
