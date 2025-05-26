import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';
import { useEffect } from 'react';
import IsBigIcon from '../../assets/Icons/IsBigIcon';

export default function Pagination({ func, paginationData }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;

	const handlePageClick = (event) => {
		const newPage = event.selected + 1;
		const newParams = new URLSearchParams(searchParams);
		newParams.set('page', newPage);
		setSearchParams(newParams);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		func(currentPage);
	}, [currentPage]);

	return (
		<div className="paginationWrapper">
			{paginationData?.pages > 1 && (
				<ReactPaginate
					className={'productsPagination'}
					breakLabel="..."
					nextLabel={<IsBigIcon color={"black"}/>}
					previousLabel="<"
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					pageCount={paginationData?.pages}
					forcePage={currentPage - 1}
					pageRangeDisplayed={2}
					marginPagesDisplayed={2}
				/>
			)}
		</div>
	);
}
