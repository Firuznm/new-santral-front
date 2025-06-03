 import { useFormik } from "formik";
import Input from "../../components/Input/Input";
import style from "./ForgotYourPassword.module.scss"
import * as Yup from 'yup';
import ButtonAndArrow from "../../components/ButtonAndArrow/ButtonAndArrow";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
  
export default function ForgotYourPassword() {

       const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
			initialValues: {
				email: '',
			},
			validationSchema: Yup.object().shape({
				email: Yup.string()
					.email('Doğru email unvanı daxil edin')
					.required('Emila ünvanını doldurun'),
			}),

			onSubmit: async (values) => {
				try {
          await santral.api().post(urls.forgotYourPassword, JSON.stringify(values));
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						title: <strong>{'Daxil etdiyiniz məlumatlar göndərildi'}</strong>,
						html: <i>{'Təşəkkür edirik'}</i>,
						icon: 'success',
					});
					resetForm();
				} catch (error) {
					console.log(error);
					  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Xəta baş verdi !!!',
                    });
				}
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
      <ButtonAndArrow title={"Göndər"}/>
      </form>
    </div>
    </div>  
  )
}
