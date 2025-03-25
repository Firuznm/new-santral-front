import style from "./ModalAddressDelete.module.scss"

export default function ModalAddressDelete({ yesDeleteAddress, noDeleteAddress }) {
	return (
		<div className={style.deleteAddressModal}>
			<h3 className="sectionTitle">Ünvan silinsin?</h3>
			<p>Ünvanınız silinəcək. Bu əməliyyatı etmək istədiyinizə əminsiniz?</p>
			<div className={style.btnList}>
				<button onClick={noDeleteAddress} className={style.noBtn}>
					Xeyr
				</button>
				<button onClick={()=>yesDeleteAddress()} className={style.yesBtn}>
					Bəli, Sil
				</button>
			</div>
		</div> 
	);
}
