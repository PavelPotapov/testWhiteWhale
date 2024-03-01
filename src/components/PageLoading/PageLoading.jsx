import { useSelector } from "react-redux"
import { Box, Spinner } from "@chakra-ui/react"
import PropTypes from "prop-types"

export const PageLoading = ({ children }) => {
	const { isLoading } = useSelector((state) => state.pageLoading)
	console.log(isLoading, "isLoading")
	return (
		<>
			{isLoading && (
				<Box
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
				</Box>
			)}
			<div style={{ padding: "20px 20px" }}>{children}</div>
		</>
	)
}

PageLoading.propTypes = {
	children: PropTypes.node,
}
