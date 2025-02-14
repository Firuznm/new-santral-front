import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import style from "./ForgotYourPassword.module.scss"
import * as Yup from 'yup';
import Button from "../../components/Button/Button";

export default function ForgotYourPassword() {

       const {values,handleChange,handleSubmit,resetForm, errors}= useFormik({
            initialValues: {
              email: ''
            },
            validationSchema:Yup.object().shape({
                email:Yup.string().email("Doğru email unvanı daxil edin").required("Emila ünvanını doldurun"),
            }),
            onSubmit: values => {
              alert("istifadekinin melumatlari= " + JSON.stringify(values, null, 2));
            resetForm()
            },
          });

          const ForgotYourPasswordInpData={
            id:1,
            name:"email",
            labelName:"E-mail",
            placeholder:"E-mail daxil edin",
            inputType:"email",
            value:values.email,
            errorMessage:errors.email,
            handleChange:handleChange
        }


  return (
    <div className={style.forgotYourPasswordWrapper}>
        <div className={style.forgotYourPasswordArea}>
      <h3 className={style.PageTitle}>Şifrəni unutmusuz?</h3>
      <p className={style.pageWarning}>Yeni şifrə almaq üçün mailnizi daxil edin. Yeni şifrəniz mail hesabına göndəriləcək</p>
      <form onSubmit={handleSubmit}>
      <Input key={ForgotYourPasswordInpData.id} inputInfo={ForgotYourPasswordInpData}/>
      <Button title={"Göndər"}/>
      </form>
    </div>
    </div>
  )
}
