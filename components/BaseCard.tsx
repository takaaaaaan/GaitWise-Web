import Image from "next/image"

type BaseCard = {
  src : string,
  width: number | undefined,
  height: number | undefined,
  alt: string
  title: string 
  value: string | undefined
  levels: string | undefined
}

const BaseCard = ({ src, width = 90, height = 90, alt, title, value, levels } : BaseCard) => {
    return ( 
        <div>
        <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
        />
        <h2>{title}</h2>
        <p>{value}</p>
        <p>{levels}</p>
        </div>
    )
}

export default BaseCard