import { useSelector } from "react-redux"
import { Container, Spinner } from "@chakra-ui/react"
import PropTypes from "prop-types"

export const PageLoading = ({ children }) => {
	const { isLoading } = useSelector((state) => state.pageLoadingSlice)
	return (
		<>
			{isLoading && (
				<Container
					bg="#E2E6EF"
					position="absolute"
					width="100vw"
					height="100vh"
					display="flex"
					alignItems="center"
					justifyContent="center"
					zIndex={999}
				>
					<Spinner width="2rem" height="2rem" />
				</Container>
			)}
			{children}
		</>
	)
}

PageLoading.propTypes = {
	children: PropTypes.node,
}
