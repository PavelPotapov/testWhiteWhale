import { Spinner } from "@chakra-ui/react"
import styles from "./SpinnerWithNumber.module.css"

export const SpinnerWithNumber = ({ number }) => {
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<Spinner size="xl" />
			<div className={styles.spinnerNumber}>{number}</div>
		</div>
	)
}
