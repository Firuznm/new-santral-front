import Button from '../Button/Button';
import Input from '../Input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import style from './UserAddressAdd.module.scss';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import { cityOptions } from '../../constants'; 

export default function UserAddressAdd({ getAddressData }) {
	const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		initialValues: {
			firstname: '',
			lastname: '',
			mobile: '',
			city: '0',
			address: '',
		},
		validationSchema: Yup.object().shape({
			firstname: Yup.string().required('Adınızı daxil edin'),
			lastname: Yup.string().required('Soyadınızı daxil edin'),
			mobile: Yup.string().required('Nömrənizi daxil edin'),
			city: Yup.string().required('Şəhər seçin'),
			address: Yup.string().required('Ünvanınızı daxil edin'),
		}),

		onSubmit: async (values) => {
			try {
				await santral.api().post(urls.userAddressCreate, JSON.stringify(values));
				await getAddressData();
			} catch (error) {
				console.log(error);
			}
			resetForm();
		},
	});

	const userAddressFormInputData = {
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
		phoneCityAddress: [
			{
				id: 3,
				name: 'mobile',
				labelName: 'Mobil nömrə',
				placeholder: 'Mobbil nömrə daxil edin',
				inputType: 'tel',
				value: values.mobile,
				errorMessage: errors.mobile,
				handleChange: handleChange,
			},
			{
				id: 4,
				name: 'city',
				inputType: 'select',
				options: cityOptions,
				value: values.city,
				errorMessage: errors.city,
				handleChange: handleChange,
			},
			{
				id: 5,
				name: 'address',
				labelName: 'Ünvan *',
				placeholder: 'Ünvan',
				inputType: 'text',
				value: values.address,
				errorMessage: errors.address,
				handleChange: handleChange,
			},
		],
	};
  
	return (
		<div className={style.UserAddressAddForm}>
			<h3 className="sectionMiniTitle">Yeni ünvan əlavə et</h3>
			<form onSubmit={handleSubmit}>
				<div className={style.userNameSurname}>
					{userAddressFormInputData.nameSurname.map((inputData) => (
						<Input
							key={inputData.id}
							inputInfo={inputData}
							inpAreaWidth={'48%'}
						/>
					))}
				</div>
				<div className={style.userPhoneCityAddress}>
					{userAddressFormInputData.phoneCityAddress.map((inputData) => (
						<Input key={inputData.id} inputInfo={inputData} />
					))}
				</div>
				<Button title={'Ünvan əlavə et'} />
			</form>
		</div>
	);
}
