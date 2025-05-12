import { useEffect, useState } from 'react';
import urls from '../../ApiUrls/Urls';
import DeleteIcon from '../../assets/Icons/DeleteIcon';
import EditIcon from '../../assets/Icons/EditIcon';
import UserAccoundAndOtherDetailName from '../../components/UserAccoundAndOtherDetailName/UserAccoundAndOtherDetailName';
import UserAddressAdd from '../../components/UserAddressAdd/UserAddressAdd';
import santral from '../../Helpers/Helpers';
import style from './MyAddresses.module.scss';
import { cityOptions } from '../../constants';
import ModalUserAddressUpdate from '../../components/ModalUserAddressUpdate/ModalUserAddressUpdate';
import ModalAddressDelete from '../../components/ModalAddressDelete/ModalAddressDelete';

export default function MyAddresses() {
	const [userAddressData, setUserAddressData] = useState([]);
	const [showHiddenModal, setShowHiddenModal] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [deleteAddressId, setDeleteAddressId] = useState(null);
	const [showHiddenDeleteModal, setShowHiddenDeleteModal] = useState(false);
	  
	// istifadekinin daxil etdiyi unvanlar getirib istifadekiye gostermek
	const getAddressData = async () => {
		try { 
			const resData = await santral.api().post(urls.userAddressData);
			setUserAddressData(resData.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAddressData(); 
	}, []);
    // istifadekinin unvanini silmek
   const deleteUserAddress = async (id) => {
	try {
		const resData = await santral.api().delete(urls.deletedUserAddress(id));
		if (resData && resData.data === true) {
			    getAddressData(); 
				setShowHiddenDeleteModal(false);
				setDeleteAddressId(null);
		} else {
			console.error('Adress silinmedi!!!');
		}
	} catch (error) {
		console.error('Adress silinmede xeta var', error);
	}
	};
	// edit etdikde modal acilir ve hemen adresin melumatlari inputa dolur
	const handleModalAndUserAddressData = (id) => {
		const scrollSituation = !showHiddenModal;
		setShowHiddenModal(scrollSituation);
		document.body.style.overflow = scrollSituation ? 'hidden' : 'auto';
		const userAddress = userAddressData.find((item) => item.id === id);
	    setSelectedAddress(userAddress);
	}
	// silinecek adresin id state atir ve sonra modali acir
	const deleteModalShowHidden = (Id) => {
		setDeleteAddressId(Id); 
		setShowHiddenDeleteModal(true);
	};
	// eger delete modali aciqdirsa ve ya biz adresi silmek islemirikse modali baglayir
	const deleteModalClose = () => {
	    setShowHiddenDeleteModal(!showHiddenDeleteModal)
	}

	
	return (
		<div className="container">
			<div className={style.myAddressesPageWrapper}>
				<div
					onClick={handleModalAndUserAddressData}
					className={`${style.modalBgOverlay} ${
						showHiddenModal ? style.showOverlay : ''
					}`}
				></div>
				<div className={style.modal}>
					{showHiddenModal && (
						<ModalUserAddressUpdate
							closeModal={handleModalAndUserAddressData}
							selectedAddress={selectedAddress}
							del={deleteUserAddress}
						/>
					)}
				</div>
				<div className={style.UserAccoundAndOtherDetailNameWrapper}>
					<UserAccoundAndOtherDetailName />
				</div>
				<div className={style.userAdersses}>
					<h3 className="sectionMiniTitle">Mənim ünvanlarım</h3>
					{userAddressData?.map((address) => (
						<div key={address.id} className={style.userOneAddress}>
							<div className={style.userNameSurnamePhoneCity}>
								<div className={style.userNameCity}>
									<h6 className={style.title}>Ad</h6>
									<span className={style.value}>
										{address.firstname}
									</span>
									<h6 className={style.title}>Şəhər</h6>
									<span className={style.value}>
										{cityOptions[address.city]}
									</span>
								</div>
								<div className={style.userSurnamePhone}>
									<h6 className={style.title}>Soyad</h6>
									<span className={style.value}>
										{address.lastname}
									</span>
									<h6 className={style.title}>Nömrə</h6>
									<span className={style.value}>{address.mobile}</span>
								</div>
								<div className={style.icons}>
									<span
										onClick={() =>
											handleModalAndUserAddressData(address.id)
										}
										className={style.edit}
									>
										<EditIcon />
									</span>
									<span
										onClick={() => deleteModalShowHidden(address.id)}
										className={style.delete}
									>
										<DeleteIcon />
									</span>
								</div>
								<div
									className={`${style.modalAddressDelete} ${
										showHiddenDeleteModal ? style.showModal : ''
									}`}
								>
									<ModalAddressDelete
										yesDeleteAddress={() =>
											deleteUserAddress(deleteAddressId)
										}
										noDeleteAddress={deleteModalClose}
									/>
								</div>
							</div>
							<span className={style.userAddress}>
								<h6 className={style.title}>Ünvan</h6>
								<span className={style.value}>{address.address}</span>
							</span>
						</div>
					))}
				</div>
				<UserAddressAdd getAddressData={getAddressData} />
			</div>
		</div>
	);
}





















