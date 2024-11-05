import { DownloadIcon } from 'icons'

const LabResultsList = ({ labResults }: { labResults: Array<string> }) => {
  const results = labResults.map((result, index) => {
    return { result, isActive: index === 1 ? true : false }
  })

  return (
    <ul role="list" className="divide-y divide-gray-100 rounded-3xl bg-white px-5 pb-4">
      <li className="flex items-center justify-between gap-x-6 p-5">
        <h2 className="text-2xl font-medium">Lab Results</h2>
      </li>
      {results.map((result, index) => {
        return (
          <li
            key={index}
            className={
              result.isActive
                ? 'flex items-center justify-between gap-x-6 bg-gray-200 p-5'
                : 'flex items-center justify-between gap-x-6 p-5'
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="font=light text-sm leading-6 text-gray-900">{result.result}</p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-center">
              <DownloadIcon />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default LabResultsList
