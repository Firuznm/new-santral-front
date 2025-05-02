import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import HeaderNew from '../components/HeaderNew/HeaderNew'
// import Header from '../components/HeaderOld/Header'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllApiBaskets } from '../redux/BasketSlice';



export default function Layouts() {
		const dispatch = useDispatch();
		const { isLogin } = useSelector((state) => state.userInfo);

		useEffect(() => {
			if (isLogin) {
				dispatch(GetAllApiBaskets());
			}
		}, [isLogin]);
	
  return (
	  <>
		  {/* <Header /> */}
		<HeaderNew/>
		  <Outlet />
		  <ScrollToTop/>
		  {/* <Footer/> */}
	</>
  )
}
