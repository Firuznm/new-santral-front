import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./UserPersonalInformation.module.scss"
import { useEffect} from "react";
import Input from "../../components/Input/Input";
import { useDispatch, useSelector } from 'react-redux';
import { authMe } from '../../redux/userSlice';




export default function UserPersonalInformation() {
	const {authMeUser} = useSelector(state=> state.userInfo);
    const dispatch = useDispatch();
	useEffect(()=>{
       dispatch(authMe())
	},[])

	const { values, handleChange,handleSubmit,errors } = useFormik({
		initialValues: {
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
				phone: Yup.number()
					.positive('Mənfi rəqəm olmaz !!!')
					.integer('Tam rəqəm daxil edin')
					.required('Nömrənizi daxil edin'),
			}),
			onSubmit: (values) => {
			console.log("user new info =", values);
		  }
		});

	  const userInfoInputData = {
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
				inputType: 'number',
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
        <UserAccoundAndOtherDetailName/>
        <div className={style.userInfo}>
           <h3 className="sectionTitle">Şəxsi məlumatlar</h3>
           <form onSubmit={handleSubmit} className={style.userInfoForm}>
            <input type="file" />
             <div className={style.nameSurname}>
              {
				userInfoInputData.nameSurname.map(userData=>(
					<Input key={userData.id} inputInfo={userData} inpAreaWidth={'50%'}/>
				))
			  }
			 </div>
			 <div className={style.emailPhone}>
				{
					userInfoInputData.emailPhone.map(userData=>(
						<Input key={userData.id} inputInfo={userData} inpAreaWidth={'50%'}/>
					))
				}
			 </div>
               <button className={style.saveBtn}>Yadd saxla</button>
           </form>
        </div>
        </div>
     </div> 
  )
}
  