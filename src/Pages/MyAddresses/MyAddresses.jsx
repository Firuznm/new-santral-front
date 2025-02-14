import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./MyAddresses.module.scss"


export default function MyAddresses() {
  return (
    <div className="container">
      <div className={style.myAddressesPageWrapper}>
      <UserAccoundAndOtherDetailName/>
      <div className={style.addresses}>
      my orders page
      </div>
      </div>
    </div>
  )
}
