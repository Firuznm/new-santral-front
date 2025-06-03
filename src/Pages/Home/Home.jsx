import { useEffect, useState } from 'react';
import HomeCategorySlider from '../../components/HomeSection/HomeCategorySlider/HomeCategorySlider';
// import ProductCart from '../../components/ProductCart/ProductCart';
import HomeSeasonOffers from '../../components/HomeSection/HomeSeasonOffers/HomeSeasonOffers';
import HomeBanner from '../../components/HomeSection/HomeBanner/HomeBanner';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
// import NewsCart from '../../components/NewsCart/NewsCart';
import HomePartners from '../../components/HomeSection/HomeParners/HomePartners';
// import HomeNews from '../../components/HomeSection/HomeNews/HomeNews';
import HomeBrands from '../../components/HomeSection/HomeBrands/HomeBrands';
import HomeMainSlider from '../../components/HomeSection/HomeMainSlider/HomeMainSlider';
import HomeNewComers from '../../components/HomeSection/HomeNewComers/HomeNewComers';
import OurAdvantages from '../../components/HomeSection/OurAdvantages/OurAdvantages';
import HomeDiscountedProducts from '../../components/HomeSection/HomeDiscountedProducts/HomeDiscountedProducts';
// import Input from '../../components/Input/Input';
// import { useSelector } from 'react-redux';
// import { useSearch } from '../../context/SearchContext';
// import ProductCartNew from "../../components/ProductCartNew/ProductCartNew";

export default function Home() {
	const [homeDiscountedDatas, setHomeDiscountedDatas] = useState([]);
	const [homeMainSliderDatas, setHomeMainSliderDatas] = useState([]);
	const [homeBrandsData, setHomeBrandsData] = useState([]);
	const [homePartnersData, setHomePartnersData] = useState();
	const [categoryDatas, setCategoryDatas] = useState([]);
	const [homeBannersData, setHomeBannersData] = useState({});
	const [homeNews, setHomeNews] = useState([]);
	const [homeSeasonOffersData, setHomeSeasonOffersData] = useState([]);

	const getHomeAllData = async () => {
		try {
			const [
				homeMainSlider,
				homeDiscountedDatas,
				homePartnersData,
				homeBrandsData,
				categoryDatas,
				homeBannersData,
				homeNews,
				homeSeasonOffersData,
			] = await Promise.all([
				santral.api().post(urls.homeMainSlider),
				santral.api().post(urls.homeDiscounted),
				santral.api().post(urls.homePartners),
				santral.api().post(urls.homeBrands),
				santral.api().post(urls.catalog),
				santral.api().post(urls.banners),
				santral.api().post(urls.news),
				santral.api().post(urls.homeSeasonOffers),
			]);
			setHomeMainSliderDatas(homeMainSlider.data.data);
			setHomeDiscountedDatas(homeDiscountedDatas.data.data);
			setHomePartnersData(homePartnersData.data.data);
			setHomeBrandsData(homeBrandsData.data.data);
			setCategoryDatas(categoryDatas.data.data);
			setHomeBannersData(homeBannersData.data.data);
			setHomeNews(homeNews.data.data);
			setHomeSeasonOffersData(homeSeasonOffersData.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getHomeAllData();
	}, []);

	return (
		<div className="container">
			<HomeMainSlider />
			<HomeDiscountedProducts discountData={homeDiscountedDatas} />
			<HomeBanner data={homeBannersData} />

			<HomeCategorySlider homeCategorySliderData={categoryDatas} />
			{/* <HomeNews newsData={homeNews} /> */}
			<HomeNewComers data={categoryDatas} />
			<HomeBrands brandsData={homeBrandsData} />
			<HomePartners PartnersData={homePartnersData} />
			<OurAdvantages />
			<HomeSeasonOffers seasonOffersData={homeSeasonOffersData} />
		</div>
	);
}
