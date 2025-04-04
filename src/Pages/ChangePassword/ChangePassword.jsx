import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./ChangePassword.module.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
	const navigate = useNavigate();
    
        const { values, handleChange, handleSubmit,resetForm,errors } = useFormik({
			initialValues: {
				current: '',
				password: '',
				password2: '',
			},
			validationSchema: Yup.object().shape({
				current: Yup.string()
					.max(14, 'Şifrə 14 sinvoldan cox ola bilməz')
					.required('Köhnə şifrə xanasını doldurun'),
				password: Yup.string()
					.max(14, 'Şifrə 14 sinvoldan cox ola bilməz')
					.required('Yeni şifrə xanasını doldurun'),
				password2: Yup.string()
					.required('Təkrar yeni şifrə xanasını doldurun')
					.oneOf([Yup.ref('password2', Yup.password2)], 'Şifrələr eyni deyil'),
			}),

			onSubmit: async (values) => {
				try {
					await santral.api().post(urls.changePassword, JSON.stringify(values));
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						title: <strong>{'Şifrəniz dəyişdirildi'}</strong>,
						html: <i>{'Təşəkkür edirik'}</i>,
						icon: 'success',
					});
				} catch (error) {
					console.log(error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Şifrə dəyişdirilmədi !!!',
					});
				}
				resetForm();
				navigate("/")
			},
		});
    const changePasswordInputsData = [
		{
			id: 1,
			name: 'current',
			labelName: 'Cari şifrə',
			placeholder: '******',
			inputType: 'password',
			value: values.current,
			errorMessage: errors.current,
			handleChange: handleChange,
		},
		{
			id: 2,
			name: 'password',
			labelName: 'Şifrə',
			placeholder: '******',
			inputType: 'password',
			value: values.password,
			errorMessage: errors.password,
			handleChange: handleChange,
		},
		{
			id: 3,
			name: 'password2',
			labelName: 'Yeni şifrə təkrar',
			placeholder: '******',
			inputType: 'password',
			value: values.password2,
			errorMessage: errors.password2,
			handleChange: handleChange,
		},
	];

  return (
		<div className="container">
			<div className={style.changePasswordPage}>
				<UserAccoundAndOtherDetailName />
				<div className={style.changePasswordForm}>
					<h3 className="sectionTitle">Şifrəni dəyiş</h3>
					<form onSubmit={handleSubmit}>
						{changePasswordInputsData.map((inputData) => (
							<Input key={inputData.id} inputInfo={inputData} />
						))}
						<Button title={'Yadd saxla'} />
					</form>
				</div>
			</div>
		</div>
  );
}
