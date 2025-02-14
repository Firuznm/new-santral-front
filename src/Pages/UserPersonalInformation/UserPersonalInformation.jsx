import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./UserPersonalInformation.module.scss"


export default function UserPersonalInformation() {
  return (
     <div className="container">
        <div className={style.userPersonalInformationPage}>
        <UserAccoundAndOtherDetailName/>
        <div className={style.userInfoForm}>
            user info
        </div>
        </div>
     </div> 
  )
}
  