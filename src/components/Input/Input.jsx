import { useState } from "react";
import style from "./Input.module.scss"
import ParolCloseEye from "../../assets/Icons/ParolCloseEye";
import ParolOpenEye from "../../assets/Icons/ParolOpenEye";

export default function Input({inputInfo,inpAreaWidth}) {
  
   const [inputTypeChange, setInputTypeChange] = useState(true);

   const handleInputTypeChange= ()=>{
    setInputTypeChange(!inputTypeChange)
   }
  // console.log("info=", inputInfo.value.length);
  
  return (
    <div style={{width:inpAreaWidth}} className={style.inputWrapper}>
      <label  htmlFor={style.staticId} >{inputInfo?.labelName}</label>
      
      <input 
      value={inputInfo?.value}
       name={inputInfo?.name}
        onChange={inputInfo?.handleChange} 
        type={inputInfo?.inputType === "password"  ? (inputTypeChange ? "password" : "text") : inputInfo?.inputType}
         placeholder={inputInfo?.placeholder} 
         id={style.staticId}
         className={style.inpComponent} />

  {inputInfo?.inputType === "password" && <span onClick={handleInputTypeChange} className={style.parolEye}>{inputTypeChange ?<ParolCloseEye/> : <ParolOpenEye/>}</span>}

  {inputInfo?.errorMessage && (
        <span className={style.errorMessage}>{inputInfo.errorMessage}</span>
      )}
    </div>
  )
}
