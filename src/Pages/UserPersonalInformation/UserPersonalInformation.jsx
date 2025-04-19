import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserAccoundAndOtherDetailName from '../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName';
import style from './UserPersonalInformation.module.scss';
import { useEffect} from 'react';
import Input from '../../components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from '../../redux/userSlice';
import defaultImg from '../../assets/Images/dafaultUserImg.png';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import ImgAddIcon from '../../assets/Icons/ImgAddIcon';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import Button from '../../components/Button/Button';

export default function UserPersonalInformation() {
	const { authMeUser } = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authMe());
	}, []);
	console.log('ttt=', authMeUser);

	const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormik({
		initialValues: {
			photo: authMeUser?.photo || '',
			firstname: authMeUser?.firstname || '',
			lastname: authMeUser?.lastname || '',
			email: authMeUser?.email || '',
			phone: authMeUser?.phone || '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			firstname: Yup.string().required('Adınızı daxil edin'),
			lastname: Yup.string().required('Soyadınızı daxil edin'),
			email: Yup.string().email('Doğru email ünvanı daxil edin').required('Emila ünvanını doldurun'),
			phone: Yup.string().required('Nömrənizi daxil edin'),
		}),
		onSubmit: async (values) => {
          try {
			  await santral.api().post(urls.userPersonalInfo, JSON.stringify(values))
			     const MySwal = withReactContent(Swal);
					MySwal.fire({
						title: <strong>{'Məlumatlar yadda saxlanildi'}</strong>,
						html: <i>{'Təşəkkür edirik'}</i>,
						icon: 'success',
					});
		  } catch (error) {
			console.log(error);  
		  }
		},
	});

	const handleChangeImg = async (event) => {
		const file = event.target.files[0];
		if (!file) return;
		const formData = new FormData();
		formData.append('photo', file);
		try {
			const res = await santral.api().
				post(urls.userPhoto, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			if (res.data && res.data.data.public) {
				setFieldValue('photo', res.data.data.public);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const userInfoInputData = {
		userImg: {
			id: 1,
			inputType: 'file',
			handleChange: handleChange,
		},
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
		emailPhone: [
			{
				id: 1,
				name: 'phone',
				labelName: 'Mobil nömrə',
				placeholder: 'Mobbil nömrə daxil edin',
				inputType: 'string',
				value: values.phone,
				errorMessage: errors.phone,
				handleChange: handleChange,
			},
			{
				id: 2,
				name: 'email',
				labelName: 'E-mail',
				placeholder: 'E-mail daxil edin',
				inputType: 'email',
				value: values.email,
				errorMessage: errors.email,
				handleChange: handleChange,
			},
		],
	};
	return (
		<div className="container">
			<div className={style.userPersonalInformationPage}>
				<UserAccoundAndOtherDetailName />
				<div className={style.userInfo}>
					<h3 className="sectionMiniTitle">Şəxsi məlumatlar</h3>
					<form onSubmit={handleSubmit} className={style.userInfoForm}>
						<label htmlFor="imgAddInp" className={style.userPhotoAddWrapper}>
							<img
								className={style.userImg}
								src={values.photo ? `${santral.baseUrlImage}${values.photo}` : defaultImg}
								alt="User photo"
							/>
							<span className={style.photoAddIcon}>
								<ImgAddIcon />
							</span>
							<input
								id="imgAddInp"
								className={style.fileInput}
								type="file"
								name="photo"
								onChange={handleChangeImg}
							/>
						</label>
						<div className={style.nameSurname}>
							{userInfoInputData.nameSurname.map((userData) => (
								<Input key={userData.id} inputInfo={userData} inpAreaWidth={'50%'} />
							))}
						</div>
						<div className={style.emailPhone}>
							{userInfoInputData.emailPhone.map((userData) => (
								<Input key={userData.id} inputInfo={userData} inpAreaWidth={'50%'} />
							))}
						</div>
						<Button title={'Yadd saxla'} />
					</form>
				</div>
			</div>
		</div>
	);
}
