import { Link } from "react-router-dom"
import Input from "../../components/Input/Input"
import style from "./EnterSiteHeader.module.scss"
import CloseIcon from "../../assets/Icons/CloseIcon"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "../../components/Button/Button"

export default function EnterSiteHeader({handleCloseOpenEnterSite}) {

 
      const {values,handleChange,handleSubmit,resetForm, errors}= useFormik({
        initialValues: {
          email: '',
          password:""
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email("Doğru email unvanı daxil edin").required("Emila ünvanını doldurun"),
            password:Yup.string().max(14,"Şifrə 5 sinvoldan cox ola bilməz").required("Şifrə xanasını doldurun")
        }),
        onSubmit: values => {
          alert("istifadekinin melumatlari= " + JSON.stringify(values, null, 2));
        resetForm()
        },
      });
    
      
    const enterInputData=[
        {
            id:1,
            name:"email",
            labelName:"E-mail",
            placeholder:"E-mail daxil edin",
            inputType:"email",
            value:values.email,
            errorMessage:errors.email,
            handleChange:handleChange
        },
        {
            id:2,
            name:"password",
            labelName:"Şifrə",
            placeholder:"****",
            inputType:"password",
            value:values.password,
            errorMessage:errors.password,
            handleChange:handleChange
        }
    ]

  return (
       <div className={style.enterArea} onClick={(e) => e.stopPropagation()}>
    <span onClick={handleCloseOpenEnterSite} className={style.enterAreaCloseBtn}><CloseIcon/></span>
   <form onSubmit={handleSubmit}>
    {
    enterInputData?.map(item=>(
        <Input key={item.id} inputInfo={item}/>
    ))
    }
    <Link to={"forgot-password"} onClick={handleCloseOpenEnterSite} className={style.parolForgotten}>Şifrəni unutmusunuz?</Link>
      <Button title={"Daxil ol"}/>
    </form>
    <span className={style.donotAccount}>Hesabınız yoxdur?</span>
    <Link to={"registration"} onClick={handleCloseOpenEnterSite} className={style.LinkSignUp}>Qeydiyyatdan keç</Link>
    </div>
  ) 
}
