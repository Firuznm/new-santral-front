import Input from '../Input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cityOptions } from '../../constants';
import style from './ModalUserAddressUpdate.module.scss';
import CloseIcon from '../../assets/Icons/CloseIcon';
import { useState } from 'react';

export default function ModalUserAddressUpdate({ selectedAddress, closeModal,del}) {
   const[test, setTest]= useState(true)

	const onClick = () => {
		 setTest(!test)
	}
	
	const handleDelete = async () => {
		// Silme işlemini gerçekleştirme
		await del(selectedAddress.id);

		// Silme işlemi başarılıysa modalı kapat
		closeModal();
	};

	const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		initialValues: {
			firstname: selectedAddress?.firstname || '',
			lastname: selectedAddress?.lastname || '',
			mobile: selectedAddress?.mobile || '',
			city: selectedAddress?.city || '0',
			address: selectedAddress?.address || '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object().shape({
			firstname: Yup.string().required('Adınızı daxil edin'),
			lastname: Yup.string().required('Soyadınızı daxil edin'),
			mobile: Yup.string().required('Nömrənizi daxil edin'),
			city: Yup.string().required('Şəhər seçin'),
			address: Yup.string().required('Ünvanınızı daxil edin'),
		}),

		onSubmit: (values) => {
			console.log('update value=', values);

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
		<div>
			{test ? (
				<div className={style.UserAddressAddForm}>
					<span onClick={closeModal} className={style.closeIcon}>
						<CloseIcon />
					</span>
					<h3 className="sectionTitle">Ünvana düzəliş et əlavə et</h3>
					<p>Dəyişikliyi yadda saxlaya və ya ünvanı silə bilərsiniz</p>

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
							{userAddressFormInputData.phoneCityAddress.map(
								(inputData) => (
									<Input key={inputData.id} inputInfo={inputData} />
								),
							)}
						</div>
						<div className={style.btnList}>
							<button
								onClick={onClick}
								type="button"
								className={style.deleteBtn}
							>
								Ünvanı sil
							</button>
							<button className={style.saveBtn}>Yadda saxla</button>
						</div>
					</form>
				</div>
			) : (
				<div className={style.addressDeleteModal}>
				<div className={style.deleteAddressModal}>
							<h3 className="sectionTitle">Ünvan silinsin?</h3>
							<p>Ünvanınız silinəcək. Bu əməliyyatı etmək istədiyinizə əminsiniz?</p>
							<div className={style.btnList}>
								<button onClick={onClick} className={style.noBtn}>
									Xeyr
								</button>
								<button onClick={handleDelete} className={style.yesBtn}>
									Bəli, Sil
								</button>
							</div>
						</div> 
				</div>
			)}
		</div>
	);
}
