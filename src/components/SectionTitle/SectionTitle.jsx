import styles from "./SectionTitle.module.scss"

export default function SectionTitle({ marginTop,marginBottom, title }) {
	return (
		<div style={{ marginTop: marginTop, marginBottom:marginBottom}} className={styles.title}>
			{title}
		</div>
	);
}
 