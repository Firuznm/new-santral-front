import style from "./Input.module.scss"

export default function Input({inputInfo}) {
  console.log("input=", inputInfo);
  
  return (
    <div className={style.inputWrapper}>
      <label  htmlFor="staticId">{inputInfo?.labelName}</label>
      <input className={style.inpComponent} id="staticId" type={inputInfo?.inputType} placeholder={inputInfo?.placeholder} />
    </div>
  )
}
