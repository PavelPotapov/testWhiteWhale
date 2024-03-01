import ContentLoader from "react-content-loader"

const SceletonLoaderCard = (props) => (
	<ContentLoader
		speed={2}
		width={257}
		height={248}
		viewBox="0 0 257 248"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<rect x="0" y="0" rx="20" ry="20" width="257" height="248" />
	</ContentLoader>
)

export default SceletonLoaderCard
