/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Plus, Save, Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'
import { DragItem, Question } from 'types'

import { Label } from '@/ui'
import { transformSurveyData } from '@/utils/format/surveyFormat'

// 드래그 타입 정의
const ItemType = 'QUESTION'

// 설문지 컴포넌트
export default function SurveyPage() {
  const router = useRouter()
  const params = useParams()
  const { projectname } = params || {}
  const validprojectTitle = Array.isArray(projectname) ? projectname[0] : projectname || ''
  console.log('validprojectTitle', validprojectTitle)
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [newOption, setNewOption] = useState<string>('') // 新しい選択肢の入力状態
  const { surveyid } = useParams()

  // params부터 surveyid를 사용해서 데이터 가져오기
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const response = await fetch(`/api/customsurvey?surveyid=${surveyid}`)
        const json = await response.json()

        if (json.success && json.Responsetype === 'surveyid') {
          const fetchedQuestions: Question[] = []

          // Selection questions (multi-choice)
          json.data.selection.forEach((item: any) => {
            fetchedQuestions.push({
              id: fetchedQuestions.length + 1,
              type: 'multiple',
              question: item.content,
              options: item.options,
            })
          })

          // Text response questions
          json.data.text_response.forEach((item: any) => {
            fetchedQuestions.push({
              id: fetchedQuestions.length + 1,
              type: 'text',
              question: item.content,
              options: [],
            })
          })

          setQuestions(fetchedQuestions)
          setSelectedQuestion(fetchedQuestions.length > 0 ? fetchedQuestions[0] : null)
        }
      } catch (error) {
        console.error('Error fetching survey data:', error)
      }
    }

    if (surveyid) {
      fetchSurveyData()
    }
  }, [surveyid])

  // 질문 추가 핸들러
  const addQuestion = (type: 'multiple' | 'text') => {
    const newQuestion: Question = {
      id: questions.length + 1,
      type,
      question: '',
      options: type === 'multiple' ? ['Option 1', 'Option 2'] : [],
    }
    setQuestions([...questions, newQuestion])
    setSelectedQuestion(newQuestion)
  }

  // 질문 수정 핸들러
  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    setQuestions(updatedQuestions)
    setSelectedQuestion(updatedQuestion)
  }

  const handleSave = async () => {
    console.log('Survey Questions:', questions)

    // Survey data を変換
    const outputdata = transformSurveyData(questions)
    console.log('outputdata', outputdata)

    try {
      // PUT リクエストを送信
      const response = await fetch(`/api/customsurvey?surveyid=${surveyid}`, {
        method: 'PUT', // HTTP メソッドを PUT に設定
        headers: {
          'Content-Type': 'application/json', // JSON データを送信
        },
        body: JSON.stringify(outputdata), // データを文字列化してリクエストに含める
      })

      // レスポンスの確認
      if (response.ok) {
        const result = await response.json()
        console.log('Update successful:', result)

        // Redirect to the survey list page after successful save
        router.push(`/survey/${validprojectTitle}`)
      } else {
        const error = await response.json()
        console.error('Update failed:', error)
        alert('Failed to save survey data.')
      }
    } catch (error) {
      console.error('Error during update:', error)
      alert('An error occurred while saving survey data.')
    }
  }

  // 질문 삭제 핸들러
  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
    setSelectedQuestion(null)
  }

  // 질문 순서 변경 핸들러
  const moveQuestion = (fromIndex: number, toIndex: number) => {
    const updatedQuestions = [...questions]
    const [movedItem] = updatedQuestions.splice(fromIndex, 1)
    updatedQuestions.splice(toIndex, 0, movedItem)
    setQuestions(updatedQuestions)
  }

  // 선택지 추가 핸들러 (객관식 질문용)
  const addOption = () => {
    if (selectedQuestion && newOption.trim()) {
      const updatedQuestion: Question = {
        ...selectedQuestion,
        options: [...(selectedQuestion.options || []), newOption],
      }
      updateQuestion(updatedQuestion)
      setNewOption('')
    }
  }

  // 옵션 텍스트 수정 핸들러
  const updateOption = (index: number, value: string) => {
    if (selectedQuestion) {
      const updatedOptions = [...(selectedQuestion.options || [])]
      updatedOptions[index] = value
      const updatedQuestion: Question = { ...selectedQuestion, options: updatedOptions }
      updateQuestion(updatedQuestion)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {/* 미리보기 섹션 */}
        <PreviewSection>
          <PreviewTitle>Survey Preview</PreviewTitle>
          {questions.length === 0 ? (
            <NoQuestionMessage>No questions added yet. Once you add a question, it will appear here.</NoQuestionMessage>
          ) : (
            questions.map((question, index) => (
              <DraggableQuestion
                key={question.id}
                question={question}
                index={index}
                moveQuestion={moveQuestion}
                onSelectQuestion={() => setSelectedQuestion(question)}
                deleteQuestion={deleteQuestion}
              />
            ))
          )}
          <SaveButton
            className="flex w-full items-center justify-center gap-3 bg-teal-500 hover:bg-teal-700"
            onClick={handleSave} // 質問リストを出力
          >
            <Save />
            <span>Save Survey Question List</span>
          </SaveButton>
          <button
            onClick={() => router.push(`/survey/${validprojectTitle}`)}
            className={`mr-3 mt-5 w-full rounded bg-gray-300 px-4 py-2 font-bold text-white hover:bg-gray-400`}
          >
            Cancel
          </button>
        </PreviewSection>

        {/* 편집기 섹션 */}
        <EditorSection>
          <PreviewTitle>Survey Editor</PreviewTitle>
          <Label>Select a question to edit :</Label>
          <div className="flex w-full">
            <AddQuestionButton onClick={() => addQuestion('text')} style={{ marginRight: 30 }}>
              <Plus />
              Add Text Question
            </AddQuestionButton>
            <AddQuestionButton onClick={() => addQuestion('multiple')}>
              <Plus />
              Add Multiple Choice
            </AddQuestionButton>
          </div>
          {selectedQuestion ? (
            <QuestionEditor
              question={selectedQuestion}
              onUpdateQuestion={updateQuestion}
              onDeleteQuestion={deleteQuestion}
              newOption={newOption}
              setNewOption={setNewOption}
              addOption={addOption}
              updateOption={updateOption}
            />
          ) : (
            <EditorMessage>Select a question to edit</EditorMessage>
          )}
        </EditorSection>
      </Container>
    </DndProvider>
  )
}

