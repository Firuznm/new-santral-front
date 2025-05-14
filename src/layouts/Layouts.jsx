import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import HeaderNew from '../components/HeaderNew/HeaderNew'
// import Header from '../components/HeaderOld/Header'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllApiBaskets } from '../redux/BasketSlice';
import { authMe, logout } from '../redux/userSlice';



export default function Layouts() {
	
		const dispatch = useDispatch();
		const { isLogin, authMeUser } = useSelector((state) => state.userInfo);

		useEffect(() => {
			if (isLogin) {
				dispatch(GetAllApiBaskets());
			}
		}, [isLogin]);  
	
	
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(authMe());
		}
	}, []);

	useEffect(() => {
		if (authMeUser.error === "Invalid Token") {
		dispatch(logout())
	}	
	},[])
	
  return (
	  <>
		  {/* <Header /> */}
		<HeaderNew/>
		  <Outlet />
		  <ScrollToTop/>
		  <Footer/>
	</>
  )
}
