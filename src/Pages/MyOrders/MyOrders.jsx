import { useEffect, useState } from 'react';
import moment from 'moment';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import style from './MyOrders.module.scss';
import UserAccoundAndOtherDetailName from '../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName';
import MyOrdersSearchIcon from '../../assets/Icons/MyOrdersSearchIcon';
import DownUpIcon from '../../assets/Icons/DownUpIcon';

export default function MyOrders() {
	const [allOrders, setAllOrders] = useState([]); 
	const [filteredOrders, setFilteredOrders] = useState([]); 
	const [selectedPayment, setSelectedPayment] = useState('');
	const [selectedStatus, setSelectedStatus] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [sortConfig, setSortConfig] = useState({ key: '', order: 'asc' });

	const getMyOrdersPageData = async () => {
		try {
			const resData = await santral.api().post(urls.myOrdersPage);
			setAllOrders(resData.data?.data || []);
			setFilteredOrders(resData.data?.data || []);
		} catch (error) {
			console.log('my orders page', error);
		}
	};

	useEffect(() => {
		getMyOrdersPageData();
	}, []);

	// Filtr, axtarış və sıralama 
	useEffect(() => {
		let filteredData = allOrders.filter((order) => {
			const matchesPayment =
				selectedPayment === '' || order.payment.type === selectedPayment;
			const matchesStatus =
				selectedStatus === '' || order.status === selectedStatus;
			const matchesSearch =
				searchTerm === '' ||
				order.products.some(
					(product) =>
						product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						String(order.id).includes(searchTerm),
				);
			return matchesPayment && matchesStatus && matchesSearch;
		});

		// Sıralama
		if (sortConfig.key) {
			filteredData = [...filteredData].sort((a, b) => {
				let valueA, valueB;
				if (sortConfig.key === 'price') {
					valueA = a.products?.[0]?.price || 0;
					valueB = b.products?.[0]?.price || 0;
				} else if (sortConfig.key === 'total') {
					valueA = a.total?.total || 0;
					valueB = b.total?.total || 0;
				} else if (sortConfig.key === 'date') {
					valueA = new Date(a.createdAt).getTime();
					valueB = new Date(b.createdAt).getTime();
				}
				return sortConfig.order === 'asc' ? valueA - valueB : valueB - valueA;
			});
		}

		setFilteredOrders(filteredData);
	}, [selectedPayment, selectedStatus, searchTerm, sortConfig, allOrders]);

	// **Sıralama tərtibi dəyişmə funksiyası**
	const handleSort = (type) => {
		setSortConfig((prev) => ({
			key: type,
			order: prev.key === type && prev.order === 'asc' ? 'desc' : 'asc',
		}));
	};

	return (
		<div className="container">
			<div className={style.myOrdersPage}>
				<div className={style.compUserAccoundAndOtherDetailName}>
					<UserAccoundAndOtherDetailName />
				</div>
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
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>
						<div className={style.selects}>
							<select
								className={style.status}
								value={selectedPayment}
								onChange={(e) => setSelectedPayment(e.target.value)}
							>
								<option value="">Ödəniş üsulu</option>
								<option value="cash">cash</option>
								<option value="card">card</option>
							</select>

							<select
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
							>
								<option value="">Status</option>
								<option value="waiting_payment">waiting_payment</option>
								<option value="new">new</option>
								<option value="canceled">canceled</option>
								<option value="delivered">delivered</option>
							</select>
						</div>
					</div>
					<div className={style.tableWrapper}>
						<table>
							<thead>
								<tr>
									<th className={style.headerPrId}>Satış</th>
									<th className={style.headerPrNameAndImg}>
										Məhsulun adı və Şəkli
									</th>
									<th
										onClick={() => handleSort('price')}
										className={style.headerPrPrice}
									>
										Qiymət <DownUpIcon />
									</th>
									<th
										onClick={() => handleSort('total')}
										className={style.headerPrTotal}
									>
										Cəmi <DownUpIcon />
									</th>
									<th
										onClick={() => handleSort('date')}
										className={style.headerPrDate}
									>
										Tarix <DownUpIcon />
									</th>
									<th className={style.headerPrPayment}>
										Ödəniş üsulu
									</th>
									<th className={style.headerPrStatus}>Status</th>
								</tr>
							</thead>
							<tbody>
								{filteredOrders.map((item) => (
									<tr key={item.id}>
										<td className={style.bodyPrId}>{item.id}</td>
										<td className={style.bodyPrNamePriceWrapper}>
											{item?.products?.map((product) => (
												<div
													key={product.id}
													className={style.bodyPrImgNamePrice}
												>
													<div
														className={style.bodyPrNameAndImg}
													>
														{product.image && (
															<img
																src={`${santral.baseUrlImage}${product.image}`}
																className={
																	style.bodyPrImg
																}
															/>
														)}
														<div className={style.bodyPrName}>
															{product?.title}
														</div>
													</div>
													<span className={style.bodyPrPrice}>
														{product.price.toFixed(2)} ₼
													</span>
												</div>
											))}
										</td>
										<td className={style.bodyPrTotal}>
											{item?.total?.total.toFixed(2)} ₼
										</td>
										<td className={style.bodyPrDate}>
											{moment(item.createdAt).format(
												'DD.MM.YYYY HH:mm:ss',
											)}
										</td>
										<td className={style.bodyPrPayment}>
											{item.payment.type}
										</td>
										<td className={style.bodyPrStatus}>
											<span className={style.bodyPrstatusBtn}>
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
