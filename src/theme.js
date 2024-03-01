import { extendTheme } from "@chakra-ui/theme-utils"
import "@fontsource/plus-jakarta-sans"

export const theme = extendTheme({
	fonts: {
		body: `'Plus Jakarta Sans', sans-serif`,
	},
	styles: {
		global: {
			body: {
				bg: "background.100",
			},
		},
	},
})
