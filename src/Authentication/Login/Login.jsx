import styles from "./Login.module.scss"
import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';
// import sweetalert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from "../../components/Button/Button";
import { useDispatch, } from "react-redux";
import { login } from "../../redux/userSlice";
import {  useNavigate} from "react-router-dom";

export default function Login() {

      const dispatch = useDispatch();
      const navigate =useNavigate(); 
       
     const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: Yup.object().shape({
                email: Yup.string().email('Doğru email ünvanı daxil edin').required('Emila ünvanını doldurun'),
                password: Yup.string().max(14, 'Şifrə 14 sinvoldan cox ola bilməz').required('Şifrə xanasını doldurun'),
            }),
    
            onSubmit: async (values) => {
                const result = await dispatch(login(values))
                const MySwal = withReactContent(Swal);
    
                if (result.type == 'login/fulfilled') {
                await	MySwal.fire({
                        title: <strong>{'Daxil etdiyiniz məlumatlar göndərildi'}</strong>,
                        html: <i>{'Təşəkkür edirik'}</i>,
                        icon: 'success',
                    });
                    resetForm();  
                    navigate("/");
                } else {
             await MySwal.fire({
                    icon: "error",
                    title: "Xəta baş verdi !!!",
                    text: result.payload.errors['undefined'] || "Bilinməyən bir xəta",
                  });
          }
            },
        });

        const loginInputData = 
         [
                {
                    id: 1,
                    name: 'email',
                    labelName: 'E-mail',
                    placeholder: 'E-mail daxil edin',
                    inputType: 'email',
                    value: values.email,
                    errorMessage: errors.email,
                    handleChange: handleChange,
                },
                {
                    id: 2,
                    name: 'password',
                    labelName: 'Şifrə',
                    placeholder: 'Şifrə',
                    inputType: 'password',
                    value: values.password,
                    errorMessage: errors.password,
                    handleChange: handleChange,
                },
            ]
  return (
    <section className={styles.loginPage}>
     <div className={styles.loginArea}>
        <h2 className={styles.pageTitle}>Daxil olun</h2>
        <form onSubmit={handleSubmit}>
            {
                loginInputData?.map(data=>(
                    <Input key={data.id} inputInfo={data}/>
                ))
            }
            <Button title={"Daxil olun"}/>
        </form>
     </div>
      
    </section>
  )
}
