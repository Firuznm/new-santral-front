import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import HeaderNew from '../components/HeaderNew/HeaderNew'
import Header from '../components/HeaderOld/Header'



export default function Layouts() {
  return (
	  <>
		  {/* <Header /> */}
		<HeaderNew/>
		  <Outlet />
		  {/* <Footer/> */}
	</>
  )
}
