import style from "./ResetPassword.module.scss"
import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName";

export default function ResetPassword() {
  return (
    <div className="container">
      <div className={style.resetPasswordPage}>
        <UserAccoundAndOtherDetailName/>
        <div className={style.resetPasswordForm}>
      reset password page
      </div>
      </div>
    </div>
  )
}
