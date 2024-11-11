import { Diagnostic } from 'types'

const DiagnosticList = ({ diagnostics }: { diagnostics: Diagnostic[] }) => {
  return (
    <section role="list" className="divide-y divide-gray-100 rounded-3xl bg-white p-5">
      <div className="flex items-center pb-10">
        <h2 className="text-2xl font-medium">Diagnostic List</h2>
      </div>
      <div className="flex">
        <table className="w-full table-fixed">
          <thead>
            <tr>
              <th className="rounded-l-3xl bg-gray-100 p-4 text-left font-medium">Problem / Diagnosis</th>
              <th className="bg-gray-100 p-4 text-left font-medium">Description</th>
              <th className="rounded-r-3xl bg-gray-100 p-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnostics.map((diagnostic, index) => {
              return (
                <tr key={index}>
                  <td className="text-pretty break-normal py-4 pl-4 font-light">{diagnostic.name}</td>
                  <td className="py-4 pl-4 font-light">{diagnostic.description}</td>
                  <td className="py-4 pl-4 font-light">{diagnostic.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DiagnosticList
