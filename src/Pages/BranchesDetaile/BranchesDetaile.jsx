import { useNavigate, useParams } from 'react-router-dom';
import style from './BranchesDetaile.module.scss';
import { useEffect, useState } from 'react';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import IsSmallIcon from '../../assets/Icons/IsSmallIcon';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
// import markerIcon from "../../assets/Images/map.png";
import markerIcon from '../../assets/Images/mapp.png';
// import markerIcon from '../../assets/Images/mappp.png';
import L from 'leaflet';
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';
    
    const icon = L.icon({
        iconUrl: markerIcon,
        iconSize: [50, 90],
    });

export default function BranchesDetaile() {
	const [branchDetailData, setBranchDetailData] = useState();
	const navigate = useNavigate();
	const { id } = useParams();
	const getBranchDetailData = async (id) => {
		try {
			const resData = await santral.api().get(urls.branchesDetaile(id));
			setBranchDetailData(resData.data.data);
		} catch (error) {
			console.log('branch detail page error=', error);
		}
	};

	useEffect(() => {
		getBranchDetailData(id);
	}, [id]);

    console.log('branches detail data=', branchDetailData);
    const videoUrl = branchDetailData?.videoUrl;
    const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
    
    const getYouTubeEmbedUrl = (url) => {
      if (url.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
      }
      if (url.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
      }
      return null;
    };

	function decodeHTMLEntities(text) {
		const txt = document.createElement('textarea');
		txt.innerHTML = text;
		return txt.value;
	}
	return (
		<>
			<HelmetAsync title={branchDetailData?.title} />
			<div id={style.branchesDetailePage}>
				<div className="container">
					<div className={style.branchInfoAndMap}>
						<div className={style.branchInfo}>
							<div className={style.backIconAndBrancName}>
								<span
									onClick={() => navigate('/branches')}
									className={style.backIcon}
								>
									<IsSmallIcon />
								</span>
								<h4 className={style.brancName}>
									{branchDetailData?.title}
								</h4>
							</div>
							{branchDetailData?.desc &&
								(() => {
									const parts = branchDetailData.desc
										.split(/<\/?p>/)
										.filter(Boolean)
										.map((item) => item.trim())
										.filter(
											(item) => item !== '&nbsp;' && item !== '',
										);

									return (
										<>
											<div className={style.address}>
												{decodeHTMLEntities(parts[0])}
											</div>

											{parts.slice(1).map((text, idx) => (
												<p key={idx}>
													{decodeHTMLEntities(text)}
												</p>
											))}
										</>
									);
								})()}
							<div className={style.location}>
								<b>Ünvan:</b> {branchDetailData?.address}
							</div>
						</div>
						{branchDetailData?.lat && branchDetailData?.lng && (
							<div className={style.map}>
								<MapContainer
									style={{
										width: '100%',
										height: '100%',
										zIndex: '5',
										objectFit: 'cover',
										borderRadius: '14px',
									}}
									center={[branchDetailData.lat, branchDetailData.lng]}
									zoom={18}
									scrollWheelZoom={true}
								>
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<Marker
										position={[
											branchDetailData.lat,
											branchDetailData.lng,
										]}
										icon={icon}
									/>
								</MapContainer>
							</div>
						)}
					</div>
					<div className={style.ImgVideo}>
						<div className={style.video}>
							{isYouTube ? (
								<iframe
									src={getYouTubeEmbedUrl(videoUrl)}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							) : (
								<video controls>
									<source src={videoUrl} type="video/mp4" />
								</video>
							)}
						</div>
						<div className={style.img}>
							<img
								src={`${santral.baseUrlImage}${branchDetailData?.image}`}
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
