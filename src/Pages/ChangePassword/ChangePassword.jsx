import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./ChangePassword.module.scss"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function ChangePassword() {
    
        const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
			initialValues: {
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			},
			validationSchema: Yup.object().shape({
				oldPassword: Yup.string()
					.max(14, 'Şifrə 14 sinvoldan cox ola bilməz')
					.required('Köhnə şifrə xanasını doldurun'),
				newPassword: Yup.string()
					.max(14, 'Şifrə 14 sinvoldan cox ola bilməz')
					.required('Yeni şifrə xanasını doldurun'),
				confirmNewPassword: Yup.string()
					.required('Təkrar yeni şifrə xanasını doldurun')
					.oneOf([Yup.ref('newPassword', Yup.newPassword)], 'Şifrələr eyni deyil'),
			}),

			onSubmit: (values) => {
                console.log('values=', values);
                resetForm()
            },
            
		});
    const changePasswordInputsData = [
		{
			id: 1,
			name: 'oldPassword',
			labelName: 'Cari şifrə',
			placeholder: '******',
			inputType: 'password',
			value: values.oldPassword,
			errorMessage: errors.oldPassword,
			handleChange: handleChange,
		},
		{
			id: 2,
			name: 'newPassword',
			labelName: 'Şifrə',
			placeholder: '******',
			inputType: 'password',
			value: values.newPassword,
			errorMessage: errors.newPassword,
			handleChange: handleChange,
		},
		{
			id: 3,
			name: 'confirmNewPassword',
			labelName: 'Yeni şifrə təkrar',
			placeholder: '******',
			inputType: 'password',
			value: values.confirmNewPassword,
			errorMessage: errors.confirmNewPassword,
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
