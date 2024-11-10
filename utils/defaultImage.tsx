import Image from 'next/image'

import { Metalogo } from '@/public'

interface DefaultImageProps {
  src?: string // 이미지 소스 (선택 사항)
  alt?: string // 대체 텍스트 (선택 사항)
  width?: number // 이미지 너비 (선택 사항)
  height?: number // 이미지 높이 (선택 사항)
  classes?: string // 추가 클래스명 (선택 사항)
}
export const defaultImage = Metalogo // `default`는 예약어이므로 사용하지 않고 적절한 이름 사용

export default function DefaultImage({
  src,
  alt = 'Default Profile Image',
  width = 64,
  height = 64,
  classes = 'rounded-full object-cover',
}: DefaultImageProps) {
  return (
    <Image
      src={src || defaultImage} // src가 비어 있으면 기본 이미지를 사용
      alt={alt}
      width={width}
      height={height}
      className={classes} // 클래스명 적용
    />
  )
}
