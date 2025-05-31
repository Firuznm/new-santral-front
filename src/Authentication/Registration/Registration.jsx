import { useFormik } from 'formik';
import Input from '../../components/Input/Input';
import style from './Registration.module.scss';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/userSlice';
// import sweetalert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';
import ButtonAndArrow from '../../components/ButtonAndArrow/ButtonAndArrow';

export default function Registration() {
    const navigate = useNavigate();
	const dispatch = useDispatch();


	const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object().shape({
			firstname: Yup.string().required('Adınızı daxil edin'),
			lastname: Yup.string().required('Soyadınızı daxil edin'),
			email: Yup.string().email('Doğru email ünvanı daxil edin').required('Emila ünvanını doldurun'),
			phone: Yup.number()
				.positive('Mənfi rəqəm olmaz !!!')
				.integer('Tam rəqəm daxil edin')
				.required('Nömrənizi daxil edin'),
			password: Yup.string().max(14, 'Şifrə 14 sinvoldan cox ola bilməz').required('Şifrə xanasını doldurun'),
			confirmPassword: Yup.string()
				.required('Təkrar şifrə xanasını doldurun')
				.oneOf([Yup.ref('password', Yup.password)], 'Şifrələr eyni deyil'),
		}),

		onSubmit: async (values) => {
			const result = await dispatch(register(values));
			const MySwal = withReactContent(Swal);

			if (result.type == 'register/fulfilled') {
			await	MySwal.fire({
					title: <strong>{'Daxil etdiyiniz məlumatlar göndərildi'}</strong>,
					html: <i>{'Təşəkkür edirik'}</i>,
					icon: 'success',
				});
        resetForm();
        navigate("/login");
			} else {
         await MySwal.fire({
			    icon: "error",
			    title: "Xəta baş verdi !!!",
			    text: result.payload.errors['undefined'] || "Bilinməyən bir xəta",
			  });
      }
		},
	});
// Register componentinde istifade olunan inputlarin veziyyetleri ucun yazilmis data. Bu datani input componetinə props olaraq gonderirem
	const registrationInputData = {
		nameSurname: [
			{
				id: 1,
				name: 'firstname',
				labelName: 'Ad',
				placeholder: 'Ad',
				inputType: 'text',
				value: values.firstname,
				errorMessage: errors.firstname,
				handleChange: handleChange,
			},
			{
				id: 2,
				name: 'lastname',
				labelName: 'Soyad',
				placeholder: 'Soyad',
				inputType: 'text',
				value: values.lastname,
				errorMessage: errors.lastname,
				handleChange: handleChange,
			},
		],
		emailNumber: [
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
				name: 'phone', 
				labelName: 'Mobil nömrə',
				placeholder: 'Mobbil nömrə daxil edin',
				inputType: 'number',
				value: values.phone,
				errorMessage: errors.phone,
				handleChange: handleChange,
			},
			
		],
		passwordConfirmPassword: [
			{
				id: 1,
				name: 'password',
				labelName: 'Şifrə',
				placeholder: 'Şifrə',
				inputType: 'password',
				value: values.password,
				errorMessage: errors.password,
				handleChange: handleChange,
			},
			{
				id: 2,
				name: 'confirmPassword',
				labelName: 'Şifrə təkrar',
				placeholder: 'Şifrə təkrar',
				inputType: 'password',
				value: values.confirmPassword,
				errorMessage: errors.confirmPassword,
				handleChange: handleChange,
			},
		],
	};

	return (
		<div className={style.registrationPage}>
			<div className={style.registrationArea}>
				<h3 className={style.PageTitle}>Qeydiyyat</h3>
				<p className={style.pageWarning}>Qeydiyyatdan keçmək üçün zəhmət olmasa məlumatlarınızı doldurun </p>

				<form onSubmit={handleSubmit}>
					<div className={style.nameSurnameInput}>
						{registrationInputData?.nameSurname?.map((inputData) => (
							<Input key={inputData.id} inputInfo={inputData}  />
						))}
					</div>
					{registrationInputData?.emailNumber?.map((inputData) => (
						<Input key={inputData.id} inputInfo={inputData} />
					))}

					<div className={style.passwordConfirmPassword}>
						{registrationInputData?.passwordConfirmPassword?.map((inputData) => (
							<Input key={inputData.id}  inputInfo={inputData} />
						))}
					</div>
					<ButtonAndArrow title={'Qeydiyyatdan keç'} />
				</form>
			</div>
		</div>
	);
}
