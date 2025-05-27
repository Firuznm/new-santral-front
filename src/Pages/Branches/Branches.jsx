import { useEffect, useState } from 'react';
import style from './Branches.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
// import markerIcon from '../../assets/Images/map.png'; 
import markerIcon from '../../assets/Images/mapp.png'; 
// import markerIcon from '../../assets/Images/mappp.png'; 
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

const icon = L.icon({
	iconUrl: markerIcon,
	iconSize: [80, 100],
});

const defaultPosition = [40.428180089238154, 49.89273548126221];

export default function Branches() {
	const [branchesAllDatas, setBranchesAllDatas] = useState([]);
	const [mapCenter, setMapCenter] = useState(defaultPosition);
	const [activeBranchIndex, setActiveBranchIndex] = useState(1);
	const [map, setMap] = useState(null);

	const getAllBranchesData = async () => {
		try {
			const resData = await santral.api().post(urls.branches);
			setBranchesAllDatas(resData.data);
		} catch (error) {
			console.log('all branches data error', error);
		}
	};

	useEffect(() => {
		getAllBranchesData();
	}, []);
console.log("branches all data=", branchesAllDatas);

	const onClickMarketAddress = (item) => {
		setActiveBranchIndex(item.id);
		setMapCenter([item.lat, item.lng]);
		map.setView([item.lat, item.lng], map.getZoom(), {
			animate: true,
			duration: 1,
		});
	};  

	return (
		<section id={style.branchesPage}>
			<div className="container">
				<div className={style.branchesAndMap}>
					<div className={style.branches}>
						{branchesAllDatas?.data?.map((branch) => (
							<div className={style.branchWrapper} key={branch.id}>
								<div className={style.branchTitle}>
									{branch.title}
									<Link
										to={`/branches/${branch.id}`}
										className={style.moreBtn}
									>
										Ətraflı
									</Link>
								</div>
								<div className={style.address}>
									{branch?.address}
									<span
										onClick={() => onClickMarketAddress(branch)}
										className={`${style.locationBtn} ${activeBranchIndex === branch.id ? style.activeIndex : ""}`}
									>
										Xəritədə bax
									</span>
								</div>
							</div>
						))}
					</div>
					<div className={style.map}>
						<MapContainer
							style={{
								width: '100%',
								height: '100%',
								zIndex: '5',
								objectFit: 'cover',
								borderRadius:"10px"
							}}
							center={mapCenter}
							zoom={18}
							scrollWheelZoom={true}
							ref={setMap}
						>
							<TileLayer
								attribution='&copy;
                     <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={mapCenter} icon={icon}></Marker>
						</MapContainer>
					</div>
				</div>
			</div>
		</section>
	);
}
