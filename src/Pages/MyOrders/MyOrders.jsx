import UserAccoundAndOtherDetailName from '../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName';
import style from './MyOrders.module.scss';
import MyOrdersSearchIcon from '../../assets/Icons/MyOrdersSearchIcon';
import DownUpIcon from '../../assets/Icons/DownUpIcon';
import { useEffect, useState } from 'react';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import moment from 'moment';

export default function MyOrders() {
	const [myOrdersPageData, setMyOrdersPageData] = useState();

	const getMyOrdersPageData = async () => {
		try {
			const resData = await santral.api().post(urls.myOrdersPage);
			setMyOrdersPageData(resData.data);
		} catch (error) {
			console.log('my orders page', error);
		}
	};
	useEffect(() => {
		getMyOrdersPageData();
	}, []);
	console.log('my order page data=', myOrdersPageData);

const [sortConfig, setSortConfig] = useState({ key: '', order: 'asc' });

const handleSort = (type) => {
	const sortedData = [...myOrdersPageData.data];

	const newOrder =
		sortConfig.key === type && sortConfig.order === 'asc' ? 'desc' : 'asc';

	sortedData.sort((a, b) => {
		let valueA, valueB;

		if (type === 'price') {
			valueA = a.products?.[0]?.price || 0;
			valueB = b.products?.[0]?.price || 0;
		} else if (type === 'total') {
			valueA = a.total?.total || 0;
			valueB = b.total?.total || 0;
		} else if (type === 'date') {
			valueA = new Date(a.createdAt).getTime();
			valueB = new Date(b.createdAt).getTime();
		}
		return newOrder === 'asc' ? valueA - valueB : valueB - valueA;
	});
	setSortConfig({ key: type, order: newOrder });
	setMyOrdersPageData({ ...myOrdersPageData, data: sortedData });
};



	return (
		<div className="container">
			<div className={style.myOrdersPage}>
				<UserAccoundAndOtherDetailName />
				<div className={style.myOrdersContentWrapper}>
					<div className={style.pageHeader}>
						<div className={style.pageTitleAndSearchInp}>
							<h3 className="sectionTitle">Sifarişlərim</h3>
							<div className={style.search}>
								<label htmlFor="myOrderSearch">
									<MyOrdersSearchIcon />
								</label>
								<input
									type="text"
									id="myOrderSearch"
									placeholder="Məhsulun adı və ya nömrəsi"
									className={style.myOrderSearch}
								/>
							</div>
						</div>
						<div className={style.selects}>
							<select className={style.status} name="" id="">
								<option value="test1">Status 1</option>
								<option value="test2">Status 2</option>
								<option value="test3">Status 3</option>
								<option value="test4">Status 4</option>
							</select>

							<select name="" id="">
								<option value="payment1">Online</option>
								<option value="payment2">Cart</option>
								<option value="payment3">Payment</option>
							</select>
						</div>
					</div>
					<div className={style.tableWrapper}>
						<table>
							<thead>
								<tr>
									<th className={style.prId}>Satış</th>
									<th className={style.prNameAndImg}>
										Məhsulun adı və Şəkli
									</th>

									<th
										onClick={() => handleSort('price')}
										className={style.prPrice}
									>
										Qiymət <DownUpIcon />
									</th>
									<th
										onClick={() => handleSort('total')}
										className={style.prTotal}
									>
										Cəmi <DownUpIcon />
									</th>
									<th
										onClick={() => handleSort('date')}
										className={style.prDate}
									>
										Tarix <DownUpIcon />
									</th>
									<th className={style.prPayment}>Ödəniş üsulu</th>
									<th className={style.prStatus}>Status</th>
								</tr>
							</thead>
							<tbody>
								{myOrdersPageData?.data?.map((item) => (
									<tr key={item.id}>
										<td className={style.prId}>{item.id}</td>
										<td className={style.prNamePriceWrapper}>
											{item?.products?.map((product) => (
												<div
													key={product.id}
													className={style.prImgNamePrice}
												>
													<div className={style.prNameAndImg}>
														{product.image && (
															<img
																src={`${santral.baseUrlImage}${product.image}`}
																className={style.prImg}
															/>
														)}
														<div className={style.prName}>
															{product?.title}
														</div>
													</div>
													<span className={style.prPrice}>
														{product.price.toFixed(2)} ₼
													</span>
												</div>
											))}
										</td>
										<td className={style.prTotal}>
											{item?.total?.total.toFixed(2)} ₼
										</td>
										<td className={style.prDate}>
											{moment(`${item.createdAt}`).format(
												'DD.MM.YYYY/HH:mm:ss',
											)}
										</td>
										<td className={style.prPayment}>
											{item.payment.type}
										</td>
										<td className={style.prStatus}>
											<span className={style.statusBtn}>
												{item.status}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
