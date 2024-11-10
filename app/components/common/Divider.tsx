interface DividerProps {
  thickness?: number // 선의 두께를 숫자로 지정
  color?: string // Tailwind 색상 이름을 문자열로 지정 (예: 'red-500')
  marginX?: number // 양쪽 마진을 숫자로 지정 (rem 단위)
  className?: string // 커스텀 클래스
}

const Divider: React.FC<DividerProps> = ({
  thickness = 0.1, // 기본 두께
  color = 'slate-800', // 기본 색상
  marginX = 0, // 기본 양쪽 마진
  className,
}) => {
  return (
    <div
      className={`w-full rounded-3xl bg-${color} ${className || ''}`}
      style={{
        height: `${thickness}rem`,
        marginLeft: `${marginX}rem`,
        marginRight: `${marginX}rem`,
      }}
    />
  )
}

export default Divider
/**
 * 사용 예시
 * <Divider thickness={0.2} color="red-500" marginX={2} />
 * <Divider thickness={0.2} color="red-500" marginX="mx-4 sm:mx-2" />
 */
