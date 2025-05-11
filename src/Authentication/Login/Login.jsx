import styles from "./Login.module.scss"
import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
// import sweetalert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch, } from "react-redux";
import { login } from "../../redux/userSlice";
import {  useNavigate} from "react-router-dom";
import ButtonAndArrow from "../../components/ButtonAndArrow/ButtonAndArrow";

export default function Login() {

      const dispatch = useDispatch();
      const navigate =useNavigate(); 
       
     const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		 initialValues: {
				username:"",
				email: '',
				password: '',
			},
		 onSubmit: async (values) => {
			 const loginData = {
					username: values.email || values.username,
					password: values.password,
				};
				const result = await dispatch(login(loginData));
				const MySwal = withReactContent(Swal);
				if (result.type == 'login/fulfilled') {
					await MySwal.fire({
						title: <strong>{'Daxil etdiyiniz məlumatlar göndərildi'}</strong>,
						html: <i>{'Təşəkkür edirik'}</i>,
						icon: 'success',
					});
					resetForm();
					navigate('/');
				} else {
					await MySwal.fire({
						icon: 'error',
						title: 'Xəta baş verdi !!!',
						text: result.payload.errors['undefined'] || 'Bilinməyən bir xəta',
					});
				}
			},
		});

        const loginInputData = [
			{
				id: 1,
				name: 'email',
				labelName: 'email',
				placeholder: 'E-poçtunuzu daxil edin',
				inputType: 'text',
				value: values.email || values.username,
				errorMessage: errors.email || values.username,
				handleChange: handleChange,
			},
			{
				id: 2,
				name: 'password',
				labelName: 'Şifrə',
				placeholder: '****',
				inputType: 'password',
				value: values.password,
				errorMessage: errors.password,
				handleChange: handleChange,
			},
		];
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
            <ButtonAndArrow title={"Daxil olun"}/>
        </form>
     </div>
      
    </section>
  )
}
