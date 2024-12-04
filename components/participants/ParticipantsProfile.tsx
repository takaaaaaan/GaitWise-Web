'use client'

import { useState } from 'react'
import { Participant } from 'types'

import { CalendarTodayIcon, GenderMark, IdCard, PhoneIcon } from '@/components/icons'

const PatientProfile = ({ participant }: { participant: Participant }) => {
  const [participantData] = useState({
    name: `${participant.firstName || 'N/A'} ${participant.lastName || ''}`.trim(),
    gender: participant.gender || 'Unknown',
    age: participant.age || 'N/A',
    email: participant.email || 'Not Provided',
    height: participant.height || 'Unknown',
    job: participant.job || 'Unemployed',
    weight: participant.weight ? `${participant.weight.value} ${participant.weight.type}` : 'Unknown',
    surveys: (participant.survey || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), // 최신순 정렬
  })

  return (
    <section className="mx-auto max-w-lg divide-y divide-gray-200 rounded-lg bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Essential Survey</h3>
      {/* Profile Information */}
      <div className="space-y-4">
        {[
          {
            label: 'Full Name',
            value: participantData.name,
            icon: <IdCard />,
          },
          {
            label: 'Gender',
            value: participantData.gender,
            icon: <GenderMark />,
          },
          {
            label: 'Age',
            value: participantData.age,
            icon: <CalendarTodayIcon />,
          },
          {
            label: 'Email',
            value: participantData.email,
            icon: <PhoneIcon />,
          },
          {
            label: 'Height',
            value: participantData.height,
            icon: <IdCard />,
          },
          {
            label: 'Weight',
            value: participantData.weight,
            icon: <IdCard />,
          },
          {
            label: 'Job',
            value: participantData.job,
            icon: <IdCard />,
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-4 rounded-md bg-gray-50 p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">{item.icon}</div>
            <div>
              <h3 className="text-sm font-light text-gray-500">{item.label}</h3>
              <p className="text-sm font-semibold text-gray-800">{item.value || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Surveys */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-bold text-gray-800">Custom Survey</h3>
        {participantData.surveys.length === 0 ? (
          <p className="text-sm text-gray-500">No custom surveys available.</p>
        ) : (
          <div className="space-y-6">
            {participantData.surveys.map((survey, index) => (
              <div key={index} className="rounded-md border border-gray-200 bg-white p-6 shadow-md">
                {/* Custom Survey */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong>Title:</strong> {survey.custom_survey?.title || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Description:</strong> {survey.custom_survey?.description || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Status:</strong> {survey.custom_survey?.status || 'N/A'}
                  </p>
                </div>

                {/* Selection */}
                {survey.custom_survey?.selection?.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-md font-medium text-gray-600">Selection</h6>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                      {survey.custom_survey.selection.map((item, idx) => (
                        <li key={idx}>
                          <p>
                            <strong>Question:</strong> {item.content || 'N/A'}
                          </p>
                          <p>
                            <strong>Options:</strong> {item.options?.join(', ') || 'N/A'}
                          </p>
                          <p>
                            <strong>Answer:</strong> {item.answer?.join(', ') || 'N/A'}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Text Response */}
                {survey.custom_survey?.text_response?.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-md font-medium text-gray-600">Text Response</h6>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-gray-700">
                      {survey.custom_survey.text_response.map((response, idx) => (
                        <li key={idx}>
                          <p>
                            <strong>Question:</strong> {response.content || 'N/A'}
                          </p>
                          <p>
                            <strong>Answer:</strong> {response.answer || 'N/A'}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Survey Created Date */}
                <p className="mt-6 text-sm text-gray-500">
                  <strong>Created At:</strong>{' '}
                  {survey.createdAt
                    ? new Date(survey.createdAt).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      })
                    : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PatientProfile
