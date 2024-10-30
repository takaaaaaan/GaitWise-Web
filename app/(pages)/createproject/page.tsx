'use client';
import { useState } from "react";

const ProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddParticipant = () => {
    if (participantId.trim()) {
      setParticipants([...participants, participantId.trim()]);
      setParticipantId(""); // Clear the input field
    }
  };

  const handleSubmit = () => {
    // 프로젝트 저장 로직 추가 가능
    console.log("Project Created:", {
      title,
      description,
      participants,
    });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>

      {/* Project Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter project title"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter project description"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
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
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleAddParticipant}
            className="ml-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
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
            <li key={index} className="text-gray-600 text-sm p-2">
              {id}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No analyst added yet.</p>
        )}
      </ul>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full"
      >
        Create Project
      </button>
    </div>
  );
};

export default ProjectPage;
