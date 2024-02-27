import { useContext, useEffect } from "react"
import { pageLoadingContext } from "../context/pageLoadingContext"

function SignIn() {
	const { setIsPageLoading } = useContext(pageLoadingContext)

	useEffect(() => {
		setIsPageLoading(false)
	}, [])

	return <div>SignIn</div>
}

export default SignIn
