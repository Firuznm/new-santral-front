import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import HeaderNew from '../components/HeaderNew/HeaderNew'
import Header from '../components/HeaderOld/Header'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'



export default function Layouts() {
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
