import { useState } from "react";
import GoldMinusIcon from '../../assets/Icons/GoldMinusIcon';
import GoldPlusIcon from '../../assets/Icons/GoldPlusIcon';
import style from "./Filter.module.scss"
import CloseIcon from "../../assets/Icons/CloseIcon";


export default function Filter({ data, onClickFunk }) {
	const [visibleIndicators, setVisibleIndicators] = useState({});
	const onClickTitleShowHiddenIndicators = (id) => {
		setVisibleIndicators((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	return (
		<div
			className={`${style.filterArea} ${
				data?.length > 10 ? style.scrollHeight : ''
			}`}
		>
			<div className={style.filterResultAndFilterArea}>
				<span className={style.filterResultBtn}>Tətbiq edin</span>
				<span onClick={onClickFunk} className={style.filterAreaCloseBtn}>
					<CloseIcon color={'white'} />
				</span>
			</div>
			{data?.map((item) => (
				<div key={item.id}>
					<div
						onClick={() => onClickTitleShowHiddenIndicators(item.id)}
						className={style.titleAndIcon}
					>
						{item.title}
						<span className={style.plusMinusIcon}>
							{visibleIndicators[item.id] ? (
								<GoldMinusIcon />
							) : (
								<GoldPlusIcon />
							)}
						</span>
					</div>
					{visibleIndicators[item.id] && (
						<div
							className={`${style.categoryIndicators} ${
								item?.options?.length > 5 ? style.optionsScroll : ''
							}`}
						>
							{item?.options.map((option) => (
								<div key={option.id} className={style.inpCheckboxWrapper}>
									<input type="checkbox" id={option.id} />
									<label htmlFor={option.id}>{option.title}</label>
									<span className={style.optionCount}>
										({option.count})
									</span>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
