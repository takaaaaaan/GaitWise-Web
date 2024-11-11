import Image from 'next/image'
import { BaseCard } from 'types'

import { ArrowDownIcon } from '@/components/icons'

const BaseCardDiagnosis = ({ cardProps }: { cardProps: BaseCard }) => {
  if (cardProps.title.match('Heart Rate'))
    return (
      <div className="rounded-xl bg-red-50 pl-4 pt-4">
        <Image src={cardProps.src} width={cardProps.width} height={cardProps.height} alt={cardProps.alt} />
        <h2 className="pt-4 text-lg font-light">{cardProps.title}</h2>
        <p className="text-3xl font-bold">{cardProps.value} bpm</p>
        <div className="my-5 flex items-center">
          <ArrowDownIcon />
          <p className="ml-1 font-extralight">{cardProps.levels}</p>
        </div>
      </div>
    )

  if (cardProps.title.match('Temperature'))
    return (
      <div className="rounded-xl bg-red-50 pl-4 pt-4">
        <Image src={cardProps.src} width={cardProps.width} height={cardProps.height} alt={cardProps.alt} />
        <h2 className="pt-4 text-lg font-light">{cardProps.title}</h2>
        <p className="text-3xl font-bold">{cardProps.value} °F</p>
        <p className="my-5 font-extralight">{cardProps.levels}</p>
      </div>
    )

  return (
    <div className="rounded-xl bg-blue-50 pl-4 pt-4">
      <Image src={cardProps.src} width={cardProps.width} height={cardProps.height} alt={cardProps.alt} />
      <h2 className="pt-4 text-lg font-light">{cardProps.title}</h2>
      <p className="text-3xl font-bold">{cardProps.value} bpm</p>
      <p className="my-5 font-extralight">{cardProps.levels}</p>
    </div>
  )
}

export default BaseCardDiagnosis
