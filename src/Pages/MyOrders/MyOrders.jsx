import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./MyOrders.module.scss"

export default function MyOrders() {
  return (
    <div className="container">
      <div className={style.myOrdersPage}>
      <UserAccoundAndOtherDetailName/>
      <div className={style.myOrdersContent}>
      order page
      </div>
    </div>
    </div>
  )
}
