import styles from "./SectionTitle.module.scss"

export default function SectionTitle({title}) {
  return (
    <div className={styles.title}>
      {title}
    </div>
  )
}
