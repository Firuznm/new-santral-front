import { useFormik } from "formik"
import Input from "../../components/Input/Input"
import style from "./Registration.module.scss"
import * as Yup from 'yup';
import Button from "../../components/Button/Button";

export default function Registration() {

  const {values,handleChange,handleSubmit,resetForm, errors}= useFormik({
         initialValues: {
          name:"",
          surname:"",
           email: '',
           number:"",
           password:"",
           confirmPassword:""
         },
         validationSchema:Yup.object().shape({
             name:Yup.string().required("Adınızı daxil edin"),
             surname:Yup.string().required("Soyadınızı daxil edin"),
             email:Yup.string().email("Doğru email ünvanı daxil edin").required("Emila ünvanını doldurun"),
             number:Yup.number().positive("Mənfi rəqəm olmaz !!!").integer("Tam rəqəm daxil edin").required("Nömrənizi daxil edin"),
             password:Yup.string().max(14,"Şifrə 14 sinvoldan cox ola bilməz").required("Şifrə xanasını doldurun"),
             confirmPassword:Yup.string().required("Təkrar şifrə xanasını doldurun").oneOf([Yup.ref("password", Yup.password)], "Şifrələr eyni deyil")
         }),
         onSubmit: values => {
         alert("istifadekinin melumatlari= " + JSON.stringify(values, null, 2));
         resetForm()
         },
       });

  const registrationInputData={
    nameSurname:[
      {
        id:1,
        name:"name",
        labelName:"Ad",
        placeholder:"Ad",
        inputType:"text",
        value:values.name,
        errorMessage:errors.name,
        handleChange:handleChange
    },
    {
        id:2,
        name:"surname",
        labelName:"Soyad",
        placeholder:"Soyad",
        inputType:"text",
        value:values.surname,
        errorMessage:errors.surname,
        handleChange:handleChange
    }
    ],
    emailNumber:[
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
        name:"number",
        labelName:"Mobil nömrə",
        placeholder:"Mobbil nömrə daxil edin",
        inputType:"number",
        value:values.number,
        errorMessage:errors.number,
        handleChange:handleChange
    }
    ],
    passwordConfirmPassword:[
      {
        id:1,
        name:"password",
        labelName:"Şifrə",
        placeholder:"Şifrə",
        inputType:"password",
        value:values.password,
        errorMessage:errors.password,
        handleChange:handleChange
    },
    {
        id:2,
        name:"confirmPassword",
        labelName:"Şifrə təkrar",
        placeholder:"Şifrə təkrar",
        inputType:"password",
        value:values.confirmPassword,
        errorMessage:errors.confirmPassword,
        handleChange:handleChange
    }
    ]
  }

  return (
    <div className={style.registrationPage}>
         <div className={style.registrationArea}>
       <h3 className={style.PageTitle}>Qeydiyyat</h3>
           <p className={style.pageWarning}>Qeydiyyatdan keçmək üçün zəhmət olmasa məlumatlarınızı doldurun </p>
   
          <form onSubmit={handleSubmit}>
            <div className={style.nameSurnameInput}>
              {
                registrationInputData?.nameSurname?.map(
                  inputData=>(
                  <Input key={inputData.id} inputInfo={inputData} inpAreaWidth={"50%"}/>
                  )
                )
              }
            </div>
            {
              registrationInputData?.emailNumber?.map(inputData=>(
                <Input key={inputData.id} inputInfo={inputData}/>
              ))
            }
            <div className={style.passwordConfirmPassword}>
              {
                registrationInputData?.passwordConfirmPassword?.map(inputData=>(
                  <Input key={inputData.id} inpAreaWidth={"50%"} inputInfo={inputData}/>
                ))
              }
            </div>
            <Button title={"Qeydiyyatdan keç"}/>
          </form>
          </div>
    </div>
  )
}
