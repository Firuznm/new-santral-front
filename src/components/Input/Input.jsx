import { useState } from 'react';
import style from './Input.module.scss';
import ParolCloseEye from '../../assets/Icons/ParolCloseEye';
import ParolOpenEye from '../../assets/Icons/ParolOpenEye';

export default function Input({ inputInfo, inpAreaWidth }) {
	const [inputTypeChange, setInputTypeChange] = useState(true);

	const handleInputTypeChange = () => {
		setInputTypeChange(!inputTypeChange);
	};
	
	return (
		<div style={{ width: inpAreaWidth }} className={style.inputWrapper}>
			<label htmlFor={inputInfo.labelName}>{inputInfo?.labelName}</label>

			{inputInfo?.inputType === 'select' ? (
				<select
					className={style.inpComponent}
					name={inputInfo?.name}
					value={inputInfo?.value}
					onChange={inputInfo?.handleChange}
				>
					{Object.keys(inputInfo.options).map((key) => {
						const value = inputInfo.options[key];
						return (
							<option key={key} disabled={key === '0'} value={key}>
								{value}
							</option>
						);
					})}
				</select>
			) : (
				<input
					className={style.inpComponent}
					name={inputInfo?.name}
					id={inputInfo.labelName}
					value={inputInfo?.value}
					onChange={inputInfo?.handleChange}
					type={
						inputInfo?.inputType === 'password'
							? inputTypeChange
								? 'password'
								: 'text'
							: inputInfo?.inputType
					}
					placeholder={inputInfo?.placeholder}
				/>
			)}

			{inputInfo?.inputType === 'password' && (
				<span onClick={handleInputTypeChange} className={style.parolEye}>
					{inputTypeChange ? <ParolCloseEye /> : <ParolOpenEye />}
				</span>
			)}

			{inputInfo?.errorMessage && (
				<span className={style.errorMessage}>{inputInfo.errorMessage}</span>
			)}
		</div>
	);
}
