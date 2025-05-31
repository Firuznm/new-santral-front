import BasketPrNamePriceTotal from '../../components/BasketPrNamePriceTotal/BasketPrNamePriceTotal';
import Input from '../../components/Input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { cityOptions } from '../../constants';
import style from './OrderConfirm.module.scss';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearBaskets, GetAllApiBaskets } from '../../redux/BasketSlice';
import santral from '../../Helpers/Helpers';
import urls from '../../ApiUrls/Urls';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';

export default function OrderConfirm() {
	const navigate = useNavigate();
	const { isLogin } = useSelector((state) => state.userInfo);
	const { localBaskets, apiBaskets } = useSelector((state) => state.basketData);

	const dispatch = useDispatch();

	const FuncApiBasketAllClear = async () => {
		try {
			await santral.api().post(urls.apiBasketAllClear);
			dispatch(GetAllApiBaskets());
		} catch (error) {
			console.log(error);
		}
	};
	const { values, handleChange, handleSubmit, resetForm, errors } = useFormik({
		initialValues: {
			receiverFirstname: '',
			receiverLastname: '',
			receiverMobile: '',
			senderEmail: '',
			receiverCity: '0',
			receiverAddress: '',
			orderNote: '',
			payment: '',
			products: '',
			cashback: false,
		},
		validationSchema: Yup.object().shape({
			receiverFirstname: Yup.string().required('Adınızı daxil edin'),
			receiverLastname: Yup.string().required('Soyadınızı daxil edin'),
			receiverMobile: Yup.string().required('Nömrənizi daxil edin'),
			senderEmail: Yup.string()
				.email('Doğru email ünvanı daxil edin')
				.required('Emila ünvanını doldurun'),
			receiverCity: Yup.string()
				.notOneOf(['0'], 'Şəhər seçin')
				.required('Şəhər seçin'),
			receiverAddress: Yup.string().required('Ünvanınızı daxil edin'),
			payment: Yup.string().required('Ödəniş üsulu seçin'),
		}),

		onSubmit: async (values) => {
			if (isLogin) {
				let data = {
					...values,
					senderFirstname: values.receiverFirstname,
					senderLastname: values.receiverLastname,
					senderMobile: values.receiverMobile,
					cashback: values.cashback,
					address: null,
				};
				try {
					data.products = JSON.stringify(apiBaskets);
					await santral.api().post(urls.order, JSON.stringify(data));
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						title: <strong>Sifariş göndərildi</strong>,
						html: <i>Təşəkkür edirik!</i>,
						icon: 'success',
					});
					dispatch(clearBaskets());
					resetForm();
					navigate('/order-success');
				} catch (error) {
					console.log(error);
					alert('Xəta baş verdi (local basket)!');
				}
				FuncApiBasketAllClear();
			} else {
				let data = {
					...values,
					senderFirstname: values.receiverFirstname,
					senderLastname: values.receiverLastname,
					senderMobile: values.receiverMobile,
					address: null,
				};
				try {
					data.products = JSON.stringify(localBaskets);
					await santral.api().post(urls.order, JSON.stringify(data));
					const MySwal = withReactContent(Swal);
					MySwal.fire({
						title: <strong>Sifariş göndərildi</strong>,
						html: <i>Təşəkkür edirik!</i>,
						icon: 'success',
					});
					dispatch(clearBaskets());
					resetForm();
					navigate('/order-success');
				} catch (error) {
					console.log(error);
					alert('Xəta baş verdi (local basket)!');
				}
			}
			resetForm();
			dispatch(clearBaskets());
		},
	});

	const orderConfirmFormInputData = {
		nameSurname: [
			{
				id: 1,
				name: 'receiverFirstname',
				labelName: 'Ad',
				placeholder: 'Ad',
				inputType: 'text',
				value: values.receiverFirstname,
				errorMessage: errors.receiverFirstname,
				handleChange: handleChange,
			},
			{
				id: 2,
				name: 'receiverLastname',
				labelName: 'Soyad',
				placeholder: 'Soyad',
				inputType: 'text',
				value: values.receiverLastname,
				errorMessage: errors.receiverLastname,
				handleChange: handleChange,
			},
		],
		phoneEmail: [
			{
				id: 3,
				name: 'receiverMobile',
				labelName: 'Mobil nömrə',
				placeholder: 'Mobbil nömrə daxil edin',
				inputType: 'tel',
				value: values.receiverMobile,
				errorMessage: errors.receiverMobile,
				handleChange: handleChange,
			},
			{
				id: 4,
				name: 'senderEmail',
				labelName: 'E-mail',
				placeholder: 'E-mail daxil edin',
				inputType: 'email',
				value: values.senderEmail,
				errorMessage: errors.senderEmail,
				handleChange: handleChange,
			},
		],
		cityAddress: [
			{
				id: 5,
				name: 'receiverCity',
				labelName: 'Şəhər *',
				inputType: 'select',
				options: cityOptions,
				value: values.receiverCity,
				errorMessage: errors.receiverCity,
				handleChange: handleChange,
			},
			{
				id: 6,
				name: 'receiverAddress',
				labelName: 'Ünvan *',
				placeholder: 'Ünvan',
				inputType: 'text',
				value: values.receiverAddress,
				errorMessage: errors.receiverAddress,
				handleChange: handleChange,
			},
		],
		textArea: {
			value: values.orderNote,
			handleChange: handleChange,
		},
	};

	return (
		<>
			<HelmetAsync title={"Sifarişi tamamla"}/>
			<div className="container">
				<SectionTitle marginBottom={'0'} title={'Sifarişin rəsmiləşdirilməsi'} />
				<div className={style.OrderConfirmPage}>
					<div className={style.formGroup}>
						<h3 className="sectionMiniTitle">Yeni ünvan əlavə et</h3>
						<form onSubmit={handleSubmit}>
							<div className={style.userNameSurname}>
								{orderConfirmFormInputData.nameSurname.map(
									(inputData) => (
										<Input key={inputData.id} inputInfo={inputData} />
									),
								)}
							</div>
							<div className={style.phoneEmail}>
								{orderConfirmFormInputData.phoneEmail.map((inputData) => (
									<Input key={inputData.id} inputInfo={inputData} />
								))}
							</div>
							<h3 className="sectionMiniTitle">Çatdırılma ünvanı</h3>
							<div className={style.cityAddress}>
								{orderConfirmFormInputData.cityAddress.map(
									(inputData) => (
										<Input key={inputData.id} inputInfo={inputData} />
									),
								)}
							</div>

							<label htmlFor="Əlavə qeydləriniz">Əlavə qeydləriniz</label>
							<textarea
								name="orderNote"
								placeholder="Qeydiniz..."
								rows="3"
								value={values.orderNote}
								onChange={handleChange}
							></textarea>
						</form>
						<h5 className={style.paymet}>Ödəniş üsulu *</h5>
						<div className={style.btnList}>
							<div
								className={`${style.doorPayment} ${
									values.payment === 'cash' ? style.active : ''
								}`}
							>
								<label htmlFor="doorPayment">Nağd</label>
								<input
									type="radio"
									id="doorPayment"
									name="payment"
									value="cash"
									onChange={handleChange}
								/>
							</div>
							<div
								className={`${style.onlinePaymet} ${
									values.payment === 'card' ? style.active : ''
								}`}
							>
								<label htmlFor="onlinePaymet">Onlayn</label>
								<input
									type="radio"
									id="onlinePaymet"
									name="payment"
									value="card"
									onChange={handleChange}
								/>
							</div>
						</div>
						{errors.payment && (
							<p className={style.error}>{errors.payment}</p>
						)}
					</div>

					<BasketPrNamePriceTotal
						onclick={handleSubmit}
						title={'Sifarişi tamamla'}
					/>
				</div>
			</div>
		</>
	);
}
