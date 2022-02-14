import { useMediaQuery, useTheme } from "@mui/material"

const useIsTabletopView = () => {
  const theme = useTheme()
  const isTabletopAndBelow = useMediaQuery((theme.breakpoints.down('lg')))
  const isTabletopBetweenMobile = useMediaQuery((theme.breakpoints.between('sm', 'lg')))

  return {
    isTabletopAndBelow,
    isTabletopBetweenMobile
  }
}

export default useIsTabletopView