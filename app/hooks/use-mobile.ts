import { useMediaQuery } from '@vueuse/core'

export const useIsMobile = () => {
  return useMediaQuery('(max-width: 768px)')
}
