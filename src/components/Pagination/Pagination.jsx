import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import "./Pagination.css"
import { useEffect} from 'react';

export default function Pagination({ func, paginationData }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;

	const handlePageClick = (event) => {
		const newPage = event.selected + 1;
		setSearchParams({ page: newPage });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		func(currentPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [currentPage,searchParams]);
	return (
		<div className="paginationWrapper">
			{paginationData?.pages > 1 && (
				<ReactPaginate
					className={'productsPagination'}
					breakLabel="..."
					nextLabel=">"
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
