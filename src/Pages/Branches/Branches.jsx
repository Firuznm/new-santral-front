import { useEffect, useState } from 'react';
import style from './Branches.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import markerIcon from '../../assets/Images/mapLocation.webp'; 
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
	iconUrl: markerIcon,
	iconSize: [40, 40],
});

const defaultPosition = [40.398766, 49.875762];

export default function Branches() {
	const [branchesAllDatas, setBranchesAllDatas] = useState([]);
	const [mapCenter, setMapCenter] = useState(defaultPosition);
	const [activeBranchIndex, setActiveBranchIndex] = useState(0);
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
									<span className={style.moreBtn}>Ətraflı</span>
								</div>
								<div className={style.address}>
									{branch?.address}
									<span
										onClick={() => onClickMarketAddress(branch)}
										className={style.locationBtn}
									>
										Xəriytədə baxın
									</span>
								</div>
							</div>
						))}
					</div>
					<div className={style.map}>
						<MapContainer
							style={{ width: '100%', height: '100%', zIndex: "5", objectFit: 'cover' }}
							center={mapCenter}
							zoom={16}
							
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
