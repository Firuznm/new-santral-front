import BasketPrNamePriceTotal from "../../components/BasketPrNamePriceTotal/BasketPrNamePriceTotal";
import Input from "../../components/Input/Input";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { cityOptions } from "../../constants";
import style from "./OrderConfirm.module.scss"

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearBaskets, GetAllApiBaskets } from "../../redux/BasketSlice";
import santral from "../../Helpers/Helpers";
import urls from "../../ApiUrls/Urls";   

export default function OrderConfirm() {
	const navigate = useNavigate();
	const {isLogin} = useSelector(state=> state.userInfo)
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
			firstname: '',
			lastname: '',
			mobile: '',
			email: '',
			city: '0',
			address: '',
			message: '',
		},
		validationSchema: Yup.object().shape({
			firstname: Yup.string().required('Adınızı daxil edin'),
			lastname: Yup.string().required('Soyadınızı daxil edin'),
			mobile: Yup.string().required('Nömrənizi daxil edin'),
			email: Yup.string()
				.email('Doğru email ünvanı daxil edin')
				.required('Emila ünvanını doldurun'),
			city: Yup.string().notOneOf(['0'], 'Şəhər seçin').required('Şəhər seçin'),
			address: Yup.string().required('Ünvanınızı daxil edin'),
		}),

		onSubmit: async (values) => {
			console.log('order confirm data=', values);
		
			if (isLogin) {
				console.log("api basket data", apiBaskets);
				FuncApiBasketAllClear();
			} else {
				console.log('local basket data=', localBaskets);
					dispatch(clearBaskets());
			}
			resetForm();
			navigate('/order-success');
		},
	});

	const orderConfirmFormInputData = {
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
		phoneEmail: [
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
				name: 'email',
				labelName: 'E-mail',
				placeholder: 'E-mail daxil edin',
				inputType: 'email',
				value: values.email,
				errorMessage: errors.email,
				handleChange: handleChange,
			},
		],
		cityAddress: [
			{
				id: 5,
				name: 'city',
				labelName: 'Şəhər *',
				inputType: 'select',
				options: cityOptions,
				value: values.city,
				errorMessage: errors.city,
				handleChange: handleChange,
			},
			{
				id: 6,
				name: 'address',
				labelName: 'Ünvan *',
				placeholder: 'Ünvan',
				inputType: 'text',
				value: values.address,
				errorMessage: errors.address,
				handleChange: handleChange,
			},
		],
		textArea: {
			value: values.message,
			handleChange: handleChange,
		},
	}; 
	
  return (
		<div className="container">
			<SectionTitle
				// marginTop={'0'}
				marginBottom={'0'}
				title={'Sifarişin rəsmiləşdirilməsi'}
			/>
			<div className={style.OrderConfirmPage}>
				<div className={style.formGroup}>
					<h3 className="sectionMiniTitle">Yeni ünvan əlavə et</h3>
					<form onSubmit={handleSubmit}>
						<div className={style.userNameSurname}>
							{orderConfirmFormInputData.nameSurname.map((inputData) => (
								<Input
									key={inputData.id}
									inputInfo={inputData}
								/>
							))}
						</div>
						<div className={style.phoneEmail}>
							{orderConfirmFormInputData.phoneEmail.map((inputData) => (
								<Input
									key={inputData.id}
									inputInfo={inputData}
								/>
							))}
						</div>
						<h3 className="sectionMiniTitle">Çatdırılma ünvanı</h3>
						<div className={style.cityAddress}>
							{orderConfirmFormInputData.cityAddress.map((inputData) => (
								<Input
									key={inputData.id}
									inputInfo={inputData}
								/>
							))}
						</div>

						<label htmlFor="Əlavə qeydləriniz">Əlavə qeydləriniz</label>
						<textarea
							name="message"
							placeholder="Qeydiniz..."
							rows="3"
							value={values.message}
							onChange={handleChange}
						></textarea>
					</form>
					<h5 className={style.paymet}>Ödəniş üsulu *</h5>
					<div className={style.btnList}>
						<Link className={style.doorPayment} to="/">
							Nağd
						</Link>
						<Link className={style.onlinePaymet} to="/">
							Onlayn
						</Link>
					</div>
				</div>

				<BasketPrNamePriceTotal
					onclick={handleSubmit}
					title={'Sifarisi tamamla'}
				/>
			</div>
		</div>
  );
}
 