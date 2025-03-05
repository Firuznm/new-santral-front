import UserAccoundAndOtherDetailName from "../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName"
import style from "./UserPersonalInformation.module.scss"


export default function UserPersonalInformation() {
	// const userInfoInputData = {
	// 	nameSurname: [
	// 		{
	// 			id: 1,
	// 			name: 'firstname',
	// 			labelName: 'Ad',
	// 			placeholder: 'Ad',
	// 			inputType: 'text',
	// 			value: values.firstname,
	// 			errorMessage: errors.firstname,
	// 			handleChange: handleChange,
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'lastname',
	// 			labelName: 'Soyad',
	// 			placeholder: 'Soyad',
	// 			inputType: 'text',
	// 			value: values.lastname,
	// 			errorMessage: errors.lastname,
	// 			handleChange: handleChange,
	// 		},
	// 	],
	// 	emailNumber: [
   //       {
	// 			id: 1,
	// 			name: 'number',
	// 			labelName: 'Mobil nömrə',
	// 			placeholder: 'Mobbil nömrə daxil edin',
	// 			inputType: 'number',
	// 			value: values.number,
	// 			errorMessage: errors.number,
	// 			handleChange: handleChange,
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'email',
	// 			labelName: 'E-mail',
	// 			placeholder: 'E-mail daxil edin',
	// 			inputType: 'email',
	// 			value: values.email,
	// 			errorMessage: errors.email,
	// 			handleChange: handleChange,
	// 		},
	// 	],
	
	// };
  return (
     <div className="container">
        <div className={style.userPersonalInformationPage}>
        <UserAccoundAndOtherDetailName/>
        <div className={style.userInfo}>
           <h3 className="header">Şəxsi məlumatlar</h3>
           <form className={style.userInfoForm}>
            <input type="file" />
           
             
           </form>
        </div>
        </div>
     </div> 
  )
}
  