// 드래그 가능한 질문 컴포넌트
const DraggableQuestion: React.FC<{
  question: Question
  index: number
  moveQuestion: (dragIndex: number, hoverIndex: number) => void
  onSelectQuestion: () => void
  deleteQuestion: (id: number) => void // このプロパティを追加
}> = ({ question, index, moveQuestion, onSelectQuestion, deleteQuestion }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: DragItem) {
      if (!ref.current) return

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) return

      moveQuestion(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: ItemType,
    item: { id: question.id, index },
  })

  drag(drop(ref))
  return (
    <PreviewQuestion ref={ref} onClick={onSelectQuestion}>
      <div className="flex justify-items-center gap-4">
        <h4 className="font-bold">
          Question{question.id} : {question.question || 'Untitled Question'}
        </h4>
        {question.type === 'multiple' && (
          <h4>
            Max : {question.max} Min : {question.min}
          </h4>
        )}
        <div className="ml-auto flex items-start">
          <DeleteButtonIcon
            onClick={(e) => {
              e.stopPropagation() // 親要素へのイベント伝播を防ぐ
              deleteQuestion(question.id) // 親から渡された関数を呼び出す
            }}
          >
            <Trash2 color="black" />
          </DeleteButtonIcon>
        </div>
      </div>
      {question.type === 'multiple' && (
        <ul>
          {question.options?.map((option, i) => (
            <li key={i} className="flex items-center justify-start gap-2">
              <input type="radio" name={`question-${question.id}`} disabled />
              {option}
            </li>
          ))}
        </ul>
      )}
      {question.type === 'text' && <input type="text" placeholder="Your answer here..." disabled />}
    </PreviewQuestion>
  )
}

// 질문 편집기 컴포넌트
const QuestionEditor: React.FC<{
  question: Question
  onUpdateQuestion: (question: Question) => void
  onDeleteQuestion: (id: number) => void
  newOption: string
  setNewOption: React.Dispatch<React.SetStateAction<string>>
  addOption: () => void
  updateOption: (index: number, value: string) => void
}> = ({ question, onUpdateQuestion, onDeleteQuestion, newOption, setNewOption, addOption, updateOption }) => {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateQuestion({ ...question, question: e.target.value })
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = parseInt(e.target.value, 10)
    onUpdateQuestion({ ...question, min })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = parseInt(e.target.value, 10)
    onUpdateQuestion({ ...question, max })
  }

  return (
    <EditorContainer>
      <Label>Question:</Label>
      {/* <label>Question:</label> */}
      <input type="text" value={question.question} onChange={handleQuestionChange} placeholder="Enter your question" />
      {question.type === 'multiple' && (
        <div>
          {/* Min and Max Inputs */}
          <div className="flex w-full items-center justify-center">
            <div className="w-full">
              <Label>Min:</Label>
              <input
                type="number"
                value={question.min ?? ''}
                onChange={handleMinChange}
                placeholder="Minimum choices"
              />
            </div>
            <div className="w-full">
              <Label>Max:</Label>
              <input
                type="number"
                value={question.max ?? ''}
                onChange={handleMaxChange}
                placeholder="Maximum choices"
              />
            </div>
          </div>
          <Label>Options:</Label>
          {question.options?.map((option, index) => (
            <OptionItem key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder="Edit option"
              />
            </OptionItem>
          ))}
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add an option"
          />
          <AddOptionButton
            className="flex w-full items-center justify-center gap-3 bg-teal-500 hover:bg-teal-700"
            onClick={addOption}
          >
            <Plus />
            Add Option
          </AddOptionButton>
        </div>
      )}

      <DeleteButton
        className="flex w-full items-center justify-center gap-3"
        onClick={() => onDeleteQuestion(question.id)}
      >
        <Trash2 />
        <span>Delete Question</span>
      </DeleteButton>
    </EditorContainer>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f4f4f4;
`

const PreviewSection = styled.div`
  width: 60%;
  padding: 30px;
  background-color: #fff;
  border-right: 1px solid #ddd;
`

const PreviewTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
`

const NoQuestionMessage = styled.p`
  font-size: 1.2rem;
  color: #888;
`

const PreviewQuestion = styled.div`
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ececec;
  }

  h4 {
    margin-bottom: 10px;
    font-size: 1.1rem;
  }

  input[type='text'] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 5px 0;
  }
`

const EditorSection = styled.div`
  width: 40%;
  padding: 30px;
  background-color: #f8f9fa;
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;

  input[type='text'],
  input[type='number'] {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

const OptionItem = styled.div`
  margin-bottom: 10px;
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

const AddQuestionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const EditorMessage = styled.p`
  font-size: 1.2rem;
  color: #555;
`

const DeleteButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`
const DeleteButtonIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  padding: 3px;
  background-color: white;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ebebeb;
  }
`
const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`
const AddOptionButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`
