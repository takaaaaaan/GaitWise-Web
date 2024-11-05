'use client'
import { useState } from 'react'

const ProjectPage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [participantId, setParticipantId] = useState('')
  const [participants, setParticipants] = useState<string[]>([])

  const handleAddParticipant = () => {
    if (participantId.trim()) {
      setParticipants([...participants, participantId.trim()])
      setParticipantId('') // Clear the input field
    }
  }

  const handleSubmit = () => {
    // 프로젝트 저장 로직 추가 가능
    console.log('Project Created:', {
      title,
      description,
      participants,
    })
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Create New Project</h1>

      {/* Project Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          className="mt-1 w-full rounded border border-gray-300 p-2"
        />
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          className="mt-1 w-full rounded border border-gray-300 p-2"
          rows={4}
        />
      </div>

      {/* Add Participant */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Add analysist ID</label>
        <div className="flex">
          <input
            type="text"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
            placeholder="Enter project member ID"
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
          <button
            onClick={handleAddParticipant}
            className="ml-2 rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Participant List */}
      <ul className="mb-4">
        <h3 className="text-sm font-medium text-gray-700">Analysts:</h3>
        {participants.length > 0 ? (
          participants.map((id, index) => (
            <li key={index} className="p-2 text-sm text-gray-600">
              {id}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-500">No analyst added yet.</p>
        )}
      </ul>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
      >
        Create Project
      </button>
    </div>
  )
}

export default ProjectPage
