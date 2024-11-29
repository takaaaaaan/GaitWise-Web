'use client'

import { useState } from 'react'
import { CalendarTodayIcon, GenderMark, IdCard, PhoneIcon } from '@/components/icons'

const PatientProfile = ({ participant }) => {
  const [participantData] = useState({
    name: `${participant.firstName} ${participant.lastName}`,
    gender: participant.gender,
    age: participant.age || 0,
    email: participant.email || 'Not Provided',
    height: participant.height || 'Unknown',
    job: participant.job || 'Unemployed',
    weight: `${participant.weight.value} ${participant.weight.type}`,
    surveys: participant.survey.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), // 최신순 정렬
  })

  return (
    <section className="max-w-lg mx-auto divide-y divide-gray-200 rounded-lg bg-white shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Essential survey</h3>
      {/* Profile Information */}
      <div className="space-y-4">
        {[
          { label: 'Full Name', value: participantData.name, icon: <IdCard /> },
          { label: 'Gender', value: participantData.gender, icon: <GenderMark /> },
          { label: 'Age', value: participantData.age, icon: <CalendarTodayIcon /> },
          { label: 'Email', value: participantData.email, icon: <PhoneIcon /> },
          { label: 'Height', value: participantData.height, icon: <IdCard /> },
          { label: 'Weight', value: participantData.weight, icon: <IdCard /> },
          { label: 'Job', value: participantData.job, icon: <IdCard /> },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-md bg-gray-50 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-light text-gray-500">{item.label}</h3>
              <p className="text-sm font-semibold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Surveys */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Custom Survey</h3>
        <div className="space-y-6">
          {participantData.surveys.map((survey, index) => (
            <div
              key={index}
              className="p-6 rounded-md bg-white shadow-md border border-gray-200"
            >
              
              {/* Custom Survey */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Title:</strong> {survey.custom_survey.title}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> {survey.custom_survey.description}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> {survey.custom_survey.status}
                </p>
              </div>

              {/* Selection */}
              <div className="mt-4">
                <h6 className="text-md font-medium text-gray-600">Selection</h6>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  {survey.custom_survey.selection.map((item, idx) => (
                    <li key={idx}>
                      <p>
                        <strong>Question:</strong> {item.content}
                      </p>
                      <p>
                        <strong>Options:</strong> {item.options.join(', ')}
                      </p>
                      <p>
                        <strong>Answer:</strong> {item.answer.join(', ')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Text Response */}
              <div className="mt-4">
                <h6 className="text-md font-medium text-gray-600">Text Response</h6>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                  {survey.custom_survey.text_response.map((response, idx) => (
                    <li key={idx}>
                      <p>
                        <strong>Question:</strong> {response.content}
                      </p>
                      <p>
                        <strong>Answer:</strong> {response.answer}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Survey Created Date */}
              <p className="text-sm text-gray-500 mt-6">
                <strong>Created At:</strong>{' '}
                {new Date(survey.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PatientProfile
