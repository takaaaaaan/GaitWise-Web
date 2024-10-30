'use client';
import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import MenuIcon from '../icons/MenuIcon';
import { participants as initialPatients } from "../../../utils/participantsMockData";

const PatientList = () => {
  const [participants, setPatients] = useState(initialPatients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatientId, setNewPatientId] = useState("");

  const handleAddPatientClick = () => {
    setIsModalOpen(true); // 모달을 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPatientId("");
  };

  const handleAddPatient = () => {
    if (newPatientId.trim()) {
      const newPatient = {
        id: newPatientId,
        name: "New Patient", // 기본 이름
        gender: "Unknown", // 기본 성별
        age: "Unknown", // 기본 나이
        isActive: false,
      };
      //setPatients([...participants, newPatient]); // 새로운 환자 추가
      handleCloseModal(); // 모달 닫기
    }
  };

  return (
    <div>
      <ul role="list" className="rounded-3xl bg-white divide-y divide-gray-100">
        <li className="flex justify-between items-center gap-x-6 p-5">
          <h2 className="text-2xl font-medium">Patients</h2>
          <SearchIcon />
        </li>
        {participants.map((participant, index) => (
          <li
            key={index}
            className={
              participant.isActive
                ? "flex justify-between gap-x-6 p-5 items-center bg-gray-200"
                : "flex justify-between gap-x-6 p-5 items-center"
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  participant ID
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {participant.name}, {participant.gender}, {participant.age}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
              <MenuIcon />
            </div>
          </li>
        ))}

        {/* Add Patient Button */}
        <li className="flex justify-center items-center p-5">
          <button
            onClick={handleAddPatientClick}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full"
          >
            + Add Patient
          </button>
        </li>
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={newPatientId}
              onChange={(e) => setNewPatientId(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;
