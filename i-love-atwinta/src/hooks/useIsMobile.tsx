import { useMediaQuery, useTheme } from "@mui/material"

const useIsMobileView = () => {
  const theme = useTheme()
  const isMobileView = useMediaQuery((theme.breakpoints.down('sm')))
  const isSmallPhoneView = useMediaQuery('(max-width:375px)')

  return {
    isMobileView,
    isSmallPhoneView,
  }
}

export default useIsMobileView